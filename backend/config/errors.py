from django.http import HttpResponse, JsonResponse

NOT_FOUND = "الصفحة أو العنصر المطلوب غير موجود."
SERVER_ERROR = "حدث خطأ غير متوقع. تم تسجيل المشكلة، حاول مرة أخرى بعد قليل."

PAGE = """<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تدريب</title>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 4rem 1rem;">
<h1>تدريب</h1>
<p>MESSAGE</p>
</body>
</html>
"""


def respond(request, status, message):
    """NFR-10: a clear, polite message in Arabic instead of a crash page."""
    if request.path.startswith("/api/"):
        return JsonResponse({"detail": message}, status=status, json_dumps_params={"ensure_ascii": False})
    return HttpResponse(PAGE.replace("MESSAGE", message), status=status)


def not_found(request, exception=None):
    return respond(request, 404, NOT_FOUND)


def server_error(request):
    # The traceback itself is written to logs/errors.log (LOGGING in settings.py).
    return respond(request, 500, SERVER_ERROR)