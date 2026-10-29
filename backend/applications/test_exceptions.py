from datetime import date

from audit.models import AuditLog
from notifications.models import Notification

from .models import ExceptionRequest, Placement
from .status import Status
from .test_review import ApplicationTestCase

URL = "/api/exception-requests/"


class ExceptionTests(ApplicationTestCase):
    """FR-30–33. Sara is allocated to self.opportunity at شركة التقنية."""

    def setUp(self):
        super().setUp()
        self.allocated()
        self.other_opportunity = self.make_opportunity("مطوّر تطبيقات", seats=1)

    def raise_request(self, user, kind, reason="سبب", **extra):
        self.as_user(user)
        return self.client.post(URL, {"application": self.application.id, "kind": kind, "reason": reason, **extra}, format="json")

    def decide(self, user, exception_id, decision, data=None):
        self.as_user(user)
        return self.client.post(f"{URL}{exception_id}/{decision}/", data or {}, format="json")

    def notified(self, user, title):
        return Notification.objects.filter(recipient=user, title=title).exists()

    # --- change of provider (FR-30, D-12) ---

    def test_change_of_provider_goes_supervisor_then_coordinator(self):
        response = self.raise_request(self.sara, "change_provider", "بعد المسافة", new_opportunity=self.other_opportunity.id)
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["status"], "pending")
        self.assertTrue(self.notified(self.supervisor, "طلب استثناء جديد"))
        exception_id = response.data["id"]

        response = self.decide(self.supervisor, exception_id, "approve")
        self.assertEqual(response.data["status"], "supervisor_approved")
        self.assertTrue(self.notified(self.coordinator, "تغيير جهة تدريب بانتظار التأكيد"))
        self.assertEqual(self.application.active_placement.opportunity, self.opportunity)  # nothing moved yet

        response = self.decide(self.coordinator, exception_id, "approve")
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "approved")

        old = Placement.objects.get(opportunity=self.opportunity)
        self.assertFalse(old.is_active)  # kept, with its daily logs (D-12)
        self.assertIn("بعد المسافة", old.close_reason)
        self.assertEqual(self.application.active_placement.opportunity, self.other_opportunity)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.ASSIGNED)  # still training, somewhere else
        self.assertTrue(self.notified(self.provider_user, "نقل متدرب"))
        self.assertTrue(self.notified(self.sara, "تحديث طلب الاستثناء"))

    def test_coordinator_can_pick_another_opportunity(self):
        third = self.make_opportunity("دعم فني", seats=2)
        exception_id = self.raise_request(self.sara, "change_provider", new_opportunity=self.other_opportunity.id).data["id"]
        self.decide(self.supervisor, exception_id, "approve")
        response = self.decide(self.coordinator, exception_id, "approve", {"opportunity": third.id})
        self.assertEqual(response.data["new_opportunity"], third.id)
        self.assertEqual(self.application.active_placement.opportunity, third)

    def test_each_step_belongs_to_its_person(self):
        exception_id = self.raise_request(self.sara, "change_provider", new_opportunity=self.other_opportunity.id).data["id"]
        self.assertEqual(self.decide(self.coordinator, exception_id, "approve").status_code, 403)  # supervisor first
        self.assertEqual(self.decide(self.other_supervisor, exception_id, "approve").status_code, 404)  # not their student
        self.decide(self.supervisor, exception_id, "approve")
        self.assertEqual(self.decide(self.supervisor, exception_id, "approve").status_code, 403)  # coordinator confirms

    def test_a_failed_change_changes_nothing(self):
        exception_id = self.raise_request(self.sara, "change_provider").data["id"]
        self.decide(self.supervisor, exception_id, "approve")
        self.assertEqual(self.decide(self.coordinator, exception_id, "approve").status_code, 400)  # no opportunity
        full = self.make_opportunity("ممتلئة", seats=0)
        self.assertEqual(self.decide(self.coordinator, exception_id, "approve", {"opportunity": full.id}).status_code, 400)
        self.assertEqual(self.application.active_placement.opportunity, self.opportunity)
        self.assertEqual(ExceptionRequest.objects.get().status, "supervisor_approved")

    def test_providers_see_only_where_the_student_trains_now(self):
        exception_id = self.raise_request(self.sara, "change_provider", new_opportunity=self.other_opportunity.id).data["id"]
        self.decide(self.supervisor, exception_id, "approve")
        # Same provider, other opportunity: still visible. Move to another provider instead.
        other_provider = self.other_provider_user.provider_profile
        elsewhere = self.make_opportunity("فرصة أخرى")
        elsewhere.provider = other_provider
        elsewhere.save()
        self.decide(self.coordinator, exception_id, "approve", {"opportunity": elsewhere.id})

        self.as_user(self.provider_user)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 0)
        self.as_user(self.other_provider_user)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 1)

    # --- withdrawal (FR-31) ---

    def test_student_withdrawal_needs_the_supervisor(self):
        exception_id = self.raise_request(self.sara, "withdrawal", "ظروف عائلية").data["id"]
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.ASSIGNED)

        response = self.decide(self.supervisor, exception_id, "approve")
        self.assertEqual(response.status_code, 200, response.data)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.WITHDRAWN)
        self.assertEqual(self.application.status_reason, "ظروف عائلية")
        self.assertIsNone(self.application.active_placement)

    def test_rejecting_needs_a_note_and_tells_the_student(self):
        exception_id = self.raise_request(self.sara, "withdrawal").data["id"]
        self.assertEqual(self.decide(self.supervisor, exception_id, "reject").status_code, 400)
        response = self.decide(self.supervisor, exception_id, "reject", {"note": "أكملي الأسبوعين الباقيين"})
        self.assertEqual(response.data["status"], "rejected")
        self.assertTrue(Notification.objects.filter(recipient=self.sara, message__contains="الأسبوعين").exists())
        self.assertEqual(self.decide(self.supervisor, exception_id, "approve").status_code, 400)  # already decided

    def test_a_request_that_cannot_be_applied_is_not_saved(self):
        self.application.refresh_from_db()  # allocated through the API since setUp loaded it
        self.application.move_to(Status.IN_TRAINING)
        self.application.move_to(Status.COMPLETED)
        self.assertEqual(self.raise_request(self.supervisor, "withdrawal").status_code, 400)
        self.assertFalse(ExceptionRequest.objects.exists())

    # --- extension (FR-32) ---

    def test_supervisor_extension_applies_straight_away(self):
        response = self.raise_request(self.supervisor, "extension", "غياب مرضي", new_end_date="2027-02-28")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["status"], "approved")
        self.assertEqual(self.application.active_placement.end_date, date(2027, 2, 28))
        self.assertTrue(self.notified(self.sara, "تحديث طلب الاستثناء"))
        self.assertTrue(self.notified(self.provider_user, "تمديد فترة التدريب"))
        self.assertTrue(AuditLog.objects.filter(target_type="applications.placement", changes__has_key="end_date").exists())

    def test_extension_must_move_the_end_date_later(self):
        self.assertEqual(self.raise_request(self.supervisor, "extension").status_code, 400)
        self.assertEqual(self.raise_request(self.supervisor, "extension", new_end_date="2027-01-01").status_code, 400)

    def test_who_can_raise_what(self):
        self.assertEqual(self.raise_request(self.sara, "extension", new_end_date="2027-02-28").status_code, 403)
        self.assertEqual(self.raise_request(self.provider_user, "withdrawal").status_code, 403)
        self.assertEqual(self.raise_request(self.other_provider_user, "issue").status_code, 403)  # not their student
        self.assertEqual(self.raise_request(self.other_supervisor, "withdrawal").status_code, 403)

    # --- issues (FR-33) ---

    def test_provider_issue_is_tracked_until_closed(self):
        response = self.raise_request(self.provider_user, "issue", "تأخر متكرر")
        self.assertEqual(response.status_code, 201, response.data)
        exception_id = response.data["id"]
        self.assertTrue(self.notified(self.supervisor, "طلب استثناء جديد"))
        self.assertEqual(self.decide(self.supervisor, exception_id, "approve").status_code, 400)

        response = self.decide(self.supervisor, exception_id, "close", {"note": "تم التواصل مع الطالبة"})
        self.assertEqual(response.data["status"], "closed")
        self.assertTrue(self.notified(self.provider_user, "تحديث طلب الاستثناء"))
        self.assertTrue(self.notified(self.sara, "تحديث طلب الاستثناء"))

    def test_who_sees_which_requests(self):
        self.raise_request(self.provider_user, "issue")
        self.raise_request(self.sara, "withdrawal")
        counts = {
            self.sara: 2,
            self.supervisor: 2,
            self.coordinator: 2,
            self.provider_user: 1,  # only what it raised
            self.other_supervisor: 0,
            self.other_provider_user: 0,
        }
        for user, count in counts.items():
            self.as_user(user)
            self.assertEqual(self.client.get(URL).data["count"], count, user.username)
        self.as_user(self.coordinator)
        self.assertEqual(self.client.get(URL, {"kind": "issue"}).data["count"], 1)

    # --- general rules ---

    def test_one_open_request_per_kind(self):
        self.assertEqual(self.raise_request(self.sara, "withdrawal").status_code, 201)
        self.assertEqual(self.raise_request(self.sara, "withdrawal").status_code, 400)
        self.assertEqual(self.raise_request(self.sara, "issue").status_code, 201)

    def test_requests_need_an_active_placement(self):
        omar = self.student("20255678", "عمر")
        self.application = self.submitted_application(omar)
        self.application.supervisor = self.supervisor
        self.application.save()
        self.assertEqual(self.raise_request(omar, "issue").status_code, 400)
