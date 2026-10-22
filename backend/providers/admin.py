from django.contrib import admin

from .models import Provider


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("name", "sector", "city", "capacity", "status")
    list_filter = ("status", "sector", "city")
    search_fields = ("name", "contact_name")