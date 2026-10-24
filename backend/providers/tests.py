from rest_framework.test import APITestCase

from accounts.models import Department, Specialization, StudentProfile, User

from .models import Opportunity, Provider


class ProviderApiTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(
            username="coordinator", password="Test12345!", role=User.Role.COORDINATOR
        )
        self.student = User.objects.create_user(
            username="student", password="Test12345!", role=User.Role.STUDENT
        )
        self.provider_user = User.objects.create_user(
            username="provider", password="Test12345!", role=User.Role.PROVIDER
        )

        self.approved = Provider.objects.create(
            name="شركة التقنية المتقدمة",
            sector="تكنولوجيا المعلومات",
            city="غزة",
            contact_name="أحمد خالد",
            contact_phone="0599123456",
            capacity=20,
            user=self.provider_user,
        )
        self.suspended = Provider.objects.create(
            name="مركز الإبداع الرقمي",
            sector="التقنية والإعلام",
            city="خانيونس",
            contact_name="سارة محمود",
            contact_phone="0599000000",
            capacity=8,
            status=Provider.Status.SUSPENDED,
        )

    def names_in_list(self):
        response = self.client.get("/api/providers/")
        self.assertEqual(response.status_code, 200)
        return [p["name"] for p in response.data["results"]]

    def test_must_be_logged_in(self):
        response = self.client.get("/api/providers/")
        self.assertEqual(response.status_code, 401)

    def test_coordinator_sees_all_providers(self):
        self.client.force_authenticate(self.coordinator)
        self.assertEqual(len(self.names_in_list()), 2)

    def test_student_sees_only_approved_providers(self):
        self.client.force_authenticate(self.student)
        self.assertEqual(self.names_in_list(), ["شركة التقنية المتقدمة"])

    def test_provider_sees_only_its_own_record(self):
        self.client.force_authenticate(self.provider_user)
        self.assertEqual(self.names_in_list(), ["شركة التقنية المتقدمة"])

    def test_coordinator_can_add_a_provider(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            "/api/providers/",
            {
                "name": "مستشفى الشفاء",
                "sector": "الصحة",
                "city": "غزة",
                "contact_name": "محمد علي",
                "contact_phone": "082345678",
                "capacity": 15,
            },
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Provider.objects.count(), 3)

    def test_coordinator_can_suspend_a_provider(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.patch(
            f"/api/providers/{self.approved.id}/", {"status": "suspended"}
        )
        self.assertEqual(response.status_code, 200)
        self.approved.refresh_from_db()
        self.assertEqual(self.approved.status, Provider.Status.SUSPENDED)

    def test_student_cannot_add_a_provider(self):
        self.client.force_authenticate(self.student)
        response = self.client.post("/api/providers/", {"name": "جهة"})
        self.assertEqual(response.status_code, 403)

    def test_student_cannot_delete_a_provider(self):
        self.client.force_authenticate(self.student)
        response = self.client.delete(f"/api/providers/{self.approved.id}/")
        self.assertEqual(response.status_code, 403)
        self.assertTrue(Provider.objects.filter(id=self.approved.id).exists())

    def test_provider_updates_its_own_record(self):
        self.client.force_authenticate(self.provider_user)
        response = self.client.patch(
            f"/api/providers/{self.approved.id}/", {"contact_phone": "0590000000"}
        )
        self.assertEqual(response.status_code, 200)
        self.approved.refresh_from_db()
        self.assertEqual(self.approved.contact_phone, "0590000000")

    def test_provider_cannot_change_its_own_status(self):
        self.client.force_authenticate(self.provider_user)
        self.approved.status = Provider.Status.SUSPENDED
        self.approved.save()
        self.client.patch(f"/api/providers/{self.approved.id}/", {"status": "approved"})
        self.approved.refresh_from_db()
        self.assertEqual(self.approved.status, Provider.Status.SUSPENDED)

    def test_provider_cannot_edit_another_provider(self):
        self.client.force_authenticate(self.provider_user)
        response = self.client.patch(
            f"/api/providers/{self.suspended.id}/", {"contact_phone": "0590000000"}
        )
        self.assertEqual(response.status_code, 404)

    def test_provider_cannot_add_or_delete_providers(self):
        self.client.force_authenticate(self.provider_user)
        response = self.client.post("/api/providers/", {"name": "جهة"})
        self.assertEqual(response.status_code, 403)
        response = self.client.delete(f"/api/providers/{self.approved.id}/")
        self.assertEqual(response.status_code, 403)


class OpportunityApiTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(
            username="coordinator", password="Test12345!", role=User.Role.COORDINATOR
        )
        self.student = User.objects.create_user(
            username="student", password="Test12345!", role=User.Role.STUDENT
        )
        self.provider_user = User.objects.create_user(
            username="provider", password="Test12345!", role=User.Role.PROVIDER
        )

        department = Department.objects.create(name="تكنولوجيا المعلومات")
        self.programming = Specialization.objects.create(department=department, name="برمجة")
        self.networks = Specialization.objects.create(department=department, name="شبكات")
        self.profile = StudentProfile.objects.create(
            user=self.student,
            department=department,
            specialization=self.programming,
            completed_credit_hours=95,
        )

        self.my_provider = Provider.objects.create(
            name="شركة التقنية المتقدمة",
            sector="تكنولوجيا المعلومات",
            city="غزة",
            contact_name="أحمد خالد",
            contact_phone="0599123456",
            user=self.provider_user,
        )
        self.other_provider = Provider.objects.create(
            name="مركز النور التقني",
            sector="تكنولوجيا المعلومات",
            city="خانيونس",
            contact_name="سارة محمود",
            contact_phone="0599000000",
        )

        self.web = self.make_opportunity("مطور ويب متدرب", self.my_provider, self.programming, "غزة", "2026-11-01")
        self.network = self.make_opportunity("فني شبكات", self.other_provider, self.networks, "خانيونس", "2026-12-01")
        self.closed = self.make_opportunity(
            "فرصة مغلقة", self.other_provider, self.programming, "غزة", "2026-11-15",
            status=Opportunity.Status.CLOSED,
        )

    def make_opportunity(self, title, provider, specialization, location, start, **extra):
        return Opportunity.objects.create(
            title=title,
            provider=provider,
            specialization=specialization,
            tasks="مهام التدريب",
            seats=3,
            start_date=start,
            end_date="2027-01-31",
            location=location,
            **extra,
        )

    def titles(self, query=""):
        response = self.client.get(f"/api/opportunities/{query}")
        self.assertEqual(response.status_code, 200)
        return sorted(o["title"] for o in response.data["results"])

    def new_opportunity(self, **changes):
        data = {
            "title": "محلل بيانات متدرب",
            "specialization": self.programming.id,
            "tasks": "تحليل البيانات",
            "seats": 2,
            "start_date": "2026-11-01",
            "end_date": "2027-01-31",
            "location": "غزة",
        }
        data.update(changes)
        return data

    def test_student_sees_only_open_opportunities(self):
        self.client.force_authenticate(self.student)
        self.assertEqual(self.titles(), ["فني شبكات", "مطور ويب متدرب"])

    def test_student_does_not_see_opportunities_of_suspended_providers(self):
        self.other_provider.status = Provider.Status.SUSPENDED
        self.other_provider.save()
        self.client.force_authenticate(self.student)
        self.assertEqual(self.titles(), ["مطور ويب متدرب"])

    def test_coordinator_sees_everything(self):
        self.client.force_authenticate(self.coordinator)
        self.assertEqual(len(self.titles()), 3)

    def test_provider_sees_only_its_own_opportunities(self):
        self.client.force_authenticate(self.provider_user)
        self.assertEqual(self.titles(), ["مطور ويب متدرب"])

    def test_filter_by_specialization_location_and_date(self):
        self.client.force_authenticate(self.student)
        self.assertEqual(self.titles(f"?specialization={self.networks.id}"), ["فني شبكات"])
        self.assertEqual(self.titles("?location=غزة"), ["مطور ويب متدرب"])
        self.assertEqual(self.titles("?start_after=2026-11-15"), ["فني شبكات"])

    def test_provider_publishes_for_its_own_provider_only(self):
        self.client.force_authenticate(self.provider_user)
        response = self.client.post(
            "/api/opportunities/", self.new_opportunity(provider=self.other_provider.id)
        )
        self.assertEqual(response.status_code, 201)
        created = Opportunity.objects.get(id=response.data["id"])
        self.assertEqual(created.provider, self.my_provider)

    def test_coordinator_must_choose_a_provider(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post("/api/opportunities/", self.new_opportunity())
        self.assertEqual(response.status_code, 400)

        response = self.client.post(
            "/api/opportunities/", self.new_opportunity(provider=self.other_provider.id)
        )
        self.assertEqual(response.status_code, 201)

    def test_end_date_must_be_after_start_date(self):
        self.client.force_authenticate(self.coordinator)
        response = self.client.post(
            "/api/opportunities/",
            self.new_opportunity(provider=self.my_provider.id, end_date="2026-10-01"),
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("end_date", response.data)

    def test_provider_cannot_edit_another_providers_opportunity(self):
        self.client.force_authenticate(self.provider_user)
        response = self.client.patch(f"/api/opportunities/{self.network.id}/", {"seats": 10})
        self.assertEqual(response.status_code, 404)

    def test_ineligible_student_sees_the_reason(self):
        self.profile.completed_credit_hours = 60
        self.profile.save()
        self.client.force_authenticate(self.student)
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, 403)
        self.assertIn("60", str(response.data["detail"]))

    def test_student_without_profile_cannot_browse(self):
        self.profile.delete()
        self.client.force_authenticate(User.objects.get(id=self.student.id))
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, 403)

    def test_student_cannot_publish(self):
        self.client.force_authenticate(self.student)
        response = self.client.post(
            "/api/opportunities/", self.new_opportunity(provider=self.my_provider.id)
        )
        self.assertEqual(response.status_code, 403)


class AcceptedSpecializationsTests(APITestCase):
    def setUp(self):
        self.coordinator = User.objects.create_user(
            username="coordinator", password="Test12345!", role=User.Role.COORDINATOR
        )
        department = Department.objects.create(name="تكنولوجيا المعلومات")
        self.programming = Specialization.objects.create(department=department, name="برمجة")
        self.networks = Specialization.objects.create(department=department, name="شبكات")
        self.provider = Provider.objects.create(
            name="شركة التقنية المتقدمة",
            sector="تكنولوجيا المعلومات",
            city="غزة",
            contact_name="أحمد خالد",
            contact_phone="0599123456",
        )
        self.client.force_authenticate(self.coordinator)

    def test_coordinator_sets_accepted_specializations(self):
        response = self.client.patch(
            f"/api/providers/{self.provider.id}/",
            {"accepted_specializations": [self.programming.id, self.networks.id]},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.provider.accepted_specializations.count(), 2)

    def test_list_shows_specialization_names(self):
        self.provider.accepted_specializations.add(self.programming)
        response = self.client.get(f"/api/providers/{self.provider.id}/")
        self.assertEqual(response.data["accepted_specializations"], [self.programming.id])
        self.assertEqual(response.data["accepted_specialization_names"], ["برمجة"])

    def test_accepted_specializations_are_optional(self):
        response = self.client.get(f"/api/providers/{self.provider.id}/")
        self.assertEqual(response.data["accepted_specializations"], [])