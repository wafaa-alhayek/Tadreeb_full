from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django.db.models.fields.files import FieldFile

# Fields never copied into the log (NFR-01), plus timestamps that change on every save.
SKIPPED_FIELDS = {"password", "created_at", "updated_at", "last_login"}


class AuditLog(models.Model):
    """FR-40: who did what, to which record, and when. Never edited or deleted."""

    class Action(models.TextChoices):
        CREATE = "create", "إنشاء"
        UPDATE = "update", "تعديل"
        DELETE = "delete", "حذف"
        IMPORT = "import", "استيراد"
        STATUS_CHANGE = "status_change", "تغيير حالة"

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs",
        verbose_name="المستخدم",
    )
    action = models.CharField("العملية", max_length=30, choices=Action.choices)
    target_type = models.CharField("نوع السجل", max_length=100)  # e.g. "providers.provider"
    target_id = models.CharField("رقم السجل", max_length=64, blank=True)
    target_repr = models.CharField("السجل", max_length=200, blank=True)
    changes = models.JSONField("التغييرات", default=dict, blank=True, encoder=DjangoJSONEncoder)
    ip_address = models.GenericIPAddressField("عنوان IP", null=True, blank=True)
    created_at = models.DateTimeField("الوقت", auto_now_add=True)

    class Meta:
        verbose_name = "عملية"
        verbose_name_plural = "سجل العمليات"
        ordering = ["-created_at", "-id"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["target_type"]),
        ]

    def __str__(self):
        return f"{self.get_action_display()} {self.target_repr} ({self.actor})"


def is_secret(field_name):
    return "password" in field_name.lower()


def snapshot(instance):
    """The record's field values as plain JSON-friendly data, without secrets."""
    values = {}
    for field in instance._meta.concrete_fields + instance._meta.many_to_many:
        if field.name in SKIPPED_FIELDS or is_secret(field.name):
            continue
        if field.many_to_many:
            related = getattr(instance, field.name) if instance.pk else None
            value = sorted(related.values_list("pk", flat=True)) if related is not None else []
        else:
            value = field.value_from_object(instance)  # Foreign keys give the id.
        if isinstance(value, FieldFile):
            value = value.name or ""
        values[field.name] = value
    return values


def diff(before, after):
    """{field: {"from": old, "to": new}} for the fields that changed. None means "didn't exist"."""
    before, after = before or {}, after or {}
    return {
        name: {"from": before.get(name), "to": after.get(name)}
        for name in before.keys() | after.keys()
        if before.get(name) != after.get(name)
    }


def log_action(request, action, target, changes=None):
    """Record one operation. `target` is a model instance, or a model class for bulk work.

    Example: log_action(request, AuditLog.Action.UPDATE, provider, diff(before, snapshot(provider)))
    """
    user = getattr(request, "user", None)
    meta = target._meta
    is_instance = not isinstance(target, type)
    return AuditLog.objects.create(
        actor=user if user is not None and user.is_authenticated else None,
        action=action,
        target_type=meta.label_lower,
        target_id=str(target.pk) if is_instance and target.pk is not None else "",
        target_repr=str(target if is_instance else meta.verbose_name_plural)[:200],
        changes={k: v for k, v in (changes or {}).items() if not is_secret(k)},
        ip_address=request.META.get("REMOTE_ADDR") if request is not None else None,
    )
