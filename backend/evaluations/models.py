from decimal import Decimal

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# FR-25 / FR-26: the criteria of each evaluation, each scored 1–5. The keys are the ones the
# front-end evaluation page uses (frontend/src/pages/admin/StudentEvaluation.jsx).
PROVIDER_CRITERIA = {
    "attendance": "الالتزام بالحضور",
    "punctuality": "الالتزام بالمواعيد",
    "tasks": "أداء المهام",
    "technical": "المهارات الفنية",
    "communication": "التواصل",
    "teamwork": "العمل الجماعي",
    "responsibility": "تحمل المسؤولية",
}
SUPERVISOR_CRITERIA = {
    "commitment": "مستوى الالتزام",
    "benefit": "الاستفادة من التدريب",
    "development": "التطور خلال فترة التدريب",
    "reports": "جودة التقارير",
    "goals": "تحقيق أهداف التدريب",
}
MAX_SCORE = 5


class Evaluation(models.Model):
    """FR-25 (provider) and FR-26 (academic supervisor): one evaluation of each kind per application."""

    class Kind(models.TextChoices):
        PROVIDER = "provider", "جهة التدريب"
        SUPERVISOR = "supervisor", "المشرف الأكاديمي"

    CRITERIA = {Kind.PROVIDER: PROVIDER_CRITERIA, Kind.SUPERVISOR: SUPERVISOR_CRITERIA}

    application = models.ForeignKey(
        "applications.Application", on_delete=models.CASCADE, related_name="evaluations"
    )
    kind = models.CharField(max_length=20, choices=Kind.choices)
    evaluator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="evaluations_given"
    )
    scores = models.JSONField(default=dict)  # {"attendance": 5, ...}
    notes = models.TextField(blank=True)
    # Out of 100, worked out from the scores on save; it's this evaluation's share of BR-04.
    total = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal("0"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at", "-id"]
        constraints = [
            models.UniqueConstraint(fields=["application", "kind"], name="one_evaluation_per_kind")
        ]

    def __str__(self):
        return f"{self.get_kind_display()} - {self.application}"

    def save(self, *args, **kwargs):
        criteria = self.CRITERIA[self.kind]
        earned = sum(self.scores.get(key, 0) for key in criteria)
        self.total = (Decimal(earned) * 100 / (MAX_SCORE * len(criteria))).quantize(Decimal("0.01"))
        super().save(*args, **kwargs)


class ProviderRating(models.Model):
    """FR-29: the student rates the provider they trained at, once, after the training."""

    application = models.OneToOneField(
        "applications.Application", on_delete=models.CASCADE, related_name="provider_rating"
    )
    # Kept here so a provider's average doesn't change after a change of provider (FR-30).
    provider = models.ForeignKey("providers.Provider", on_delete=models.CASCADE, related_name="ratings")
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return f"{self.provider} - {self.rating}/5"
