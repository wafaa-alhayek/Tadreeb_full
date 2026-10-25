from pathlib import Path

from rest_framework import serializers

from .students import MAX_FILE_BYTES


class StudentImportSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, file):
        if Path(file.name).suffix.lower() != ".xlsx":
            raise serializers.ValidationError("الملف لازم يكون Excel بصيغة .xlsx.")
        if file.size > MAX_FILE_BYTES:
            raise serializers.ValidationError("حجم الملف لازم يكون 5 ميغابايت أو أقل.")
        return file


class ImportRowErrorSerializer(serializers.Serializer):
    row = serializers.IntegerField(allow_null=True, help_text="رقم السطر في ملف Excel")
    column = serializers.CharField(allow_null=True, help_text="اسم العمود كما في الملف")
    message = serializers.CharField()


class StudentImportResultSerializer(serializers.Serializer):
    dry_run = serializers.BooleanField()
    saved = serializers.BooleanField(help_text="false إذا كان فحصًا فقط أو في أخطاء")
    created = serializers.IntegerField(help_text="طلاب جدد (أو سيُنشؤون في الفحص)")
    updated = serializers.IntegerField(help_text="طلاب موجودون تتحدث بياناتهم")
    errors = ImportRowErrorSerializer(many=True)
