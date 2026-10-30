from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Department, Specialization, StudentProfile, User

admin.site.site_header = "بوابة التدريب الميداني"
admin.site.site_title = "بوابة التدريب الميداني"


class StudentProfileInline(admin.StackedInline):
    model = StudentProfile
    can_delete = False
    verbose_name = "ملف الطالب"


@admin.register(User)
class TadreebUserAdmin(UserAdmin):
    inlines = [StudentProfileInline]
    list_display = ("username", "first_name", "last_name", "role", "is_staff")
    list_filter = ("role", "is_staff", "is_active")
    fieldsets = UserAdmin.fieldsets + (("الدور في البوابة", {"fields": ("role",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + (("الدور في البوابة", {"fields": ("role",)}),)


class SpecializationInline(admin.TabularInline):
    model = Specialization
    extra = 1


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "required_training_hours")
    list_editable = ("required_training_hours",)
    inlines = [SpecializationInline]
    search_fields = ("name",)


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "department", "specialization", "completed_credit_hours", "academic_status")
    list_filter = ("department", "academic_status")
    search_fields = ("user__username", "user__first_name", "user__last_name")
