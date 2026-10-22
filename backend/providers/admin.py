from django.contrib import admin

from .models import Opportunity, Provider


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("name", "sector", "city", "capacity", "status")
    list_filter = ("status", "sector", "city")
    search_fields = ("name", "contact_name")


@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ("title", "provider", "specialization", "seats", "start_date", "status")
    list_filter = ("status", "specialization", "provider")
    search_fields = ("title", "location")