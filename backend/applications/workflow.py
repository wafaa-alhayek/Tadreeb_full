"""Review, allocation and confirmation (FR-13, FR-14, FR-16, FR-18).

Each function is one business action: it checks the rules, changes the data, records it in
the audit log (FR-40) and tells the people involved (FR-38). Views only call these.
"""

from django.db import transaction
from django.utils import timezone
from rest_framework import serializers

from accounts.models import StudentProfile, User
from audit.models import AuditLog, log_action
from certificates.services import issue_certificate
from evaluations.grades import final_grade
from notifications.models import Notification, notify
from providers.models import Opportunity, Provider

from .models import Placement
from .status import Status, TransitionError


def change_status(request, application, target, reason=""):
    """Move the application to `target` as the logged-in user, then log and notify."""
    before = application.status
    try:
        application.move_to(target, request.user, reason)
    except TransitionError as error:
        raise serializers.ValidationError(str(error))

    log_action(
        request,
        AuditLog.Action.STATUS_CHANGE,
        application,
        {"status": {"from": before, "to": target}},
    )
    notify_status_change(application, request.user)


def notify_status_change(application, changed_by):
    """FR-38 / Section 2.5: who hears about each status change."""
    label = application.get_status_display()

    if application.student != changed_by:
        message = f"صار طلبك «{label}»."
        if application.status_reason:
            message += f" السبب: {application.status_reason}"
        notify(application.student, Notification.Kind.APPLICATION, "تحديث حالة طلب التدريب", message)

    if application.status == Status.SUBMITTED:
        # Section 2.5: "supervisor is notified". Before a supervisor is assigned (FR-18),
        # the coordinators get it so someone picks the application up.
        if application.supervisor:
            reviewers = [application.supervisor]
        else:
            reviewers = User.objects.filter(role=User.Role.COORDINATOR, is_active=True)
        for reviewer in reviewers:
            notify(
                reviewer,
                Notification.Kind.APPLICATION,
                "طلب تدريب جديد",
                f"أرسل {application.student.get_full_name() or application.student.username} طلب تدريب للمراجعة.",
            )


def withdraw(request, application, reason):
    """FR-31: close the placement with a reason."""
    placement = application.active_placement
    with transaction.atomic():
        change_status(request, application, Status.WITHDRAWN, reason)
        if placement:
            placement.close(reason)
            log_action(request, AuditLog.Action.UPDATE, placement, {"is_active": {"from": True, "to": False}})
    if placement and placement.provider.user:
        notify(
            placement.provider.user,
            Notification.Kind.TRAINING,
            "انسحاب متدرب",
            f"انسحب {application.student.get_full_name() or application.student.username} من التدريب.",
        )


def assign_supervisor(request, application, supervisor):
    """FR-18: the coordinator links the student to exactly one academic supervisor."""
    if supervisor.role != User.Role.SUPERVISOR or not supervisor.is_active:
        raise serializers.ValidationError({"supervisor": "اختر مشرفًا أكاديميًا."})
    if application.status in (Status.DRAFT, Status.REJECTED, Status.WITHDRAWN, Status.CERTIFIED):
        raise serializers.ValidationError("لا يمكن تعيين مشرف لطلب بهذه الحالة.")

    before = application.supervisor_id
    application.supervisor = supervisor
    application.save(update_fields=["supervisor", "updated_at"])
    log_action(request, AuditLog.Action.UPDATE, application, {"supervisor": {"from": before, "to": supervisor.id}})
    notify(
        supervisor,
        Notification.Kind.APPLICATION,
        "طالب جديد تحت إشرافك",
        f"تم تعيينك مشرفًا على {application.student.get_full_name() or application.student.username}.",
    )


def lock_available_opportunity(application, opportunity_id):
    """The opportunity, if the student can be placed there: open, in their specialization,
    with a free seat. Call inside transaction.atomic(): the row stays locked until the end,
    so two placements can't take the last seat at once."""
    opportunity = (
        Opportunity.objects.select_for_update()
        .select_related("provider")
        .filter(id=opportunity_id)
        .first()
    )
    if opportunity is None:
        raise serializers.ValidationError({"opportunity": "الفرصة غير موجودة."})
    if opportunity.status != Opportunity.Status.OPEN or opportunity.provider.status != Provider.Status.APPROVED:
        raise serializers.ValidationError({"opportunity": "الفرصة غير متاحة."})

    profile = StudentProfile.objects.filter(user=application.student).first()
    if profile and profile.specialization_id and profile.specialization_id != opportunity.specialization_id:
        raise serializers.ValidationError({"opportunity": "الفرصة ليست لتخصص الطالب."})
    if opportunity.free_seats() < 1:
        raise serializers.ValidationError({"opportunity": "لا توجد مقاعد فارغة في هذه الفرصة."})
    return opportunity


def notify_new_placement(placement):
    """Section 2.5: "provider notified". (The assignment letter, FR-17, hooks in here later.)"""
    if placement.provider.user:
        student = placement.application.student
        notify(
            placement.provider.user,
            Notification.Kind.TRAINING,
            "طالب موزّع عليكم",
            f"تم توزيع {student.get_full_name() or student.username} على «{placement.opportunity.title}». يرجى تأكيد قبوله.",
        )


def allocate(request, application, opportunity_id):
    """FR-14: place an accepted student at an opportunity, respecting seats and specialization."""
    with transaction.atomic():
        opportunity = lock_available_opportunity(application, opportunity_id)

        # FR-18: every placed student has exactly one supervisor.
        if application.supervisor is None:
            raise serializers.ValidationError("عيّن مشرفًا أكاديميًا للطالب قبل التوزيع.")

        change_status(request, application, Status.ASSIGNED)
        placement = Placement.objects.create(
            application=application,
            opportunity=opportunity,
            start_date=opportunity.start_date,
            end_date=opportunity.end_date,
        )
        log_action(request, AuditLog.Action.CREATE, placement, {"opportunity": {"from": None, "to": opportunity.id}})

    notify_new_placement(placement)
    return placement


def change_provider(request, application, opportunity_id, reason):
    """FR-30: close the current placement and open one at another opportunity.

    The old placement stays in the database with its daily logs, so its hours still count
    (D-12). The status doesn't change: the student keeps training, now somewhere else, and
    the new provider confirms them like any allocation (FR-16).
    """
    with transaction.atomic():
        old = application.active_placement
        if old is None:
            raise serializers.ValidationError("لا يوجد تدريب فعّال لهذا الطالب.")
        opportunity = lock_available_opportunity(application, opportunity_id)
        if opportunity.id == old.opportunity_id:
            raise serializers.ValidationError({"opportunity": "الطالب يتدرب في هذه الفرصة حاليًا."})
        today = timezone.localdate()
        if opportunity.end_date <= today:
            raise serializers.ValidationError({"opportunity": "انتهت فترة هذه الفرصة."})

        old.close(f"تغيير جهة التدريب: {reason}")
        log_action(request, AuditLog.Action.UPDATE, old, {"is_active": {"from": True, "to": False}})
        placement = Placement.objects.create(
            application=application,
            opportunity=opportunity,
            start_date=max(today, opportunity.start_date),
            end_date=opportunity.end_date,
        )
        log_action(request, AuditLog.Action.CREATE, placement, {"opportunity": {"from": old.opportunity_id, "to": opportunity.id}})

    if old.provider.user:
        notify(
            old.provider.user,
            Notification.Kind.TRAINING,
            "نقل متدرب",
            f"انتقل {application.student.get_full_name() or application.student.username} إلى جهة تدريب أخرى.",
        )
    notify_new_placement(placement)
    return placement


def extend(request, application, new_end_date):
    """FR-32: move the placement's end date later."""
    placement = application.active_placement
    if placement is None:
        raise serializers.ValidationError("لا يوجد تدريب فعّال لهذا الطالب.")
    if new_end_date <= placement.end_date:
        raise serializers.ValidationError({"new_end_date": "يجب أن يكون التاريخ الجديد بعد تاريخ الانتهاء الحالي."})

    before = placement.end_date
    placement.end_date = new_end_date
    placement.save(update_fields=["end_date"])
    log_action(request, AuditLog.Action.UPDATE, placement, {"end_date": {"from": before, "to": new_end_date}})
    if placement.provider.user:
        notify(
            placement.provider.user,
            Notification.Kind.TRAINING,
            "تمديد فترة التدريب",
            f"تم تمديد تدريب {application.student.get_full_name() or application.student.username} حتى {new_end_date}.",
        )
    return placement


def confirm_placement(request, application):
    """FR-16: the provider confirms it accepts the allocated student."""
    placement = application.active_placement
    if placement is None or placement.provider.user_id != request.user.id:
        raise serializers.ValidationError("هذا الطالب ليس موزعًا على جهتكم.")
    if placement.provider_confirmed_at:
        raise serializers.ValidationError("تم تأكيد قبول هذا الطالب مسبقًا.")

    with transaction.atomic():
        placement.provider_confirmed_at = timezone.now()
        placement.save(update_fields=["provider_confirmed_at"])
        log_action(request, AuditLog.Action.UPDATE, placement, {"provider_confirmed_at": {"from": None, "to": placement.provider_confirmed_at}})
        # Section 2.5: the provider's confirmation starts the training, so the student can
        # log days (FR-20). After a change of provider (FR-30) it's already in training.
        if application.status == Status.ASSIGNED:
            change_status(request, application, Status.IN_TRAINING)

    for person in filter(None, [application.student, application.supervisor]):
        notify(
            person,
            Notification.Kind.TRAINING,
            "تأكيد جهة التدريب",
            f"أكدت «{placement.provider.name}» قبول {application.student.get_full_name() or application.student.username}.",
        )
    return placement


def approve(request, application):
    """Section 2.5: the coordinator approves a completed training; the certificate follows (FR-34).

    BR-04: only once the final grade is complete and passes.
    """
    grade = final_grade(application)
    if grade["total"] is None:
        missing = {"provider": "تقييم جهة التدريب", "supervisor": "تقييم المشرف", "reports": "درجة التقارير"}
        raise serializers.ValidationError(
            "لا يمكن الاعتماد قبل اكتمال الدرجات: " + "، ".join(missing[key] for key in grade["missing"])
        )
    if not grade["passed"]:
        raise serializers.ValidationError(
            f"الدرجة النهائية {grade['total']} أقل من درجة النجاح {grade['pass_grade']}."
        )
    with transaction.atomic():
        change_status(request, application, Status.APPROVED)
        try:
            certificate = issue_certificate(application)
        except TransitionError as error:
            # Undo the approval too, so the application stays "completed".
            raise serializers.ValidationError(str(error))
    log_action(request, AuditLog.Action.CREATE, certificate, {"serial_number": {"from": None, "to": certificate.serial_number}})
    return certificate
