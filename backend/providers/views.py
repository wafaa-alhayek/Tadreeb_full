from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from accounts.permissions import IsCoordinator

from .models import Provider
from .serializers import ProviderSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    """FR-07: training providers. Coordinators manage them; others only read."""

    serializer_class = ProviderSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get_queryset(self):
        providers = Provider.objects.all()
        if getattr(self, "swagger_fake_view", False):
            return providers  # Swagger only reads the field types here.

        user = self.request.user

        if user.role in (User.Role.COORDINATOR, User.Role.ADMIN):
            return providers
        if user.role == User.Role.PROVIDER:
            return providers.filter(user=user)
        return providers.filter(status=Provider.Status.APPROVED)

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [IsAuthenticated()]
        return [IsCoordinator()]