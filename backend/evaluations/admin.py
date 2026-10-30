from django.contrib import admin

from .models import Evaluation, ProviderRating


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ("application", "kind", "evaluator", "total", "updated_at")
    list_filter = ("kind",)
    readonly_fields = ("total",)


@admin.register(ProviderRating)
class ProviderRatingAdmin(admin.ModelAdmin):
    list_display = ("provider", "application", "rating", "created_at")
    list_filter = ("rating",)
