// ─────────────────────────────────────────────
//  دخول الإدارة والمشرفين وجهة التدريب — الوحدة 1 — المسؤول: عبد الله
//  لاحظ: نفس مكونات حسين (Button و Input) — ما بنعيد بناءها.
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Card from '../../components/Card.jsx'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="text-5xl">🏛️</div>
          <h1 className="mt-2 text-xl font-bold text-primary">منصة إدارة التدريب الميداني</h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate('/admin') }}>
          <Input label="اسم المستخدم" placeholder="اسم المستخدم" />
          <Input label="كلمة المرور" type="password" placeholder="كلمة المرور" />
          <Button type="submit">تسجيل الدخول</Button>
        </form>
      </Card>
    </div>
  )
}
