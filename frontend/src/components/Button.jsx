// ─────────────────────────────────────────────
//  زر موحّد لكل النظام — المسؤول: حسين
//  مثال:  <Button onClick={save}>حفظ</Button>
//         <Button variant="secondary">إلغاء</Button>
// ─────────────────────────────────────────────
const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-white text-primary border border-primary hover:bg-primary-light',
  danger: 'bg-status-rejected text-white hover:bg-status-rejected/90',
}

export default function Button({ children, variant = 'primary', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
