"""Application status engine (FR-11–16, FR-18).

Every training application has exactly one status. It may only move along the
arrows listed in TRANSITIONS, and only a user whose role is listed for that arrow
may move it:

    draft ──student──> submitted ──reviewer──> under_review ──reviewer──> accepted ──reviewer──> assigned
                           ^                        │
                           │                        ├──reviewer──> rejected
                           └───────student──── needs_changes <──reviewer──┘

The status codes are the ones agreed in docs/TEAM_AGREEMENT.md.
"""

from django.db import models

from accounts.models import User


class Status(models.TextChoices):
    DRAFT = "draft", "مسودة"
    SUBMITTED = "submitted", "مرسل"
    UNDER_REVIEW = "under_review", "قيد المراجعة"
    NEEDS_CHANGES = "needs_changes", "بحاجة لتعديل"
    ACCEPTED = "accepted", "مقبول"
    REJECTED = "rejected", "مرفوض"
    ASSIGNED = "assigned", "تم التوزيع"


STUDENT = {User.Role.STUDENT}
# FR-13 / FR-14: supervisors review and allocate applications; the coordinator
# and admin can do the same.
REVIEWERS = {User.Role.SUPERVISOR, User.Role.COORDINATOR, User.Role.ADMIN}

# (from, to): the roles allowed to make that change. Anything not listed is forbidden.
TRANSITIONS = {
    (Status.DRAFT, Status.SUBMITTED): STUDENT,
    (Status.SUBMITTED, Status.UNDER_REVIEW): REVIEWERS,
    (Status.UNDER_REVIEW, Status.ACCEPTED): REVIEWERS,
    (Status.UNDER_REVIEW, Status.REJECTED): REVIEWERS,
    (Status.UNDER_REVIEW, Status.NEEDS_CHANGES): REVIEWERS,
    (Status.NEEDS_CHANGES, Status.SUBMITTED): STUDENT,
    (Status.ACCEPTED, Status.ASSIGNED): REVIEWERS,
}


class TransitionError(Exception):
    """A status change that the rules above don't allow. The message is shown to the user."""


def allowed_next(current, role):
    """The statuses `role` may move an application to from `current` (for the front-end's buttons)."""
    return [
        target
        for (source, target), roles in TRANSITIONS.items()
        if source == current and role in roles
    ]


def check_transition(current, target, role, reason=""):
    """Raise TransitionError unless `role` may move an application from `current` to `target`.

    `reason` is the note the reviewer writes; FR-13 requires one when rejecting.
    """
    if (current, target) not in TRANSITIONS:
        raise TransitionError(
            f"لا يمكن نقل الطلب من «{Status(current).label}» إلى «{Status(target).label}»."
        )
    if role not in TRANSITIONS[(current, target)]:
        raise TransitionError("ليس لديك صلاحية لهذا التغيير.")
    if target == Status.REJECTED and not reason.strip():
        raise TransitionError("يجب كتابة سبب الرفض.")
