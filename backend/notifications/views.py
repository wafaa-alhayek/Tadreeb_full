from drf_spectacular.utils import OpenApiParameter, extend_schema, inline_serializer
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """/api/notifications/: the logged-in user's own notifications, newest first (FR-38)."""

    serializer_class = NotificationSerializer

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            # Swagger builds the docs without a logged-in user.
            return Notification.objects.none()
        # Only ever the requester's own notifications.
        queryset = Notification.objects.filter(recipient=self.request.user)
        if self.request.query_params.get("unread") == "true":
            queryset = queryset.filter(is_read=False)
        return queryset

    @extend_schema(
        parameters=[OpenApiParameter("unread", bool, description="true: only unread ones")]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(request=None, responses=NotificationSerializer)
    @action(detail=True, methods=["post"])
    def read(self, request, pk=None):
        """POST /api/notifications/<id>/read/: mark one as read."""
        notification = self.get_object()
        notification.is_read = True
        notification.save(update_fields=["is_read"])
        return Response(self.get_serializer(notification).data)

    @extend_schema(
        request=None,
        responses=inline_serializer("MarkedRead", {"marked_read": serializers.IntegerField()}),
    )
    @action(detail=False, methods=["post"], url_path="read-all")
    def read_all(self, request):
        """POST /api/notifications/read-all/: the "mark all as read" button."""
        count = self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({"marked_read": count})

    @extend_schema(
        responses=inline_serializer("UnreadCount", {"unread": serializers.IntegerField()})
    )
    @action(detail=False, methods=["get"], url_path="unread-count")
    def unread_count(self, request):
        """GET /api/notifications/unread-count/: the number on the header's bell."""
        return Response({"unread": self.get_queryset().filter(is_read=False).count()})
