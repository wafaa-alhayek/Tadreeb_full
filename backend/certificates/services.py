from django.db import transaction
from django.db.models import Sum
from django.utils import timezone

from applications.status import Status, TransitionError
from notifications.models import Notification, notify

from .models import Certificate


def issue_certificate(application, user=None):
    """FR-34: issue the certificate of an approved application and mark it certified.

    `user` is the coordinator who asked for it; None when it follows the approval
    automatically. Raises TransitionError (a message for the user) when it can't be issued.
    """
    if application.status != Status.APPROVED:
        raise TransitionError("تصدر الشهادة بعد اعتماد التدريب من المنسق.")
    if Certificate.objects.filter(application=application).exists():
        raise TransitionError("صدرت شهادة لهذا الطلب من قبل.")
    placements = list(
        application.placements.select_related("opportunity__provider").order_by("start_date", "id")
    )
    if not placements:
        raise TransitionError("لا يوجد توزيع تدريب لهذا الطلب.")
    # After a change of provider (FR-30) the certificate names the last one, for the whole period.
    last = placements[-1]
    student = application.student
    profile = getattr(student, "student_profile", None)
    hours = application.daily_logs.filter(confirmed_at__isnull=False).aggregate(total=Sum("hours"))

    with transaction.atomic():
        certificate = Certificate.objects.create(
            application=application,
            serial_number=f"pending-{application.pk}",
            student_name=student.get_full_name() or student.username,
            university_id=student.username,
            specialization=profile.specialization.name if profile and profile.specialization else "",
            provider_name=last.opportunity.provider.name,
            opportunity_title=last.opportunity.title,
            start_date=placements[0].start_date,
            end_date=last.end_date,
            total_hours=hours["total"] or 0,
            issued_by=user,
        )
        # BR-07: one serial per certificate, in order, e.g. TDR-2026-00012.
        certificate.serial_number = f"TDR-{timezone.localdate():%Y}-{certificate.pk:05d}"
        certificate.save(update_fields=["serial_number"])
        application.move_to(Status.CERTIFIED)
        notify(
            student,
            Notification.Kind.APPLICATION,
            "تم إصدار شهادة التدريب",
            f"رقم الشهادة: {certificate.serial_number}",
        )
    return certificate
