from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.models import User
from accounts.permissions import HasRole, IsStudent, IsSupervisor

from .models import DailyLog, TrainingPlan, Visit
from .serializers import DailyLogSerializer, TrainingPlanSerializer, VisitSerializer


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


class IsStudentOrSupervisor(HasRole):
    roles = (User.Role.STUDENT, User.Role.SUPERVISOR)


class TrainingPlanViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """/api/training-plans/: the student's weekly goals, approved by the supervisor (FR-19)."""

    serializer_class = TrainingPlanSerializer
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_permissions(self):
        if self.action == "approve":
            return [IsSupervisor()]
        if self.action in ("create", "update", "partial_update", "submit"):
            return [IsStudent()]
        return [IsStudentOrSupervisor()]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return TrainingPlan.objects.none()
        plans = TrainingPlan.objects.prefetch_related("goals").order_by("-created_at")
        user = self.request.user
        if user.role == User.Role.SUPERVISOR:
            # The supervisor sees the plans of their own students, once they are sent.
            return plans.filter(application__supervisor=user).exclude(
                status=TrainingPlan.Status.DRAFT
            )
        return plans.filter(application__student=user)

    def perform_update(self, serializer):
        if serializer.instance.status != TrainingPlan.Status.DRAFT:
            raise serializers.ValidationError("لا يمكن تعديل الخطة بعد إرسالها.")
        serializer.save()

    @extend_schema(request=None, responses=TrainingPlanSerializer)
    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        """POST /api/training-plans/<id>/submit/: send the plan to the supervisor."""
        plan = self.get_object()
        if plan.status != TrainingPlan.Status.DRAFT:
            raise serializers.ValidationError("أُرسلت هذه الخطة من قبل.")
        plan.status = TrainingPlan.Status.SUBMITTED
        plan.save()
        return Response(self.get_serializer(plan).data)

    @extend_schema(request=None, responses=TrainingPlanSerializer)
    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        """POST /api/training-plans/<id>/approve/: the supervisor approves the plan."""
        plan = self.get_object()
        if plan.status != TrainingPlan.Status.SUBMITTED:
            raise serializers.ValidationError("تُعتمد الخطة بعد أن يرسلها الطالب.")
        plan.status = TrainingPlan.Status.APPROVED
        plan.approved_at = timezone.now()
        plan.approved_by = request.user
        plan.save()
        return Response(self.get_serializer(plan).data)


class VisitViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """/api/visits/: the supervisor records field visits; the student can read theirs (FR-24)."""

    serializer_class = VisitSerializer
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update"):
            return [IsSupervisor()]
        return [IsStudentOrSupervisor()]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Visit.objects.none()
        user = self.request.user
        if user.role == User.Role.SUPERVISOR:
            return Visit.objects.filter(application__supervisor=user)
        return Visit.objects.filter(application__student=user)

    def perform_create(self, serializer):
        serializer.save(supervisor=self.request.user)