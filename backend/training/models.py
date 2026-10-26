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