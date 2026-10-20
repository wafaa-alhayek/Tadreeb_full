from pathlib import Path

from django.core.exceptions import ValidationError

# BR-08: uploaded files must be PDF, JPG or PNG, up to 5 MB each.
ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}
MAX_UPLOAD_BYTES = 5 * 1024 * 1024


def validate_upload(file):
    if Path(file.name).suffix.lower() not in ALLOWED_EXTENSIONS:
        raise ValidationError("الملف لازم يكون PDF أو JPG أو PNG.")
    if file.size > MAX_UPLOAD_BYTES:
        raise ValidationError("حجم الملف لازم يكون 5 ميغابايت أو أقل.")
