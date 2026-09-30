// ─────────────────────────────────────────────
//  الشريط الجانبي — المسؤول: حسين
//  نفس المكوّن للبوابتين، بس كل بوابة بتبعتله روابطها (links).
//  لاحظ: بالـ RTL الشريط بيطلع على اليمين تلقائيًا.
// ─────────────────────────────────────────────
import { NavLink } from 'react-router-dom'

export default function Sidebar({ links }) {
  return (
    <aside className="hidden w-60 shrink-0 border-e border-gray-200 bg-white md:block">
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
        <span className="text-2xl">🎓</span>
        <span className="text-sm font-bold text-primary">نظام إدارة التدريب الميداني</span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-primary-light text-primary' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
