from rest_framework.test import APITestCase

from accounts.models import User

from .models import Provider


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