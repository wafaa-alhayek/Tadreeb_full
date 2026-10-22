from rest_framework.test import APITestCase

from accounts.models import User

from .models import Notification, notify


class NotificationApiTests(APITestCase):
    def setUp(self):
        self.sara = User.objects.create_user(username="20251234", password="x", role=User.Role.STUDENT)
        self.omar = User.objects.create_user(username="20255678", password="x", role=User.Role.STUDENT)
        self.old = notify(self.sara, Notification.Kind.REPORT, "تنبيه بخصوص التقرير")
        self.new = notify(self.sara, Notification.Kind.APPLICATION, "تحديث حالة طلب التدريب", "تم تحديث حالة طلبك.")
        self.omars = notify(self.omar, Notification.Kind.TRAINING, "إشعار عمر")
        self.client.force_authenticate(self.sara)

    def test_list_shows_only_my_notifications_newest_first(self):
        response = self.client.get("/api/notifications/")
        self.assertEqual(response.status_code, 200)
        ids = [item["id"] for item in response.data["results"]]
        self.assertEqual(ids, [self.new.id, self.old.id])
        self.assertEqual(response.data["results"][0]["message"], "تم تحديث حالة طلبك.")

    def test_unread_filter(self):
        self.old.is_read = True
        self.old.save()
        response = self.client.get("/api/notifications/?unread=true")
        self.assertEqual([item["id"] for item in response.data["results"]], [self.new.id])

    def test_mark_one_as_read(self):
        response = self.client.post(f"/api/notifications/{self.new.id}/read/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["is_read"])
        self.new.refresh_from_db()
        self.assertTrue(self.new.is_read)

    def test_cannot_touch_someone_elses_notification(self):
        response = self.client.post(f"/api/notifications/{self.omars.id}/read/")
        self.assertEqual(response.status_code, 404)
        self.omars.refresh_from_db()
        self.assertFalse(self.omars.is_read)

    def test_read_all_only_marks_mine(self):
        response = self.client.post("/api/notifications/read-all/")
        self.assertEqual(response.data, {"marked_read": 2})
        self.assertFalse(Notification.objects.filter(recipient=self.sara, is_read=False).exists())
        self.omars.refresh_from_db()
        self.assertFalse(self.omars.is_read)

    def test_unread_count(self):
        self.assertEqual(self.client.get("/api/notifications/unread-count/").data, {"unread": 2})
        self.client.post(f"/api/notifications/{self.new.id}/read/")
        self.assertEqual(self.client.get("/api/notifications/unread-count/").data, {"unread": 1})

    def test_login_required(self):
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get("/api/notifications/").status_code, 401)

    def test_notifications_cannot_be_created_or_deleted_through_the_api(self):
        self.assertEqual(self.client.post("/api/notifications/", {"title": "x"}).status_code, 405)
        # There is no /api/notifications/<id>/ address at all, so DELETE finds nothing.
        self.assertEqual(self.client.delete(f"/api/notifications/{self.new.id}/").status_code, 404)
        self.assertTrue(Notification.objects.filter(id=self.new.id).exists())
