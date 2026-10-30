"""Fill a development database with demo data: `python manage.py seed_demo`.

Departments, providers, opportunities, accounts, and one student at each stage of the
lifecycle, from a draft to a certificate (imports/demo_lifecycle.py).
Safe to run again: everything is looked up first, so nothing is duplicated.
"""

from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from accounts.models import Department, Specialization, StudentProfile, User
from imports.demo_lifecycle import STAGES, Lifecycle
from providers.models import Opportunity, Provider

# Development only: every demo account shares this password.
DEMO_PASSWORD = "Demo12345!"

DEPARTMENTS = {
    "تكنولوجيا المعلومات": ["برمجة", "شبكات"],
    "العلوم الإدارية والمالية": ["محاسبة", "إدارة أعمال"],
}

# (name, sector, city, status, accepted specializations)
PROVIDERS = [
    ("شركة التقنية المتقدمة", "تكنولوجيا المعلومات", "غزة", Provider.Status.APPROVED, ["برمجة", "شبكات"]),
    ("مركز النور للشبكات", "الاتصالات", "خانيونس", Provider.Status.APPROVED, ["شبكات"]),
    ("مكتب الأمانة للمحاسبة", "المحاسبة والتدقيق", "غزة", Provider.Status.APPROVED, ["محاسبة"]),
    ("مؤسسة الريادة للإدارة", "الاستشارات الإدارية", "رفح", Provider.Status.SUSPENDED, ["إدارة أعمال", "محاسبة"]),
]

# (provider, title, specialization, status)
OPPORTUNITIES = [
    ("شركة التقنية المتقدمة", "مطور ويب متدرب", "برمجة", Opportunity.Status.OPEN),
    ("شركة التقنية المتقدمة", "فني دعم شبكات", "شبكات", Opportunity.Status.OPEN),
    ("مركز النور للشبكات", "فني شبكات متدرب", "شبكات", Opportunity.Status.OPEN),
    ("مركز النور للشبكات", "مساعد مدير شبكات", "شبكات", Opportunity.Status.CLOSED),
    ("مكتب الأمانة للمحاسبة", "محاسب متدرب", "محاسبة", Opportunity.Status.OPEN),
    ("مؤسسة الريادة للإدارة", "مساعد إداري", "إدارة أعمال", Opportunity.Status.OPEN),
]

# (username, role, first name, last name)
STAFF = [
    ("demo_coordinator", User.Role.COORDINATOR, "منسق", "التدريب"),
    ("demo_admin", User.Role.ADMIN, "مدير", "النظام"),
    ("demo_supervisor", User.Role.SUPERVISOR, "مشرف", "أكاديمي"),
    ("demo_provider", User.Role.PROVIDER, "حساب", "شركة التقنية"),
]
PROVIDER_ACCOUNT = ("demo_provider", "شركة التقنية المتقدمة")


def students():
    """(username, first, last, specialization, hours, status): 11 eligible, 3 not (BR-01)."""
    enough = settings.TADREEB_MIN_CREDIT_HOURS + 10
    active = StudentProfile.AcademicStatus.ACTIVE
    return [
        ("120260001", "أحمد", "خالد", "برمجة", enough, active),
        ("120260002", "سارة", "محمود", "برمجة", enough + 5, active),
        ("120260003", "محمد", "علي", "شبكات", enough, active),
        ("120260004", "لينا", "حسن", "محاسبة", enough + 2, active),
        ("120260005", "يوسف", "عمر", "إدارة أعمال", enough, active),
        ("120260009", "نور", "سالم", "برمجة", enough, active),
        ("120260010", "عمر", "ناصر", "برمجة", enough + 8, active),
        ("120260011", "هبة", "زياد", "شبكات", enough, active),
        ("120260012", "طارق", "منصور", "برمجة", enough + 12, active),
        ("120260013", "ريم", "عادل", "شبكات", enough + 4, active),
        ("120260014", "سامي", "فؤاد", "محاسبة", enough, active),
        # Not eligible, one reason each:
        ("120260006", "رنا", "سعيد", "برمجة", settings.TADREEB_MIN_CREDIT_HOURS - 30, active),
        ("120260007", "خالد", "يوسف", "شبكات", enough, StudentProfile.AcademicStatus.SUSPENDED),
        ("120260008", "منى", "إبراهيم", "محاسبة", enough, StudentProfile.AcademicStatus.GRADUATED),
    ]


class Command(BaseCommand):
    help = "يضيف بيانات تجريبية للتطوير (أقسام، تخصصات، جهات، فرص، حسابات). آمن للتشغيل أكثر من مرة."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force", action="store_true", help="شغّله حتى لو DEBUG=False (لا تستخدمه على الخادم الحقيقي)."
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if not settings.DEBUG and not options["force"]:
            raise CommandError(
                "هذا الأمر للتطوير فقط (DEBUG=False). الحسابات التجريبية كلمة سرها معروفة."
            )

        specializations = {}
        for department_name, names in DEPARTMENTS.items():
            department, _ = Department.objects.get_or_create(name=department_name)
            for name in names:
                specializations[name], _ = Specialization.objects.get_or_create(
                    department=department, name=name
                )

        providers = {}
        for name, sector, city, status, accepted in PROVIDERS:
            provider, _ = Provider.objects.get_or_create(
                name=name,
                defaults={
                    "sector": sector,
                    "city": city,
                    "contact_name": "مسؤول التدريب",
                    "contact_phone": "0599000000",
                    "capacity": 10,
                    "status": status,
                },
            )
            provider.accepted_specializations.set([specializations[s] for s in accepted])
            providers[name] = provider

        start = timezone.localdate() + timedelta(days=30)
        for provider_name, title, specialization, status in OPPORTUNITIES:
            Opportunity.objects.get_or_create(
                provider=providers[provider_name],
                title=title,
                defaults={
                    "specialization": specializations[specialization],
                    "tasks": "المشاركة في مهام القسم تحت إشراف مسؤول التدريب.",
                    "seats": 3,
                    "start_date": start,
                    "end_date": start + timedelta(weeks=8),
                    "location": providers[provider_name].city,
                    "status": status,
                },
            )

        accounts = {}
        for username, role, first_name, last_name in STAFF:
            accounts[username] = self.demo_user(username, role, first_name, last_name)

        username, provider_name = PROVIDER_ACCOUNT
        provider = providers[provider_name]
        if provider.user_id is None:
            provider.user = accounts[username]
            provider.save(update_fields=["user"])

        for username, first_name, last_name, specialization, hours, status in students():
            user = self.demo_user(username, User.Role.STUDENT, first_name, last_name)
            StudentProfile.objects.update_or_create(
                user=user,
                defaults={
                    "department": specializations[specialization].department,
                    "specialization": specializations[specialization],
                    "completed_credit_hours": hours,
                    "academic_status": status,
                },
            )

        built = Lifecycle(
            students={u.username: u for u in User.objects.filter(role=User.Role.STUDENT, username__startswith="12026")},
            opportunities={o.title: o for o in Opportunity.objects.filter(provider__in=providers.values())},
            coordinator=accounts["demo_coordinator"],
            supervisor=accounts["demo_supervisor"],
            provider_user=accounts["demo_provider"],
        ).run()

        self.stdout.write(self.style.SUCCESS("تمت إضافة البيانات التجريبية."))
        self.stdout.write(
            f"{Department.objects.count()} أقسام، {Specialization.objects.count()} تخصصات، "
            f"{Provider.objects.count()} جهات، {Opportunity.objects.count()} فرص، "
            f"{StudentProfile.objects.count()} طلاب."
        )
        self.stdout.write(f"طلبات تدريب جديدة: {built}")
        self.stdout.write("الحسابات: " + "، ".join(u for u, *_ in STAFF))
        self.stdout.write("الطلاب ومرحلة كل واحد:")
        for username, stage in STAGES:
            self.stdout.write(f"  {username}: {stage}")
        self.stdout.write("  120260006 إلى 120260008: غير مؤهلين (ساعات ناقصة، موقوف، متخرج)")
        self.stdout.write(self.style.WARNING(
            f"تحذير: كلمة السر لكل الحسابات التجريبية هي {DEMO_PASSWORD} — للتطوير فقط، لا تستخدمها على الخادم."
        ))

    def demo_user(self, username, role, first_name, last_name):
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "role": role,
                "first_name": first_name,
                "last_name": last_name,
                "email": f"{username}@demo.tadreeb.local",
            },
        )
        if created:
            user.set_password(DEMO_PASSWORD)
            user.save(update_fields=["password"])
        return user
