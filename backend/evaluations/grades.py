"""FR-27 / BR-04: the final grade, from the two evaluations and the report grades."""

from decimal import Decimal

from django.conf import settings

from accounts.models import User
from applications.status import Status
from notifications.models import Notification, notify
from training.models import average_report_grade

from .models import Evaluation


def final_grade(application):
    """The parts out of 100, their weights, and the weighted total.

    `total` and `passed` are None until all three parts exist (both evaluations and at
    least one graded report).
    """
    totals = dict(application.evaluations.values_list("kind", "total"))
    return combine(
        totals.get(Evaluation.Kind.PROVIDER),
        totals.get(Evaluation.Kind.SUPERVISOR),
        average_report_grade(application),
    )


def combine(provider, supervisor, reports):
    """final_grade() from parts already at hand, e.g. prefetched for an export."""
    weights = settings.TADREEB_GRADE_WEIGHTS
    parts = {"provider": provider, "supervisor": supervisor, "reports": reports}
    parts = {key: None if value is None else Decimal(value).quantize(Decimal("0.01")) for key, value in parts.items()}
    total = passed = None
    if None not in parts.values():
        total = (sum(parts[key] * Decimal(weights[key]) for key in parts) / 100).quantize(Decimal("0.01"))
        passed = total >= Decimal(settings.TADREEB_PASS_GRADE)
    return {
        **parts,
        "weights": weights,
        "total": total,
        "pass_grade": settings.TADREEB_PASS_GRADE,
        "passed": passed,
        "missing": [key for key, value in parts.items() if value is None],
    }


def is_ready(application):
    """A completed training whose final grade can be worked out, so it can be approved."""
    return application.status == Status.COMPLETED and final_grade(application)["total"] is not None


def notify_if_ready(application, was_ready):
    """Tell the coordinators when a grade change makes the training ready for approval.

    `was_ready` is is_ready() from before the change, so they hear about it once.
    """
    if was_ready or not is_ready(application):
        return
    student = application.student.get_full_name() or application.student.username
    for coordinator in User.objects.filter(role=User.Role.COORDINATOR, is_active=True):
        notify(
            coordinator,
            Notification.Kind.TRAINING,
            "تدريب جاهز للاعتماد",
            f"اكتملت درجات {student}، ويمكن اعتماد التدريب.",
        )
