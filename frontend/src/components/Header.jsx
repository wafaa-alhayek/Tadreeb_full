// ─────────────────────────────────────────────
//  الشريط العلوي (اسم المستخدم + الإشعارات) — المسؤول: حسين
// ─────────────────────────────────────────────
export default function Header({ user }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role}</div>
        </div>
      </div>
      <button className="text-xl" aria-label="الإشعارات">🔔</button>
    </header>
  )
}
