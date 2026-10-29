from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema, inline_serializer
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.eligibility import check_eligibility
from accounts.models import StudentProfile, User
from accounts.permissions import HasRole, IsProvider, IsStudent

from . import exceptions, workflow
from .models import Application, ApplicationDocument, ExceptionRequest
from .serializers import (
    ApplicationDocumentSerializer,
    ApplicationSerializer,
    ExceptionRequestSerializer,
    check_opportunities,
)
from .status import Status


class IsReviewer(HasRole):
    """Section 2.2: review and allocate applications."""

    roles = (User.Role.SUPERVISOR, User.Role.COORDINATOR)


class IsTrainingCoordinator(HasRole):
    """FR-18: only the coordinator links students to supervisors."""

    roles = (User.Role.COORDINATOR,)


# The review moves that need nothing but an optional reason. Allocation has its own action
# because it also needs an opportunity.
REVIEW_TARGETS = [
    Status.UNDER_REVIEW,
    Status.ACCEPTED,
    Status.REJECTED,
    Status.NEEDS_CHANGES,
    Status.WITHDRAWN,
]


class ApplicationViewSet(viewsets.ModelViewSet):
    """/api/applications/: one endpoint, and each role sees only what Section 2.2 allows.

    - student: builds, edits and submits their own application (FR-11, FR-12)
    - supervisor: the students assigned to them (FR-13, FR-14)
    - coordinator: every submitted application; assigns supervisors (FR-18)
    - provider: the students allocated to it (FR-16, NFR-18)
    - admin: read only
    Drafts are visible to the student only (Section 2.5). Filter: ?status=submitted
    """

    serializer_class = ApplicationSerializer
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Application.objects.none()

        user = self.request.user
        applications = Application.objects.select_related("student", "supervisor").prefetch_related(
            "preferences__opportunity__provider", "documents", "history"
        )
        if user.role == User.Role.STUDENT:
            applications = applications.filter(student=user)
        else:
            applications = applications.exclude(status=Status.DRAFT)
            if user.role == User.Role.SUPERVISOR:
                applications = applications.filter(supervisor=user)
            elif user.role == User.Role.PROVIDER:
                # Only where the student trains now: not after they move (FR-30) or withdraw.
                applications = applications.filter(
                    placements__opportunity__provider__user=user, placements__is_active=True
                ).distinct()
            elif user.role not in (User.Role.COORDINATOR, User.Role.ADMIN):
                applications = applications.none()

        status = self.request.query_params.get("status")
        if status:
            applications = applications.filter(status=status)
        return applications

    def get_permissions(self):
        if self.action in ("create", "partial_update", "destroy", "submit"):
            return [IsStudent()]
        if self.action in ("transition", "allocate"):
            return [IsReviewer()]
        if self.action == "assign_supervisor":
            return [IsTrainingCoordinator()]
        if self.action == "confirm":
            return [IsProvider()]
        return [IsAuthenticated()]

    @extend_schema(parameters=[OpenApiParameter("status", str, description="e.g. submitted")])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_destroy(self, application):
        if application.status != Status.DRAFT:
            raise serializers.ValidationError("يمكن حذف المسودة فقط.")
        application.delete()

    def fresh(self, application):
        """The application reloaded, so the response shows the new history and placement."""
        return Response(self.get_serializer(self.get_queryset().get(pk=application.pk)).data)

    # --- student ---

    @extend_schema(request=None, responses=ApplicationSerializer)
    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        """POST /api/applications/<id>/submit/: send the application for review (FR-11)."""
        application = self.get_object()

        profile, _ = StudentProfile.objects.get_or_create(user=request.user)
        is_eligible, reasons = check_eligibility(profile)
        if not is_eligible:
            raise serializers.ValidationError({"eligibility": reasons})

        opportunity_ids = list(application.preferences.values_list("opportunity_id", flat=True))
        if not opportunity_ids:
            raise serializers.ValidationError("اختر فرصة تدريب واحدة على الأقل.")
        # An opportunity may have closed since the draft was saved.
        check_opportunities(request.user, opportunity_ids)

        workflow.change_status(request, application, Status.SUBMITTED)
        return self.fresh(application)

    # --- supervisor / coordinator ---

    @extend_schema(
        request=inline_serializer(
            "Transition",
            {
                "status": serializers.ChoiceField(choices=REVIEW_TARGETS),
                "reason": serializers.CharField(required=False, allow_blank=True),
            },
        ),
        responses=ApplicationSerializer,
    )
    @action(detail=True, methods=["post"])
    def transition(self, request, pk=None):
        """POST /api/applications/<id>/transition/: review moves (FR-13) and withdrawal (FR-31).

        {"status": "under_review" | "accepted" | "rejected" | "needs_changes" | "withdrawn",
         "reason": "..."}; rejection and withdrawal need a reason.
        """
        application = self.get_object()
        target = request.data.get("status")
        reason = request.data.get("reason", "")
        if target not in REVIEW_TARGETS:
            raise serializers.ValidationError({"status": f"اختر واحدة من: {', '.join(REVIEW_TARGETS)}"})

        if target == Status.WITHDRAWN:
            workflow.withdraw(request, application, reason)
        else:
            workflow.change_status(request, application, target, reason)
        return self.fresh(application)

    @extend_schema(
        request=inline_serializer("Allocate", {"opportunity": serializers.IntegerField()}),
        responses=ApplicationSerializer,
    )
    @action(detail=True, methods=["post"])
    def allocate(self, request, pk=None):
        """POST /api/applications/<id>/allocate/: place an accepted student (FR-14).

        {"opportunity": 7}. The opportunity must be open, match the student's specialization
        and have a free seat. It doesn't have to be one of the student's preferences.
        """
        application = self.get_object()
        workflow.allocate(request, application, request.data.get("opportunity"))
        return self.fresh(application)

    @extend_schema(
        request=inline_serializer("AssignSupervisor", {"supervisor": serializers.IntegerField()}),
        responses=ApplicationSerializer,
    )
    @action(detail=True, methods=["post"], url_path="assign-supervisor")
    def assign_supervisor(self, request, pk=None):
        """POST /api/applications/<id>/assign-supervisor/: {"supervisor": 4} (FR-18)."""
        application = self.get_object()
        supervisor = get_object_or_404(User, pk=request.data.get("supervisor"))
        workflow.assign_supervisor(request, application, supervisor)
        return self.fresh(application)

    # --- provider ---

    @extend_schema(request=None, responses=ApplicationSerializer)
    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        """POST /api/applications/<id>/confirm/: the provider accepts the allocated student (FR-16)."""
        application = self.get_object()
        workflow.confirm_placement(request, application)
        return self.fresh(application)


class ExceptionRequestViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """/api/exception-requests/: change of provider, withdrawal, extension, issue (FR-30–33).

    Who raises and who decides each kind: see applications/exceptions.py.
    - student: their own requests
    - supervisor: requests about their students
    - provider: the issues it raised
    - coordinator and admin: all
    Filters: ?status=pending  ?kind=issue  ?application=5
    """

    serializer_class = ExceptionRequestSerializer

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ExceptionRequest.objects.none()

        user = self.request.user
        requests = ExceptionRequest.objects.select_related(
            "application__student", "requested_by", "decided_by", "new_opportunity"
        )
        if user.role == User.Role.STUDENT:
            requests = requests.filter(application__student=user)
        elif user.role == User.Role.SUPERVISOR:
            requests = requests.filter(application__supervisor=user)
        elif user.role == User.Role.PROVIDER:
            requests = requests.filter(requested_by=user)
        elif user.role not in (User.Role.COORDINATOR, User.Role.ADMIN):
            requests = requests.none()

        for field in ("status", "kind", "application"):
            value = self.request.query_params.get(field)
            if value:
                requests = requests.filter(**{field: value})
        return requests

    def get_permissions(self):
        if self.action in ("approve", "reject", "close"):
            return [IsReviewer()]
        return [IsAuthenticated()]

    @extend_schema(
        parameters=[
            OpenApiParameter("status", str, description="e.g. pending"),
            OpenApiParameter("kind", str, description="change_provider | withdrawal | extension | issue"),
            OpenApiParameter("application", int),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        data = serializer.validated_data
        serializer.instance = exceptions.raise_request(
            self.request,
            data["application"],
            data["kind"],
            data["reason"],
            new_opportunity=data.get("new_opportunity"),
            new_end_date=data.get("new_end_date"),
        )

    def fresh(self, exception):
        return Response(self.get_serializer(self.get_queryset().get(pk=exception.pk)).data)

    @extend_schema(
        request=inline_serializer(
            "ApproveException",
            {
                "note": serializers.CharField(required=False, allow_blank=True),
                "opportunity": serializers.IntegerField(required=False),
            },
        ),
        responses=ExceptionRequestSerializer,
    )
    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        """POST /api/exception-requests/<id>/approve/: {"note": "..."}

        The coordinator confirming a provider change also sends {"opportunity": 7}, unless
        the student's suggested opportunity is fine.
        """
        exception = self.get_object()
        exceptions.approve(request, exception, request.data.get("note", ""), request.data.get("opportunity"))
        return self.fresh(exception)

    @extend_schema(
        request=inline_serializer("RejectException", {"note": serializers.CharField()}),
        responses=ExceptionRequestSerializer,
    )
    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        """POST /api/exception-requests/<id>/reject/: {"note": "why"} (a note is required)."""
        exception = self.get_object()
        exceptions.reject(request, exception, request.data.get("note", ""))
        return self.fresh(exception)

    @extend_schema(
        request=inline_serializer("CloseIssue", {"note": serializers.CharField(required=False, allow_blank=True)}),
        responses=ExceptionRequestSerializer,
    )
    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        """POST /api/exception-requests/<id>/close/: the supervisor closes an issue (FR-33)."""
        exception = self.get_object()
        exceptions.close(request, exception, request.data.get("note", ""))
        return self.fresh(exception)


class ApplicationDocumentViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """/api/application-documents/: attach files to your own draft (FR-11, BR-08)."""

    serializer_class = ApplicationDocumentSerializer
    permission_classes = [IsStudent]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ApplicationDocument.objects.none()
        return ApplicationDocument.objects.filter(application__student=self.request.user)

    def perform_destroy(self, document):
        if not document.application.is_editable:
            raise serializers.ValidationError("لا يمكن تعديل الطلب بعد إرساله.")
        document.file.delete(save=False)
        document.delete()
