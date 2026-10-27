from datetime import date

from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User
from audit.models import AuditLog
from notifications.models import Notification
from providers.models import Opportunity, Provider

from .models import Application, Placement
from .status import Status


class ReviewAndAllocationTests(APITestCase):
    def setUp(self):
        it = Department.objects.create(name="تقنية المعلومات")
        self.software = Specialization.objects.create(department=it, name="هندسة برمجيات")
        self.networks = Specialization.objects.create(department=it, name="شبكات")

        self.coordinator = self.user("coord", User.Role.COORDINATOR)
        self.supervisor = self.user("sup1", User.Role.SUPERVISOR)
        self.other_supervisor = self.user("sup2", User.Role.SUPERVISOR)
        self.admin = self.user("admin", User.Role.ADMIN)

        self.provider_user = self.user("company", User.Role.PROVIDER)
        self.provider = self.make_provider("شركة التقنية", self.provider_user)
        self.other_provider_user = self.user("company2", User.Role.PROVIDER)
        self.make_provider("شركة أخرى", self.other_provider_user)

        self.opportunity = self.make_opportunity("مطوّر ويب", seats=1)
        self.sara = self.student("20251234", "سارة")
        self.application = self.submitted_application(self.sara)

    # --- helpers ---

    def user(self, username, role, first_name=""):
        return User.objects.create_user(username=username, password="x", role=role, first_name=first_name)

    def make_provider(self, name, user):
        return Provider.objects.create(
            name=name, sector="تقنية", city="غزة", contact_name="أحمد", contact_phone="0599", user=user
        )

    def make_opportunity(self, title, seats=1, specialization=None, status=Opportunity.Status.OPEN):
        return Opportunity.objects.create(
            provider=self.provider,
            specialization=specialization or self.software,
            title=title,
            tasks="مهام",
            seats=seats,
            start_date=date(2026, 11, 1),
            end_date=date(2027, 1, 31),
            location="غزة",
            status=status,
        )

    def student(self, username, first_name):
        student = self.user(username, User.Role.STUDENT, first_name)
        StudentProfile.objects.create(user=student, specialization=self.software, completed_credit_hours=95)
        return student

    def submitted_application(self, student):
        application = Application.objects.create(student=student)
        application.preferences.create(opportunity=self.opportunity, rank=1)
        application.move_to(Status.SUBMITTED, student)
        return application

    def as_user(self, user):
        self.client.force_authenticate(user)

    def post(self, action, data=None, application=None):
        application = application or self.application
        return self.client.post(f"/api/applications/{application.id}/{action}/", data or {}, format="json")

    def accepted(self):
        """Assign the supervisor and accept, as most allocation tests need."""
        self.application.supervisor = self.supervisor
        self.application.save()
        self.application.move_to(Status.UNDER_REVIEW, self.supervisor)
        self.application.move_to(Status.ACCEPTED, self.supervisor)

    # --- who sees what (Section 2.2, NFR-18) ---

    def test_coordinator_sees_submitted_but_not_drafts(self):
        Application.objects.create(student=self.student("20259999", "عمر"))  # a draft
        self.as_user(self.coordinator)
        ids = [a["id"] for a in self.client.get("/api/applications/").data["results"]]
        self.assertEqual(ids, [self.application.id])

    def test_supervisor_sees_only_assigned_students(self):
        self.as_user(self.supervisor)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 0)
        self.application.supervisor = self.supervisor
        self.application.save()
        self.assertEqual(self.client.get("/api/applications/").data["count"], 1)
        self.as_user(self.other_supervisor)
        self.assertEqual(self.client.get(f"/api/applications/{self.application.id}/").status_code, 404)

    def test_submitting_notifies_the_coordinators(self):
        omar = self.student("20255678", "عمر")
        draft = Application.objects.create(student=omar)
        draft.preferences.create(opportunity=self.opportunity, rank=1)
        self.as_user(omar)
        self.assertEqual(self.post("submit", application=draft).status_code, 200)
        notification = Notification.objects.get(recipient=self.coordinator)
        self.assertEqual(notification.title, "طلب تدريب جديد")
        self.assertIn("عمر", notification.message)

    # --- assigning a supervisor (FR-18) ---

    def test_coordinator_assigns_a_supervisor(self):
        self.as_user(self.coordinator)
        response = self.post("assign-supervisor", {"supervisor": self.supervisor.id})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["supervisor"], self.supervisor.id)
        self.assertTrue(Notification.objects.filter(recipient=self.supervisor, title="طالب جديد تحت إشرافك").exists())
        self.assertTrue(AuditLog.objects.filter(action=AuditLog.Action.UPDATE, target_id=str(self.application.id)).exists())

    def test_only_a_supervisor_can_be_assigned(self):
        self.as_user(self.coordinator)
        self.assertEqual(self.post("assign-supervisor", {"supervisor": self.sara.id}).status_code, 400)

    def test_supervisors_cannot_assign_supervisors(self):
        self.application.supervisor = self.supervisor
        self.application.save()
        self.as_user(self.supervisor)
        self.assertEqual(self.post("assign-supervisor", {"supervisor": self.other_supervisor.id}).status_code, 403)

    # --- reviewing (FR-13) ---

    def test_supervisor_reviews_and_accepts(self):
        self.application.supervisor = self.supervisor
        self.application.save()
        self.as_user(self.supervisor)
        self.assertEqual(self.post("transition", {"status": "under_review"}).status_code, 200)
        response = self.post("transition", {"status": "accepted"})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "accepted")
        self.assertEqual([h["to_status"] for h in response.data["history"]], ["submitted", "under_review", "accepted"])
        self.assertTrue(Notification.objects.filter(recipient=self.sara, message__contains="«مقبول»").exists())
        self.assertEqual(AuditLog.objects.filter(action=AuditLog.Action.STATUS_CHANGE).count(), 2)

    def test_rejection_needs_a_reason_and_the_student_sees_it(self):
        self.as_user(self.coordinator)
        self.post("transition", {"status": "under_review"})
        self.assertEqual(self.post("transition", {"status": "rejected"}).status_code, 400)
        response = self.post("transition", {"status": "rejected", "reason": "المستندات ناقصة"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["status_reason"], "المستندات ناقصة")
        self.assertTrue(Notification.objects.filter(recipient=self.sara, message__contains="المستندات ناقصة").exists())

    def test_students_and_admins_cannot_review(self):
        for user in (self.sara, self.admin):
            self.as_user(user)
            self.assertEqual(self.post("transition", {"status": "under_review"}).status_code, 403, user.role)

    def test_transition_only_accepts_review_moves(self):
        self.as_user(self.coordinator)
        self.assertEqual(self.post("transition", {"status": "assigned"}).status_code, 400)
        self.assertEqual(self.post("transition", {"status": "accepted"}).status_code, 400)  # skips review

    # --- allocating (FR-14) ---

    def test_allocate_creates_a_placement_and_notifies_the_provider(self):
        self.accepted()
        self.as_user(self.supervisor)
        response = self.post("allocate", {"opportunity": self.opportunity.id})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "assigned")
        self.assertEqual(response.data["placement"]["opportunity"], self.opportunity.id)
        self.assertEqual(response.data["placement"]["provider_name"], "شركة التقنية")
        self.assertEqual(self.opportunity.free_seats(), 0)
        self.assertTrue(Notification.objects.filter(recipient=self.provider_user, title="طالب موزّع عليكم").exists())

    def test_cannot_allocate_without_a_free_seat(self):
        self.accepted()
        omar = self.student("20255678", "عمر")
        omar_application = self.submitted_application(omar)
        Placement.objects.create(
            application=omar_application, opportunity=self.opportunity,
            start_date=date(2026, 11, 1), end_date=date(2027, 1, 31),
        )
        self.as_user(self.supervisor)
        response = self.post("allocate", {"opportunity": self.opportunity.id})
        self.assertEqual(response.status_code, 400)
        self.assertIn("مقاعد", str(response.data))

    def test_cannot_allocate_to_a_closed_or_other_specialization_opportunity(self):
        self.accepted()
        closed = self.make_opportunity("مغلقة", status=Opportunity.Status.CLOSED)
        networks = self.make_opportunity("شبكات", specialization=self.networks)
        self.as_user(self.supervisor)
        for opportunity in (closed, networks):
            self.assertEqual(self.post("allocate", {"opportunity": opportunity.id}).status_code, 400, opportunity.title)
        self.assertFalse(Placement.objects.exists())

    def test_can_only_allocate_accepted_applications(self):
        self.application.supervisor = self.supervisor
        self.application.save()
        self.as_user(self.supervisor)
        self.assertEqual(self.post("allocate", {"opportunity": self.opportunity.id}).status_code, 400)
        self.assertFalse(Placement.objects.exists())

    def test_allocation_needs_an_assigned_supervisor(self):
        self.application.move_to(Status.UNDER_REVIEW, self.coordinator)
        self.application.move_to(Status.ACCEPTED, self.coordinator)
        self.as_user(self.coordinator)
        response = self.post("allocate", {"opportunity": self.opportunity.id})
        self.assertEqual(response.status_code, 400)
        self.assertIn("مشرف", str(response.data))

    def test_opportunity_api_shows_free_seats(self):
        self.as_user(self.coordinator)
        response = self.client.get(f"/api/opportunities/{self.opportunity.id}/")
        self.assertEqual(response.data["free_seats"], 1)

    # --- the provider (FR-16, NFR-18) ---

    def allocated(self):
        self.accepted()
        self.as_user(self.supervisor)
        self.post("allocate", {"opportunity": self.opportunity.id})

    def test_provider_sees_and_confirms_its_allocated_student(self):
        self.as_user(self.provider_user)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 0)  # not allocated yet
        self.allocated()
        self.as_user(self.provider_user)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 1)

        response = self.post("confirm")
        self.assertEqual(response.status_code, 200, response.data)
        self.assertIsNotNone(response.data["placement"]["provider_confirmed_at"])
        self.assertTrue(Notification.objects.filter(recipient=self.sara, title="تأكيد جهة التدريب").exists())
        self.assertTrue(Notification.objects.filter(recipient=self.supervisor, title="تأكيد جهة التدريب").exists())
        self.assertEqual(self.post("confirm").status_code, 400)  # only once

    def test_other_providers_cannot_see_or_confirm(self):
        self.allocated()
        self.as_user(self.other_provider_user)
        self.assertEqual(self.client.get("/api/applications/").data["count"], 0)
        self.assertEqual(self.post("confirm").status_code, 404)

    # --- withdrawal (FR-31) ---

    def test_withdrawal_closes_the_placement_and_frees_the_seat(self):
        self.allocated()
        self.as_user(self.supervisor)
        self.assertEqual(self.post("transition", {"status": "withdrawn"}).status_code, 400)  # needs a reason
        response = self.post("transition", {"status": "withdrawn", "reason": "ظروف صحية"})
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "withdrawn")
        self.assertIsNone(response.data["placement"])
        placement = Placement.objects.get()
        self.assertFalse(placement.is_active)
        self.assertEqual(placement.close_reason, "ظروف صحية")
        self.assertEqual(self.opportunity.free_seats(), 1)
        self.assertTrue(Notification.objects.filter(recipient=self.provider_user, title="انسحاب متدرب").exists())
