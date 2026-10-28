from django.contrib import admin

from .models import Application, ApplicationDocument, Placement, Preference, StatusChange


class PreferenceInline(admin.TabularInline):
    model = Preference
    extra = 0


class ApplicationDocumentInline(admin.TabularInline):
    model = ApplicationDocument
    extra = 0


class StatusChangeInline(admin.TabularInline):
    model = StatusChange
    extra = 0
    can_delete = False
    readonly_fields = ("from_status", "to_status", "changed_by", "reason", "created_at")

    def has_add_permission(self, request, obj=None):
        return False  # history is written by Application.move_to(), never by hand


class PlacementInline(admin.TabularInline):
    model = Placement
    extra = 0


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("student", "status", "supervisor", "submitted_at")
    list_filter = ("status",)
    search_fields = ("student__username", "student__first_name", "student__last_name")
    readonly_fields = ("status", "submitted_at")  # statuses only change through the rules
    inlines = [PreferenceInline, ApplicationDocumentInline, StatusChangeInline, PlacementInline]
