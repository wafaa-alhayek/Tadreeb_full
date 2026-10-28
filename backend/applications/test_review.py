from datetime import date

from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, User
from notifications.models import Notification
from providers.models import Opportunity, Provider

from .models import Application, Placement, Preference, StatusChange
from .status import Status


class ApplicationReviewApiTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(
            username="coord1", password="test-pass", role=User.Role.COORDINATOR
        )
        self.supervisor = User.objects.create_user(
            username="sup1", password="test-pass", role=User.Role.SUPERVISOR
        )
        self.other_supervisor = User.objects.create_user(
            username="sup2", password="test-pass", role=User.Role.SUPERVISOR
        )
        self.student = User.objects.create_user(
            username="student1", password="test-pass", role=User.Role.STUDENT
        )
        self.other_student = User.objects.create_user(
            username="student2", password="test-pass", role=User.Role.STUDENT
        )
        department = Department.objects.create(name="تقنية المعلومات")
        self.specialization = Specialization.objects.create(
            department=department, name="برمجة"
        )
        self.provider = Provider.objects.create(
            name="شركة التقنية",
            sector="تقنية",
            city="غزة",
            contact_name="مسؤول",
            contact_phone="0599000000",
        )
        self.opportunity = Opportunity.objects.create(
            provider=self.provider,
            specialization=self.specialization,
            title="تطوير برمجيات",
            tasks="مهام التدريب",
            seats=1,
            start_date=date(2026, 11, 1),
            end_date=date(2027, 1, 31),
            location="غزة",
        )
        self.application = self.make_application(
            self.student, Status.SUBMITTED, self.supervisor
        )
        self.other_application = self.make_application(
            self.other_student, Status.SUBMITTED, self.other_supervisor
        )

    def make_application(self, student, status, supervisor=None):
        return Application.objects.create(
            student=student, status=status, supervisor=supervisor
        )

    def add_preference(self, application, opportunity=None):
        Preference.objects.create(
            application=application,
            opportunity=opportunity or self.opportunity,
            rank=1,
        )

    def test_supervisor_sees_only_assigned_applications(self):
        self.client.force_authenticate(self.supervisor)
        response = self.client.get("/api/application-reviews/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [item["id"] for item in response.data["results"]],
            [self.application.id],
        )

    def test_coordinator_sees_all_applications(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.get("/api/application-reviews/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            {item["id"] for item in response.data["results"]},
            {self.application.id, self.other_application.id},
        )

    def test_student_cannot_access_review_queue(self):
        self.client.force_authenticate(self.student)
        response = self.client.get("/api/application-reviews/")
        self.assertEqual(response.status_code, 403)

    def test_reviewer_transitions_application_and_notifies_student(self):
        self.client.force_authenticate(self.supervisor)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/transition/",
            {"target_status": Status.UNDER_REVIEW},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.UNDER_REVIEW)
        self.assertEqual(StatusChange.objects.get().changed_by, self.supervisor)
        notification = Notification.objects.get(recipient=self.student)
        self.assertIn("قيد المراجعة", notification.message)

    def test_supervisor_cannot_change_another_supervisors_application(self):
        self.client.force_authenticate(self.supervisor)
        response = self.client.post(
            f"/api/application-reviews/{self.other_application.id}/transition/",
            {"target_status": Status.UNDER_REVIEW},
            format="json",
        )
        self.assertEqual(response.status_code, 404)

    def test_rejection_requires_a_reason(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/transition/",
            {"target_status": Status.REJECTED},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, Status.SUBMITTED)

    def test_assigned_status_cannot_be_set_without_a_placement(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/transition/",
            {"target_status": Status.ASSIGNED},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(Placement.objects.exists())

    def test_coordinator_allocates_accepted_application_and_notifies_users(self):
        self.application.status = Status.ACCEPTED
        self.application.supervisor = None
        self.application.save()
        self.add_preference(self.application)
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/allocate/",
            {
                "opportunity": self.opportunity.id,
                "supervisor": self.supervisor.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        self.application.refresh_from_db()
        placement = Placement.objects.get(application=self.application)
        self.assertEqual(self.application.status, Status.ASSIGNED)
        self.assertEqual(self.application.supervisor, self.supervisor)
        self.assertEqual(placement.opportunity, self.opportunity)
        self.assertEqual(placement.start_date, self.opportunity.start_date)
        self.assertTrue(
            Notification.objects.filter(
                recipient=self.student, title="تم توزيعك على فرصة تدريب"
            ).exists()
        )
        self.assertTrue(
            Notification.objects.filter(
                recipient=self.supervisor, title="تم إسناد طالب إليك"
            ).exists()
        )
        self.assertEqual(self.opportunity.free_seats(), 0)

    def test_allocation_requires_a_student_preference(self):
        self.application.status = Status.ACCEPTED
        self.application.save()
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/allocate/",
            {"opportunity": self.opportunity.id, "supervisor": self.supervisor.id},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(Placement.objects.exists())

    def test_allocation_rejects_full_opportunity(self):
        self.application.status = Status.ACCEPTED
        self.application.save()
        self.add_preference(self.application)
        other = self.other_application
        other.status = Status.ASSIGNED
        other.save()
        Placement.objects.create(
            application=other,
            opportunity=self.opportunity,
            start_date=self.opportunity.start_date,
            end_date=self.opportunity.end_date,
        )
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/allocate/",
            {"opportunity": self.opportunity.id, "supervisor": self.supervisor.id},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Placement.objects.count(), 1)

    def test_supervisor_can_allocate_only_their_assigned_application(self):
        self.application.status = Status.ACCEPTED
        self.application.save()
        self.add_preference(self.application)
        self.client.force_authenticate(self.supervisor)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/allocate/",
            {"opportunity": self.opportunity.id},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)

    def test_withdrawal_closes_the_active_placement(self):
        self.application.status = Status.IN_TRAINING
        self.application.save()
        placement = Placement.objects.create(
            application=self.application,
            opportunity=self.opportunity,
            start_date=self.opportunity.start_date,
            end_date=self.opportunity.end_date,
        )
        self.client.force_authenticate(self.supervisor)
        response = self.client.post(
            f"/api/application-reviews/{self.application.id}/transition/",
            {"target_status": Status.WITHDRAWN, "reason": "ظروف صحية"},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        placement.refresh_from_db()
        self.assertFalse(placement.is_active)
        self.assertIsNotNone(placement.closed_at)
        self.assertEqual(placement.close_reason, "ظروف صحية")
