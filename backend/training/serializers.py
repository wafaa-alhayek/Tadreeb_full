from django.db import transaction
from django.utils import timezone
from rest_framework import serializers

from applications.status import ACTIVE_PLACEMENT, Status

from .models import DailyLog, TrainingPlan, WeeklyGoal


class DailyLogSerializer(serializers.ModelSerializer):
    """FR-20: the student writes a training day on their own application."""

    class Meta:
        model = DailyLog
        fields = [
            "id",
            "application",
            "date",
            "hours",
            "tasks",
            "notes",
            "confirmed_at",
            "created_at",
        ]
        # The provider confirms a day (BR-05); the student can't set this.
        read_only_fields = ["confirmed_at", "created_at"]

    def validate_application(self, application):
        user = self.context["request"].user
        if application.student_id != user.id:
            raise serializers.ValidationError("هذا الطلب ليس طلبك.")
        if application.status != Status.IN_TRAINING:
            raise serializers.ValidationError(
                "السجل اليومي يُفتح فقط عندما يكون الطلب «قيد التدريب»."
            )
        return application

    def validate_date(self, value):
        if value > timezone.localdate():
            raise serializers.ValidationError("لا يمكن تسجيل يوم في المستقبل.")
        return value


class WeeklyGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyGoal
        fields = ["week_number", "goal"]
        extra_kwargs = {"week_number": {"min_value": 1}}


class TrainingPlanSerializer(serializers.ModelSerializer):
    """FR-19: weekly goals written by the student, approved by the supervisor."""

    goals = WeeklyGoalSerializer(many=True)

    class Meta:
        model = TrainingPlan
        fields = ["id", "application", "status", "goals", "approved_at", "created_at"]
        # The status only changes through the submit / approve actions.
        read_only_fields = ["status", "approved_at", "created_at"]

    def validate_application(self, application):
        if self.instance is not None:
            if application != self.instance.application:
                raise serializers.ValidationError("لا يمكن تغيير طلب الخطة.")
            return application
        user = self.context["request"].user
        if application.student_id != user.id:
            raise serializers.ValidationError("هذا الطلب ليس طلبك.")
        if application.status not in ACTIVE_PLACEMENT:
            raise serializers.ValidationError("تُكتب الخطة بعد توزيعك على جهة تدريب.")
        return application

    def validate_goals(self, goals):
        if not goals:
            raise serializers.ValidationError("أضف هدفاً أسبوعياً واحداً على الأقل.")
        weeks = [goal["week_number"] for goal in goals]
        if len(weeks) != len(set(weeks)):
            raise serializers.ValidationError("رقم الأسبوع مكرر.")
        return goals

    def create(self, validated_data):
        goals = validated_data.pop("goals")
        with transaction.atomic():
            plan = TrainingPlan.objects.create(**validated_data)
            WeeklyGoal.objects.bulk_create([WeeklyGoal(plan=plan, **goal) for goal in goals])
        return plan

    def update(self, plan, validated_data):
        # Only the goals can change; they are replaced as a whole.
        goals = validated_data.pop("goals", None)
        with transaction.atomic():
            if goals is not None:
                plan.goals.all().delete()
                WeeklyGoal.objects.bulk_create([WeeklyGoal(plan=plan, **goal) for goal in goals])
            plan.save()
        return plan