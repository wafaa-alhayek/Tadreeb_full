from django.db import transaction
from django.db.models import F
from django.utils import timezone
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema, inline_serializer
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.models import User
from applications.models import Application
from accounts.permissions import HasRole, IsProvider, IsStudent, IsSupervisor
from applications.status import Status
from audit.models import AuditLog, diff, log_action, snapshot
from evaluations.grades import is_ready, notify_if_ready
from notifications.models import Notification, notify

from .models import DailyLog, Report, TrainingPlan, Visit, complete_if_done, confirmed_hours, required_hours
from .serializers import (
    GRADES_LOCKED,
    DailyLogSerializer,
    ProviderDailyLogSerializer,
    ReportGradeSerializer,
    ReportSerializer,
    TrainingPlanSerializer,
    VisitSerializer,
)


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

    @extend_schema(
        parameters=[OpenApiParameter("application", int, required=True)],
        responses=inline_serializer(
            "TrainingProgress",
            {
                "confirmed_hours": serializers.DecimalField(max_digits=7, decimal_places=2),
                "required_hours": serializers.IntegerField(),
                "remaining_hours": serializers.DecimalField(max_digits=7, decimal_places=2),
                "percent": serializers.IntegerField(),
            },
        ),
    )
    @action(detail=False, methods=["get"])
    def progress(self, request):
        """GET /api/daily-logs/progress/?application=3: confirmed hours out of the department's (BR-06)."""
        application_id = request.query_params.get("application", "")
        if not application_id.isdigit():
            raise serializers.ValidationError({"application": "أرسل رقم الطلب."})
        application = get_object_or_404(Application, pk=application_id, student=request.user)
        done, required = confirmed_hours(application), required_hours(application)
        return Response(
            {
                "confirmed_hours": done,
                "required_hours": required,
                "remaining_hours": max(required - done, 0),
                "percent": min(int(done * 100 / required), 100),
            }
        )


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
    """/api/visits/: the supervisor records field visits of their own students (FR-24)."""

    serializer_class = VisitSerializer
    permission_classes = [IsSupervisor]
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Visit.objects.none()
        return Visit.objects.filter(application__supervisor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(supervisor=self.request.user)


class ProviderDailyLogViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """/api/provider-daily-logs/: the provider confirms the days its trainees wrote (BR-05).

    A provider sees the days that fall inside one of its placements, so the days before a
    change of provider (FR-30) stay with the provider that hosted them.
    """

    serializer_class = ProviderDailyLogSerializer
    permission_classes = [IsProvider]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return DailyLog.objects.none()
        logs = DailyLog.objects.filter(
            application__placements__opportunity__provider__user=self.request.user,
            date__gte=F("application__placements__start_date"),
            date__lte=F("application__placements__end_date"),
        ).select_related("application__student").distinct()
        confirmed = self.request.query_params.get("confirmed")
        if confirmed in ("true", "false"):
            logs = logs.filter(confirmed_at__isnull=confirmed == "false")
        return logs

    @extend_schema(request=None, responses=ProviderDailyLogSerializer)
    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        """POST /api/provider-daily-logs/<id>/confirm/: the provider confirms the day."""
        log = self.get_object()
        if log.confirmed_at:
            raise serializers.ValidationError("تم تأكيد هذا اليوم من قبل.")
        if log.application.status != Status.IN_TRAINING:
            raise serializers.ValidationError("يُؤكَّد الحضور فقط والطالب «قيد التدريب».")
        before = snapshot(log)
        with transaction.atomic():
            log.confirmed_at = timezone.now()
            log.confirmed_by = request.user
            log.save()
            log_action(request, AuditLog.Action.UPDATE, log, diff(before, snapshot(log)))
            if complete_if_done(log.application):
                # The evaluations may already be in, so it can be approved right away.
                notify_if_ready(log.application, was_ready=False)
        return Response(self.get_serializer(log).data)


class CanSeeReports(HasRole):
    roles = (User.Role.STUDENT, User.Role.SUPERVISOR, User.Role.COORDINATOR, User.Role.ADMIN)


class ReportViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """/api/reports/: training reports (FR-23).

    The student uploads (multipart) and may delete a report until it is graded; the
    academic supervisor comments and grades; the coordinator and admin read them all.
    """

    serializer_class = ReportSerializer

    def get_permissions(self):
        if self.action in ("create", "destroy"):
            return [IsStudent()]
        if self.action == "grade":
            return [IsSupervisor()]
        return [CanSeeReports()]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Report.objects.none()
        reports = Report.objects.select_related("application__student")
        user = self.request.user
        if user.role == User.Role.STUDENT:
            reports = reports.filter(application__student=user)
        elif user.role == User.Role.SUPERVISOR:
            reports = reports.filter(application__supervisor=user)
        if self.request.query_params.get("application", "").isdigit():
            reports = reports.filter(application_id=self.request.query_params["application"])
        return reports

    def perform_create(self, serializer):
        report = serializer.save()
        supervisor = report.application.supervisor
        if supervisor:
            student = report.application.student
            notify(
                supervisor,
                Notification.Kind.REPORT,
                "تقرير تدريب جديد",
                f"{student.get_full_name() or student.username}: {report.title}",
            )

    def perform_destroy(self, report):
        if report.graded_at:
            raise serializers.ValidationError("لا يمكن حذف تقرير تم تقييمه.")
        report.file.delete(save=False)
        report.delete()

    @extend_schema(request=ReportGradeSerializer, responses=ReportSerializer)
    @action(detail=True, methods=["post"])
    def grade(self, request, pk=None):
        """POST /api/reports/<id>/grade/: the supervisor grades the report out of 100."""
        report = self.get_object()
        if report.application.status in GRADES_LOCKED:
            raise serializers.ValidationError("لا يمكن تعديل الدرجة بعد اعتماد التدريب.")
        data = ReportGradeSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        before = snapshot(report)
        was_ready = is_ready(report.application)
        report.grade = data.validated_data["grade"]
        report.supervisor_comment = data.validated_data["supervisor_comment"]
        report.graded_at = timezone.now()
        report.graded_by = request.user
        report.save()
        log_action(request, AuditLog.Action.UPDATE, report, diff(before, snapshot(report)))
        notify(
            report.application.student,
            Notification.Kind.REPORT,
            "تم تقييم تقريرك",
            f"{report.title}: {report.grade}/100",
        )
        notify_if_ready(report.application, was_ready)
        return Response(self.get_serializer(report).data)