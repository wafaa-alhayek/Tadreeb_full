"""The demo's story: one fake student at each stage of the application lifecycle (SRS 2.5).

Everything goes through the same functions the API uses (workflow.py, exceptions.py), so the
demo has real history, audit log entries and notifications. Used by `manage.py seed_demo`.
"""

from datetime import timedelta
from decimal import Decimal

from django.core.files.base import ContentFile
from django.test import RequestFactory
from django.utils import timezone

from applications import exceptions, workflow
from applications.models import Application, ExceptionRequest
from applications.status import Status
from evaluations.models import PROVIDER_CRITERIA, SUPERVISOR_CRITERIA, Evaluation, ProviderRating
from training.models import DailyLog, Report, TrainingPlan, Visit, WeeklyGoal, complete_if_done

# A tiny valid PDF, so demo reports have a file to download.
PDF = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n"

# (university id, the stage they're left at): read by seed_demo to print who to log in as.
STAGES = [
    ("120260001", "مسودة: لم يُرسل بعد"),
    ("120260002", "مرسل: بانتظار تعيين مشرف من المنسق"),
    ("120260003", "قيد المراجعة عند demo_supervisor"),
    ("120260004", "مقبول: جاهز للتوزيع"),
    ("120260005", "مرفوض مع سبب"),
    ("120260009", "موزّع على شركة التقنية: بانتظار تأكيد demo_provider"),
    ("120260010", "في التدريب: سجل يومي، خطة معتمدة، زيارة، تقرير بلا درجة، ومشكلة من الجهة"),
    ("120260011", "في التدريب: طلب تغيير جهة بانتظار تأكيد المنسق"),
    ("120260012", "مكتمل: ينقصه تقييم المشرف، ثم اعتماد المنسق"),
    ("120260013", "حاصل على الشهادة، وقيّم الجهة"),
    ("120260014", "منسحب بطلب وافق عليه المشرف"),
]


def as_user(user):
    """A stand-in for an API request by `user`, for the workflow functions."""
    request = RequestFactory().post("/seed_demo/")
    request.user = user
    return request


def working_days(start, count):
    """`count` training days from `start`, skipping Friday and Saturday."""
    days, day = [], start
    while len(days) < count:
        if day.weekday() not in (4, 5):
            days.append(day)
        day += timedelta(days=1)
    return days


class Lifecycle:
    def __init__(self, students, opportunities, coordinator, supervisor, provider_user):
        self.students = students  # university id -> User
        self.opportunities = opportunities  # title -> Opportunity
        self.coordinator = coordinator
        self.supervisor = supervisor
        self.provider_user = provider_user
        self.today = timezone.localdate()

    def run(self):
        """Build each story whose student has no application yet. Returns how many were built."""
        stories = {
            "120260001": self.draft,
            "120260002": self.submitted,
            "120260003": self.under_review,
            "120260004": self.accepted,
            "120260005": self.rejected,
            "120260009": self.assigned,
            "120260010": self.in_training,
            "120260011": self.changing_provider,
            "120260012": self.completed,
            "120260013": self.certified,
            "120260014": self.withdrawn,
        }
        built = 0
        for university_id, story in stories.items():
            student = self.students[university_id]
            if not Application.objects.filter(student=student).exists():
                story(student)
                built += 1
        return built

    # --- the stories ---

    def draft(self, student):
        self.application(student, ["مطور ويب متدرب"])

    def submitted(self, student):
        self.submit(student, ["مطور ويب متدرب"])

    def under_review(self, student):
        self.under_review_for(student, ["فني دعم شبكات", "فني شبكات متدرب"])

    def accepted(self, student):
        application = self.under_review_for(student, ["محاسب متدرب"])
        workflow.change_status(as_user(self.supervisor), application, Status.ACCEPTED)

    def rejected(self, student):
        application = self.under_review_for(student, ["مساعد إداري"])
        workflow.change_status(
            as_user(self.supervisor), application, Status.REJECTED,
            "جهة التدريب المختارة موقوفة حاليًا. يمكنك تقديم طلب جديد بفرصة أخرى.",
        )

    def assigned(self, student):
        self.allocate(student, "مطور ويب متدرب", started_days_ago=-7)

    def in_training(self, student):
        application = self.train(student, "مطور ويب متدرب", started_days_ago=21)
        self.plan(application, approved=True)
        self.logs(application, working_days(self.start(application), 14), confirmed=10, hours=6)
        Visit.objects.create(
            application=application, supervisor=self.supervisor, date=self.today - timedelta(days=5),
            notes="الطالب ملتزم ويعمل على واجهات المستخدم.", follow_up="متابعة التقرير الأول.",
        )
        self.report(application, "التقرير الأسبوعي الأول", grade=None)
        exceptions.raise_request(
            as_user(self.provider_user), application, ExceptionRequest.Kind.ISSUE,
            "تأخر الطالب عن الدوام يومين هذا الأسبوع.",
        )

    def changing_provider(self, student):
        application = self.train(student, "فني دعم شبكات", started_days_ago=10)
        self.plan(application, approved=False)
        self.logs(application, working_days(self.start(application), 6), confirmed=6, hours=6)
        exception = exceptions.raise_request(
            as_user(student), application, ExceptionRequest.Kind.CHANGE_PROVIDER,
            "مكان التدريب بعيد عن السكن.", new_opportunity=self.opportunities["فني شبكات متدرب"],
        )
        exceptions.approve(as_user(self.supervisor), exception, "لا مانع.")

    def completed(self, student):
        application = self.finish(student, "مطور ويب متدرب", started_days_ago=50)
        self.evaluate(application, Evaluation.Kind.PROVIDER, self.provider_user, 4)

    def certified(self, student):
        application = self.finish(student, "فني دعم شبكات", started_days_ago=80)
        self.evaluate(application, Evaluation.Kind.PROVIDER, self.provider_user, 5)
        self.evaluate(application, Evaluation.Kind.SUPERVISOR, self.supervisor, 4)
        workflow.approve(as_user(self.coordinator), application)
        placement = application.placements.first()
        ProviderRating.objects.create(
            application=application, provider=placement.provider, rating=5,
            comment="بيئة تدريب ممتازة وتعلمت الكثير.",
        )

    def withdrawn(self, student):
        application = self.allocate(student, "محاسب متدرب", started_days_ago=3)
        exception = exceptions.raise_request(
            as_user(student), application, ExceptionRequest.Kind.WITHDRAWAL, "ظروف عائلية.",
        )
        exceptions.approve(as_user(self.supervisor), exception, "نتمنى لك التوفيق.")

    # --- building blocks ---

    def application(self, student, titles):
        application = Application.objects.create(student=student)
        for rank, title in enumerate(titles, start=1):
            application.preferences.create(opportunity=self.opportunities[title], rank=rank)
        return application

    def submit(self, student, titles):
        application = self.application(student, titles)
        workflow.change_status(as_user(student), application, Status.SUBMITTED)
        return application

    def under_review_for(self, student, titles):
        application = self.submit(student, titles)
        workflow.assign_supervisor(as_user(self.coordinator), application, self.supervisor)
        workflow.change_status(as_user(self.supervisor), application, Status.UNDER_REVIEW)
        return application

    def allocate(self, student, title, started_days_ago):
        """Accepted and placed. The dates are moved so the training started `started_days_ago`
        days ago (negative: starts in the future) and lasts 8 weeks."""
        application = self.under_review_for(student, [title])
        workflow.change_status(as_user(self.supervisor), application, Status.ACCEPTED)
        placement = workflow.allocate(as_user(self.supervisor), application, self.opportunities[title].id)
        placement.start_date = self.today - timedelta(days=started_days_ago)
        placement.end_date = placement.start_date + timedelta(weeks=8)
        placement.save(update_fields=["start_date", "end_date"])
        return application

    def train(self, student, title, started_days_ago):
        """Placed and confirmed by the provider, which starts the training (FR-16)."""
        application = self.allocate(student, title, started_days_ago)
        workflow.confirm_placement(as_user(self.provider_user), application)
        application.refresh_from_db()
        return application

    def finish(self, student, title, started_days_ago):
        """In training until the confirmed hours reached the requirement (BR-06), with graded reports."""
        application = self.train(student, title, started_days_ago)
        self.plan(application, approved=True)
        self.logs(application, working_days(self.start(application), 30), confirmed=30, hours=8)
        Visit.objects.create(
            application=application, supervisor=self.supervisor, date=self.start(application) + timedelta(days=20),
            notes="أداء جيد وتعاون مع الفريق.",
        )
        self.report(application, "التقرير الأول", grade=85)
        self.report(application, "التقرير النهائي", grade=90)
        complete_if_done(application)
        return application

    def start(self, application):
        return application.active_placement.start_date

    def plan(self, application, approved):
        plan = TrainingPlan.objects.create(
            application=application,
            status=TrainingPlan.Status.APPROVED if approved else TrainingPlan.Status.SUBMITTED,
            approved_at=timezone.now() if approved else None,
            approved_by=self.supervisor if approved else None,
        )
        goals = ["التعرف على بيئة العمل", "التدريب على الأدوات", "مهمة صغيرة", "مهمة متوسطة",
                 "العمل مع الفريق", "مشروع تطبيقي", "مراجعة وتحسين", "عرض ما تم إنجازه"]
        for week, goal in enumerate(goals, start=1):
            WeeklyGoal.objects.create(plan=plan, week_number=week, goal=goal)

    def logs(self, application, days, confirmed, hours):
        """One log per day; the provider confirmed the first `confirmed` of them (BR-05)."""
        for number, day in enumerate(days):
            if day > self.today:
                break
            is_confirmed = number < confirmed
            DailyLog.objects.create(
                application=application, date=day, hours=Decimal(hours),
                tasks="المشاركة في مهام القسم وتوثيق ما تم إنجازه.",
                confirmed_at=timezone.now() if is_confirmed else None,
                confirmed_by=self.provider_user if is_confirmed else None,
            )

    def report(self, application, title, grade):
        report = Report(application=application, title=title)
        report.file.save("demo-report.pdf", ContentFile(PDF), save=False)
        if grade is not None:
            report.grade = Decimal(grade)
            report.supervisor_comment = "تقرير واضح ومنظم."
            report.graded_at = timezone.now()
            report.graded_by = self.supervisor
        report.save()

    def evaluate(self, application, kind, evaluator, score):
        criteria = PROVIDER_CRITERIA if kind == Evaluation.Kind.PROVIDER else SUPERVISOR_CRITERIA
        Evaluation.objects.create(
            application=application, kind=kind, evaluator=evaluator,
            scores={key: score for key in criteria}, notes="تقييم تجريبي.",
        )
