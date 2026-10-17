import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseReports() {
  const reportRows = [
    {
      course: "مهارات الحاسوب الأساسية",
      trainer: "أحمد خالد",
      requests: "32",
      accepted: "18",
      attendance: "89%",
      evaluation: "4.3 / 5",
      certificates: "12 صادرة",
    },
    {
      course: "تصميم واجهات المستخدم",
      trainer: "سارة أحمد",
      requests: "41",
      accepted: "22",
      attendance: "91%",
      evaluation: "4.5 / 5",
      certificates: "10 صادرة",
    },
    {
      course: "مهارات التواصل المهني",
      trainer: "ليان خالد",
      requests: "30",
      accepted: "24",
      attendance: "94%",
      evaluation: "4.4 / 5",
      certificates: "24 صادرة",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>التقارير والإحصائيات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التقارير والإحصائيات — الدورات التدريبية
              </h1>
            </div>

            <button
              type="button"
              className="
                h-[34px]
                px-[15px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[10px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              تصدير التقرير
            </button>
          </div>

          {/* ================= FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[10px]
              mb-[10px]
            "
          >
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-[12px]">
              <Filter label="الفترة الزمنية">
                <option>الفصل الحالي</option>
                <option>الفصل السابق</option>
                <option>السنة الحالية</option>
              </Filter>

              <Filter label="نطاق التقرير">
                <option>جميع الدورات</option>
                <option>دورة محددة</option>
              </Filter>

              <Filter label="التخصص">
                <option>الكل</option>
                <option>تقنية المعلومات</option>
                <option>إدارة الأعمال</option>
              </Filter>

              <Filter label="الفصل">
                <option>الكل</option>
                <option>الفصل الأول</option>
                <option>الفصل الثاني</option>
              </Filter>

              <Filter label="السنة">
                <option>2026</option>
                <option>2025</option>
              </Filter>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-5 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي الدورات" value="24" />
            <StatCard title="طلبات التسجيل" value="486" />
            <StatCard title="المتدربون المقبولون" value="312" />
            <StatCard title="الشهادات الصادرة" value="198" />
            <StatCard title="نسبة الإنجاز" value="78%" />
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[4px] border-b border-[#dfe3ea] mb-[12px]">
            <Tab label="التسجيل" active />
            <Tab label="الحضور" />
            <Tab label="التقييم" />
            <Tab label="الشهادات" />
          </div>

          {/* ================= CHARTS ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <ChartCard title="طلبات التسجيل حسب الشهر">
              <BarChart
                items={[
                  ["الشهر 1", 65],
                  ["الشهر 2", 82],
                  ["الشهر 3", 74],
                  ["الشهر 4", 103],
                ]}
                max={120}
              />
            </ChartCard>

            <ChartCard title="الحضور المسجل (نسبة % لكل جلسة)">
              <BarChart
                items={[
                  ["جلسة 1", 88],
                  ["جلسة 2", 81],
                  ["جلسة 3", 92],
                  ["جلسة 4", 85],
                ]}
                max={100}
                showPercent
              />
            </ChartCard>

            <ChartCard title="حالة إصدار الشهادات">
              <div className="flex items-center gap-[16px]">
                <div
                  className="
                    w-[110px]
                    h-[110px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                  style={{
                    background:
                      "conic-gradient(#687386 0 62%, #aeb5c0 62% 82%, #d9dde4 82% 100%)",
                  }}
                >
                  <div
                    className="
                      w-[70px]
                      h-[70px]
                      rounded-full
                      bg-white
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                  >
                    <strong className="text-[18px] text-[#1f2733]">
                      198
                    </strong>

                    <span className="text-[8px] text-[#7a8393]">
                      صادرة
                    </span>
                  </div>
                </div>

                <div className="flex-1 grid gap-[8px]">
                  <Legend
                    label="صادرة"
                    value="198"
                  />

                  <Legend
                    label="بانتظار الإصدار"
                    value="50"
                  />

                  <Legend
                    label="غير مكتملة"
                    value="25"
                  />
                </div>
              </div>
            </ChartCard>
          </div>

          {/* ================= REPORT DETAILS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              overflow-hidden
            "
          >
            <div className="px-[14px] py-[10px]">
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                تفاصيل التقرير
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "اسم الدورة",
                      "المدرب",
                      "طلبات التسجيل",
                      "المقبولون",
                      "نسبة الحضور",
                      "متوسط التقييم",
                      "الشهادات",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="
                          px-[10px]
                          py-[8px]
                          text-[10px]
                          font-semibold
                          text-[#3b4454]
                          border-b
                          border-[#dfe3ea]
                          whitespace-nowrap
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {reportRows.map((row) => (
                    <tr
                      key={row.course}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[10px] text-[10px] font-bold text-[#2b3340]">
                        {row.course}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {row.trainer}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {row.requests}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {row.accepted}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                        {row.attendance}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                        {row.evaluation}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {row.certificates}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="px-[14px] py-[9px] text-[9px] text-[#7a8393]">
              أعمدة الجدول تتغير حسب نوع التقرير. الأرقام تجريبية.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[10px]
      "
    >
      <p className="text-[10px] text-[#667085] mb-[2px]">
        {title}
      </p>

      <p className="text-[21px] font-bold text-[#1f2733]">
        {value}
      </p>
    </div>
  );
}

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
        {label}
      </label>

      <select
        className="
          w-full
          h-[38px]
          rounded-[8px]
          border
          border-[#c9cfd9]
          bg-white
          px-[10px]
          outline-none
          text-[10px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
    </div>
  );
}

function Tab({ label, active = false }) {
  return (
    <button
      type="button"
      className={`
        px-[14px]
        py-[9px]
        text-[10px]
        border-b-2
        ${
          active
            ? "border-[#4b5568] text-[#1f2733] font-bold"
            : "border-transparent text-[#667085]"
        }
      `}
    >
      {label}
    </button>
  );
}

function ChartCard({ title, children }) {
  return (
    <section
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[12px]
      "
    >
      <h2 className="text-[13px] font-bold text-[#1f2733] mb-[12px]">
        {title}
      </h2>

      {children}
    </section>
  );
}

function BarChart({ items, max, showPercent = false }) {
  return (
    <div className="grid gap-[10px]">
      {items.map(([label, value]) => (
        <div key={label}>
          <div className="flex justify-between mb-[4px]">
            <span className="text-[9px] text-[#667085]">
              {label}
            </span>

            <span className="text-[9px] font-semibold text-[#2b3340]">
              {value}
              {showPercent ? "%" : ""}
            </span>
          </div>

          <div className="h-[8px] rounded-full bg-[#e8ebf0] overflow-hidden">
            <div
              className="h-full bg-[#687386]"
              style={{
                width: `${Math.min((value / max) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Legend({ label, value }) {
  return (
    <div className="flex justify-between items-center gap-[10px]">
      <span className="text-[9px] text-[#667085]">
        {label}
      </span>

      <span className="text-[10px] font-bold text-[#2b3340]">
        {value}
      </span>
    </div>
  );
}