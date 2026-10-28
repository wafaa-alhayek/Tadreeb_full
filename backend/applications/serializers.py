from django.conf import settings
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from accounts.models import StudentProfile
from providers.models import Opportunity, Provider

from .models import (
    CLOSED_STATUSES,
    Application,
    ApplicationDocument,
    Placement,
    Preference,
    StatusChange,
)
from .status import allowed_next


def check_opportunities(student, opportunity_ids):
    """FR-11 / BR-03: up to N different opportunities that are open and match the student's
    specialization. Returns the opportunities in the student's order (first = rank 1)."""
    max_preferences = settings.TADREEB_MAX_PREFERENCES
    if len(opportunity_ids) > max_preferences:
        raise serializers.ValidationError(f"يمكنك اختيار {max_preferences} فرص كحد أقصى.")
    if len(set(opportunity_ids)) != len(opportunity_ids):
        raise serializers.ValidationError("لا يمكن اختيار نفس الفرصة مرتين.")

    found = Opportunity.objects.filter(
        id__in=opportunity_ids,
        status=Opportunity.Status.OPEN,
        provider__status=Provider.Status.APPROVED,
    ).in_bulk()
    missing = [i for i in opportunity_ids if i not in found]
    if missing:
        raise serializers.ValidationError(f"هذه الفرص غير متاحة: {missing}")

    profile = StudentProfile.objects.filter(user=student).first()
    if profile and profile.specialization_id:
        other = [i for i in opportunity_ids if found[i].specialization_id != profile.specialization_id]
        if other:
            raise serializers.ValidationError(f"هذه الفرص ليست لتخصصك: {other}")

    return [found[i] for i in opportunity_ids]


class PreferenceSerializer(serializers.ModelSerializer):
    opportunity_title = serializers.CharField(source="opportunity.title", read_only=True)
    provider_name = serializers.CharField(source="opportunity.provider.name", read_only=True)

    class Meta:
        model = Preference
        fields = ["rank", "opportunity", "opportunity_title", "provider_name"]


class ApplicationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationDocument
        fields = ["id", "application", "title", "file", "uploaded_at"]
        read_only_fields = ["id", "uploaded_at"]

    def validate_application(self, application):
        if application.student != self.context["request"].user:
            raise serializers.ValidationError("هذا الطلب ليس لك.")
        if not application.is_editable:
            raise serializers.ValidationError("لا يمكن تعديل الطلب بعد إرساله.")
        return application


class StatusChangeSerializer(serializers.ModelSerializer):
    to_status_display = serializers.CharField(source="get_to_status_display", read_only=True)

    class Meta:
        model = StatusChange
        fields = ["from_status", "to_status", "to_status_display", "reason", "created_at"]


class PlacementSerializer(serializers.ModelSerializer):
    opportunity_title = serializers.CharField(source="opportunity.title", read_only=True)
    provider_name = serializers.CharField(source="opportunity.provider.name", read_only=True)

    class Meta:
        model = Placement
        fields = [
            "id",
            "opportunity",
            "opportunity_title",
            "provider_name",
            "start_date",
            "end_date",
            "provider_confirmed_at",
            "closed_at",
            "close_reason",
            "is_active",
        ]
        read_only_fields = fields


class ApplicationSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    preferences = PreferenceSerializer(many=True, read_only=True)
    # What the student sends: opportunity ids in order of preference, e.g. [7, 3, 12].
    opportunity_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    documents = ApplicationDocumentSerializer(many=True, read_only=True)
    history = StatusChangeSerializer(many=True, read_only=True)
    placements = PlacementSerializer(many=True, read_only=True)
    allowed_actions = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            "id",
            "status",
            "status_display",
            "status_reason",
            "preferences",
            "opportunity_ids",
            "documents",
            "history",
            "placements",
            "allowed_actions",
            "submitted_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["status", "status_reason", "submitted_at", "created_at", "updated_at"]

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_allowed_actions(self, application):
        """The statuses the requester may move this application to (which buttons to show)."""
        return allowed_next(application.status, self.context["request"].user.role)

    def validate_opportunity_ids(self, opportunity_ids):
        return check_opportunities(self.context["request"].user, opportunity_ids)

    def validate(self, attrs):
        if self.instance and not self.instance.is_editable:
            raise serializers.ValidationError("لا يمكن تعديل الطلب بعد إرساله.")
        return attrs

    def create(self, validated_data):
        student = self.context["request"].user
        if student.applications.exclude(status__in=CLOSED_STATUSES).exists():
            raise serializers.ValidationError("لديك طلب مفتوح بالفعل.")
        opportunities = validated_data.pop("opportunity_ids", [])
        application = Application.objects.create(student=student)
        self._save_preferences(application, opportunities)
        return application

    def update(self, application, validated_data):
        if "opportunity_ids" in validated_data:
            self._save_preferences(application, validated_data.pop("opportunity_ids"))
        application.save()  # refreshes updated_at
        return application

    def _save_preferences(self, application, opportunities):
        application.preferences.all().delete()
        Preference.objects.bulk_create(
            Preference(application=application, opportunity=opportunity, rank=rank)
            for rank, opportunity in enumerate(opportunities, start=1)
        )
