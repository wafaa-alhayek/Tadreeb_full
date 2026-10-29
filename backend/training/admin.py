from django.contrib import admin

from .models import DailyLog, Report, TrainingPlan, Visit


@admin.register(DailyLog)
class DailyLogAdmin(admin.ModelAdmin):
    list_display = ["application", "date", "hours", "confirmed_at"]


@admin.register(TrainingPlan)
class TrainingPlanAdmin(admin.ModelAdmin):
    list_display = ["application", "status", "approved_at"]
    list_filter = ["status"]


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ["application", "supervisor", "date"]


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ["title", "application", "submitted_at", "grade"]
