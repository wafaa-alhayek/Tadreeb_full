# الخادم (Back-End) — وفاء

To run Django + Django REST Framework, copy these commands into your terminal (Linux/macOS):

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

On Windows PowerShell, activate with `.venv\Scripts\Activate.ps1` instead.

### Login API

| Method | URL | Body | Returns |
|---|---|---|---|
| POST | `/api/auth/login/` | `{"username", "password"}` | `{"access", "refresh"}` |
| POST | `/api/auth/refresh/` | `{"refresh"}` | `{"access"}` |
| GET | `/api/auth/me/` | header `Authorization: Bearer <access>` | `{"id", "username", "full_name", "role"}` |
| GET | `/api/health/` | public | `{"status": "ok"}` |

The access token lasts 1 day. Every endpoint except health needs the header.

الـ APIs لازم تمشي على الاتفاق بـ [docs/TEAM_AGREEMENT.md](../docs/TEAM_AGREEMENT.md) (أسماء الحقول snake_case، التواريخ YYYY-MM-DD، رموز الحالات...).
الواجهة حاليًا بتستخدم بيانات وهمية بنفس الشكل: شوفي `frontend/src/api/mock.js` لتعرفي شو الشكل المتوقع.
