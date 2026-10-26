from datetime import timedelta

from django.utils import timezone
from rest_framework.test import APITestCase

from accounts.models import User
from applications.models import Application
from applications.status import Status

from .models import DailyLog


class DailyLogApiTests(APITestCase):
    def setUp(self):
        self.sara = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.omar = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.sara_app = Application.objects.create(student=self.sara, status=Status.IN_TRAINING)
        self.omar_app = Application.objects.create(student=self.omar, status=Status.IN_TRAINING)
        self.client.force_authenticate(self.sara)

    def payload(self, **changes):
        data = {
            "application": self.sara_app.id,
            "date": str(timezone.localdate()),
            "hours": "4",
            "tasks": "تدريب على قواعد البيانات",
        }
        data.update(changes)
        return data

    # --- writing a day (FR-20) ---

    def test_student_writes_a_day_while_in_training(self):
        response = self.client.post("/api/daily-logs/", self.payload(), format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(DailyLog.objects.count(), 1)

    def test_rejected_when_application_is_not_in_training(self):
        self.sara_app.status = Status.ASSIGNED
        self.sara_app.save()
        response = self.client.post("/api/daily-logs/", self.payload(), format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(DailyLog.objects.count(), 0)

    def test_rejected_on_another_students_application(self):
        response = self.client.post(
            "/api/daily-logs/", self.payload(application=self.omar_app.id), format="json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(DailyLog.objects.count(), 0)

    def test_rejected_for_a_future_date(self):
        tomorrow = timezone.localdate() + timedelta(days=1)
        response = self.client.post(
            "/api/daily-logs/", self.payload(date=str(tomorrow)), format="json"
        )
        self.assertEqual(response.status_code, 400)

    def test_same_day_twice_is_rejected(self):
        self.client.post("/api/daily-logs/", self.payload(), format="json")
        response = self.client.post("/api/daily-logs/", self.payload(), format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(DailyLog.objects.count(), 1)

    # --- seeing and changing days ---

    def test_student_sees_only_their_own_days(self):
        today = timezone.localdate()
        DailyLog.objects.create(application=self.sara_app, date=today, hours=3, tasks="مهام")
        DailyLog.objects.create(application=self.omar_app, date=today, hours=3, tasks="مهام")
        response = self.client.get("/api/daily-logs/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_confirmed_day_cannot_be_edited_or_deleted(self):
        log = DailyLog.objects.create(
            application=self.sara_app,
            date=timezone.localdate(),
            hours=3,
            tasks="مهام",
            confirmed_at=timezone.now(),
        )
        edit = self.client.patch(f"/api/daily-logs/{log.id}/", {"hours": "5"}, format="json")
        self.assertEqual(edit.status_code, 400)
        delete = self.client.delete(f"/api/daily-logs/{log.id}/")
        self.assertEqual(delete.status_code, 400)
        self.assertTrue(DailyLog.objects.filter(id=log.id).exists())