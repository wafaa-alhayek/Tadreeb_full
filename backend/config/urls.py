from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.utils import extend_schema, inline_serializer
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import serializers

from accounts.views import DepartmentViewSet, StudentViewSet, me, my_student_profile
from notifications.views import NotificationViewSet
from providers.views import ProviderViewSet

@extend_schema(
    responses=inline_serializer("Health", {"status": serializers.CharField()}),
)
@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok"})


router = DefaultRouter()
router.register("students", StudentViewSet, basename="student")
router.register("departments", DepartmentViewSet, basename="department")
router.register("providers", ProviderViewSet, basename="provider")
router.register("notifications", NotificationViewSet, basename="notification")
urlpatterns = [
    # The bare address has no page of its own; send visitors to the API docs.
    path("", RedirectView.as_view(pattern_name="swagger-ui")),
    path("admin/", admin.site.urls),
    path("api/health/", health),
    path("api/schema/", SpectacularAPIView.as_view(permission_classes=[AllowAny]), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema", permission_classes=[AllowAny]),
        name="swagger-ui",
    ),
    path("api/auth/login/", TokenObtainPairView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),
    path("api/auth/me/", me),
    # Before the router, so "me" isn't read as a student id.
    path("api/students/me/", my_student_profile),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
