// ─────────────────────────────────────────────
//  إدارة الطلبة — الوحدة 1 — المسؤول: عبد الله
//  مثال كامل على: جلب بيانات من الـ API + جدول + بحث + شارة حالة
// ─────────────────────────────────────────────
import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { api } from '../../api/client.js'

const columns = [
  { key: 'full_name', label: 'الاسم' },
  { key: 'student_id', label: 'الرقم الجامعي' },
  { key: 'major', label: 'التخصص' },
  { key: 'status', label: 'حالة الطلب', render: (row) => <StatusBadge status={row.status} /> },
]

export default function StudentsListPage() {
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState([])

  // كل ما يتغير البحث، بنطلب البيانات من جديد
  useEffect(() => {
    api.getStudents(1, search).then((data) => setStudents(data.results))
  }, [search])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">إدارة الطلبة</h1>
      <DataTable columns={columns} rows={students} onSearch={setSearch} searchPlaceholder="ابحث بالاسم أو الرقم الجامعي..." />
    </div>
  )
}
