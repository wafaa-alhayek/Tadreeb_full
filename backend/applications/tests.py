from django.test import SimpleTestCase

from accounts.models import User

from .status import SYSTEM, TRANSITIONS, Status, TransitionError, allowed_next, check_transition

STUDENT = User.Role.STUDENT
SUPERVISOR = User.Role.SUPERVISOR
PROVIDER = User.Role.PROVIDER
COORDINATOR = User.Role.COORDINATOR
ADMIN = User.Role.ADMIN


class StatusEngineTests(SimpleTestCase):
    def test_full_lifecycle_from_draft_to_certified(self):
        # SRS Section 2.5, the main line of the diagram.
        steps = [
            (Status.DRAFT, Status.SUBMITTED, STUDENT),
            (Status.SUBMITTED, Status.UNDER_REVIEW, SUPERVISOR),
            (Status.UNDER_REVIEW, Status.ACCEPTED, SUPERVISOR),
            (Status.ACCEPTED, Status.ASSIGNED, SUPERVISOR),
            (Status.ASSIGNED, Status.IN_TRAINING, PROVIDER),
            (Status.IN_TRAINING, Status.COMPLETED, SYSTEM),
            (Status.COMPLETED, Status.APPROVED, COORDINATOR),
            (Status.APPROVED, Status.CERTIFIED, SYSTEM),
        ]
        for current, target, role in steps:
            check_transition(current, target, role)  # raises if not allowed

    def test_training_can_also_start_automatically_on_the_start_date(self):
        check_transition(Status.ASSIGNED, Status.IN_TRAINING, SYSTEM)

    def test_coordinator_can_review_and_allocate_too(self):
        check_transition(Status.SUBMITTED, Status.UNDER_REVIEW, COORDINATOR)
        check_transition(Status.ACCEPTED, Status.ASSIGNED, COORDINATOR)

    def test_admin_does_not_review_applications(self):
        # Section 2.2 matrix: "Review and allocate applications" has no tick for Admin.
        with self.assertRaises(TransitionError):
            check_transition(Status.UNDER_REVIEW, Status.ACCEPTED, ADMIN)

    def test_student_can_resubmit_after_changes_requested(self):
        check_transition(Status.UNDER_REVIEW, Status.NEEDS_CHANGES, SUPERVISOR)
        check_transition(Status.NEEDS_CHANGES, Status.SUBMITTED, STUDENT)

    def test_skipping_a_step_is_rejected(self):
        with self.assertRaises(TransitionError):
            check_transition(Status.SUBMITTED, Status.ACCEPTED, SUPERVISOR)
        with self.assertRaises(TransitionError):
            check_transition(Status.ASSIGNED, Status.COMPLETED, SYSTEM)

    def test_student_cannot_accept_their_own_application(self):
        with self.assertRaisesMessage(TransitionError, "ليس لديك صلاحية"):
            check_transition(Status.UNDER_REVIEW, Status.ACCEPTED, STUDENT)

    def test_reviewer_cannot_submit_on_behalf_of_student(self):
        with self.assertRaises(TransitionError):
            check_transition(Status.DRAFT, Status.SUBMITTED, SUPERVISOR)

    def test_only_the_system_marks_training_completed_or_certified(self):
        # BR-06 decides completion; certificates are issued automatically (FR-34).
        for role in User.Role:
            self.assertNotIn(Status.COMPLETED, allowed_next(Status.IN_TRAINING, role))
            self.assertEqual(allowed_next(Status.APPROVED, role), [])

    def test_only_the_coordinator_gives_final_approval(self):
        # FR-28
        self.assertEqual(allowed_next(Status.COMPLETED, COORDINATOR), [Status.APPROVED])
        for role in (STUDENT, SUPERVISOR, PROVIDER, ADMIN):
            self.assertEqual(allowed_next(Status.COMPLETED, role), [])

    def test_rejecting_needs_a_reason(self):
        # FR-13
        for reason in ("", "   "):
            with self.assertRaisesMessage(TransitionError, "سبب الرفض"):
                check_transition(Status.UNDER_REVIEW, Status.REJECTED, SUPERVISOR, reason)
        check_transition(Status.UNDER_REVIEW, Status.REJECTED, SUPERVISOR, "المعدل أقل من المطلوب")

    def test_withdrawal_closes_the_placement_and_needs_a_reason(self):
        # FR-31
        for current in (Status.ASSIGNED, Status.IN_TRAINING):
            with self.assertRaisesMessage(TransitionError, "سبب الانسحاب"):
                check_transition(current, Status.WITHDRAWN, SUPERVISOR)
            check_transition(current, Status.WITHDRAWN, SUPERVISOR, "ظروف صحية")
        with self.assertRaises(TransitionError):
            check_transition(Status.IN_TRAINING, Status.WITHDRAWN, STUDENT, "بدي انسحب")

    def test_final_statuses_have_no_way_out(self):
        for final in (Status.REJECTED, Status.CERTIFIED, Status.WITHDRAWN):
            for role in [*User.Role, SYSTEM]:
                self.assertEqual(allowed_next(final, role), [])

    def test_allowed_next_lists_reviewer_choices(self):
        self.assertEqual(
            set(allowed_next(Status.UNDER_REVIEW, SUPERVISOR)),
            {Status.ACCEPTED, Status.REJECTED, Status.NEEDS_CHANGES},
        )
        self.assertEqual(allowed_next(Status.UNDER_REVIEW, STUDENT), [])

    def test_every_status_is_reachable(self):
        reachable = {Status.DRAFT} | {target for _, target in TRANSITIONS}
        self.assertEqual(reachable, set(Status))

    def test_error_message_uses_arabic_status_names(self):
        with self.assertRaisesMessage(TransitionError, "«مسودة» إلى «مقبول»"):
            check_transition(Status.DRAFT, Status.ACCEPTED, SUPERVISOR)
