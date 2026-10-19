from rest_framework.test import APITestCase

from .models import User


class AuthTests(APITestCase):
    def setUp(self):
        User.objects.create_user(
            username="20251234",
            password="Test12345!",
            first_name="سارة",
            last_name="أحمد",
            role=User.Role.STUDENT,
        )

    def login(self):
        response = self.client.post(
            "/api/auth/login/", {"username": "20251234", "password": "Test12345!"}
        )
        self.assertEqual(response.status_code, 200)
        return response.data

    def test_login_returns_access_and_refresh(self):
        tokens = self.login()
        self.assertIn("access", tokens)
        self.assertIn("refresh", tokens)

    def test_wrong_password_is_rejected(self):
        response = self.client.post(
            "/api/auth/login/", {"username": "20251234", "password": "wrong"}
        )
        self.assertEqual(response.status_code, 401)

    def test_me_returns_the_logged_in_user(self):
        access = self.login()["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], "20251234")
        self.assertEqual(response.data["full_name"], "سارة أحمد")
        self.assertEqual(response.data["role"], "student")
        self.assertNotIn("password", response.data)

    def test_me_without_token_is_401(self):
        self.assertEqual(self.client.get("/api/auth/me/").status_code, 401)

    def test_refresh_returns_new_access(self):
        refresh = self.login()["refresh"]
        response = self.client.post("/api/auth/refresh/", {"refresh": refresh})
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)

    def test_health_is_public(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"status": "ok"})

    def test_cors_allows_the_front_end(self):
        response = self.client.get(
            "/api/health/", HTTP_ORIGIN="http://localhost:5173"
        )
        self.assertEqual(
            response["Access-Control-Allow-Origin"], "http://localhost:5173"
        )
