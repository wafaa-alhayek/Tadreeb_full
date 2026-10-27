from datetime import timedelta

from django.utils import timezone
from rest_framework.test import APITestCase

from accounts.models import User
from applications.models import Application
from applications.status import Status

from .models import DailyLog, TrainingPlan


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


class TrainingPlanApiTests(APITestCase):
    def setUp(self):
        self.sara = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.omar = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.lina = User.objects.create_user(username="20259999", password="x", role=User.Role.STUDENT)
        self.sup = User.objects.create_user(username="sup1", password="x", role=User.Role.SUPERVISOR)
        self.other_sup = User.objects.create_user(username="sup2", password="x", role=User.Role.SUPERVISOR)

        self.sara_app = Application.objects.create(
            student=self.sara, status=Status.ASSIGNED, supervisor=self.sup
        )
        self.omar_app = Application.objects.create(
            student=self.omar, status=Status.ASSIGNED, supervisor=self.sup
        )
        self.lina_app = Application.objects.create(
            student=self.lina, status=Status.ASSIGNED, supervisor=self.other_sup
        )
        self.client.force_authenticate(self.sara)

    def payload(self, **changes):
        data = {
            "application": self.sara_app.id,
            "goals": [
                {"week_number": 1, "goal": "التعرف على بيئة العمل"},
                {"week_number": 2, "goal": "العمل على مهمة صغيرة"},
            ],
        }
        data.update(changes)
        return data

    def make_plan(self, application, status=TrainingPlan.Status.DRAFT):
        plan = TrainingPlan.objects.create(application=application, status=status)
        plan.goals.create(week_number=1, goal="هدف")
        return plan

    # --- writing the plan (FR-19) ---

    def test_student_creates_a_plan_after_assignment(self):
        response = self.client.post("/api/training-plans/", self.payload(), format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["status"], "draft")
        self.assertEqual(len(response.data["goals"]), 2)

    def test_rejected_before_assignment(self):
        self.sara_app.status = Status.ACCEPTED
        self.sara_app.save()
        response = self.client.post("/api/training-plans/", self.payload(), format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(TrainingPlan.objects.count(), 0)

    def test_rejected_on_another_students_application(self):
        response = self.client.post(
            "/api/training-plans/", self.payload(application=self.omar_app.id), format="json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(TrainingPlan.objects.count(), 0)

    def test_goals_are_required(self):
        response = self.client.post("/api/training-plans/", self.payload(goals=[]), format="json")
        self.assertEqual(response.status_code, 400)

    def test_same_week_twice_is_rejected(self):
        goals = [{"week_number": 1, "goal": "أ"}, {"week_number": 1, "goal": "ب"}]
        response = self.client.post("/api/training-plans/", self.payload(goals=goals), format="json")
        self.assertEqual(response.status_code, 400)

    def test_student_cannot_set_the_status(self):
        response = self.client.post(
            "/api/training-plans/", self.payload(status="approved"), format="json"
        )
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["status"], "draft")

    def test_student_edits_goals_while_draft(self):
        plan = self.make_plan(self.sara_app)
        response = self.client.patch(
            f"/api/training-plans/{plan.id}/",
            {"goals": [{"week_number": 3, "goal": "هدف جديد"}]},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual([g.week_number for g in plan.goals.all()], [3])

    def test_submit_locks_the_plan(self):
        plan = self.make_plan(self.sara_app)
        submit = self.client.post(f"/api/training-plans/{plan.id}/submit/")
        self.assertEqual(submit.status_code, 200, submit.data)
        self.assertEqual(submit.data["status"], "submitted")
        again = self.client.post(f"/api/training-plans/{plan.id}/submit/")
        self.assertEqual(again.status_code, 400)
        edit = self.client.patch(
            f"/api/training-plans/{plan.id}/",
            {"goals": [{"week_number": 1, "goal": "تغيير"}]},
            format="json",
        )
        self.assertEqual(edit.status_code, 400)

    # --- the supervisor (FR-18, FR-19) ---

    def test_supervisor_sees_only_submitted_plans_of_own_students(self):
        submitted = self.make_plan(self.sara_app, TrainingPlan.Status.SUBMITTED)
        self.make_plan(self.omar_app, TrainingPlan.Status.DRAFT)
        self.make_plan(self.lina_app, TrainingPlan.Status.SUBMITTED)
        self.client.force_authenticate(self.sup)
        response = self.client.get("/api/training-plans/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p["id"] for p in response.data["results"]], [submitted.id])

    def test_supervisor_approves_a_submitted_plan(self):
        plan = self.make_plan(self.sara_app, TrainingPlan.Status.SUBMITTED)
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/training-plans/{plan.id}/approve/")
        self.assertEqual(response.status_code, 200, response.data)
        plan.refresh_from_db()
        self.assertEqual(plan.status, TrainingPlan.Status.APPROVED)
        self.assertEqual(plan.approved_by, self.sup)
        self.assertIsNotNone(plan.approved_at)

    def test_supervisor_cannot_approve_a_draft(self):
        # A draft is not visible to the supervisor yet.
        plan = self.make_plan(self.sara_app, TrainingPlan.Status.DRAFT)
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/training-plans/{plan.id}/approve/")
        self.assertEqual(response.status_code, 404)
        plan.refresh_from_db()
        self.assertEqual(plan.status, TrainingPlan.Status.DRAFT)

    def test_student_cannot_approve_their_own_plan(self):
        plan = self.make_plan(self.sara_app, TrainingPlan.Status.SUBMITTED)
        response = self.client.post(f"/api/training-plans/{plan.id}/approve/")
        self.assertEqual(response.status_code, 403)
        plan.refresh_from_db()
        self.assertEqual(plan.status, TrainingPlan.Status.SUBMITTED)

    def test_another_supervisor_cannot_approve(self):
        plan = self.make_plan(self.sara_app, TrainingPlan.Status.SUBMITTED)
        self.client.force_authenticate(self.other_sup)
        response = self.client.post(f"/api/training-plans/{plan.id}/approve/")
        self.assertEqual(response.status_code, 404)
        plan.refresh_from_db()
        self.assertEqual(plan.status, TrainingPlan.Status.SUBMITTED)