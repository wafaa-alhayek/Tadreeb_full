from django.db import transaction
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema, inline_serializer
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.permissions import HasRole, IsStudent
from applications.models import Application
from audit.models import AuditLog, diff, log_action, snapshot
from notifications.models import Notification, notify

from .grades import final_grade, is_ready, notify_if_ready
from .models import Evaluation, ProviderRating
from .serializers import EvaluationSerializer, FinalGradeSerializer, ProviderRatingSerializer, kind_for


class IsEvaluator(HasRole):
    """Section 2.2 "Evaluate a student": the supervisor and the provider, each for their own students."""

    roles = (User.Role.SUPERVISOR, User.Role.PROVIDER)


def visible_applications(user):
    """The applications this user may follow, as in /api/applications/."""
    applications = Application.objects.all()
    if user.role == User.Role.STUDENT:
        return applications.filter(student=user)
    if user.role == User.Role.SUPERVISOR:
        return applications.filter(supervisor=user)
    if user.role == User.Role.PROVIDER:
        return applications.filter(placements__opportunity__provider__user=user).distinct()
    if user.role in (User.Role.COORDINATOR, User.Role.ADMIN):
        return applications
    return applications.none()


class EvaluationViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """/api/evaluations/: the provider's (FR-25) and the academic supervisor's (FR-26) evaluation.

    POST {"application": 3, "scores": {"attendance": 5, ...}, "notes": "..."}; the kind comes
    from the evaluator's role. Each evaluator edits their own with PATCH until approval.
    The student, the coordinator and the admin read. Filter: ?application=3
    """

    serializer_class = EvaluationSerializer
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_permissions(self):
        if self.action in ("create", "partial_update"):
            return [IsEvaluator()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Evaluation.objects.none()
        user = self.request.user
        evaluations = Evaluation.objects.select_related("application__student", "evaluator").filter(
            application__in=visible_applications(user)
        )
        if user.role == User.Role.PROVIDER:
            # A provider sees its own evaluations, not the supervisor's.
            evaluations = evaluations.filter(kind=Evaluation.Kind.PROVIDER, evaluator=user)
        if self.action == "partial_update":
            evaluations = evaluations.filter(evaluator=user)
        if self.request.query_params.get("application", "").isdigit():
            evaluations = evaluations.filter(application_id=self.request.query_params["application"])
        return evaluations

    def perform_create(self, serializer):
        application = serializer.validated_data["application"]
        was_ready = is_ready(application)
        with transaction.atomic():
            evaluation = serializer.save(evaluator=self.request.user, kind=kind_for(self.request.user))
            log_action(self.request, AuditLog.Action.CREATE, evaluation, diff(None, snapshot(evaluation)))
        notify(
            application.student,
            Notification.Kind.TRAINING,
            "تقييم جديد لتدريبك",
            f"تم تقييمك من {evaluation.get_kind_display()}.",
        )
        notify_if_ready(application, was_ready)

    def perform_update(self, serializer):
        was_ready = is_ready(serializer.instance.application)
        before = snapshot(serializer.instance)
        evaluation = serializer.save()
        log_action(self.request, AuditLog.Action.UPDATE, evaluation, diff(before, snapshot(evaluation)))
        notify_if_ready(evaluation.application, was_ready)

    @extend_schema(
        responses=inline_serializer(
            "EvaluationCriteria",
            {kind: serializers.DictField(child=serializers.CharField()) for kind in Evaluation.Kind.values},
        )
    )
    @action(detail=False, methods=["get"])
    def criteria(self, request):
        """GET /api/evaluations/criteria/: the criteria of each kind, each scored 1–5."""
        return Response(Evaluation.CRITERIA)

    @extend_schema(
        parameters=[OpenApiParameter("application", int, required=True)],
        responses=FinalGradeSerializer,
    )
    @action(detail=False, methods=["get"], url_path="final-grade")
    def final_grade(self, request):
        """GET /api/evaluations/final-grade/?application=3: the final grade (FR-27, BR-04).

        Provider 40% + supervisor 40% + reports 20%, pass at 60 (D-05, in settings).
        `total` stays null until every part exists; `missing` says which ones are left.
        """
        application_id = request.query_params.get("application", "")
        if not application_id.isdigit():
            raise serializers.ValidationError({"application": "أرسل رقم الطلب."})
        application = get_object_or_404(visible_applications(request.user), pk=application_id)
        return Response(FinalGradeSerializer({"application": application.pk, **final_grade(application)}).data)


class ProviderRatingViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """/api/provider-ratings/: the student rates the provider 1–5 after the training (FR-29).

    The provider sees its own ratings; supervisors their students'; coordinator and admin all.
    """

    serializer_class = ProviderRatingSerializer

    def get_permissions(self):
        if self.action == "create":
            return [IsStudent()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ProviderRating.objects.none()
        user = self.request.user
        ratings = ProviderRating.objects.select_related("provider")
        if user.role == User.Role.PROVIDER:
            return ratings.filter(provider__user=user)
        return ratings.filter(application__in=visible_applications(user))

    def perform_create(self, serializer):
        rating = serializer.save()
        log_action(self.request, AuditLog.Action.CREATE, rating, diff(None, snapshot(rating)))
