from django.db.models import Q
from rest_framework import mixins, viewsets
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import Department, StudentProfile
from .permissions import IsStaffRole, IsStudent
from .serializers import (
    DepartmentSerializer,
    MeSerializer,
    StudentProfileSerializer,
    StudentSelfUpdateSerializer,
)


@api_view(["GET"])
def me(request):
    return Response(MeSerializer(request.user).data)


@api_view(["GET", "PATCH"])
@permission_classes([IsStudent])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def my_student_profile(request):
    """GET /api/students/me/: the logged-in student's profile and eligibility (FR-05, FR-06)."""
    profile, _ = StudentProfile.objects.get_or_create(user=request.user)
    if request.method == "PATCH":
        serializer = StudentSelfUpdateSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    return Response(StudentProfileSerializer(profile, context={"request": request}).data)



class StudentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """/api/students/: list, search and edit students (supervisor, coordinator, admin)."""

    serializer_class = StudentProfileSerializer
    permission_classes = [IsStaffRole]
    http_method_names = ["get", "patch", "head", "options"]

    def get_queryset(self):
        queryset = StudentProfile.objects.select_related(
            "user", "department", "specialization"
        ).order_by("user__username")
        params = self.request.query_params
        search = params.get("search")
        if search:
            queryset = queryset.filter(
                Q(user__username__icontains=search)
                | Q(user__first_name__icontains=search)
                | Q(user__last_name__icontains=search)
                | Q(user__email__icontains=search)
            )
        for field in ("department", "specialization", "academic_status"):
            if params.get(field):
                queryset = queryset.filter(**{field: params[field]})
        return queryset


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    """/api/departments/: departments with their specializations, for forms and filters."""

    queryset = Department.objects.prefetch_related("specializations").order_by("name")
    serializer_class = DepartmentSerializer
    pagination_class = None
