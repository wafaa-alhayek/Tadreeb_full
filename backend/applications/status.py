"""Application status engine: the lifecycle in SRS Section 2.5.

One application follows a student from the first draft to the certificate. It may only
move along the arrows listed in TRANSITIONS, and only someone whose role is listed for
that arrow may move it:

    draft ─student─> submitted ─rev─> under_review ─rev─> accepted ─rev─> assigned
                         ^                 │                                  │
                         │                 ├─rev─> rejected                   │ provider / system
                         └──student── needs_changes <─rev─┘                   v
                                                                         in_training ─rev─> withdrawn
    certified <─system─ approved <─coordinator─ completed <─system──────────┘

    rev = reviewer (supervisor or coordinator, FR-13 / FR-14 and the Section 2.2 matrix)

Changing provider and extending the dates (FR-30, FR-32) keep the application in
in_training, so they are not status changes.
"""

from django.db import models

from accounts.models import User


class Status(models.TextChoices):
    DRAFT = "draft", "مسودة"
    SUBMITTED = "submitted", "مرسل"
    UNDER_REVIEW = "under_review", "قيد المراجعة"
    # Not in the SRS diagram; kept from docs/TEAM_AGREEMENT.md so a reviewer can send an
    # application back instead of rejecting it.
    NEEDS_CHANGES = "needs_changes", "بحاجة لتعديل"
    ACCEPTED = "accepted", "مقبول"
    REJECTED = "rejected", "مرفوض"
    ASSIGNED = "assigned", "تم التوزيع"
    IN_TRAINING = "in_training", "قيد التدريب"
    COMPLETED = "completed", "مكتمل"
    APPROVED = "approved", "معتمد"
    CERTIFIED = "certified", "تم إصدار الشهادة"
    WITHDRAWN = "withdrawn", "منسحب"


# Moves the back-end makes by itself (start date reached, BR-06 hours met, certificate issued).
SYSTEM = "system"

STUDENT = {User.Role.STUDENT}
# Section 2.2: "Review and allocate applications" is the supervisor (own students) and the coordinator.
REVIEWERS = {User.Role.SUPERVISOR, User.Role.COORDINATOR}
COORDINATOR = {User.Role.COORDINATOR}

# (from, to): who may make that change. Anything not listed is forbidden.
TRANSITIONS = {
    (Status.DRAFT, Status.SUBMITTED): STUDENT,
    (Status.SUBMITTED, Status.UNDER_REVIEW): REVIEWERS,
    (Status.UNDER_REVIEW, Status.ACCEPTED): REVIEWERS,
    (Status.UNDER_REVIEW, Status.REJECTED): REVIEWERS,
    (Status.UNDER_REVIEW, Status.NEEDS_CHANGES): REVIEWERS,
    (Status.NEEDS_CHANGES, Status.SUBMITTED): STUDENT,
    (Status.ACCEPTED, Status.ASSIGNED): REVIEWERS,
    (Status.ASSIGNED, Status.IN_TRAINING): {User.Role.PROVIDER, SYSTEM},
    (Status.ASSIGNED, Status.WITHDRAWN): REVIEWERS,
    (Status.IN_TRAINING, Status.WITHDRAWN): REVIEWERS,
    (Status.IN_TRAINING, Status.COMPLETED): {SYSTEM},
    (Status.COMPLETED, Status.APPROVED): COORDINATOR,
    (Status.APPROVED, Status.CERTIFIED): {SYSTEM},
}

# Moves that must come with a written reason (FR-13 rejection, FR-31 withdrawal).
NEEDS_REASON = {
    Status.REJECTED: "يجب كتابة سبب الرفض.",
    Status.WITHDRAWN: "يجب كتابة سبب الانسحاب.",
}

# BR-02: a student can have only one active placement at a time.
ACTIVE_PLACEMENT = {Status.ASSIGNED, Status.IN_TRAINING}


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

    `role` is a user's role, or SYSTEM for automatic moves. `reason` is the note the
    reviewer writes; rejections and withdrawals require one.
    """
    if (current, target) not in TRANSITIONS:
        raise TransitionError(
            f"لا يمكن نقل الطلب من «{Status(current).label}» إلى «{Status(target).label}»."
        )
    if role not in TRANSITIONS[(current, target)]:
        raise TransitionError("ليس لديك صلاحية لهذا التغيير.")
    if target in NEEDS_REASON and not reason.strip():
        raise TransitionError(NEEDS_REASON[target])
