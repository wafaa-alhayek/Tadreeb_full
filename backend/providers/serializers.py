from rest_framework import serializers

from .models import Provider


class ProviderSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)

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
            "status",
            "status_display",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]