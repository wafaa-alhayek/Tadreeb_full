// حالات الطلب: الرمز (code) هو اللي بيجي من الـ API ومتخزن بقاعدة البيانات.
// الاسم العربي واللون للعرض بس. (متفق عليها بملف docs/TEAM_AGREEMENT.md)
export const APPLICATION_STATUSES = {
  draft:         { label: 'مسودة',          color: 'bg-status-draft' },
  submitted:     { label: 'مرسل',           color: 'bg-status-assigned' },
  under_review:  { label: 'قيد المراجعة',   color: 'bg-status-review' },
  needs_changes: { label: 'بحاجة لتعديل',  color: 'bg-status-changes' },
  accepted:      { label: 'مقبول',          color: 'bg-status-accepted' },
  rejected:      { label: 'مرفوض',          color: 'bg-status-rejected' },
  assigned:      { label: 'تم التوزيع',     color: 'bg-status-assigned' },
}
