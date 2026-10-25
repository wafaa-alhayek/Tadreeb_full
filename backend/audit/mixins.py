from django.db import transaction

from .models import AuditLog, diff, log_action, snapshot


class AuditMixin:
    """Log what a ModelViewSet creates, changes and deletes (FR-40).

    Put it before ModelViewSet. A view that customises saving calls
    self.save_with_log(serializer, **extra) instead of serializer.save(**extra).
    """

    def save_with_log(self, serializer, **extra):
        before = snapshot(serializer.instance) if serializer.instance is not None else None
        instance = serializer.save(**extra)
        changes = diff(before, snapshot(instance))
        if before is None:
            log_action(self.request, AuditLog.Action.CREATE, instance, changes)
        elif changes:  # A save that changed nothing isn't worth a line.
            log_action(self.request, AuditLog.Action.UPDATE, instance, changes)
        return instance

    def perform_create(self, serializer):
        self.save_with_log(serializer)

    def perform_update(self, serializer):
        self.save_with_log(serializer)

    def perform_destroy(self, instance):
        with transaction.atomic():
            # Logged first, while the record still has its id.
            log_action(self.request, AuditLog.Action.DELETE, instance, diff(snapshot(instance), None))
            instance.delete()
