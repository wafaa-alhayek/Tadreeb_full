from django.conf import settings
from django.core.exceptions import ValidationError
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

    accepted_specializations = models.ManyToManyField(
        "accounts.Specialization",
        blank=True,
        related_name="providers",
        verbose_name="التخصصات المقبولة",
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


class Opportunity(models.Model):
    """FR-09: a training opportunity published by a provider or the coordinator."""

    class Status(models.TextChoices):
        OPEN = "open", "متاحة"
        CLOSED = "closed", "مغلقة"

    provider = models.ForeignKey(
        Provider,
        on_delete=models.CASCADE,
        related_name="opportunities",
        verbose_name="جهة التدريب",
    )
    specialization = models.ForeignKey(
        "accounts.Specialization",
        on_delete=models.PROTECT,
        related_name="opportunities",
        verbose_name="التخصص المطلوب",
    )

    title = models.CharField("عنوان الفرصة", max_length=200)
    description = models.TextField("الوصف", blank=True)
    tasks = models.TextField("المهام")
    requirements = models.TextField("الشروط", blank=True)

    seats = models.PositiveIntegerField("عدد المقاعد", default=1)
    start_date = models.DateField("تاريخ البداية")
    end_date = models.DateField("تاريخ النهاية")
    location = models.CharField("موقع التدريب", max_length=200)

    status = models.CharField(
        "الحالة", max_length=20, choices=Status.choices, default=Status.OPEN
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "فرصة تدريب"
        verbose_name_plural = "فرص التدريب"
        ordering = ["start_date"]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(end_date__gte=models.F("start_date")),
                name="opportunity_ends_after_it_starts",
            )
        ]

    def clean(self):
        if self.start_date and self.end_date and self.end_date < self.start_date:
            raise ValidationError({"end_date": "تاريخ النهاية لازم يكون بعد تاريخ البداية."})

    def free_seats(self):
        return max(self.seats - self.placements.filter(is_active=True).count(), 0)

    def __str__(self):
        return f"{self.title} - {self.provider}"