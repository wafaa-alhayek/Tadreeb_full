import shutil
import tempfile
from datetime import date

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User
from providers.models import Opportunity, Provider

from .models import Application, ApplicationDocument, StatusChange
from .status import Status

MEDIA = tempfile.mkdtemp()


@override_settings(MEDIA_ROOT=MEDIA)
class ApplicationApiTests(APITestCase):
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(MEDIA, ignore_errors=True)

    def setUp(self):
        it = Department.objects.create(name="تقنية المعلومات")
        self.software = Specialization.objects.create(department=it, name="هندسة برمجيات")
        self.networks = Specialization.objects.create(department=it, name="شبكات")

        self.sara = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        StudentProfile.objects.create(
            user=self.sara, department=it, specialization=self.software, completed_credit_hours=95
        )

        provider = Provider.objects.create(
            name="شركة التقنية", sector="تقنية", city="غزة", contact_name="أحمد", contact_phone="0599"
        )
        self.opps = [self.opportunity(provider, f"فرصة {i}") for i in range(4)]
        self.client.force_authenticate(self.sara)

    def opportunity(self, provider, title, specialization=None, status=Opportunity.Status.OPEN):
        return Opportunity.objects.create(
            provider=provider,
            specialization=specialization or self.software,
            title=title,
            tasks="مهام",
            seats=2,
            start_date=date(2026, 11, 1),
            end_date=date(2027, 1, 31),
            location="غزة",
            status=status,
        )

    def create_draft(self, opportunity_ids=None):
        ids = [o.id for o in self.opps[:2]] if opportunity_ids is None else opportunity_ids
        response = self.client.post("/api/applications/", {"opportunity_ids": ids}, format="json")
        self.assertEqual(response.status_code, 201, response.data)
        return response.data

    # --- building a draft (FR-11) ---

    def test_create_draft_with_ranked_preferences(self):
        data = self.create_draft([self.opps[2].id, self.opps[0].id])
        self.assertEqual(data["status"], "draft")
        self.assertEqual(
            [(p["rank"], p["opportunity"]) for p in data["preferences"]],
            [(1, self.opps[2].id), (2, self.opps[0].id)],
        )
        self.assertEqual(data["allowed_actions"], ["submitted"])

    def test_at_most_three_preferences(self):
        response = self.client.post(
            "/api/applications/", {"opportunity_ids": [o.id for o in self.opps]}, format="json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("3", str(response.data))

    def test_same_opportunity_twice_is_rejected(self):
        response = self.client.post(
            "/api/applications/", {"opportunity_ids": [self.opps[0].id] * 2}, format="json"
        )
        self.assertEqual(response.status_code, 400)

    def test_closed_or_other_specialization_opportunities_are_rejected(self):
        provider = self.opps[0].provider
        closed = self.opportunity(provider, "مغلقة", status=Opportunity.Status.CLOSED)
        networks = self.opportunity(provider, "شبكات", specialization=self.networks)
        for bad in (closed, networks):
            response = self.client.post(
                "/api/applications/", {"opportunity_ids": [bad.id]}, format="json"
            )
            self.assertEqual(response.status_code, 400, bad.title)

    def test_only_one_open_application(self):
        self.create_draft()
        response = self.client.post("/api/applications/", {}, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("طلب مفتوح", str(response.data))

    def test_change_preferences_while_draft(self):
        draft = self.create_draft()
        response = self.client.patch(
            f"/api/applications/{draft['id']}/", {"opportunity_ids": [self.opps[3].id]}, format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p["opportunity"] for p in response.data["preferences"]], [self.opps[3].id])

    def test_delete_draft(self):
        draft = self.create_draft()
        self.assertEqual(self.client.delete(f"/api/applications/{draft['id']}/").status_code, 204)
        self.assertFalse(Application.objects.exists())

    # --- documents (FR-11, BR-08) ---

    def upload(self, application_id, name="cv.pdf", content=b"%PDF-1.4"):
        return self.client.post(
            "/api/application-documents/",
            {"application": application_id, "title": "السيرة الذاتية", "file": SimpleUploadedFile(name, content)},
            format="multipart",
        )

    def test_attach_and_remove_a_document(self):
        draft = self.create_draft()
        response = self.upload(draft["id"])
        self.assertEqual(response.status_code, 201, response.data)
        detail = self.client.get(f"/api/applications/{draft['id']}/").data
        self.assertEqual(detail["documents"][0]["title"], "السيرة الذاتية")
        self.assertEqual(self.client.delete(f"/api/application-documents/{response.data['id']}/").status_code, 204)
        self.assertFalse(ApplicationDocument.objects.exists())

    def test_wrong_file_type_is_rejected(self):
        draft = self.create_draft()
        self.assertEqual(self.upload(draft["id"], name="virus.exe").status_code, 400)

    # --- submitting (FR-11, FR-12) ---

    def test_submit_locks_the_application_and_records_history(self):
        draft = self.create_draft()
        response = self.client.post(f"/api/applications/{draft['id']}/submit/")
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "submitted")
        self.assertIsNotNone(response.data["submitted_at"])
        self.assertEqual(response.data["allowed_actions"], [])
        self.assertEqual(response.data["history"][0]["to_status"], "submitted")
        self.assertEqual(StatusChange.objects.get().changed_by, self.sara)

        # Section 2.5: submitted applications are locked.
        edit = self.client.patch(
            f"/api/applications/{draft['id']}/", {"opportunity_ids": [self.opps[3].id]}, format="json"
        )
        self.assertEqual(edit.status_code, 400)
        self.assertEqual(self.upload(draft["id"]).status_code, 400)
        self.assertEqual(self.client.delete(f"/api/applications/{draft['id']}/").status_code, 400)
        self.assertEqual(self.client.post(f"/api/applications/{draft['id']}/submit/").status_code, 400)

    def test_ineligible_student_cannot_submit(self):
        draft = self.create_draft()
        StudentProfile.objects.filter(user=self.sara).update(completed_credit_hours=40)
        response = self.client.post(f"/api/applications/{draft['id']}/submit/")
        self.assertEqual(response.status_code, 400)
        self.assertIn("eligibility", response.data)
        self.assertEqual(Application.objects.get().status, Status.DRAFT)

    def test_submit_needs_at_least_one_preference(self):
        draft = self.create_draft([])
        self.assertEqual(self.client.post(f"/api/applications/{draft['id']}/submit/").status_code, 400)

    def test_cannot_submit_if_an_opportunity_closed_meanwhile(self):
        draft = self.create_draft()
        Opportunity.objects.filter(id=self.opps[0].id).update(status=Opportunity.Status.CLOSED)
        self.assertEqual(self.client.post(f"/api/applications/{draft['id']}/submit/").status_code, 400)

    # --- privacy and permissions (NFR-18, FR-04) ---

    def test_students_only_see_their_own_applications(self):
        draft = self.create_draft()
        omar = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.client.force_authenticate(omar)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 0)
        self.assertEqual(self.client.get(f"/api/applications/{draft['id']}/").status_code, 404)
        self.assertEqual(self.upload(draft["id"]).status_code, 400)

    def test_other_roles_cannot_use_the_student_endpoints(self):
        supervisor = User.objects.create_user(username="sup", password="x", role=User.Role.SUPERVISOR)
        self.client.force_authenticate(supervisor)
        self.assertEqual(self.client.post("/api/applications/", {}, format="json").status_code, 403)
