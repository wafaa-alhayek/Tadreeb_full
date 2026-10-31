from django.test import RequestFactory, TestCase

from . import errors


class ErrorPageTests(TestCase):
    def test_unknown_api_path_gets_an_arabic_json_message(self):
        response = self.client.get("/api/does-not-exist/")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response["Content-Type"], "application/json")
        self.assertEqual(response.json()["detail"], errors.NOT_FOUND)

    def test_unknown_page_gets_an_arabic_html_page(self):
        response = self.client.get("/nothing-here/")
        self.assertEqual(response.status_code, 404)
        self.assertIn("text/html", response["Content-Type"])
        self.assertIn(errors.NOT_FOUND, response.content.decode())

    def test_server_error_is_a_polite_json_message_for_the_api(self):
        response = errors.server_error(RequestFactory().get("/api/anything/"))
        self.assertEqual(response.status_code, 500)
        self.assertIn(errors.SERVER_ERROR, response.content.decode())

    def test_server_error_is_a_polite_html_page_elsewhere(self):
        response = errors.server_error(RequestFactory().get("/anything/"))
        self.assertEqual(response.status_code, 500)
        self.assertIn("text/html", response["Content-Type"])
        self.assertIn(errors.SERVER_ERROR, response.content.decode())