from django.contrib.auth.models import AbstractUser
from django.db import models


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