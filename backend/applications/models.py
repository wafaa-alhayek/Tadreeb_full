from django.conf import settings
from django.db import models, transaction
from django.utils import timezone

from accounts.validators import validate_upload

from .status import SYSTEM, Status, check_transition

# After one of these the application is finished, and the student may start a new one.
CLOSED_STATUSES = [Status.REJECTED, Status.WITHDRAWN]


class Application(models.Model):
    """A student's training application, from the first draft to the certificate (SRS 2.5)."""

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications"
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    # The latest reason given with a status change (rejection, withdrawal, changes requested).
    status_reason = models.TextField(blank=True)
    # FR-18: the one academic supervisor following this student; set during allocation.
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="supervised_applications",
    )
    submitted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["student"],
                condition=~models.Q(status__in=CLOSED_STATUSES),
                name="one_open_application_per_student",
            )
        ]

    def __str__(self):
        return f"طلب {self.student.username} ({self.get_status_display()})"

    @property
    def is_editable(self):
        """Section 2.5: once submitted the application is locked, unless sent back for changes."""
        return self.status in (Status.DRAFT, Status.NEEDS_CHANGES)

    @property
    def active_placement(self):
        return self.placements.filter(is_active=True).select_related("opportunity__provider").first()

    def move_to(self, target, user=None, reason=""):
        """Change the status if the rules allow it, and record the change in the history.

        `user` is who made the change; None means the system did it automatically.
        Raises status.TransitionError if the change isn't allowed.
        """
        check_transition(self.status, target, user.role if user else SYSTEM, reason)
        with transaction.atomic():
            StatusChange.objects.create(
                application=self,
                from_status=self.status,
                to_status=target,
                changed_by=user,
                reason=reason,
            )
            self.status = target
            self.status_reason = reason
            if target == Status.SUBMITTED:
                self.submitted_at = timezone.now()
            self.save()


class Preference(models.Model):
    """FR-11 / BR-03: one of the opportunities a student ranks in their application."""

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="preferences"
    )
    opportunity = models.ForeignKey(
        "providers.Opportunity", on_delete=models.PROTECT, related_name="preferences"
    )
    rank = models.PositiveSmallIntegerField()  # 1 = first choice

    class Meta:
        ordering = ["rank"]
        constraints = [
            models.UniqueConstraint(fields=["application", "rank"], name="one_preference_per_rank"),
            models.UniqueConstraint(
                fields=["application", "opportunity"], name="opportunity_once_per_application"
            ),
        ]

    def __str__(self):
        return f"{self.rank}. {self.opportunity}"


class ApplicationDocument(models.Model):
    """FR-11: a file attached to an application (BR-08: PDF, JPG or PNG up to 5 MB)."""

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="documents"
    )
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to="applications/", validators=[validate_upload])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Placement(models.Model):
    """FR-14: where an allocated student actually trains.

    Its own table so that changing provider (FR-30) closes the old placement and opens a
    new one, keeping the old one's history and hours (D-12). One active placement per
    application, and so per student (BR-02).
    """

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="placements"
    )
    opportunity = models.ForeignKey(
        "providers.Opportunity", on_delete=models.PROTECT, related_name="placements"
    )
    start_date = models.DateField()
    end_date = models.DateField()  # FR-32 extensions change this
    # FR-16: the provider confirmed it accepts the student.
    provider_confirmed_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    close_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["application"],
                condition=models.Q(is_active=True),
                name="one_active_placement_per_application",
            )
        ]

    def __str__(self):
        return f"{self.application.student.username} @ {self.opportunity}"

    @property
    def provider(self):
        return self.opportunity.provider

    def close(self, reason):
        self.is_active = False
        self.closed_at = timezone.now()
        self.close_reason = reason
        self.save()


class ExceptionRequest(models.Model):
    """FR-30–33: something that breaks the normal path once the student is placed.

    - change_provider (FR-30): student asks, supervisor approves, coordinator confirms (D-12)
    - withdrawal (FR-31): student asks, supervisor approves
    - extension (FR-32): a new end date for the placement
    - issue (FR-33): a problem raised to the supervisor and tracked until closed
    The rules and what each decision does live in applications/exceptions.py.
    """

    class Kind(models.TextChoices):
        CHANGE_PROVIDER = "change_provider", "تغيير جهة التدريب"
        WITHDRAWAL = "withdrawal", "انسحاب من التدريب"
        EXTENSION = "extension", "تمديد فترة التدريب"
        ISSUE = "issue", "مشكلة أثناء التدريب"

    class State(models.TextChoices):
        PENDING = "pending", "بانتظار المشرف"
        SUPERVISOR_APPROVED = "supervisor_approved", "بانتظار تأكيد المنسق"  # change_provider only
        APPROVED = "approved", "تمت الموافقة"
        REJECTED = "rejected", "مرفوض"
        CLOSED = "closed", "مغلق"  # issue only

    OPEN_STATES = [State.PENDING, State.SUPERVISOR_APPROVED]

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="exception_requests"
    )
    kind = models.CharField(max_length=20, choices=Kind.choices)
    status = models.CharField(max_length=20, choices=State.choices, default=State.PENDING)
    requested_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="+"
    )
    reason = models.TextField()
    # change_provider: the student may suggest one; the coordinator picks the final one.
    new_opportunity = models.ForeignKey(
        "providers.Opportunity", on_delete=models.PROTECT, null=True, blank=True, related_name="+"
    )
    new_end_date = models.DateField(null=True, blank=True)  # extension
    decided_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="+"
    )
    decision_note = models.TextField(blank=True)
    decided_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["application", "kind"],
                condition=models.Q(status__in=["pending", "supervisor_approved"]),
                name="one_open_exception_per_kind",
            )
        ]

    def __str__(self):
        return f"{self.get_kind_display()}: {self.application.student.username}"

    @property
    def is_open(self):
        return self.status in self.OPEN_STATES


class StatusChange(models.Model):
    """One step in an application's history: the student's timeline (FR-12) and a record (FR-40)."""

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="history"
    )
    from_status = models.CharField(max_length=20, choices=Status.choices)
    to_status = models.CharField(max_length=20, choices=Status.choices)
    # None when the system made the change automatically.
    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at", "id"]

    def __str__(self):
        return f"{self.get_from_status_display()} → {self.get_to_status_display()}"
