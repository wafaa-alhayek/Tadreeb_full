from datetime import date
from decimal import Decimal

from django.test import override_settings
from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User
from applications.models import Application, Placement
from applications.status import Status
from audit.models import AuditLog
from certificates.models import Certificate
from notifications.models import Notification
from providers.models import Opportunity, Provider
from training.models import Report

from .models import PROVIDER_CRITERIA, SUPERVISOR_CRITERIA, Evaluation, ProviderRating

PROVIDER_SCORES = dict.fromkeys(PROVIDER_CRITERIA, 4)  # 80 / 100
SUPERVISOR_SCORES = dict.fromkeys(SUPERVISOR_CRITERIA, 5)  # 100 / 100


class EvaluationTestData(APITestCase):
    def setUp(self):
        self.coordinator = self.user("coord", User.Role.COORDINATOR)
        self.sup = self.user("sup1", User.Role.SUPERVISOR)
        self.other_sup = self.user("sup2", User.Role.SUPERVISOR)
        self.student = self.user("20251234", User.Role.STUDENT)
        self.other_student = self.user("20255678", User.Role.STUDENT)
        self.provider_user = self.user("prov1", User.Role.PROVIDER)
        self.other_provider_user = self.user("prov2", User.Role.PROVIDER)

        department = Department.objects.create(name="تقنية المعلومات")
        specialization = Specialization.objects.create(department=department, name="هندسة برمجيات")
        StudentProfile.objects.create(user=self.student, department=department, specialization=specialization)
        self.provider = self.make_provider("شركة التقنية", self.provider_user)
        self.make_provider("شركة أخرى", self.other_provider_user)
        self.opportunity = Opportunity.objects.create(
            provider=self.provider,
            specialization=specialization,
            title="تطوير الويب",
            tasks="مهام",
            start_date=date(2026, 9, 1),
            end_date=date(2026, 10, 31),
            location="غزة",
        )
        self.application = Application.objects.create(
            student=self.student, status=Status.IN_TRAINING, supervisor=self.sup
        )
        Placement.objects.create(
            application=self.application,
            opportunity=self.opportunity,
            start_date=self.opportunity.start_date,
            end_date=self.opportunity.end_date,
        )

    def user(self, username, role):
        return User.objects.create_user(username=username, password="x", role=role)

    def make_provider(self, name, user):
        return Provider.objects.create(
            name=name, sector="تقنية", city="غزة", contact_name="مسؤول", contact_phone="0599000000", user=user
        )

    def evaluate(self, user, scores, application=None):
        self.client.force_authenticate(user)
        return self.client.post(
            "/api/evaluations/",
            {"application": (application or self.application).id, "scores": scores, "notes": "جيد"},
            format="json",
        )

    def set_status(self, status):
        self.application.status = status
        self.application.save()

    def grade_report(self, grade):
        Report.objects.create(application=self.application, title="تقرير", file="reports/r.pdf", grade=grade)

    def final_grade(self, user=None):
        self.client.force_authenticate(user or self.coordinator)
        return self.client.get(f"/api/evaluations/final-grade/?application={self.application.id}")


class EvaluationTests(EvaluationTestData):
    def test_provider_and_supervisor_evaluate(self):
        response = self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["kind"], "provider")
        self.assertEqual(Decimal(response.data["total"]), Decimal("80.00"))

        response = self.evaluate(self.sup, SUPERVISOR_SCORES)
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["kind"], "supervisor")
        self.assertEqual(Decimal(response.data["total"]), Decimal("100.00"))

        self.assertTrue(Notification.objects.filter(recipient=self.student, title="تقييم جديد لتدريبك").exists())
        self.assertEqual(AuditLog.objects.filter(target_type="evaluations.evaluation").count(), 2)

    def test_only_their_own_students(self):
        self.assertEqual(self.evaluate(self.other_sup, SUPERVISOR_SCORES).status_code, 400)
        self.assertEqual(self.evaluate(self.other_provider_user, PROVIDER_SCORES).status_code, 400)
        self.assertEqual(self.evaluate(self.student, SUPERVISOR_SCORES).status_code, 403)
        self.assertEqual(self.evaluate(self.coordinator, SUPERVISOR_SCORES).status_code, 403)
        self.assertFalse(Evaluation.objects.exists())

    def test_scores_must_cover_every_criterion_from_1_to_5(self):
        self.assertEqual(self.evaluate(self.sup, {"commitment": 5}).status_code, 400)
        self.assertEqual(self.evaluate(self.sup, PROVIDER_SCORES).status_code, 400)  # the provider's criteria
        self.assertEqual(self.evaluate(self.sup, {**SUPERVISOR_SCORES, "goals": 6}).status_code, 400)
        self.assertEqual(self.evaluate(self.sup, {**SUPERVISOR_SCORES, "goals": "5"}).status_code, 400)
        self.assertEqual(self.evaluate(self.sup, {**SUPERVISOR_SCORES, "extra": 3}).status_code, 400)

    def test_once_per_kind_then_edit(self):
        evaluation_id = self.evaluate(self.sup, SUPERVISOR_SCORES).data["id"]
        self.assertEqual(self.evaluate(self.sup, SUPERVISOR_SCORES).status_code, 400)

        response = self.client.patch(
            f"/api/evaluations/{evaluation_id}/",
            {"scores": dict.fromkeys(SUPERVISOR_CRITERIA, 3)},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(Decimal(response.data["total"]), Decimal("60.00"))

        self.client.force_authenticate(self.other_sup)
        response = self.client.patch(f"/api/evaluations/{evaluation_id}/", {"notes": "x"}, format="json")
        self.assertEqual(response.status_code, 404)

    def test_not_before_training_or_after_approval(self):
        self.set_status(Status.ASSIGNED)
        self.assertEqual(self.evaluate(self.sup, SUPERVISOR_SCORES).status_code, 400)
        self.set_status(Status.COMPLETED)
        evaluation_id = self.evaluate(self.sup, SUPERVISOR_SCORES).data["id"]
        self.set_status(Status.APPROVED)
        response = self.client.patch(f"/api/evaluations/{evaluation_id}/", {"notes": "x"}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_who_sees_which_evaluations(self):
        self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        for user, count in (
            (self.student, 2),
            (self.other_student, 0),
            (self.sup, 2),
            (self.other_sup, 0),
            (self.provider_user, 1),  # its own, not the supervisor's
            (self.other_provider_user, 0),
            (self.coordinator, 2),
        ):
            self.client.force_authenticate(user)
            self.assertEqual(self.client.get("/api/evaluations/").data["count"], count, user)

    def test_criteria(self):
        self.client.force_authenticate(self.sup)
        response = self.client.get("/api/evaluations/criteria/")
        self.assertEqual(response.data["supervisor"], SUPERVISOR_CRITERIA)
        self.assertEqual(response.data["provider"], PROVIDER_CRITERIA)


class FinalGradeTests(EvaluationTestData):
    def test_incomplete_until_every_part_exists(self):
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        response = self.final_grade()
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.data["total"])
        self.assertIsNone(response.data["passed"])
        self.assertEqual(response.data["missing"], ["provider", "reports"])

    def test_weighted_total(self):
        self.evaluate(self.provider_user, PROVIDER_SCORES)  # 80
        self.evaluate(self.sup, SUPERVISOR_SCORES)  # 100
        self.grade_report(70)
        self.grade_report(90)  # reports average 80
        response = self.final_grade(self.student)
        # 80 × 40% + 100 × 40% + 80 × 20% = 88
        self.assertEqual(Decimal(response.data["total"]), Decimal("88.00"))
        self.assertTrue(response.data["passed"])
        self.assertEqual(response.data["weights"], {"provider": 40, "supervisor": 40, "reports": 20})

    @override_settings(TADREEB_PASS_GRADE=90)
    def test_below_the_pass_grade(self):
        self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        self.grade_report(80)
        self.assertFalse(self.final_grade().data["passed"])

    def test_only_for_applications_they_can_see(self):
        self.assertEqual(self.final_grade(self.other_student).status_code, 404)
        self.assertEqual(self.final_grade(self.other_sup).status_code, 404)
        self.client.force_authenticate(self.coordinator)
        self.assertEqual(self.client.get("/api/evaluations/final-grade/").status_code, 400)

    def test_coordinators_hear_when_a_completed_training_is_ready(self):
        self.set_status(Status.COMPLETED)
        self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        self.assertFalse(Notification.objects.filter(title="تدريب جاهز للاعتماد").exists())

        report = Report.objects.create(application=self.application, title="تقرير", file="reports/r.pdf")
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/reports/{report.id}/grade/", {"grade": 75}, format="json")
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(
            Notification.objects.filter(recipient=self.coordinator, title="تدريب جاهز للاعتماد").count(), 1
        )

        # Editing an evaluation afterwards doesn't send it again.
        evaluation = Evaluation.objects.get(kind=Evaluation.Kind.SUPERVISOR)
        self.client.patch(f"/api/evaluations/{evaluation.id}/", {"notes": "ممتاز"}, format="json")
        self.assertEqual(Notification.objects.filter(title="تدريب جاهز للاعتماد").count(), 1)


class ApprovalNeedsTheFinalGradeTests(EvaluationTestData):
    def approve(self):
        self.client.force_authenticate(self.coordinator)
        return self.client.post(f"/api/applications/{self.application.id}/approve/")

    def test_not_before_the_grades_are_in(self):
        self.set_status(Status.COMPLETED)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        response = self.approve()
        self.assertEqual(response.status_code, 400)
        self.assertIn("تقييم جهة التدريب", str(response.data))
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.COMPLETED)

    @override_settings(TADREEB_PASS_GRADE=90)
    def test_not_when_the_student_fails(self):
        self.set_status(Status.COMPLETED)
        self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        self.grade_report(80)
        self.assertEqual(self.approve().status_code, 400)
        self.assertFalse(Certificate.objects.exists())

    def test_approved_once_passing(self):
        self.set_status(Status.COMPLETED)
        self.evaluate(self.provider_user, PROVIDER_SCORES)
        self.evaluate(self.sup, SUPERVISOR_SCORES)
        self.grade_report(80)
        response = self.approve()
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], Status.CERTIFIED)


class ProviderRatingTests(EvaluationTestData):
    def rate(self, user=None, rating=4):
        self.client.force_authenticate(user or self.student)
        return self.client.post(
            "/api/provider-ratings/",
            {"application": self.application.id, "rating": rating, "comment": "بيئة ممتازة"},
            format="json",
        )

    def test_student_rates_once_after_the_training(self):
        self.assertEqual(self.rate().status_code, 400)  # still in training
        self.set_status(Status.COMPLETED)
        self.assertEqual(self.rate(rating=6).status_code, 400)
        response = self.rate()
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["provider"], self.provider.id)
        self.assertEqual(self.rate().status_code, 400)  # only once

    def test_only_the_student_of_the_application(self):
        self.set_status(Status.COMPLETED)
        self.assertEqual(self.rate(self.other_student).status_code, 400)
        self.assertEqual(self.rate(self.sup).status_code, 403)

    def test_who_sees_the_ratings(self):
        self.set_status(Status.COMPLETED)
        self.rate()
        for user, count in (
            (self.student, 1),
            (self.other_student, 0),
            (self.provider_user, 1),
            (self.other_provider_user, 0),
            (self.sup, 1),
            (self.coordinator, 1),
        ):
            self.client.force_authenticate(user)
            self.assertEqual(self.client.get("/api/provider-ratings/").data["count"], count, user)
        self.assertEqual(ProviderRating.objects.get().provider, self.provider)
