from django.utils.dateparse import parse_date
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from accounts.permissions import HasRole

from .models import AuditLog
from .serializers import AuditLogSerializer


class IsSystemAdmin(HasRole):
    roles = (User.Role.ADMIN,)
    message = "سجل العمليات متاح لمدير النظام فقط."


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter("actor", OpenApiTypes.INT, description="رقم المستخدم"),
            OpenApiParameter("action", OpenApiTypes.STR, enum=AuditLog.Action.values),
            OpenApiParameter("target_type", OpenApiTypes.STR, description="مثل providers.provider"),
            OpenApiParameter("from", OpenApiTypes.DATE, description="من تاريخ (YYYY-MM-DD)"),
            OpenApiParameter("to", OpenApiTypes.DATE, description="إلى تاريخ (YYYY-MM-DD)"),
        ]
    )
)
class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """/api/audit-logs/: FR-40, read only and for the system admin only."""

    serializer_class = AuditLogSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsSystemAdmin]

    def get_queryset(self):
        logs = AuditLog.objects.select_related("actor")
        params = self.request.query_params
        if params.get("actor", "").isdigit():
            logs = logs.filter(actor_id=params["actor"])
        for field in ("action", "target_type"):
            if params.get(field):
                logs = logs.filter(**{field: params[field]})
        date_from = parse_date(params.get("from") or "")
        if date_from:
            logs = logs.filter(created_at__date__gte=date_from)
        date_to = parse_date(params.get("to") or "")
        if date_to:
            logs = logs.filter(created_at__date__lte=date_to)
        return logs
