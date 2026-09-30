// ─────────────────────────────────────────────
//  شارة حالة الطلب — المسؤول: حسين
//  بتاخد الرمز الإنجليزي من الـ API وبتعرض الاسم العربي باللون الصح.
//  مثال:  <StatusBadge status="under_review" />  ←  «قيد المراجعة» بالبرتقالي
// ─────────────────────────────────────────────
import { APPLICATION_STATUSES } from '../constants/statuses.js'

export default function StatusBadge({ status }) {
  const info = APPLICATION_STATUSES[status] || { label: status, color: 'bg-gray-400' }
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${info.color}`}>
      {info.label}
    </span>
  )
}
