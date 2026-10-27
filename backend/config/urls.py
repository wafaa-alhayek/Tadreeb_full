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
from applications.views import ApplicationDocumentViewSet, ApplicationViewSet
from audit.views import AuditLogViewSet
from notifications.views import NotificationViewSet
from providers.views import OpportunityViewSet, ProviderViewSet
from training.views import DailyLogViewSet, TrainingPlanViewSet

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
router.register("opportunities", OpportunityViewSet, basename="opportunity")
router.register("notifications", NotificationViewSet, basename="notification")
router.register("applications", ApplicationViewSet, basename="application")
router.register("application-documents", ApplicationDocumentViewSet, basename="application-document")
router.register("audit-logs", AuditLogViewSet, basename="audit-log")
router.register("daily-logs", DailyLogViewSet, basename="daily-log")
router.register("training-plans", TrainingPlanViewSet, basename="training-plan")
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
    path("api/imports/", include("imports.urls")),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
