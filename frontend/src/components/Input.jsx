// ─────────────────────────────────────────────
//  حقل إدخال مع عنوان ورسالة خطأ — المسؤول: حسين
//  مثال:  <Input label="رقم الطالب" placeholder="أدخل رقم الطالب" />
// ─────────────────────────────────────────────
export default function Input({ label, error, id, ...props }) {
  const inputId = id || label
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        id={inputId}
        className={`rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-status-rejected' : 'border-gray-300'}`}
        {...props}
      />
      {error && <span className="text-sm text-status-rejected">{error}</span>}
    </div>
  )
}
