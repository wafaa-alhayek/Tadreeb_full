import shutil
import tempfile
from datetime import date
from decimal import Decimal

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User
from applications.models import Application, Placement
from applications.status import Status
from audit.models import AuditLog
from notifications.models import Notification
from providers.models import Opportunity, Provider

from .models import DailyLog, Report, average_report_grade

MEDIA = tempfile.mkdtemp()


def make_provider(name, user=None):
    return Provider.objects.create(
        name=name, sector="تقنية", city="غزة", contact_name="مسؤول", contact_phone="0599000000", user=user
    )


def make_opportunity(provider, specialization, start, end):
    return Opportunity.objects.create(
        provider=provider,
        specialization=specialization,
        title="تطوير برمجيات",
        tasks="مهام",
        seats=3,
        start_date=start,
        end_date=end,
        location="غزة",
    )


class ProviderConfirmationTests(APITestCase):
    """BR-05: the provider confirms the days its trainee wrote."""

    def setUp(self):
        self.provider_user = User.objects.create_user(username="prov1", password="x", role=User.Role.PROVIDER)
        self.other_provider_user = User.objects.create_user(
            username="prov2", password="x", role=User.Role.PROVIDER
        )
        self.student = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.department = Department.objects.create(name="تقنية المعلومات")
        specialization = Specialization.objects.create(department=self.department, name="برمجة")
        self.provider = make_provider("شركة التقنية", self.provider_user)
        self.other_provider = make_provider("شركة أخرى", self.other_provider_user)
        self.application = Application.objects.create(student=self.student, status=Status.IN_TRAINING)
        # A change of provider (FR-30): October at the first provider, November at the second.
        Placement.objects.create(
            application=self.application,
            opportunity=make_opportunity(self.provider, specialization, date(2026, 10, 1), date(2026, 10, 31)),
            start_date=date(2026, 10, 1),
            end_date=date(2026, 10, 31),
            is_active=False,
        )
        Placement.objects.create(
            application=self.application,
            opportunity=make_opportunity(
                self.other_provider, specialization, date(2026, 11, 1), date(2026, 12, 31)
            ),
            start_date=date(2026, 11, 1),
            end_date=date(2026, 12, 31),
        )
        self.october_day = self.make_log(date(2026, 10, 5))
        self.november_day = self.make_log(date(2026, 11, 3))
        self.client.force_authenticate(self.provider_user)

    def make_log(self, day):
        return DailyLog.objects.create(application=self.application, date=day, hours=6, tasks="برمجة")

    def test_provider_sees_only_the_days_it_hosted(self):
        response = self.client.get("/api/provider-daily-logs/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([log["id"] for log in response.data["results"]], [self.october_day.id])

        self.client.force_authenticate(self.other_provider_user)
        response = self.client.get("/api/provider-daily-logs/")
        self.assertEqual([log["id"] for log in response.data["results"]], [self.november_day.id])

    def test_provider_confirms_a_day(self):
        response = self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.assertEqual(response.status_code, 200, response.data)
        self.october_day.refresh_from_db()
        self.assertIsNotNone(self.october_day.confirmed_at)
        self.assertEqual(self.october_day.confirmed_by, self.provider_user)
        self.assertTrue(AuditLog.objects.filter(target_type="training.dailylog").exists())

    def test_filter_by_confirmed(self):
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        response = self.client.get("/api/provider-daily-logs/?confirmed=false")
        self.assertEqual(response.data["count"], 0)
        response = self.client.get("/api/provider-daily-logs/?confirmed=true")
        self.assertEqual(response.data["count"], 1)

    def test_day_cannot_be_confirmed_twice(self):
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        response = self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.assertEqual(response.status_code, 400)

    def test_cannot_confirm_another_providers_day(self):
        response = self.client.post(f"/api/provider-daily-logs/{self.november_day.id}/confirm/")
        self.assertEqual(response.status_code, 404)

    def test_cannot_confirm_when_not_in_training(self):
        self.application.status = Status.WITHDRAWN
        self.application.save()
        response = self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.assertEqual(response.status_code, 400)

    @override_settings(TADREEB_REQUIRED_TRAINING_HOURS=12)
    def test_training_completes_when_confirmed_hours_reach_the_requirement(self):
        # BR-06 / D-08: 6 + 6 confirmed hours = 12.
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.IN_TRAINING)

        self.client.force_authenticate(self.other_provider_user)
        self.client.post(f"/api/provider-daily-logs/{self.november_day.id}/confirm/")
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.COMPLETED)
        last = self.application.history.last()
        self.assertEqual((last.to_status, last.changed_by), (Status.COMPLETED, None))
        self.assertTrue(Notification.objects.filter(recipient=self.student, title="اكتمل تدريبك").exists())

    @override_settings(TADREEB_REQUIRED_TRAINING_HOURS=12)
    def test_unconfirmed_hours_do_not_count(self):
        # 12 hours are written, but only the October day (6 hours) is confirmed.
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.IN_TRAINING)

    @override_settings(TADREEB_REQUIRED_TRAINING_HOURS=6)
    def test_the_departments_hours_come_first(self):
        # BR-06 / D-08: this department needs 12 hours, not the general 6.
        self.department.required_training_hours = 12
        self.department.save()
        StudentProfile.objects.create(user=self.student, department=self.department)
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.IN_TRAINING)

        self.client.force_authenticate(self.other_provider_user)
        self.client.post(f"/api/provider-daily-logs/{self.november_day.id}/confirm/")
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.COMPLETED)
        self.assertTrue(
            Notification.objects.filter(recipient=self.student, message="اكتملت 12 ساعة تدريب مؤكدة.").exists()
        )

    def test_student_sees_progress_against_the_departments_hours(self):
        self.department.required_training_hours = 24
        self.department.save()
        StudentProfile.objects.create(user=self.student, department=self.department)
        self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")

        self.client.force_authenticate(self.student)
        response = self.client.get(f"/api/daily-logs/progress/?application={self.application.id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["confirmed_hours"], 6)
        self.assertEqual(response.data["required_hours"], 24)
        self.assertEqual(response.data["remaining_hours"], 18)
        self.assertEqual(response.data["percent"], 25)

        other = User.objects.create_user(username="20259999", password="x", role=User.Role.STUDENT)
        self.client.force_authenticate(other)
        response = self.client.get(f"/api/daily-logs/progress/?application={self.application.id}")
        self.assertEqual(response.status_code, 404)

    def test_student_cannot_confirm(self):
        self.client.force_authenticate(self.student)
        response = self.client.post(f"/api/provider-daily-logs/{self.october_day.id}/confirm/")
        self.assertEqual(response.status_code, 403)


@override_settings(MEDIA_ROOT=MEDIA)
class ReportApiTests(APITestCase):
    """FR-23: the student uploads reports; the supervisor comments and grades."""

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(MEDIA, ignore_errors=True)

    def setUp(self):
        self.student = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.other_student = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.sup = User.objects.create_user(username="sup1", password="x", role=User.Role.SUPERVISOR)
        self.other_sup = User.objects.create_user(username="sup2", password="x", role=User.Role.SUPERVISOR)
        self.coordinator = User.objects.create_user(username="coord", password="x", role=User.Role.COORDINATOR)
        self.application = Application.objects.create(
            student=self.student, status=Status.IN_TRAINING, supervisor=self.sup
        )
        self.other_application = Application.objects.create(
            student=self.other_student, status=Status.IN_TRAINING, supervisor=self.other_sup
        )

    def upload(self, application=None, name="report.pdf"):
        return self.client.post(
            "/api/reports/",
            {
                "application": (application or self.application).id,
                "title": "التقرير الأسبوعي الأول",
                "file": SimpleUploadedFile(name, b"%PDF-1.4"),
            },
            format="multipart",
        )

    def make_report(self, application=None, grade=None):
        report = Report.objects.create(
            application=application or self.application,
            title="تقرير",
            file=SimpleUploadedFile("r.pdf", b"%PDF-1.4"),
        )
        if grade is not None:
            Report.objects.filter(pk=report.pk).update(grade=grade, graded_at="2026-10-20T10:00Z")
            report.refresh_from_db()
        return report

    def test_student_uploads_a_report_and_the_supervisor_is_notified(self):
        self.client.force_authenticate(self.student)
        response = self.upload()
        self.assertEqual(response.status_code, 201, response.data)
        self.assertIsNone(response.data["grade"])
        self.assertTrue(
            Notification.objects.filter(recipient=self.sup, kind=Notification.Kind.REPORT).exists()
        )

    def test_rejected_on_another_students_application(self):
        self.client.force_authenticate(self.student)
        response = self.upload(self.other_application)
        self.assertEqual(response.status_code, 400)

    def test_rejected_before_training(self):
        self.application.status = Status.ASSIGNED
        self.application.save()
        self.client.force_authenticate(self.student)
        self.assertEqual(self.upload().status_code, 400)

    def test_rejected_for_a_wrong_file_type(self):
        self.client.force_authenticate(self.student)
        self.assertEqual(self.upload(name="report.exe").status_code, 400)

    def test_student_cannot_grade(self):
        report = self.make_report()
        self.client.force_authenticate(self.student)
        response = self.client.post(f"/api/reports/{report.id}/grade/", {"grade": 100}, format="json")
        self.assertEqual(response.status_code, 403)

    def test_supervisor_grades_and_the_student_is_notified(self):
        report = self.make_report()
        self.client.force_authenticate(self.sup)
        response = self.client.post(
            f"/api/reports/{report.id}/grade/",
            {"grade": "87.5", "supervisor_comment": "عمل ممتاز"},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        report.refresh_from_db()
        self.assertEqual(report.grade, Decimal("87.5"))
        self.assertEqual(report.graded_by, self.sup)
        self.assertTrue(
            Notification.objects.filter(recipient=self.student, kind=Notification.Kind.REPORT).exists()
        )

    def test_grade_must_be_out_of_100(self):
        report = self.make_report()
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/reports/{report.id}/grade/", {"grade": 120}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_another_supervisor_cannot_grade(self):
        report = self.make_report()
        self.client.force_authenticate(self.other_sup)
        response = self.client.post(f"/api/reports/{report.id}/grade/", {"grade": 90}, format="json")
        self.assertEqual(response.status_code, 404)

    def test_grade_is_locked_after_approval(self):
        report = self.make_report()
        self.application.status = Status.APPROVED
        self.application.save()
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/reports/{report.id}/grade/", {"grade": 90}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_graded_report_cannot_be_deleted(self):
        ungraded = self.make_report()
        graded = self.make_report(grade=80)
        self.client.force_authenticate(self.student)
        self.assertEqual(self.client.delete(f"/api/reports/{graded.id}/").status_code, 400)
        self.assertEqual(self.client.delete(f"/api/reports/{ungraded.id}/").status_code, 204)

    def test_who_sees_which_reports(self):
        mine = self.make_report()
        theirs = self.make_report(self.other_application)

        self.client.force_authenticate(self.student)
        ids = [r["id"] for r in self.client.get("/api/reports/").data["results"]]
        self.assertEqual(ids, [mine.id])

        self.client.force_authenticate(self.sup)
        ids = [r["id"] for r in self.client.get("/api/reports/").data["results"]]
        self.assertEqual(ids, [mine.id])

        self.client.force_authenticate(self.coordinator)
        ids = {r["id"] for r in self.client.get("/api/reports/").data["results"]}
        self.assertEqual(ids, {mine.id, theirs.id})

    def test_average_report_grade(self):
        self.assertIsNone(average_report_grade(self.application))
        self.make_report(grade=80)
        self.make_report(grade=90)
        self.make_report()  # not graded yet, so not counted
        self.assertEqual(average_report_grade(self.application), Decimal("85"))
