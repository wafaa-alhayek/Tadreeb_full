from django.conf import settings


def check_eligibility(profile):
    """BR-01: return (is_eligible, reasons). Reasons are shown to the student (FR-06)."""
    reasons = []
    min_hours = settings.TADREEB_MIN_CREDIT_HOURS
    min_gpa = settings.TADREEB_MIN_GPA

    if profile.academic_status != profile.AcademicStatus.ACTIVE:
        reasons.append("حالتك الأكاديمية ليست منتظمة.")
    if profile.completed_credit_hours < min_hours:
        missing = min_hours - profile.completed_credit_hours
        reasons.append(
            f"أنهيت {profile.completed_credit_hours} ساعة معتمدة من {min_hours} مطلوبة (باقي {missing})."
        )
    if min_gpa is not None and (profile.gpa is None or profile.gpa < min_gpa):
        reasons.append(f"المعدل المطلوب {min_gpa} أو أكثر.")

    return (not reasons, reasons)
