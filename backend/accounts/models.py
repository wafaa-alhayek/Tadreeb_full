from django.contrib.auth.models import AbstractUser
from django.db import models

from .validators import validate_upload


class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = "student", "طالب"
        SUPERVISOR = "supervisor", "مشرف أكاديمي"
        PROVIDER = "provider", "جهة تدريب"
        COORDINATOR = "coordinator", "منسق التدريب"
        ADMIN = "admin", "مدير النظام"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Specialization(models.Model):
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name="specializations"
    )
    name = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["department", "name"], name="unique_specialization_per_department"
            )
        ]

    def __str__(self):
        return f"{self.name} ({self.department})"


class StudentProfile(models.Model):
    class AcademicStatus(models.TextChoices):
        ACTIVE = "active", "منتظم"
        SUSPENDED = "suspended", "موقوف"
        GRADUATED = "graduated", "متخرج"

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_profile"
    )
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, null=True, blank=True
    )
    specialization = models.ForeignKey(
        Specialization, on_delete=models.PROTECT, null=True, blank=True
    )
    completed_credit_hours = models.PositiveIntegerField(default=0)
    gpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    academic_status = models.CharField(
        max_length=20, choices=AcademicStatus.choices, default=AcademicStatus.ACTIVE
    )
    phone = models.CharField(max_length=20, blank=True)
    cv = models.FileField(
        upload_to="cvs/", blank=True, validators=[validate_upload]
    )

    def __str__(self):
        return f"Profile of {self.user.username}"
