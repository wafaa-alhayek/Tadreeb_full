// ─────────────────────────────────────────────
//  جدول بيانات مع بحث — المسؤول: عبد الله
//  بتحدد الأعمدة مرة وحدة، والجدول بيرسم الباقي.
//  مثال:
//    const columns = [
//      { key: 'full_name', label: 'الاسم' },
//      { key: 'status', label: 'الحالة', render: (row) => <StatusBadge status={row.status} /> },
//    ]
//    <DataTable columns={columns} rows={students} onSearch={setSearch} />
// ─────────────────────────────────────────────
export default function DataTable({ columns, rows, onSearch, searchPlaceholder = 'بحث...' }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {onSearch && (
        <div className="border-b border-gray-200 p-3">
          <input
            className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-start font-semibold">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">لا توجد نتائج</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
