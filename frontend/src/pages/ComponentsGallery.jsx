// ─────────────────────────────────────────────
//  معرض المكونات (/gallery) — مرجع بصري لكل المكونات المشتركة.
//  أي مكوّن جديد مشترك بينضاف هون، عشان الكل يشوفه قبل ما يعيد بناءه.
// ─────────────────────────────────────────────
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Card from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import StatCard from '../components/StatCard.jsx'
import DataTable from '../components/DataTable.jsx'
import { APPLICATION_STATUSES } from '../constants/statuses.js'

export default function ComponentsGallery() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold text-primary">معرض المكونات المشتركة</h1>

      <Card title="Button — حسين">
        <div className="flex flex-wrap gap-3">
          <Button>زر أساسي</Button>
          <Button variant="secondary">زر ثانوي</Button>
          <Button variant="danger">حذف</Button>
          <Button disabled>معطّل</Button>
        </div>
      </Card>

      <Card title="Input — حسين">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="رقم الطالب" placeholder="أدخل رقم الطالب" />
          <Input label="البريد الإلكتروني" placeholder="name@example.com" error="البريد غير صحيح" />
        </div>
      </Card>

      <Card title="StatusBadge — حسين">
        <div className="flex flex-wrap gap-2">
          {Object.keys(APPLICATION_STATUSES).map((code) => <StatusBadge key={code} status={code} />)}
        </div>
      </Card>

      <Card title="StatCard — عبد الله">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="الطلبة" value={256} icon="👥" />
          <StatCard label="جهات التدريب" value={42} icon="🏢" />
          <StatCard label="فرص التدريب" value={18} icon="💼" />
        </div>
      </Card>

      <Card title="DataTable — عبد الله">
        <DataTable
          columns={[{ key: 'name', label: 'الاسم' }, { key: 'status', label: 'الحالة', render: (r) => <StatusBadge status={r.status} /> }]}
          rows={[{ id: 1, name: 'أحمد محمد', status: 'accepted' }, { id: 2, name: 'سارة خالد', status: 'under_review' }]}
        />
      </Card>
    </div>
  )
}
