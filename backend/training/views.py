from rest_framework import serializers, viewsets

from accounts.permissions import IsStudent

from .models import DailyLog
from .serializers import DailyLogSerializer


class DailyLogViewSet(viewsets.ModelViewSet):
    """/api/daily-logs/: a student writes the days of their own training (FR-20)."""

    serializer_class = DailyLogSerializer
    permission_classes = [IsStudent]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return DailyLog.objects.none()
        return DailyLog.objects.filter(application__student=self.request.user)

    def perform_update(self, serializer):
        # BR-05: once the provider confirmed the day, the student can't change it.
        if serializer.instance.confirmed_at:
            raise serializers.ValidationError("لا يمكن تعديل يوم أكدته الجهة.")
        serializer.save()

    def perform_destroy(self, log):
        if log.confirmed_at:
            raise serializers.ValidationError("لا يمكن حذف يوم أكدته الجهة.")
        log.delete()