from django.utils.dateparse import parse_date
from rest_framework import serializers, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.eligibility import check_eligibility
from accounts.models import User
from accounts.permissions import HasRole, IsCoordinator

from .models import Opportunity, Provider
from .serializers import OpportunitySerializer, ProviderSerializer

MANAGERS = (User.Role.COORDINATOR, User.Role.ADMIN)


class CanEditProvider(HasRole):
    roles = (User.Role.PROVIDER, *MANAGERS)


class ProviderViewSet(viewsets.ModelViewSet):
    """FR-07/FR-08: coordinators manage providers; a provider edits its own record."""

    serializer_class = ProviderSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get_queryset(self):
        providers = Provider.objects.all()
        if getattr(self, "swagger_fake_view", False):
            return providers  # Swagger only reads the field types here.

        user = self.request.user

        if user.role in MANAGERS:
            return providers
        if user.role == User.Role.PROVIDER:
            return providers.filter(user=user)
        return providers.filter(status=Provider.Status.APPROVED)

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [IsAuthenticated()]
        if self.action in ("update", "partial_update"):
            return [CanEditProvider()]
        return [IsCoordinator()]

    def perform_update(self, serializer):
        if self.request.user.role == User.Role.PROVIDER:
            # Only the coordinator approves or suspends a provider.
            serializer.save(status=serializer.instance.status)
        else:
            serializer.save()


class CanPublishOpportunities(HasRole):
    roles = (User.Role.PROVIDER, *MANAGERS)


class OpportunityViewSet(viewsets.ModelViewSet):
    """FR-09/FR-10: providers and coordinators publish; students browse open ones.

    Filters: ?specialization=<id>&location=<text>&start_after=YYYY-MM-DD
    """

    serializer_class = OpportunitySerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get_queryset(self):
        opportunities = Opportunity.objects.select_related("provider", "specialization")
        if getattr(self, "swagger_fake_view", False):
            return opportunities

        user = self.request.user

        if user.role == User.Role.PROVIDER:
            opportunities = opportunities.filter(provider__user=user)
        elif user.role not in MANAGERS:
            if user.role == User.Role.STUDENT:
                self.require_eligible_student(user)
            opportunities = opportunities.filter(
                status=Opportunity.Status.OPEN,
                provider__status=Provider.Status.APPROVED,
            )

        params = self.request.query_params
        if params.get("specialization"):
            opportunities = opportunities.filter(specialization_id=params["specialization"])
        if params.get("location"):
            opportunities = opportunities.filter(location__icontains=params["location"])
        start_after = parse_date(params.get("start_after") or "")
        if start_after:
            opportunities = opportunities.filter(start_date__gte=start_after)

        return opportunities

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [IsAuthenticated()]
        return [CanPublishOpportunities()]

    def require_eligible_student(self, user):
        """FR-10 + FR-06: only eligible students browse, others see why not."""
        profile = getattr(user, "student_profile", None)
        if profile is None:
            raise PermissionDenied("لا يوجد ملف طالب لهذا الحساب.")
        is_eligible, reasons = check_eligibility(profile)
        if not is_eligible:
            raise PermissionDenied(" ".join(reasons))

    def own_provider(self):
        provider = getattr(self.request.user, "provider_profile", None)
        if provider is None:
            raise PermissionDenied("هذا الحساب غير مربوط بجهة تدريب.")
        return provider

    def perform_create(self, serializer):
        if self.request.user.role == User.Role.PROVIDER:
            serializer.save(provider=self.own_provider())
        elif "provider" not in serializer.validated_data:
            raise serializers.ValidationError({"provider": "اختر جهة التدريب."})
        else:
            serializer.save()

    def perform_update(self, serializer):
        if self.request.user.role == User.Role.PROVIDER:
            serializer.save(provider=self.own_provider())
        else:
            serializer.save()