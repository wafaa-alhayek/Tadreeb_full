// ─────────────────────────────────────────────
//  بطاقة إحصائية (رقم + عنوان) — المسؤول: عبد الله
//  مثال:  <StatCard label="عدد الطلبة" value={256} icon="👥" />
// ─────────────────────────────────────────────
export default function StatCard({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-2xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}
