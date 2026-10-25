from django.urls import path

from .views import StudentImportView, StudentTemplateView

# Under /api/imports/, not /api/students/: the students router would read
# "import" as a student id.
urlpatterns = [
    path("students/template/", StudentTemplateView.as_view(), name="student-import-template"),
    path("students/", StudentImportView.as_view(), name="student-import"),
]
