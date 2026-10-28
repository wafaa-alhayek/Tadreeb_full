from django.contrib import admin

from .models import Certificate


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ["serial_number", "student_name", "provider_name", "issued_at", "revoked_at"]
    search_fields = ["serial_number", "student_name", "university_id"]
    readonly_fields = ["verification_code"]
