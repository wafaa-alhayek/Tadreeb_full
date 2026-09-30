// ─────────────────────────────────────────────────────────────
//  طبقة الاتصال بالـ API — المسؤول: عبد الله (بالتنسيق مع وفاء)
//  كل الصفحات بتطلب البيانات من هون، ما حدا بيستخدم fetch مباشرة.
//  هيك إذا تغيّر شي (عنوان الخادم، التوكن...) بنعدّله بمكان واحد.
// ─────────────────────────────────────────────────────────────
import { mockApi } from './mock.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true'

// التوكن اللي بيرجعه الخادم بعد تسجيل الدخول
export function saveToken(token) {
  localStorage.setItem('token', token)
}

async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (response.status === 401) {
    // انتهت الجلسة ← نرجّع المستخدم لصفحة الدخول
    localStorage.removeItem('token')
    window.location.href = '/student/login'
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    // شكل الخطأ الافتراضي من Django REST Framework: { "detail": "..." }
    throw new Error(data?.detail || 'حدث خطأ، حاول مرة أخرى')
  }
  return data
}

// كل الـ Endpoints بمكان واحد. الأسماء متفق عليها مع وفاء.
const realApi = {
  login: (username, password) =>
    request('/auth/login/', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getMyProfile: () => request('/students/me/'),
  getStudents: (page = 1, search = '') => request(`/students/?page=${page}&search=${search}`),
  getDashboardStats: () => request('/dashboard/stats/'),
}

// لحد ما تجهز APIs وفاء، بنشتغل على بيانات وهمية بنفس الشكل بالضبط
export const api = USE_MOCK ? mockApi : realApi
