"""Statistics (FR-36), Excel export (FR-37) and the archive search (FR-39).

All three are for the coordinator and the admin, and accept the same filters
(see filter_applications) so the numbers, the export and the archive agree.
"""

from io import BytesIO

from django.db.models import Avg, Count, Q, Sum
from django.http import HttpResponse
from django.utils import timezone
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from openpyxl import Workbook
from rest_framework import mixins, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from accounts.permissions import IsCoordinator
from applications.models import Application, Placement
from applications.status import Status
from certificates.models import Certificate
from evaluations.grades import combine
from evaluations.models import Evaluation
from imports.students import XLSX_CONTENT_TYPE
from providers.models import Opportunity, Provider
from training.models import DailyLog, Report

from .serializers import ArchiveSerializer, StatsSerializer, confirmed_hours, last_placement

# FR-39: the files that are finished and only kept for looking up.
ARCHIVED_STATUSES = [Status.CERTIFIED, Status.REJECTED, Status.WITHDRAWN]

FILTERS = [
    OpenApiParameter("year", OpenApiTypes.INT, description="سنة إنشاء الطلب"),
    OpenApiParameter("department", OpenApiTypes.INT, description="رقم القسم"),
    OpenApiParameter("provider", OpenApiTypes.INT, description="رقم جهة التدريب"),
    OpenApiParameter("status", OpenApiTypes.STR, enum=Status.values),
    OpenApiParameter("search", OpenApiTypes.STR, description="اسم الطالب أو رقمه الجامعي"),
]


class CanSeeReports(IsCoordinator):
    message = "الإحصائيات والتقارير متاحة لمنسق التدريب ومدير النظام فقط."


def filter_applications(applications, params):
    if params.get("year", "").isdigit():
        applications = applications.filter(created_at__year=params["year"])
    if params.get("department", "").isdigit():
        applications = applications.filter(student__student_profile__department_id=params["department"])
    if params.get("provider", "").isdigit():
        applications = applications.filter(
            placements__opportunity__provider_id=params["provider"]
        ).distinct()
    if params.get("status"):
        applications = applications.filter(status=params["status"])
    search = params.get("search")
    if search:
        applications = applications.filter(
            Q(student__username__icontains=search)
            | Q(student__first_name__icontains=search)
            | Q(student__last_name__icontains=search)
        )
    return applications


def with_details(applications):
    return applications.select_related(
        "student__student_profile__department",
        "student__student_profile__specialization",
        "supervisor",
        "certificate",
    ).prefetch_related("placements__opportunity__provider", "daily_logs", "reports", "evaluations")


class Base(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [CanSeeReports]


class StatsView(Base):
    """GET /api/stats/: the numbers for the coordinator's dashboard (FR-36)."""

    @extend_schema(parameters=FILTERS, responses=StatsSerializer)
    def get(self, request):
        applications = filter_applications(Application.objects.all(), request.query_params)
        by_status = dict(
            applications.order_by().values_list("status").annotate(n=Count("id")).values_list("status", "n")
        )
        logs = DailyLog.objects.filter(application__in=applications)
        reports = Report.objects.filter(application__in=applications)
        certificates = Certificate.objects.filter(application__in=applications)
        open_opportunities = Opportunity.objects.filter(status=Opportunity.Status.OPEN)
        active_placements = Placement.objects.filter(is_active=True, application__in=applications)

        by_department = (
            applications.values("student__student_profile__department__name")
            .annotate(
                applications=Count("id"),
                certified=Count("id", filter=Q(status=Status.CERTIFIED)),
            )
            .order_by("-applications")
        )
        by_provider = (
            Provider.objects.annotate(
                active_placements=Count(
                    "opportunities__placements",
                    filter=Q(
                        opportunities__placements__is_active=True,
                        opportunities__placements__application__in=applications,
                    ),
                )
            )
            .filter(active_placements__gt=0)
            .order_by("-active_placements")
            .values("id", "name", "active_placements")
        )
        seats = open_opportunities.aggregate(total=Sum("seats"))["total"] or 0
        taken = Placement.objects.filter(is_active=True, opportunity__in=open_opportunities).count()
        data = {
            "students": User.objects.filter(role=User.Role.STUDENT, is_active=True).count(),
            "applications": {
                "total": applications.count(),
                "by_status": {code: by_status.get(code, 0) for code in Status.values},
            },
            "providers": {
                "total": Provider.objects.count(),
                "approved": Provider.objects.filter(status=Provider.Status.APPROVED).count(),
            },
            "opportunities": {
                "open": open_opportunities.count(),
                "seats": seats,
                "free_seats": max(seats - taken, 0),
            },
            "placements": {"active": active_placements.count()},
            "training": {
                "confirmed_hours": logs.filter(confirmed_at__isnull=False).aggregate(t=Sum("hours"))["t"] or 0,
                "pending_days": logs.filter(confirmed_at__isnull=True).count(),
            },
            "reports": {
                "submitted": reports.count(),
                "graded": reports.filter(grade__isnull=False).count(),
                "average_grade": reports.aggregate(avg=Avg("grade"))["avg"],
            },
            "certificates": {
                "issued": certificates.count(),
                "revoked": certificates.filter(revoked_at__isnull=False).count(),
            },
            "by_department": [
                {
                    "department": row["student__student_profile__department__name"] or "",
                    "applications": row["applications"],
                    "certified": row["certified"],
                }
                for row in by_department
            ],
            "by_provider": list(by_provider),
        }
        return Response(StatsSerializer(data).data)


EXPORT_COLUMNS = [
    "رقم الطلب",
    "الرقم الجامعي",
    "اسم الطالب",
    "القسم",
    "التخصص",
    "الحالة",
    "جهة التدريب",
    "فرصة التدريب",
    "بداية التدريب",
    "نهاية التدريب",
    "المشرف الأكاديمي",
    "الساعات المؤكدة",
    "معدل التقارير",
    "الدرجة النهائية",
    "رقم الشهادة",
    "تاريخ التقديم",
]


def full_name(user):
    return (user.get_full_name() or user.username) if user else ""


def export_final_grade(application, report_grades):
    """BR-04's total from the prefetched evaluations and reports, without more queries."""
    totals = {evaluation.kind: evaluation.total for evaluation in application.evaluations.all()}
    reports = sum(report_grades) / len(report_grades) if report_grades else None
    return combine(totals.get(Evaluation.Kind.PROVIDER), totals.get(Evaluation.Kind.SUPERVISOR), reports)["total"]


def export_row(application):
    profile = getattr(application.student, "student_profile", None)
    placement = last_placement(application)
    grades = [r.grade for r in application.reports.all() if r.grade is not None]
    final = export_final_grade(application, grades)
    certificate = getattr(application, "certificate", None)
    return [
        application.pk,
        application.student.username,
        full_name(application.student),
        profile.department.name if profile and profile.department else "",
        profile.specialization.name if profile and profile.specialization else "",
        application.get_status_display(),
        placement.opportunity.provider.name if placement else "",
        placement.opportunity.title if placement else "",
        placement.start_date if placement else None,
        placement.end_date if placement else None,
        full_name(application.supervisor),
        float(confirmed_hours(application)),
        round(float(sum(grades) / len(grades)), 2) if grades else None,
        float(final) if final is not None else None,
        certificate.serial_number if certificate else "",
        timezone.localtime(application.submitted_at).date() if application.submitted_at else None,
    ]


class ApplicationsExportView(Base):
    """GET /api/exports/applications/: the filtered applications as an Excel sheet (FR-37)."""

    @extend_schema(parameters=FILTERS, responses={(200, XLSX_CONTENT_TYPE): OpenApiTypes.BINARY})
    def get(self, request):
        applications = filter_applications(with_details(Application.objects.all()), request.query_params)
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "الطلبات"
        sheet.sheet_view.rightToLeft = True
        sheet.append(EXPORT_COLUMNS)
        for application in applications.order_by("pk"):
            sheet.append(export_row(application))
        for column in sheet.columns:
            sheet.column_dimensions[column[0].column_letter].width = 18
        buffer = BytesIO()
        workbook.save(buffer)
        response = HttpResponse(buffer.getvalue(), content_type=XLSX_CONTENT_TYPE)
        response["Content-Disposition"] = (
            f'attachment; filename="applications-{timezone.localdate():%Y-%m-%d}.xlsx"'
        )
        return response


class ArchiveViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """/api/archive/: finished files (certified, rejected, withdrawn) to search later (FR-39)."""

    serializer_class = ArchiveSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [CanSeeReports]

    def get_queryset(self):
        archived = with_details(Application.objects.filter(status__in=ARCHIVED_STATUSES))
        return filter_applications(archived, self.request.query_params).order_by("-updated_at", "-id")

    @extend_schema(parameters=FILTERS)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
