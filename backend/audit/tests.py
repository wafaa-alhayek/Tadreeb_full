from datetime import timedelta

from django.contrib.admin.sites import site
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import RequestFactory, TestCase
from django.utils import timezone
from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, User
from imports.students import COLUMNS, build_workbook
from providers.models import Opportunity, Provider

from .models import AuditLog, diff, log_action, snapshot

URL = "/api/audit-logs/"


def make_provider(**extra):
    data = {
        "name": "شركة التقنية المتقدمة",
        "sector": "تكنولوجيا المعلومات",
        "city": "غزة",
        "contact_name": "أحمد خالد",
        "contact_phone": "0599123456",
    }
    data.update(extra)
    return Provider.objects.create(**data)


class LogActionTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="coordinator", role=User.Role.COORDINATOR)
        self.request = RequestFactory().post("/", REMOTE_ADDR="10.0.0.7")
        self.request.user = self.user

    def test_records_who_what_and_where(self):
        provider = make_provider()
        log = log_action(self.request, AuditLog.Action.UPDATE, provider, {"city": {"from": "غزة", "to": "رفح"}})
        self.assertEqual(log.actor, self.user)
        self.assertEqual(log.target_type, "providers.provider")
        self.assertEqual(log.target_id, str(provider.id))
        self.assertEqual(log.target_repr, "شركة التقنية المتقدمة")
        self.assertEqual(log.ip_address, "10.0.0.7")
        self.assertIsNotNone(log.created_at)

    def test_never_stores_passwords(self):
        user = User.objects.create_user(username="someone", password="Secret123!")
        self.assertNotIn("password", snapshot(user))
        log = log_action(self.request, AuditLog.Action.UPDATE, user, {
            "password": {"from": "a", "to": "b"}, "new_password": "x", "email": {"from": "", "to": "a@b.c"},
        })
        self.assertEqual(list(log.changes), ["email"])

    def test_diff_keeps_only_changed_fields(self):
        self.assertEqual(
            diff({"city": "غزة", "seats": 3}, {"city": "رفح", "seats": 3}),
            {"city": {"from": "غزة", "to": "رفح"}},
        )

    def test_works_without_a_logged_in_user(self):
        log = log_action(None, AuditLog.Action.IMPORT, Provider)
        self.assertIsNone(log.actor)
        self.assertEqual(log.target_id, "")
        self.assertEqual(log.target_repr, "جهات التدريب")


class ProviderWorkIsLoggedTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(username="coordinator", role=User.Role.COORDINATOR)
        self.provider_user = User.objects.create_user(username="provider", role=User.Role.PROVIDER)
        self.student = User.objects.create_user(username="student", role=User.Role.STUDENT)
        department = Department.objects.create(name="تكنولوجيا المعلومات")
        self.programming = Specialization.objects.create(department=department, name="برمجة")
        self.provider = make_provider(user=self.provider_user)
        self.client.force_authenticate(self.coordinator)

    def last_log(self):
        return AuditLog.objects.first()

    def test_create_provider(self):
        response = self.client.post("/api/providers/", {
            "name": "مستشفى الشفاء", "sector": "الصحة", "city": "غزة",
            "contact_name": "محمد علي", "contact_phone": "082345678",
        })
        self.assertEqual(response.status_code, 201)
        log = self.last_log()
        self.assertEqual((log.action, log.actor, log.target_id), ("create", self.coordinator, str(response.data["id"])))
        self.assertEqual(log.changes["name"], {"from": None, "to": "مستشفى الشفاء"})

    def test_update_provider_logs_before_and_after(self):
        response = self.client.patch(
            f"/api/providers/{self.provider.id}/",
            {"city": "رفح", "accepted_specializations": [self.programming.id]},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        log = self.last_log()
        self.assertEqual(log.action, "update")
        self.assertEqual(log.changes, {
            "city": {"from": "غزة", "to": "رفح"},
            "accepted_specializations": {"from": [], "to": [self.programming.id]},
        })

    def test_provider_editing_its_own_record_is_logged_as_the_provider(self):
        self.client.force_authenticate(self.provider_user)
        self.client.patch(f"/api/providers/{self.provider.id}/", {"contact_phone": "0590000000"})
        self.assertEqual(self.last_log().actor, self.provider_user)

    def test_saving_without_changes_is_not_logged(self):
        self.client.patch(f"/api/providers/{self.provider.id}/", {"city": "غزة"})
        self.assertFalse(AuditLog.objects.exists())

    def test_delete_provider(self):
        provider_id = self.provider.id
        response = self.client.delete(f"/api/providers/{provider_id}/")
        self.assertEqual(response.status_code, 204)
        log = self.last_log()
        self.assertEqual((log.action, log.target_id, log.target_repr), ("delete", str(provider_id), "شركة التقنية المتقدمة"))
        self.assertEqual(log.changes["city"], {"from": "غزة", "to": None})

    def test_refused_requests_are_not_logged(self):
        self.client.force_authenticate(self.student)
        self.client.delete(f"/api/providers/{self.provider.id}/")
        self.client.force_authenticate(self.coordinator)
        self.client.post("/api/providers/", {"name": ""})
        self.assertFalse(AuditLog.objects.exists())

    def test_opportunity_create_update_delete(self):
        response = self.client.post("/api/opportunities/", {
            "provider": self.provider.id, "specialization": self.programming.id, "title": "مطور ويب",
            "tasks": "برمجة", "seats": 2, "start_date": "2026-11-01", "end_date": "2027-01-31", "location": "غزة",
        })
        self.assertEqual(response.status_code, 201)
        url = f"/api/opportunities/{response.data['id']}/"
        self.client.patch(url, {"seats": 5})
        self.client.delete(url)

        logs = AuditLog.objects.filter(target_type="providers.opportunity").order_by("id")
        self.assertEqual([log.action for log in logs], ["create", "update", "delete"])
        self.assertEqual(logs[1].changes, {"seats": {"from": 2, "to": 5}})
        self.assertEqual(logs[0].changes["start_date"]["to"], "2026-11-01")
        self.assertFalse(Opportunity.objects.exists())


class ImportIsLoggedTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(username="coordinator", role=User.Role.COORDINATOR)
        department = Department.objects.create(name="تكنولوجيا المعلومات")
        Specialization.objects.create(department=department, name="برمجة")
        self.client.force_authenticate(self.coordinator)

    def upload(self, hours, query=""):
        row = {
            "username": "120260001", "first_name": "أحمد", "last_name": "خالد",
            "email": "a@example.com", "department": "تكنولوجيا المعلومات", "specialization": "برمجة",
            "completed_credit_hours": hours, "academic_status": "منتظم", "gpa": None, "phone": None,
        }
        file = SimpleUploadedFile("students.xlsx", build_workbook([[row[f] for _, f, _ in COLUMNS]]))
        return self.client.post("/api/imports/students/" + query, {"file": file}, format="multipart")

    def test_saved_import_is_logged(self):
        self.assertEqual(self.upload(95).status_code, 200)
        log = AuditLog.objects.get()
        self.assertEqual((log.action, log.actor, log.target_type), ("import", self.coordinator, "accounts.studentprofile"))
        self.assertEqual(log.changes, {"file": "students.xlsx", "created": 1, "updated": 0})

    def test_dry_run_and_failed_imports_are_not_logged(self):
        self.upload(95, query="?dry_run=1")
        self.upload(-1)
        self.assertFalse(AuditLog.objects.exists())


class AuditLogApiTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(username="admin", role=User.Role.ADMIN)
        self.coordinator = User.objects.create_user(username="coordinator", role=User.Role.COORDINATOR)
        provider = make_provider()
        self.old = AuditLog.objects.create(
            actor=self.coordinator, action="create", target_type="providers.provider",
            target_id=str(provider.id), target_repr=str(provider),
        )
        AuditLog.objects.filter(id=self.old.id).update(created_at=timezone.now() - timedelta(days=10))
        self.new = AuditLog.objects.create(
            actor=self.admin, action="import", target_type="accounts.studentprofile", target_repr="طلاب",
        )
        self.client.force_authenticate(self.admin)

    def ids(self, query=""):
        response = self.client.get(URL + query)
        self.assertEqual(response.status_code, 200)
        return [row["id"] for row in response.data["results"]]

    def test_admin_sees_the_log_newest_first(self):
        self.assertEqual(self.ids(), [self.new.id, self.old.id])
        row = self.client.get(f"{URL}{self.old.id}/").data
        self.assertEqual((row["actor_username"], row["action_display"]), ("coordinator", "إنشاء"))

    def test_filters(self):
        today = timezone.localdate()
        self.assertEqual(self.ids(f"?actor={self.coordinator.id}"), [self.old.id])
        self.assertEqual(self.ids("?action=import"), [self.new.id])
        self.assertEqual(self.ids("?target_type=providers.provider"), [self.old.id])
        self.assertEqual(self.ids(f"?from={today - timedelta(days=1)}"), [self.new.id])
        self.assertEqual(self.ids(f"?to={today - timedelta(days=5)}"), [self.old.id])

    def test_other_roles_are_forbidden(self):
        for role in (User.Role.COORDINATOR, User.Role.SUPERVISOR, User.Role.PROVIDER, User.Role.STUDENT):
            self.client.force_authenticate(User.objects.filter(role=role).first()
                                           or User.objects.create_user(username=role, role=role))
            self.assertEqual(self.client.get(URL).status_code, 403, role)

    def test_must_be_logged_in(self):
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get(URL).status_code, 401)

    def test_log_cannot_be_changed_through_the_api(self):
        self.assertEqual(self.client.post(URL, {"action": "delete"}).status_code, 405)
        self.assertEqual(self.client.patch(f"{URL}{self.old.id}/", {"action": "delete"}).status_code, 405)
        self.assertEqual(self.client.put(f"{URL}{self.old.id}/", {"action": "delete"}).status_code, 405)
        self.assertEqual(self.client.delete(f"{URL}{self.old.id}/").status_code, 405)
        self.assertEqual(AuditLog.objects.count(), 2)

    def test_admin_panel_is_read_only(self):
        request = RequestFactory().get("/")
        request.user = User.objects.create_superuser(username="root", password="Root12345!")
        model_admin = site._registry[AuditLog]
        self.assertFalse(model_admin.has_add_permission(request))
        self.assertFalse(model_admin.has_change_permission(request, self.old))
        self.assertFalse(model_admin.has_delete_permission(request, self.old))
        self.assertTrue(model_admin.has_view_permission(request, self.old))
