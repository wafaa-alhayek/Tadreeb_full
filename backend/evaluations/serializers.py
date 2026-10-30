from rest_framework import serializers

from accounts.models import User
from applications.status import Status

from .models import MAX_SCORE, Evaluation, ProviderRating

# FR-25 / FR-26: evaluating happens during and after the training, and stops at approval.
EVALUATION_STATUSES = {Status.IN_TRAINING, Status.COMPLETED}
# FR-29: the student rates the provider once the training is over.
RATING_STATUSES = {Status.COMPLETED, Status.APPROVED, Status.CERTIFIED}


def can_evaluate(user, application):
    """The provider of the active placement, or the application's academic supervisor."""
    if user.role == User.Role.SUPERVISOR:
        return application.supervisor_id == user.id
    if user.role == User.Role.PROVIDER:
        placement = application.active_placement
        return placement is not None and placement.provider.user_id == user.id
    return False


def kind_for(user):
    """The evaluation kind follows the evaluator's role."""
    return Evaluation.Kind.PROVIDER if user.role == User.Role.PROVIDER else Evaluation.Kind.SUPERVISOR


class EvaluationSerializer(serializers.ModelSerializer):
    kind_display = serializers.CharField(source="get_kind_display", read_only=True)
    evaluator_name = serializers.SerializerMethodField()
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = [
            "id",
            "application",
            "student_name",
            "kind",
            "kind_display",
            "evaluator",
            "evaluator_name",
            "scores",
            "notes",
            "total",
            "created_at",
            "updated_at",
        ]
        # The kind comes from the evaluator's role; the total from the scores.
        read_only_fields = ["kind", "evaluator", "total", "created_at", "updated_at"]

    def get_evaluator_name(self, evaluation) -> str:
        user = evaluation.evaluator
        return (user.get_full_name() or user.username) if user else ""

    def get_student_name(self, evaluation) -> str:
        student = evaluation.application.student
        return student.get_full_name() or student.username

    def validate_application(self, application):
        if self.instance is not None and application != self.instance.application:
            raise serializers.ValidationError("لا يمكن نقل التقييم لطلب آخر.")
        user = self.context["request"].user
        if not can_evaluate(user, application):
            raise serializers.ValidationError("لا يمكنك تقييم هذا الطالب.")
        if application.status not in EVALUATION_STATUSES:
            raise serializers.ValidationError("التقييم متاح أثناء التدريب وبعد اكتماله وقبل اعتماده فقط.")
        if self.instance is None and application.evaluations.filter(kind=kind_for(user)).exists():
            raise serializers.ValidationError("قيّمت هذا الطالب من قبل؛ عدّل التقييم الموجود.")
        return application

    def validate(self, data):
        if self.instance is not None and "application" not in data:
            # A PATCH without the application still has to respect the rules above.
            self.validate_application(self.instance.application)
        if "scores" in data or self.instance is None:
            kind = self.instance.kind if self.instance else kind_for(self.context["request"].user)
            data["scores"] = clean_scores(data.get("scores"), Evaluation.CRITERIA[kind])
        return data


def clean_scores(scores, criteria):
    """Exactly the criteria of the kind, each a whole number from 1 to 5."""
    if not isinstance(scores, dict) or set(scores) != set(criteria):
        raise serializers.ValidationError({"scores": f"أرسل درجة لكل معيار: {', '.join(criteria)}"})
    for key, value in scores.items():
        if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= MAX_SCORE:
            raise serializers.ValidationError(
                {"scores": f"«{criteria[key]}»: الدرجة رقم صحيح من 1 إلى {MAX_SCORE}."}
            )
    return scores


class FinalGradeSerializer(serializers.Serializer):
    """FR-27 / BR-04: each part out of 100, the weights, and the weighted total."""

    application = serializers.IntegerField()
    provider = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    supervisor = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    reports = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    weights = serializers.DictField(child=serializers.IntegerField())
    total = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    pass_grade = serializers.IntegerField()
    passed = serializers.BooleanField(allow_null=True)
    missing = serializers.ListField(child=serializers.CharField())


class ProviderRatingSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source="provider.name", read_only=True)

    class Meta:
        model = ProviderRating
        fields = ["id", "application", "provider", "provider_name", "rating", "comment", "created_at"]
        read_only_fields = ["provider", "created_at"]

    def validate_application(self, application):
        if application.student_id != self.context["request"].user.id:
            raise serializers.ValidationError("هذا الطلب ليس طلبك.")
        if application.status not in RATING_STATUSES:
            raise serializers.ValidationError("يمكنك تقييم جهة التدريب بعد اكتمال تدريبك.")
        if ProviderRating.objects.filter(application=application).exists():
            raise serializers.ValidationError("قيّمت جهة التدريب من قبل.")
        if not application.placements.exists():
            raise serializers.ValidationError("لا يوجد توزيع تدريب لهذا الطلب.")
        return application

    def create(self, validated_data):
        # After a change of provider (FR-30) the student rates the last one.
        last = (
            validated_data["application"]
            .placements.select_related("opportunity__provider")
            .order_by("start_date", "id")
            .last()
        )
        validated_data["provider"] = last.opportunity.provider
        return super().create(validated_data)
