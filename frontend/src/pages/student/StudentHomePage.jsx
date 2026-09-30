// ─────────────────────────────────────────────
//  الصفحة الرئيسية للطالب — الوحدة 1 — المسؤول: حسين
//  بتعرض: بيانات الطالب + نتيجة الأهلية + حالة الطلب
// ─────────────────────────────────────────────
import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { api } from '../../api/client.js'

export default function StudentHomePage() {
  const [profile, setProfile] = useState(null)

  // أول ما تفتح الصفحة، بنجيب بيانات الطالب من الـ API
  useEffect(() => {
    api.getMyProfile().then(setProfile)
  }, [])

  if (!profile) return <p className="text-gray-500">جاري التحميل...</p>

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">مرحباً {profile.full_name} 👋</h1>

      <div className={`rounded-xl p-5 font-semibold ${profile.is_eligible ? 'bg-green-50 text-status-accepted' : 'bg-red-50 text-status-rejected'}`}>
        {profile.is_eligible ? '✅ أنت مؤهل للتقديم على التدريب الميداني' : `❌ غير مؤهل – السبب: ${profile.eligibility_reason}`}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="بياناتي">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <dt className="text-gray-500">الرقم الجامعي</dt><dd>{profile.student_id}</dd>
            <dt className="text-gray-500">التخصص</dt><dd>{profile.major}</dd>
            <dt className="text-gray-500">الساعات المنجزة</dt><dd>{profile.completed_hours} / {profile.required_hours}</dd>
          </dl>
        </Card>
        <Card title="حالة طلبي">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">تدريب في شركة القدس للاتصالات</span>
            <StatusBadge status={profile.application_status} />
          </div>
        </Card>
      </div>
    </div>
  )
}
