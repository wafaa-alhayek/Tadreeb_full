from django.test import SimpleTestCase

from accounts.models import User

from .status import TRANSITIONS, Status, TransitionError, allowed_next, check_transition

STUDENT = User.Role.STUDENT
SUPERVISOR = User.Role.SUPERVISOR
COORDINATOR = User.Role.COORDINATOR
ADMIN = User.Role.ADMIN
PROVIDER = User.Role.PROVIDER


class StatusEngineTests(SimpleTestCase):
    def test_happy_path_from_draft_to_assigned(self):
        steps = [
            (Status.DRAFT, Status.SUBMITTED, STUDENT),
            (Status.SUBMITTED, Status.UNDER_REVIEW, COORDINATOR),
            (Status.UNDER_REVIEW, Status.ACCEPTED, COORDINATOR),
            (Status.ACCEPTED, Status.ASSIGNED, ADMIN),
        ]
        for current, target, role in steps:
            check_transition(current, target, role)  # raises if not allowed

    def test_student_can_resubmit_after_changes_requested(self):
        check_transition(Status.UNDER_REVIEW, Status.NEEDS_CHANGES, COORDINATOR)
        check_transition(Status.NEEDS_CHANGES, Status.SUBMITTED, STUDENT)

    def test_skipping_a_step_is_rejected(self):
        with self.assertRaises(TransitionError):
            check_transition(Status.SUBMITTED, Status.ACCEPTED, COORDINATOR)

    def test_student_cannot_accept_their_own_application(self):
        with self.assertRaisesMessage(TransitionError, "ليس لديك صلاحية"):
            check_transition(Status.UNDER_REVIEW, Status.ACCEPTED, STUDENT)

    def test_reviewer_cannot_submit_on_behalf_of_student(self):
        with self.assertRaises(TransitionError):
            check_transition(Status.DRAFT, Status.SUBMITTED, COORDINATOR)

    def test_rejected_and_assigned_are_final(self):
        for final in (Status.REJECTED, Status.ASSIGNED):
            for role in User.Role:
                self.assertEqual(allowed_next(final, role), [])

    def test_allowed_next_lists_reviewer_choices(self):
        self.assertEqual(
            set(allowed_next(Status.UNDER_REVIEW, COORDINATOR)),
            {Status.ACCEPTED, Status.REJECTED, Status.NEEDS_CHANGES},
        )
        self.assertEqual(allowed_next(Status.UNDER_REVIEW, STUDENT), [])

    def test_provider_has_no_transitions_yet(self):
        for source, target in TRANSITIONS:
            self.assertEqual(allowed_next(source, PROVIDER), [])

    def test_supervisor_reviews_and_allocates(self):
        # FR-13 / FR-14
        check_transition(Status.SUBMITTED, Status.UNDER_REVIEW, SUPERVISOR)
        check_transition(Status.UNDER_REVIEW, Status.ACCEPTED, SUPERVISOR)
        check_transition(Status.ACCEPTED, Status.ASSIGNED, SUPERVISOR)

    def test_rejecting_needs_a_reason(self):
        # FR-13
        for reason in ("", "   "):
            with self.assertRaisesMessage(TransitionError, "سبب الرفض"):
                check_transition(Status.UNDER_REVIEW, Status.REJECTED, SUPERVISOR, reason)
        check_transition(Status.UNDER_REVIEW, Status.REJECTED, SUPERVISOR, "المعدل أقل من المطلوب")

    def test_error_message_uses_arabic_status_names(self):
        with self.assertRaisesMessage(TransitionError, "«مسودة» إلى «مقبول»"):
            check_transition(Status.DRAFT, Status.ACCEPTED, COORDINATOR)
