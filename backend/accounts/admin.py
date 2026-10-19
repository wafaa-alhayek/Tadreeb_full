from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

admin.site.site_header = "بوابة التدريب الميداني"
admin.site.site_title = "بوابة التدريب الميداني"


@admin.register(User)
class TadreebUserAdmin(UserAdmin):
    list_display = ("username", "first_name", "last_name", "role", "is_staff")
    list_filter = ("role", "is_staff", "is_active")
    fieldsets = UserAdmin.fieldsets + (("الدور في البوابة", {"fields": ("role",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + (("الدور في البوابة", {"fields": ("role",)}),)