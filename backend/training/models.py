from decimal import Decimal

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class DailyLog(models.Model):
    """FR-20 / BR-05: one training day written by the student, then confirmed by the provider."""
    application = models.ForeignKey(
        "applications.Application", on_delete=models.CASCADE, related_name="daily_logs"
    )
    date = models.DateField()
    hours = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.25")), MaxValueValidator(Decimal("12"))],
    )
    tasks = models.TextField()
    notes = models.TextField(blank=True)

    # BR-05: the provider confirms each day; empty means not confirmed yet.
    confirmed_at = models.DateTimeField(null=True, blank=True)
    confirmed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="confirmed_daily_logs",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date"]
        constraints = [
            models.UniqueConstraint(fields=["application", "date"], name="one_log_per_day"),
        ]

    def __str__(self):
        return f"{self.application} - {self.date}"


class TrainingPlan(models.Model):
    """FR-19: the student's plan for the training, approved by the academic supervisor."""

    class Status(models.TextChoices):
        DRAFT = "draft", "مسودة"
        SUBMITTED = "submitted", "بانتظار الاعتماد"
        APPROVED = "approved", "معتمدة"

    application = models.OneToOneField(
        "applications.Application", on_delete=models.CASCADE, related_name="training_plan"
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    approved_at = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="approved_training_plans",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"خطة {self.application}"


class WeeklyGoal(models.Model):
    """One week of a training plan."""

    plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE, related_name="goals")
    week_number = models.PositiveSmallIntegerField()
    goal = models.TextField()

    class Meta:
        ordering = ["week_number"]
        constraints = [
            models.UniqueConstraint(fields=["plan", "week_number"], name="one_goal_per_week"),
        ]

    def __str__(self):
        return f"أسبوع {self.week_number}"
class Visit(models.Model):
    """FR-24: a field visit recorded by the academic supervisor."""

    application = models.ForeignKey(
        "applications.Application", on_delete=models.CASCADE, related_name="visits"
    )
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="field_visits",
    )
    date = models.DateField()
    notes = models.TextField()
    follow_up = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-id"]

    def __str__(self):
        return f"زيارة {self.application} - {self.date}"