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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunities" element={<TrainingOpportunities />} />
        <Route path="/opportunities/details" element={<TrainingDetails />} />
        <Route path="/apply-training" element={<TrainingApplication />} />
        <Route path="/apply-training/documents" element={<TrainingDocuments />} />
        <Route path="/applications/status" element={<ApplicationStatus />} />
        <Route path="/applications/accepted" element={<TrainingAccepted />} />
        <Route path="/training-profile" element={<TrainingProfile />} />
        <Route path="/training-plan" element={<TrainingPlan />} />
        <Route path="/daily-training-log" element={<DailyTrainingLog />} />
        <Route path="/daily-training-log/details" element={<DailyTrainingLogDetails />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/Evaluation" element={<Evaluation />} />
        <Route path="/finish-training" element={<FinishTraining />} />
        <Route path="/Certificate" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;