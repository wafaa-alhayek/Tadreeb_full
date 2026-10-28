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
| GET / PATCH | `/api/students/me/` | student only; PATCH `phone`, `email`, `cv` | profile + `eligibility` |
| GET | `/api/students/?search=&department=&specialization=&academic_status=` | supervisor, coordinator, admin | 20 per page |
| GET / PATCH | `/api/students/<id>/` | supervisor, coordinator, admin | profile + `eligibility` |
| GET | `/api/departments/` | any logged-in user | departments with `specializations` |

The access token lasts 1 day. Every endpoint except health needs the header. Login accepts the university ID or the email in `username`.

Student profile shape:

```json
{
  "id": 1, "university_id": "20251234", "full_name": "سارة أحمد", "email": "sara@example.com",
  "phone": "0599123456", "department": 1, "department_name": "تقنية المعلومات",
  "specialization": 1, "specialization_name": "هندسة برمجيات",
  "completed_credit_hours": 95, "gpa": null, "academic_status": "active", "cv": null,
  "eligibility": {"is_eligible": true, "reasons": [], "min_credit_hours": 90}
}
```

Eligibility (BR-01) uses `TADREEB_MIN_CREDIT_HOURS` (90 for now, D-01 still open) and `TADREEB_MIN_GPA` (off) in `config/settings.py`. `academic_status` is `active`, `suspended` or `graduated`.

### Application review and placement

Reviewers (academic supervisors and coordinators) use `/api/application-reviews/` to list or retrieve applications and call `POST /api/application-reviews/<id>/transition/` with `target_status` and an optional `reason`. Coordinators can assign accepted applications with `POST /api/application-reviews/<id>/allocate/`, passing an opportunity and, when needed, a supervisor ID. The response includes placement history; opportunity responses include `free_seats`.

الـ APIs لازم تمشي على الاتفاق بـ [docs/TEAM_AGREEMENT.md](../docs/TEAM_AGREEMENT.md) (أسماء الحقول snake_case، التواريخ YYYY-MM-DD، رموز الحالات...).
الواجهة حاليًا بتستخدم بيانات وهمية بنفس الشكل: شوفي `frontend/src/api/mock.js` لتعرفي شو الشكل المتوقع.
