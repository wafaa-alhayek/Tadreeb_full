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


class Placement(models.Model):
    """A training placement; closed placements remain as historical records (FR-14, FR-30)."""

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="placements"
    )
    opportunity = models.ForeignKey(
        "providers.Opportunity", on_delete=models.PROTECT, related_name="placements"
    )
    start_date = models.DateField()
    end_date = models.DateField()
    provider_confirmed_at = models.DateTimeField(null=True, blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    close_reason = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-start_date", "-id"]
        constraints = [
            models.UniqueConstraint(
                fields=["application"],
                condition=models.Q(is_active=True),
                name="one_active_placement_per_application",
            ),
            models.CheckConstraint(
                condition=models.Q(end_date__gte=models.F("start_date")),
                name="placement_ends_after_it_starts",
            ),
        ]

    def __str__(self):
        return f"{self.application} - {self.opportunity}"
