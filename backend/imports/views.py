from django.db import transaction
from django.http import HttpResponse
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import StudentProfile
from accounts.permissions import IsCoordinator
from audit.models import AuditLog, log_action

from .serializers import StudentImportResultSerializer, StudentImportSerializer
from .students import XLSX_CONTENT_TYPE, build_template, import_students


class CanImportStudents(IsCoordinator):
    """FR-03: the coordinator and the admin create student accounts."""

    message = "استيراد الطلاب متاح لمنسق التدريب ومدير النظام فقط."


class StudentTemplateView(APIView):
    """GET /api/imports/students/template/: an empty sheet with the right columns."""

    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [CanImportStudents]

    @extend_schema(responses={(200, XLSX_CONTENT_TYPE): OpenApiTypes.BINARY})
    def get(self, request):
        response = HttpResponse(build_template(), content_type=XLSX_CONTENT_TYPE)
        response["Content-Disposition"] = 'attachment; filename="students_template.xlsx"'
        return response


class StudentImportView(APIView):
    """POST /api/imports/students/: create or update students from an Excel file (FR-03).

    Nothing is saved if any row has an error. Add ?dry_run=1 to only check the file.
    """

    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [CanImportStudents]
    parser_classes = [MultiPartParser]

    @extend_schema(
        request={"multipart/form-data": StudentImportSerializer},
        parameters=[
            OpenApiParameter(
                "dry_run", OpenApiTypes.BOOL, description="1 = افحص الملف بدون حفظ"
            )
        ],
        responses={200: StudentImportResultSerializer, 400: StudentImportResultSerializer},
    )
    def post(self, request):
        serializer = StudentImportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        dry_run = request.query_params.get("dry_run", "").lower() in ("1", "true")
        file = serializer.validated_data["file"]
        with transaction.atomic():  # The students and their log line are saved together.
            result = import_students(file, dry_run=dry_run)
            if result["saved"]:
                log_action(request, AuditLog.Action.IMPORT, StudentProfile, {
                    "file": file.name, "created": result["created"], "updated": result["updated"],
                })
        return Response(result, status=400 if result["errors"] else 200)
