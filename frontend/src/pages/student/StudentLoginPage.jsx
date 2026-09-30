// ─────────────────────────────────────────────
//  تسجيل دخول الطالب — الوحدة 1 — المسؤول: حسين
//  حسب الـ Wireframe: رقم الطالب + كلمة المرور + تذكرني
// ─────────────────────────────────────────────
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import { api, saveToken } from '../../api/client.js'

export default function StudentLoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !password) return setError('الرجاء تعبئة كل الحقول')
    try {
      const data = await api.login(studentId, password)
      saveToken(data.access)
      navigate('/student')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 bg-white px-8 py-12 md:px-20">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مرحباً بك مجدداً</h1>
          <p className="mt-2 text-gray-500">سجّل دخولك إلى حسابك للاستمرار</p>
        </div>
        <Input label="رقم الطالب" placeholder="أدخل رقم الطالب" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <Input label="كلمة المرور" type="password" placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} error={error} />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" /> تذكرني
        </label>
        <Button type="submit">تسجيل الدخول ←</Button>
        <a href="#" className="text-center text-sm text-primary">نسيت كلمة المرور؟</a>
      </form>
      <div className="hidden flex-col items-center justify-center gap-4 bg-primary-light p-12 text-center md:flex">
        <div className="text-7xl">🎓</div>
        <h2 className="text-2xl font-bold text-primary">نظام إدارة التدريب الميداني للطلبة</h2>
        <p className="text-gray-600">معاً نحو مستقبل مهني أفضل</p>
      </div>
    </div>
  )
}
