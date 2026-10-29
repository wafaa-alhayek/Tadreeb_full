from datetime import date

from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User
from applications.models import Application, Placement
from applications.status import Status
from notifications.models import Notification
from providers.models import Opportunity, Provider
from training.models import DailyLog

from .models import Certificate


class CertificateTestData(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(username="coord", password="x", role=User.Role.COORDINATOR)
        self.sup = User.objects.create_user(
            username="sup1", password="x", role=User.Role.SUPERVISOR, first_name="خالد", last_name="سالم"
        )
        self.student = User.objects.create_user(
            username="20251234", password="x", role=User.Role.STUDENT, first_name="سارة", last_name="أحمد"
        )
        self.other_student = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.provider_user = User.objects.create_user(username="prov1", password="x", role=User.Role.PROVIDER)
        self.other_provider_user = User.objects.create_user(username="prov2", password="x", role=User.Role.PROVIDER)
        department = Department.objects.create(name="تقنية المعلومات")
        specialization = Specialization.objects.create(department=department, name="هندسة برمجيات")
        StudentProfile.objects.create(user=self.student, department=department, specialization=specialization)
        provider = Provider.objects.create(
            name="شركة التقنية",
            sector="تقنية",
            city="غزة",
            contact_name="مسؤول",
            contact_phone="0599000000",
            user=self.provider_user,
        )
        opportunity = Opportunity.objects.create(
            provider=provider,
            specialization=specialization,
            title="تطوير الويب",
            tasks="مهام",
            start_date=date(2026, 9, 1),
            end_date=date(2026, 10, 31),
            location="غزة",
        )
        self.application = Application.objects.create(
            student=self.student, status=Status.COMPLETED, supervisor=self.sup
        )
        self.placement = Placement.objects.create(
            application=self.application,
            opportunity=opportunity,
            start_date=opportunity.start_date,
            end_date=opportunity.end_date,
        )
        DailyLog.objects.create(
            application=self.application, date=date(2026, 9, 2), hours=6, tasks="x", confirmed_at="2026-09-02T12:00Z"
        )
        DailyLog.objects.create(
            application=self.application, date=date(2026, 9, 3), hours="4.5", tasks="x", confirmed_at="2026-09-03T12:00Z"
        )
        # Not confirmed by the provider, so it doesn't count.
        DailyLog.objects.create(application=self.application, date=date(2026, 9, 4), hours=8, tasks="x")

    def approve(self):
        self.client.force_authenticate(self.coordinator)
        return self.client.post(f"/api/applications/{self.application.id}/approve/")


class IssueCertificateTests(CertificateTestData):
    def test_approval_issues_the_certificate(self):
        response = self.approve()
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], Status.CERTIFIED)

        certificate = Certificate.objects.get(application=self.application)
        self.assertRegex(certificate.serial_number, r"^TDR-\d{4}-\d{5}$")
        self.assertEqual(certificate.student_name, "سارة أحمد")
        self.assertEqual(certificate.specialization, "هندسة برمجيات")
        self.assertEqual(certificate.provider_name, "شركة التقنية")
        self.assertEqual(float(certificate.total_hours), 10.5)
        history = list(self.application.history.values_list("to_status", "changed_by"))
        self.assertEqual(history[-1], (Status.CERTIFIED, None))  # done by the system
        self.assertTrue(
            Notification.objects.filter(recipient=self.student, title="تم إصدار شهادة التدريب").exists()
        )

    def test_coordinator_issues_for_an_approved_application_without_one(self):
        self.application.status = Status.APPROVED
        self.application.save()
        self.client.force_authenticate(self.coordinator)
        response = self.client.post("/api/certificates/", {"application": self.application.id}, format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.CERTIFIED)
        self.assertEqual(Certificate.objects.get().issued_by, self.coordinator)

    def test_not_issued_before_approval(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post("/api/certificates/", {"application": self.application.id}, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertFalse(Certificate.objects.exists())

    def test_not_issued_twice(self):
        self.approve()
        self.application.refresh_from_db()
        self.application.status = Status.APPROVED
        self.application.save()
        response = self.client.post("/api/certificates/", {"application": self.application.id}, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Certificate.objects.count(), 1)

    def test_approval_without_placement_is_rolled_back(self):
        self.placement.delete()
        response = self.approve()
        self.assertEqual(response.status_code, 400)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.COMPLETED)

    def test_only_the_coordinator_approves(self):
        self.client.force_authenticate(self.sup)
        response = self.client.post(f"/api/applications/{self.application.id}/approve/")
        self.assertEqual(response.status_code, 403)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.COMPLETED)

    def test_student_cannot_issue(self):
        self.application.status = Status.APPROVED
        self.application.save()
        self.client.force_authenticate(self.student)
        response = self.client.post("/api/certificates/", {"application": self.application.id}, format="json")
        self.assertEqual(response.status_code, 403)


class CertificateAccessTests(CertificateTestData):
    def setUp(self):
        super().setUp()
        self.approve()
        self.certificate = Certificate.objects.get()

    def test_who_sees_the_certificate(self):
        for user, count in ((self.student, 1), (self.other_student, 0), (self.sup, 1), (self.coordinator, 1)):
            self.client.force_authenticate(user)
            self.assertEqual(self.client.get("/api/certificates/").data["count"], count, user)

    def test_student_downloads_the_pdf(self):
        self.client.force_authenticate(self.student)
        response = self.client.get(f"/api/certificates/{self.certificate.id}/pdf/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/pdf")
        self.assertTrue(response.content.startswith(b"%PDF"))

    def test_public_verification_needs_no_login(self):
        self.client.force_authenticate(None)
        response = self.client.get(f"/api/certificates/verify/{self.certificate.verification_code}/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["is_valid"])
        self.assertEqual(response.data["serial_number"], self.certificate.serial_number)
        self.assertNotIn("revoke_reason", response.data)

        page = self.client.get(f"/verify/{self.certificate.verification_code}/")
        self.assertContains(page, "شهادة صحيحة")

    def test_unknown_code_is_not_found(self):
        self.client.force_authenticate(None)
        code = "00000000-0000-0000-0000-000000000000"
        self.assertEqual(self.client.get(f"/api/certificates/verify/{code}/").status_code, 404)
        self.assertEqual(self.client.get(f"/verify/{code}/").status_code, 404)

    def test_revoked_certificate_shows_as_invalid(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/certificates/{self.certificate.id}/revoke/", {"reason": "خطأ في البيانات"}, format="json"
        )
        self.assertEqual(response.status_code, 200, response.data)

        self.client.force_authenticate(None)
        response = self.client.get(f"/api/certificates/verify/{self.certificate.verification_code}/")
        self.assertFalse(response.data["is_valid"])
        self.assertContains(self.client.get(f"/verify/{self.certificate.verification_code}/"), "ملغاة")

        self.client.force_authenticate(self.student)
        self.assertEqual(self.client.get(f"/api/certificates/{self.certificate.id}/pdf/").status_code, 404)

    def test_revoking_needs_a_reason_and_the_coordinator(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(f"/api/certificates/{self.certificate.id}/revoke/", {}, format="json")
        self.assertEqual(response.status_code, 400)
        self.client.force_authenticate(self.sup)
        response = self.client.post(
            f"/api/certificates/{self.certificate.id}/revoke/", {"reason": "x"}, format="json"
        )
        self.assertEqual(response.status_code, 403)


class GuidanceLetterTests(CertificateTestData):
    """FR-17"""

    def url(self):
        return f"/api/placements/{self.placement.id}/letter/"

    def test_allowed_users_download_the_letter(self):
        for user in (self.student, self.sup, self.provider_user, self.coordinator):
            self.client.force_authenticate(user)
            response = self.client.get(self.url())
            self.assertEqual(response.status_code, 200, user)
            self.assertEqual(response["Content-Type"], "application/pdf")
            self.assertTrue(response.content.startswith(b"%PDF"))

    def test_others_cannot_see_the_letter(self):
        for user in (self.other_student, self.other_provider_user):
            self.client.force_authenticate(user)
            self.assertEqual(self.client.get(self.url()).status_code, 404, user)

    def test_login_is_required(self):
        self.assertEqual(self.client.get(self.url()).status_code, 401)
