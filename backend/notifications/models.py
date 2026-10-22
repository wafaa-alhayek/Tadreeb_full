from django.conf import settings
from django.db import models


class Notification(models.Model):
    """FR-38: a message shown to one user in their notifications list."""

    class Kind(models.TextChoices):
        # The front-end picks the icon from the kind.
        APPLICATION = "application", "طلب التدريب"
        TRAINING = "training", "التدريب"
        REPORT = "report", "التقارير"
        ANNOUNCEMENT = "announcement", "إعلان"

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications"
    )
    kind = models.CharField(max_length=20, choices=Kind.choices)
    title = models.CharField(max_length=200)
    message = models.TextField(blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]
        indexes = [models.Index(fields=["recipient", "is_read"])]

    def __str__(self):
        return f"{self.title} → {self.recipient}"


def notify(recipient, kind, title, message=""):
    """Create a notification. Other apps call this, e.g. when an application's status changes."""
    return Notification.objects.create(recipient=recipient, kind=kind, title=title, message=message)
