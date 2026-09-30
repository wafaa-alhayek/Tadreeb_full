// خريطة الصفحات (Routes): كل رابط وأي صفحة بيعرض
// حسين مسؤول عن مسارات /student  —  عبد الله مسؤول عن مسارات /admin
import { Routes, Route, Navigate } from 'react-router-dom'

import PortalLayout from './layouts/PortalLayout.jsx'
import { studentLinks, adminLinks } from './layouts/navLinks.js'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import ComponentsGallery from './pages/ComponentsGallery.jsx'

// بوابة الطالب (حسين)
import StudentLoginPage from './pages/student/StudentLoginPage.jsx'
import StudentHomePage from './pages/student/StudentHomePage.jsx'

// بوابة الإدارة (عبد الله)
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import StudentsListPage from './pages/admin/StudentsListPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student/login" />} />
      <Route path="/gallery" element={<ComponentsGallery />} />

      {/* ───── بوابة الطالب — حسين ───── */}
      <Route path="/student/login" element={<StudentLoginPage />} />
      <Route path="/student" element={<PortalLayout links={studentLinks} user={{ name: 'أمل أحمد', role: 'طالبة' }} />}>
        <Route index element={<StudentHomePage />} />
        <Route path="opportunities" element={<PlaceholderPage title="فرص التدريب" module={2} owner="حسين" />} />
        <Route path="applications" element={<PlaceholderPage title="طلباتي ومتابعة الحالة" module={3} owner="حسين" />} />
        <Route path="training" element={<PlaceholderPage title="ملف التدريب والسجل اليومي" module={4} owner="حسين" />} />
        <Route path="reports" element={<PlaceholderPage title="التقارير والتقييم" module={5} owner="حسين" />} />
        <Route path="certificate" element={<PlaceholderPage title="الشهادة" module={6} owner="حسين" />} />
      </Route>

      {/* ───── بوابة الإدارة والمشرفين وجهة التدريب — عبد الله ───── */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<PortalLayout links={adminLinks} user={{ name: 'أ. محمد الخطيب', role: 'مسؤول التدريب' }} />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="students" element={<StudentsListPage />} />
        <Route path="organizations" element={<PlaceholderPage title="جهات التدريب" module={2} owner="عبد الله" />} />
        <Route path="opportunities" element={<PlaceholderPage title="فرص التدريب" module={2} owner="عبد الله" />} />
        <Route path="review" element={<PlaceholderPage title="المراجعة والتوزيع" module={3} owner="عبد الله" />} />
        <Route path="reports" element={<PlaceholderPage title="التقارير والإحصائيات" module={6} owner="عبد الله" />} />
      </Route>

      <Route path="*" element={<PlaceholderPage title="الصفحة غير موجودة" />} />
    </Routes>
  )
}
