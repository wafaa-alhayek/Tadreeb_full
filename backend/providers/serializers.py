from rest_framework import serializers

from .models import Opportunity, Provider


class ProviderSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    accepted_specialization_names = serializers.SlugRelatedField(
        source="accepted_specializations", slug_field="name", many=True, read_only=True
    )

    class Meta:
        model = Provider
        fields = [
            "id",
            "name",
            "sector",
            "city",
            "address",
            "contact_name",
            "contact_phone",
            "contact_email",
            "capacity",
            "accepted_specializations",
            "accepted_specialization_names",
            "status",
            "status_display",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class OpportunitySerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source="provider.name", read_only=True)
    specialization_name = serializers.CharField(source="specialization.name", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    free_seats = serializers.SerializerMethodField()

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "provider",
            "provider_name",
            "specialization",
            "specialization_name",
            "description",
            "tasks",
            "requirements",
            "seats",
            "free_seats",
            "start_date",
            "end_date",
            "location",
            "status",
            "status_display",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {"provider": {"required": False}}

    def get_free_seats(self, opportunity):
        return opportunity.free_seats()

    def validate(self, data):
        start = data.get("start_date", getattr(self.instance, "start_date", None))
        end = data.get("end_date", getattr(self.instance, "end_date", None))
        if start and end and end < start:
            raise serializers.ValidationError(
                {"end_date": "تاريخ النهاية لازم يكون بعد تاريخ البداية."}
            )
        return data