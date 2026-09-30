// بيانات وهمية بنفس شكل ردود Django REST Framework المتفق عليه.
// لما يجهز الـ API الحقيقي، بنغيّر VITE_USE_MOCK=false بملف .env وخلص.
const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms))

const students = [
  { id: 1, student_id: '20251234', full_name: 'أحمد محمد', major: 'حاسوب', status: 'under_review' },
  { id: 2, student_id: '20251321', full_name: 'سارة خالد', major: 'هندسة شبكات', status: 'accepted' },
  { id: 3, student_id: '20251452', full_name: 'علي محمود', major: 'ميكانيك', status: 'needs_changes' },
  { id: 4, student_id: '20251678', full_name: 'لينا يوسف', major: 'تصميم جرافيك', status: 'assigned' },
  { id: 5, student_id: '20251702', full_name: 'محمد سالم', major: 'محاسبة', status: 'rejected' },
  { id: 6, student_id: '20251755', full_name: 'هبة ناصر', major: 'إدارة أعمال', status: 'draft' },
]

export const mockApi = {
  async login(username) {
    await wait()
    return { access: 'mock-token', user: { username, role: 'student' } }
  },
  async getMyProfile() {
    await wait()
    return {
      student_id: '20251234',
      full_name: 'أمل أحمد',
      major: 'هندسة الاتصالات',
      completed_hours: 96,
      required_hours: 90,
      is_eligible: true,
      eligibility_reason: null,
      application_status: 'under_review',
    }
  },
  async getStudents(page = 1, search = '') {
    await wait()
    const results = students.filter((s) => s.full_name.includes(search) || s.student_id.includes(search))
    // نفس شكل الترقيم الافتراضي بـ DRF
    return { count: results.length, next: null, previous: null, results }
  },
  async getDashboardStats() {
    await wait()
    return { students: 256, organizations: 42, opportunities: 18, pending_applications: 34 }
  },
}
