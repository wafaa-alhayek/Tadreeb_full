from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """Read only: the log is never added to, edited or deleted by hand (FR-40)."""

    list_display = ("created_at", "actor", "action", "target_type", "target_repr", "ip_address")
    list_filter = ("action", "target_type")
    search_fields = ("target_repr", "actor__username")
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
