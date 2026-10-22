from django.db import models

# Create your models here.
from django.conf import settings
from django.db import models


class Provider(models.Model):
    class Status(models.TextChoices):
        APPROVED = "approved", "معتمدة"
        SUSPENDED = "suspended", "موقوفة"

    name = models.CharField("الاسم", max_length=200)
    sector = models.CharField("القطاع", max_length=100)
    city = models.CharField("المدينة", max_length=100)
    address = models.CharField("العنوان", max_length=255, blank=True)

    contact_name = models.CharField("مسؤول التواصل", max_length=150)
    contact_phone = models.CharField("هاتف التواصل", max_length=30)
    contact_email = models.EmailField("بريد التواصل", blank=True)

    capacity = models.PositiveIntegerField("الطاقة الاستيعابية", default=1)
    status = models.CharField(
        "الحالة", max_length=20, choices=Status.choices, default=Status.APPROVED
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="provider_profile",
        verbose_name="حساب الجهة",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "جهة تدريب"
        verbose_name_plural = "جهات التدريب"
        ordering = ["name"]

    def __str__(self):
        return self.name