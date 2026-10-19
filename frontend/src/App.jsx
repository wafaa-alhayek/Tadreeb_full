import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/student/Login";
import Dashboard from "./pages/student/Dashboard";
import TrainingOpportunities from "./pages/student/TrainingOpportunities";
import TrainingDetails from "./pages/student/TrainingDetails";
import TrainingApplication from "./pages/student/TrainingApplication";
import TrainingDocuments from "./pages/student/TrainingDocuments";
import ApplicationStatus from "./pages/student/ApplicationStatus";
import TrainingAccepted from "./pages/student/TrainingAccepted";
import TrainingProfile from "./pages/student/TrainingProfile";
import TrainingPlan from "./pages/student/TrainingPlan";
import DailyTrainingLog from "./pages/student/DailyTrainingLog";
import DailyTrainingLogDetails from "./pages/student/DailyTrainingLogDetails";
import Attendance from "./pages/student/Attendance";
import Reports from "./pages/student/Reports";
import Evaluation from "./pages/student/Evaluation";
import FinishTraining from "./pages/student/FinishTraining";
import Certificate from "./pages/student/Certificate";
import AdminDashboard from "./pages/admin/Dashboard";
import TrainingRequests from "./pages/admin/TrainingRequests";
import TrainingRequestDetails from "./pages/admin/TrainingRequestDetails";
import Students from "./pages/admin/Students";
import TrainingOrganizations from "./pages/admin/TrainingOrganizations";
import AddTrainingOrganization from "./pages/admin/AddTrainingOrganization";
import TrainingOrganizationDetails from "./pages/admin/TrainingOrganizations";
import TrainingOpportunitiesAdmin from "./pages/admin/TrainingOpportunities";
import AddTrainingOpportunity from "./pages/admin/AddTrainingOpportunity";
import TrainingOpportunityDetails from "./pages/admin/TrainingOpportunityDetails";
import StudentDistribution from "./pages/admin/StudentDistribution";
import StudentDistributionProcess from "./pages/admin/StudentDistributionProcess";
import Approvals from "./pages/admin/Approvals";
import ApprovalDetails from "./pages/admin/ApprovalDetails";import Supervisors from "./pages/admin/Supervisors";
import AddSupervisor from "./pages/admin/AddSupervisor";
import SupervisorDetails from "./pages/admin/SupervisorDetails";
import Visits from "./pages/admin/Visits";
import AddVisit from "./pages/admin/AddVisit";
import Evaluations from "./pages/admin/Evaluations";
import StudentEvaluation from "./pages/admin/StudentEvaluation";
import ReportsAdmin from "./pages/admin/Reports";
import CustomReport from "./pages/admin/CustomReport";
import CertificatesAdmin from "./pages/admin/Certificates";
import IssueCertificate from "./pages/admin/IssueCertificate";
import UsersAdmin from "./pages/admin/Users";
import Permissions from "./pages/admin/Permissions";
import FinalReportApproval from "./pages/admin/FinalReportApproval";
import Exceptions from "./pages/admin/Exceptions";
import FileArchive from "./pages/admin/FileArchive";
import Announcements from "./pages/admin/Announcements";
import AdvancedSearch from "./pages/admin/AdvancedSearch";
import Courses from "./pages/admin/Courses";
import CourseStates from "./pages/admin/CourseStates";
import AddCourse from "./pages/admin/AddCourse";
import CourseDetails from "./pages/admin/CourseDetails";
import CourseRegistrationRequestDetails from "./pages/admin/CourseRegistrationRequestDetails";
import CourseRegistrationDecision from "./pages/admin/CourseRegistrationDecision";
import CourseWaitingList from "./pages/admin/CourseWaitingList";
import CourseWaitingListDecision from "./pages/admin/CourseWaitingListDecision";
import CourseTrainees from "./pages/admin/CourseTrainees";
import CourseTraineeDetails from "./pages/admin/CourseTraineeDetails";
import CourseAttendance from "./pages/admin/CourseAttendance";
import CourseTrainers from "./pages/admin/CourseTrainers";
import AddCourseTrainer from "./pages/admin/AddCourseTrainer";
import CourseTrainerDetails from "./pages/admin/CourseTrainerDetails";
import CourseEvaluations from "./pages/admin/CourseEvaluations";
import CourseEvaluationResults from "./pages/admin/CourseEvaluationResults";
import CourseCertificates from "./pages/admin/CourseCertificates";
import CourseCertificatePreview from "./pages/admin/CourseCertificatePreview";
import CourseCertificateVerify from "./pages/admin/CourseCertificateVerify";
import CourseReports from "./pages/admin/CourseReports";
import CourseRegistrationRequests from "./pages/admin/CourseRegistrationRequests";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/student/opportunities" element={<TrainingOpportunities />} />
        <Route path="/student/opportunities/details" element={<TrainingDetails />} />
        <Route path="/student/apply-training" element={<TrainingApplication />} />
        <Route path="/student/apply-training/documents" element={<TrainingDocuments />} />
        <Route path="/student/applications/status" element={<ApplicationStatus />} />
        <Route path="/student/applications/accepted" element={<TrainingAccepted />} />
        <Route path="/student/training-profile" element={<TrainingProfile />} />
        <Route path="/student/training-plan" element={<TrainingPlan />} />
        <Route path="/student/daily-training-log" element={<DailyTrainingLog />} />
        <Route path="/student/daily-training-log/details" element={<DailyTrainingLogDetails />} />
        <Route path="/student/attendance" element={<Attendance />} />
        <Route path="/student/reports" element={<Reports />} />
        <Route path="/student/evaluation" element={<Evaluation />} />
        <Route path="/student/finish-training" element={<FinishTraining />} />
        <Route path="/student/certificate" element={<Certificate />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/training-requests" element={<TrainingRequests />} />
        <Route path="/admin/training-requests/:id" element={<TrainingRequestDetails />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/training-organizations" element={<TrainingOrganizations />} />
        <Route path="/admin/training-organizations/add" element={<AddTrainingOrganization />} />
        <Route path="/admin/training-organizations/:id" element={<TrainingOrganizationDetails />} />
        <Route path="/admin/training-opportunities" element={<TrainingOpportunitiesAdmin />} />
        <Route path="/admin/training-opportunities/add" element={<AddTrainingOpportunity />} />
        <Route path="/admin/training-opportunities/:id" element={<TrainingOpportunityDetails />} />
        <Route path="/admin/student-distribution" element={<StudentDistribution />} />
        <Route path="/admin/student-distribution/process" element={<StudentDistributionProcess />} />
        <Route path="/admin/approvals" element={<Approvals />} />
        <Route path="/admin/approvals/:id" element={<ApprovalDetails />} />
        <Route path="/admin/supervisors" element={<Supervisors />} />
        <Route path="/admin/supervisors/add" element={<AddSupervisor />} />
        <Route path="/admin/supervisors/:id" element={<SupervisorDetails />} />
        <Route path="/admin/visits" element={<Visits />} />
        <Route path="/admin/visits/add" element={<AddVisit />} />
        <Route path="/admin/evaluations" element={<Evaluations />} />
        <Route path="/admin/evaluations/add" element={<StudentEvaluation />} />
        <Route path="/admin/evaluations/:id" element={<StudentEvaluation />} />
        <Route path="/admin/reports" element={<ReportsAdmin />} />
        <Route path="/admin/reports/custom" element={<CustomReport />} />
        <Route path="/admin/certificates" element={<CertificatesAdmin />} />
        <Route path="/admin/certificates/issue" element={<IssueCertificate />} />
        <Route path="/admin/certificates/:id" element={<IssueCertificate />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/users/permissions" element={<Permissions />} />
        <Route path="/admin/final-reports" element={<FinalReportApproval />} />
        <Route path="/admin/exceptions" element={<Exceptions />} />
        <Route path="/admin/files" element={<FileArchive />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/advanced-search" element={<AdvancedSearch />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/courses/states" element={<CourseStates />} />
        <Route path="/admin/courses/add" element={<AddCourse />} />
        <Route path="/admin/courses/:id/edit" element={<AddCourse />} />
        <Route path="/admin/courses/:id" element={<CourseDetails />} />
        <Route path="/admin/courses/:id/registration-requests/:requestId" element={<CourseRegistrationRequestDetails />} />
        <Route path="/admin/courses/:id/registration-requests/:requestId/decision" element={<CourseRegistrationDecision />} />
        <Route path="/admin/courses/:id/waiting-list" element={<CourseWaitingList />} />
        <Route path="/admin/courses/:id/waiting-list/:studentId/review-seat" element={<CourseWaitingListDecision />} />
        <Route path="/admin/courses/:id/trainees" element={<CourseTrainees />} />
        <Route path="/admin/courses/:id/trainees/:studentId" element={<CourseTraineeDetails />} />
        <Route path="/admin/courses/:id/attendance" element={<CourseAttendance />} />
        <Route path="/admin/course-trainers" element={<CourseTrainers />} />
        <Route path="/admin/course-trainers/add" element={<AddCourseTrainer />} />
        <Route path="/admin/course-trainers/:trainerId/edit" element={<AddCourseTrainer />} />
        <Route path="/admin/course-trainers/:trainerId" element={<CourseTrainerDetails />} />
        <Route path="/admin/courses/:id/evaluations" element={<CourseEvaluations />} />
        <Route path="/admin/courses/:id/evaluations/results" element={<CourseEvaluationResults />} />
        <Route path="/admin/course-certificates" element={<CourseCertificates />} />
        <Route path="/admin/course-certificates/:certificateId/preview" element={<CourseCertificatePreview />} />
        <Route path="/admin/course-certificates/verify" element={<CourseCertificateVerify />} />
        <Route path="/admin/course-reports" element={<CourseReports />} />
        <Route path="/admin/courses/:id/registration-requests" element={<CourseRegistrationRequests />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;