import uuid

from django.conf import settings
from django.db import models


class Certificate(models.Model):
    """FR-34 / BR-07: the training certificate, issued once the coordinator approves the training.

    The student's details are copied in when it is issued, so the public check (FR-35) shows
    what was certified even if the records change later. A certificate is never deleted;
    a wrong one is revoked.
    """

    application = models.OneToOneField(
        "applications.Application", on_delete=models.PROTECT, related_name="certificate"
    )
    serial_number = models.CharField(max_length=30, unique=True)
    # Goes in the QR code; random so certificates can't be found by guessing.
    verification_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    student_name = models.CharField(max_length=200)
    university_id = models.CharField(max_length=150)
    specialization = models.CharField(max_length=200, blank=True)
    provider_name = models.CharField(max_length=200)
    opportunity_title = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    total_hours = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    issued_at = models.DateTimeField(auto_now_add=True)
    issued_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="issued_certificates",
    )
    revoked_at = models.DateTimeField(null=True, blank=True)
    revoke_reason = models.TextField(blank=True)
    revoked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="revoked_certificates",
    )

    class Meta:
        ordering = ["-issued_at", "-id"]

    def __str__(self):
        return f"{self.serial_number} - {self.student_name}"

    @property
    def is_valid(self):
        return self.revoked_at is None
