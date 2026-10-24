from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from accounts.eligibility import check_eligibility
from accounts.models import StudentProfile
from accounts.permissions import IsStudent

from .models import Application, ApplicationDocument
from .serializers import ApplicationDocumentSerializer, ApplicationSerializer, check_opportunities
from .status import Status, TransitionError


class ApplicationViewSet(viewsets.ModelViewSet):
    """/api/applications/: a student builds, edits and submits their own application (FR-11, FR-12).

    Reviewing and allocating (FR-13, FR-14) come in the next step.
    """

    serializer_class = ApplicationSerializer
    permission_classes = [IsStudent]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Application.objects.none()
        return Application.objects.filter(student=self.request.user).prefetch_related(
            "preferences__opportunity__provider", "documents", "history"
        )

    def perform_destroy(self, application):
        if application.status != Status.DRAFT:
            raise serializers.ValidationError("يمكن حذف المسودة فقط.")
        application.delete()

    @extend_schema(request=None, responses=ApplicationSerializer)
    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        """POST /api/applications/<id>/submit/: send the application for review."""
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

        try:
            application.move_to(Status.SUBMITTED, request.user)
        except TransitionError as error:
            raise serializers.ValidationError(str(error))
        # Reload so the response includes the new history entry, not the pre-fetched copy.
        return Response(self.get_serializer(self.get_object()).data)


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
