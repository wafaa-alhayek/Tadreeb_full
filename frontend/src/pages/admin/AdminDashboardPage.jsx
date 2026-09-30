// ─────────────────────────────────────────────
//  لوحة التحكم (الإدارة) — الوحدة 1 (الأساس) و 6 (الإحصائيات الكاملة) — المسؤول: عبد الله
// ─────────────────────────────────────────────
import { useEffect, useState } from 'react'
import StatCard from '../../components/StatCard.jsx'
import { api } from '../../api/client.js'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  useEffect(() => { api.getDashboardStats().then(setStats) }, [])
  if (!stats) return <p className="text-gray-500">جاري التحميل...</p>

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الطلبة" value={stats.students} icon="👥" />
        <StatCard label="جهات التدريب" value={stats.organizations} icon="🏢" />
        <StatCard label="فرص التدريب" value={stats.opportunities} icon="💼" />
        <StatCard label="طلبات بانتظار المراجعة" value={stats.pending_applications} icon="⏳" />
      </div>
    </div>
  )
}
