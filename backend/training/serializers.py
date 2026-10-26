from django.utils import timezone
from rest_framework import serializers

from applications.status import Status

from .models import DailyLog


class DailyLogSerializer(serializers.ModelSerializer):
    """FR-20: the student writes a training day on their own application."""

    class Meta:
        model = DailyLog
        fields = [
            "id",
            "application",
            "date",
            "hours",
            "tasks",
            "notes",
            "confirmed_at",
            "created_at",
        ]
        # The provider confirms a day (BR-05); the student can't set this.
        read_only_fields = ["confirmed_at", "created_at"]

    def validate_application(self, application):
        user = self.context["request"].user
        if application.student_id != user.id:
            raise serializers.ValidationError("هذا الطلب ليس طلبك.")
        if application.status != Status.IN_TRAINING:
            raise serializers.ValidationError(
                "السجل اليومي يُفتح فقط عندما يكون الطلب «قيد التدريب»."
            )
        return application

    def validate_date(self, value):
        if value > timezone.localdate():
            raise serializers.ValidationError("لا يمكن تسجيل يوم في المستقبل.")
        return value