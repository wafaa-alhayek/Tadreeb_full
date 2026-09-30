// ─────────────────────────────────────────────
//  الهيكل المشترك لكل صفحات البوابتين: شريط جانبي + شريط علوي + المحتوى
//  <Outlet /> هو المكان اللي بتنعرض فيه الصفحة الحالية.
// ─────────────────────────────────────────────
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'

export default function PortalLayout({ links, user }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <div className="flex flex-1 flex-col">
        <Header user={user} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
