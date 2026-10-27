from datetime import timedelta

from django.utils import timezone
from rest_framework.test import APITestCase

from accounts.models import User
from applications.models import Application
from applications.status import Status

from .models import Visit


class VisitApiTests(APITestCase):
    def setUp(self):
        self.sara = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.omar = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.sup = User.objects.create_user(username="sup1", password="x", role=User.Role.SUPERVISOR)
        self.other_sup = User.objects.create_user(username="sup2", password="x", role=User.Role.SUPERVISOR)

        self.sara_app = Application.objects.create(
            student=self.sara, status=Status.IN_TRAINING, supervisor=self.sup
        )
        self.omar_app = Application.objects.create(
            student=self.omar, status=Status.IN_TRAINING, supervisor=self.other_sup
        )
        self.client.force_authenticate(self.sup)

    def payload(self, **changes):
        data = {
            "application": self.sara_app.id,
            "date": str(timezone.localdate()),
            "notes": "الطالبة ملتزمة بالدوام وتتعامل جيداً مع الفريق",
            "follow_up": "زيارة ثانية بعد أسبوعين",
        }
        data.update(changes)
        return data

    def make_visit(self, application, supervisor):
        return Visit.objects.create(
            application=application,
            supervisor=supervisor,
            date=timezone.localdate(),
            notes="ملاحظات",
        )

    # --- recording a visit (FR-24) ---

    def test_supervisor_records_a_visit_for_own_student(self):
        response = self.client.post("/api/visits/", self.payload(), format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(Visit.objects.get().supervisor, self.sup)

    def test_supervisor_field_cannot_be_set_by_the_request(self):
        response = self.client.post(
            "/api/visits/", self.payload(supervisor=self.other_sup.id), format="json"
        )
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(Visit.objects.get().supervisor, self.sup)

    def test_rejected_for_a_student_of_another_supervisor(self):
        response = self.client.post(
            "/api/visits/", self.payload(application=self.omar_app.id), format="json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Visit.objects.count(), 0)

    def test_rejected_before_the_student_is_placed(self):
        self.sara_app.status = Status.ACCEPTED
        self.sara_app.save()
        response = self.client.post("/api/visits/", self.payload(), format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Visit.objects.count(), 0)

    def test_rejected_for_a_future_date(self):
        tomorrow = timezone.localdate() + timedelta(days=1)
        response = self.client.post(
            "/api/visits/", self.payload(date=str(tomorrow)), format="json"
        )
        self.assertEqual(response.status_code, 400)

    def test_student_cannot_record_a_visit(self):
        self.client.force_authenticate(self.sara)
        response = self.client.post("/api/visits/", self.payload(), format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Visit.objects.count(), 0)

    # --- who sees what ---

    def test_supervisor_sees_only_visits_of_own_students(self):
        mine = self.make_visit(self.sara_app, self.sup)
        self.make_visit(self.omar_app, self.other_sup)
        response = self.client.get("/api/visits/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([v["id"] for v in response.data["results"]], [mine.id])

    def test_student_sees_only_own_visits(self):
        mine = self.make_visit(self.sara_app, self.sup)
        self.make_visit(self.omar_app, self.other_sup)
        self.client.force_authenticate(self.sara)
        response = self.client.get("/api/visits/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([v["id"] for v in response.data["results"]], [mine.id])

    # --- changing and deleting ---

    def test_supervisor_edits_own_visit(self):
        visit = self.make_visit(self.sara_app, self.sup)
        response = self.client.patch(
            f"/api/visits/{visit.id}/", {"follow_up": "متابعة هاتفية"}, format="json"
        )
        self.assertEqual(response.status_code, 200, response.data)
        visit.refresh_from_db()
        self.assertEqual(visit.follow_up, "متابعة هاتفية")

    def test_another_supervisor_cannot_edit_the_visit(self):
        visit = self.make_visit(self.sara_app, self.sup)
        self.client.force_authenticate(self.other_sup)
        response = self.client.patch(
            f"/api/visits/{visit.id}/", {"notes": "تغيير"}, format="json"
        )
        self.assertEqual(response.status_code, 404)

    def test_visits_cannot_be_deleted(self):
        visit = self.make_visit(self.sara_app, self.sup)
        response = self.client.delete(f"/api/visits/{visit.id}/")
        self.assertEqual(response.status_code, 405)
        self.assertTrue(Visit.objects.filter(id=visit.id).exists())