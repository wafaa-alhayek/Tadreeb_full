"""Exceptions during training (FR-30–33): who raises each kind, who decides, and what happens.

    kind             raised by              decided by
    change_provider  student                supervisor approves, then coordinator confirms (D-12)
    withdrawal       student or supervisor  supervisor
    extension        supervisor             supervisor
    issue            student or provider    supervisor closes it

When the supervisor raises a withdrawal or an extension it applies straight away, because
they're the one who would approve it. Like workflow.py, every function here checks the
rules, changes the data, logs it (FR-40) and tells the people involved (FR-38).
"""

from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from accounts.models import User
from audit.models import AuditLog, log_action
from notifications.models import Notification, notify

from . import workflow
from .models import ExceptionRequest

Kind = ExceptionRequest.Kind
State = ExceptionRequest.State

WHO_CAN_RAISE = {
    Kind.CHANGE_PROVIDER: [User.Role.STUDENT],
    Kind.WITHDRAWAL: [User.Role.STUDENT, User.Role.SUPERVISOR],
    Kind.EXTENSION: [User.Role.SUPERVISOR],
    Kind.ISSUE: [User.Role.STUDENT, User.Role.PROVIDER],
}


def name(user):
    return user.get_full_name() or user.username


def is_involved(user, application):
    """The student, their supervisor, or the provider where they train now."""
    if user.role == User.Role.STUDENT:
        return application.student_id == user.id
    if user.role == User.Role.SUPERVISOR:
        return application.supervisor_id == user.id
    if user.role == User.Role.PROVIDER:
        placement = application.active_placement
        return placement is not None and placement.provider.user_id == user.id
    return False


@transaction.atomic  # if a supervisor's request can't be applied, it isn't saved either
def raise_request(request, application, kind, reason, new_opportunity=None, new_end_date=None):
    """A student, supervisor or provider opens a request about a placed student."""
    user = request.user
    if user.role not in WHO_CAN_RAISE[kind] or not is_involved(user, application):
        raise PermissionDenied("لا يمكنك تقديم هذا الطلب.")
    placement = application.active_placement
    if placement is None:
        raise serializers.ValidationError("لا يوجد تدريب فعّال لهذا الطالب.")
    if application.exception_requests.filter(kind=kind, status__in=ExceptionRequest.OPEN_STATES).exists():
        raise serializers.ValidationError("يوجد طلب من هذا النوع قيد المعالجة.")

    if kind == Kind.EXTENSION:
        if new_end_date is None:
            raise serializers.ValidationError({"new_end_date": "حدد تاريخ الانتهاء الجديد."})
        if new_end_date <= placement.end_date:
            raise serializers.ValidationError({"new_end_date": "يجب أن يكون التاريخ الجديد بعد تاريخ الانتهاء الحالي."})
    if kind == Kind.CHANGE_PROVIDER and new_opportunity and new_opportunity.id == placement.opportunity_id:
        raise serializers.ValidationError({"new_opportunity": "الطالب يتدرب في هذه الفرصة حاليًا."})

    exception = ExceptionRequest.objects.create(
        application=application,
        kind=kind,
        requested_by=user,
        reason=reason,
        new_opportunity=new_opportunity if kind == Kind.CHANGE_PROVIDER else None,
        new_end_date=new_end_date if kind == Kind.EXTENSION else None,
    )
    log_action(request, AuditLog.Action.CREATE, exception, {"kind": {"from": None, "to": kind}})

    if user.role == User.Role.SUPERVISOR:
        apply(request, exception, note="")
    else:
        notify(
            application.supervisor,
            Notification.Kind.TRAINING,
            "طلب استثناء جديد",
            f"{exception.get_kind_display()}: {name(application.student)}. السبب: {reason}",
        )
    return exception


def check_decider(user, exception):
    """D-12: the student's supervisor decides first; the coordinator confirms a provider change."""
    if exception.status == State.PENDING:
        if user.id != exception.application.supervisor_id:
            raise PermissionDenied("القرار للمشرف الأكاديمي للطالب.")
    elif exception.status == State.SUPERVISOR_APPROVED:
        if user.role != User.Role.COORDINATOR:
            raise PermissionDenied("التأكيد لمنسق التدريب.")
    else:
        raise serializers.ValidationError("تم البت في هذا الطلب.")


def approve(request, exception, note="", opportunity_id=None):
    """Approve the request, and carry it out once nobody else has to agree."""
    check_decider(request.user, exception)
    if exception.kind == Kind.ISSUE:
        raise serializers.ValidationError("المشكلة تُغلق ولا يُوافق عليها.")

    if exception.kind == Kind.CHANGE_PROVIDER and exception.status == State.PENDING:
        decide(request, exception, State.SUPERVISOR_APPROVED, note)
        for coordinator in User.objects.filter(role=User.Role.COORDINATOR, is_active=True):
            notify(
                coordinator,
                Notification.Kind.TRAINING,
                "تغيير جهة تدريب بانتظار التأكيد",
                f"وافق المشرف على تغيير جهة تدريب {name(exception.application.student)}.",
            )
        return exception

    apply(request, exception, note, opportunity_id)
    return exception


def apply(request, exception, note, opportunity_id=None):
    """Do what the request asks for, then mark it approved, all or nothing."""
    application = exception.application
    with transaction.atomic():
        if exception.kind == Kind.CHANGE_PROVIDER:
            opportunity_id = opportunity_id or exception.new_opportunity_id
            if not opportunity_id:
                raise serializers.ValidationError({"opportunity": "اختر فرصة التدريب الجديدة."})
            workflow.change_provider(request, application, opportunity_id, exception.reason)
            exception.new_opportunity_id = opportunity_id
        elif exception.kind == Kind.WITHDRAWAL:
            workflow.withdraw(request, application, exception.reason)
        elif exception.kind == Kind.EXTENSION:
            workflow.extend(request, application, exception.new_end_date)
        decide(request, exception, State.APPROVED, note)


def reject(request, exception, note):
    check_decider(request.user, exception)
    if exception.kind == Kind.ISSUE:
        raise serializers.ValidationError("المشكلة تُغلق ولا تُرفض.")
    if not note:
        raise serializers.ValidationError({"note": "اكتب سبب الرفض."})
    decide(request, exception, State.REJECTED, note)
    return exception


def close(request, exception, note=""):
    """FR-33: the supervisor closes an issue once it's dealt with."""
    if exception.kind != Kind.ISSUE:
        raise serializers.ValidationError("يُغلق هذا الإجراء المشاكل فقط.")
    check_decider(request.user, exception)
    decide(request, exception, State.CLOSED, note)
    return exception


def decide(request, exception, status, note):
    """Record the decision, and tell the student and whoever raised the request."""
    before = exception.status
    exception.status = status
    exception.decided_by = request.user
    exception.decision_note = note
    exception.decided_at = timezone.now()
    exception.save()
    log_action(request, AuditLog.Action.UPDATE, exception, {"status": {"from": before, "to": status}})

    if status == State.SUPERVISOR_APPROVED:
        return  # not final yet; the coordinator hears about it in approve()
    message = f"{exception.get_kind_display()}: {exception.get_status_display()}."
    if note:
        message += f" {note}"
    people = {exception.application.student, exception.requested_by} - {request.user, None}
    for person in people:
        notify(person, Notification.Kind.TRAINING, "تحديث طلب الاستثناء", message)
