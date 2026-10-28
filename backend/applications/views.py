from django.db import transaction
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from accounts.eligibility import check_eligibility
from accounts.models import StudentProfile, User
from accounts.permissions import HasRole, IsStudent
from notifications.models import Notification, notify
from providers.models import Opportunity, Provider

from .models import Application, ApplicationDocument, Placement
from .serializers import ApplicationDocumentSerializer, ApplicationSerializer, check_opportunities
from .status import Status, TransitionError


class IsReviewer(HasRole):
    roles = (User.Role.SUPERVISOR, User.Role.COORDINATOR)


class TransitionSerializer(serializers.Serializer):
    target_status = serializers.ChoiceField(choices=Status.choices)
    reason = serializers.CharField(required=False, allow_blank=True, default="")


class AllocationSerializer(serializers.Serializer):
    opportunity = serializers.PrimaryKeyRelatedField(queryset=Opportunity.objects.all())
    supervisor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.Role.SUPERVISOR, is_active=True), required=False
    )


class ApplicationViewSet(viewsets.ModelViewSet):
    """/api/applications/: a student builds, edits and submits their own application (FR-11, FR-12).

    Reviewer operations are provided by ApplicationReviewViewSet.
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


class ApplicationReviewViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """Reviewer-only application queue and assignment operations (FR-13, FR-14, FR-18)."""

    serializer_class = ApplicationSerializer
    permission_classes = [IsReviewer]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Application.objects.none()
        applications = Application.objects.select_related("student", "supervisor").prefetch_related(
            "preferences__opportunity__provider", "documents", "history", "placements__opportunity__provider"
        )
        user = self.request.user
        if user.role == User.Role.SUPERVISOR:
            return applications.filter(supervisor=user)
        return applications

    @extend_schema(request=TransitionSerializer, responses=ApplicationSerializer)
    @action(detail=True, methods=["post"])
    def transition(self, request, pk=None):
        """POST /api/application-reviews/<id>/transition/: advance a review status."""
        application = self.get_object()
        data = TransitionSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        target = data.validated_data["target_status"]
        reason = data.validated_data["reason"]
        if target == Status.ASSIGNED:
            raise serializers.ValidationError(
                {"target_status": "استخدم إجراء التوزيع لتعيين فرصة التدريب."}
            )
        try:
            with transaction.atomic():
                application.move_to(target, request.user, reason)
                if target == Status.WITHDRAWN:
                    application.placements.filter(is_active=True).update(
                        is_active=False,
                        closed_at=timezone.now(),
                        close_reason=reason,
                    )
                notify(
                    application.student,
                    Notification.Kind.APPLICATION,
                    "تحديث حالة طلب التدريب",
                    f"حالة طلبك الآن: {application.get_status_display()}",
                )
        except TransitionError as error:
            raise serializers.ValidationError(str(error))
        return Response(self.get_serializer(application).data)

    @extend_schema(request=AllocationSerializer, responses=ApplicationSerializer)
    @action(detail=True, methods=["post"])
    def allocate(self, request, pk=None):
        """POST /api/application-reviews/<id>/allocate/: assign an accepted student."""
        application = self.get_object()
        data = AllocationSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        opportunity = data.validated_data["opportunity"]

        with transaction.atomic():
            application = Application.objects.select_for_update().select_related(
                "student", "supervisor"
            ).get(pk=application.pk)
            supervisor = data.validated_data.get("supervisor", application.supervisor)
            if application.status != Status.ACCEPTED:
                raise serializers.ValidationError("يمكن توزيع الطلب المقبول فقط.")
            if (
                request.user.role == User.Role.SUPERVISOR
                and application.supervisor_id != request.user.id
            ):
                raise serializers.ValidationError("لا يمكنك توزيع طلب غير مخصص لك.")
            if supervisor is None:
                raise serializers.ValidationError({"supervisor": "حدد المشرف الأكاديمي للطالب."})
            if application.supervisor_id and application.supervisor_id != supervisor.id:
                raise serializers.ValidationError("لا يمكن تغيير المشرف أثناء التوزيع.")
            if not application.preferences.filter(opportunity=opportunity).exists():
                raise serializers.ValidationError("اختر فرصة من رغبات الطالب.")

            opportunity = Opportunity.objects.select_for_update().select_related(
                "provider", "specialization"
            ).get(pk=opportunity.pk)
            if opportunity.status != Opportunity.Status.OPEN:
                raise serializers.ValidationError("فرصة التدريب مغلقة.")
            if opportunity.provider.status != Provider.Status.APPROVED:
                raise serializers.ValidationError("جهة التدريب غير معتمدة.")
            if opportunity.free_seats() <= 0:
                raise serializers.ValidationError("لا توجد مقاعد متاحة في هذه الفرصة.")
            accepted_specializations = opportunity.provider.accepted_specializations.all()
            if accepted_specializations.exists() and not accepted_specializations.filter(
                pk=opportunity.specialization_id
            ).exists():
                raise serializers.ValidationError("الجهة لا تقبل هذا التخصص.")

            if application.supervisor_id is None:
                application.supervisor = supervisor
                application.save(update_fields=["supervisor", "updated_at"])
            Placement.objects.create(
                application=application,
                opportunity=opportunity,
                start_date=opportunity.start_date,
                end_date=opportunity.end_date,
            )
            try:
                application.move_to(Status.ASSIGNED, request.user)
            except TransitionError as error:
                raise serializers.ValidationError(str(error))
            notify(
                application.student,
                Notification.Kind.APPLICATION,
                "تم توزيعك على فرصة تدريب",
                opportunity.title,
            )
            notify(
                supervisor,
                Notification.Kind.APPLICATION,
                "تم إسناد طالب إليك",
                application.student.get_full_name() or application.student.username,
            )

        application.refresh_from_db()
        return Response(self.get_serializer(application).data)


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
