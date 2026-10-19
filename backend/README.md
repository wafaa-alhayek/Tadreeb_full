# الخادم (Back-End) — وفاء

to run Django + Django REST Framework. copy this command in you terminal:
'''
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py runserver
'''

الـ APIs لازم تمشي على الاتفاق بـ [docs/TEAM_AGREEMENT.md](../docs/TEAM_AGREEMENT.md) (أسماء الحقول snake_case، التواريخ YYYY-MM-DD، رموز الحالات...).
الواجهة حاليًا بتستخدم بيانات وهمية بنفس الشكل: شوفي `frontend/src/api/mock.js` لتعرفي شو الشكل المتوقع.
