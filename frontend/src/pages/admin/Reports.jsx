import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Reports() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "الطلبات قيد المعالجة",
      value: "42",
      change: "▼ 5%",
      icon: "◷",
    },
    {
      title: "نسبة إتمام التدريب",
      value: "78%",
      change: "▼ 6%",
      icon: "✓",
    },
    {
      title: "عدد الطلبة المسجلين",
      value: "186",
      change: "▲ 10%",
      icon: "♟",
    },
    {
      title: "فرص التدريب المتاحة",
      value: "142",
      change: "▲ 15%",
      icon: "▣",
    },
    {
      title: "عدد جهات التدريب",
      value: "36",
      change: "▲ 8%",
      icon: "▦",
    },
    {
      title: "عدد التقارير الصادرة",
      value: "24",
      change: "▲ 12%",
      icon: "▤",
    },
  ];

  const latestReports = [
    {
      id: 1,
      name: "تقرير الطلبة المسجلين",
      type: "إحصائي",
      date: "2025/04/20",
      status: "مصدر",
    },
    {
      id: 2,
      name: "تقرير جهات التدريب",
      type: "إحصائي",
      date: "2025/04/18",
      status: "مصدر",
    },
    {
      id: 3,
      name: "تقرير فرص التدريب",
      type: "إحصائي",
      date: "2025/04/15",
      status: "مصدر",
    },
    {
      id: 4,
      name: "تقرير التقييمات",
      type: "إحصائي",
      date: "2025/04/10",
      status: "مصدر",
    },
  ];

  const quickReports = [
    "تقرير الطلبة المسجلين",
    "تقرير جهات التدريب",
    "تقرير فرص التدريب",
    "تقرير التقييمات",
    "تقرير الإتمام والشهادات",
    "تقرير الزيارات والمتابعة",
  ];

  const studentGrowth = [
    { month: "يناير", value: 98 },
    { month: "فبراير", value: 112 },
    { month: "مارس", value: 135 },
    { month: "أبريل", value: 156 },
    { month: "مايو", value: 172 },
    { month: "يونيو", value: 186 },
  ];

  const specialties = [
    { name: "هندسة", value: 42 },
    { name: "حاسب", value: 36 },
    { name: "إدارة", value: 28 },
    { name: "علوم", value: 22 },
    { name: "آداب", value: 18 },
    { name: "أخرى", value: 10 },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="mb-[10px]">
            <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
              <span>الرئيسية</span>
              <span>›</span>
              <span>التقارير والإحصائيات</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              التقارير والإحصائيات
            </h1>
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
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-[12px] items-end">
              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  الفترة الزمنية
                </label>

                <input
                  type="text"
                  defaultValue="2025/04/01 - 2025/04/30"
                  className="
                    w-full
                    h-[38px]
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    bg-white
                    px-[10px]
                    outline-none
                    text-[11px]
                    text-[#4a5465]
                  "
                />
              </div>

              <Filter label="التخصص">
                <option>الكل</option>
                <option>هندسة</option>
                <option>حاسب</option>
                <option>إدارة</option>
                <option>علوم</option>
              </Filter>

              <Filter label="الجهة">
                <option>الكل</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <Filter label="نوع التقرير">
                <option>الكل</option>
                <option>إحصائي</option>
                <option>تقييمات</option>
                <option>زيارات</option>
              </Filter>

              <button
                type="button"
                className="
                  h-[38px]
                  px-[14px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                ↻ تحديث البيانات
              </button>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-6 gap-[10px] mb-[10px]">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[12px]
                  py-[10px]
                "
              >
                <div className="flex items-center justify-between text-[10px] text-[#667085]">
                  <span>{stat.title}</span>
                  <span>{stat.icon}</span>
                </div>

                <div className="text-[24px] font-bold text-[#1f2733] leading-[1.4]">
                  {stat.value}
                </div>

                <div className="text-[9px] text-[#7a8393]">
                  {stat.change} هذا الشهر
                </div>
              </div>
            ))}
          </section>

          {/* ================= CHARTS ================= */}
          <section className="grid grid-cols-3 gap-[12px] mb-[10px]">
            {/* Student Growth */}
            <Card title="تطور أعداد الطلبة عبر الأشهر">
              <div className="h-[165px] flex items-end gap-[10px] px-[8px] pt-[12px]">
                {studentGrowth.map((item) => (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <span className="text-[9px] text-[#667085] mb-[4px]">
                      {item.value}
                    </span>

                    <div
                      className="
                        w-full
                        max-w-[28px]
                        rounded-t-[5px]
                        bg-[#4b5568]
                      "
                      style={{
                        height: `${(item.value / 200) * 115}px`,
                      }}
                    />

                    <span className="text-[9px] text-[#7a8393] mt-[5px]">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Training Status */}
            <Card title="حالة التدريب">
              <div className="flex items-center gap-[18px] py-[12px]">
                <div
                  className="
                    w-[130px]
                    h-[130px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                  style={{
                    background:
                      "conic-gradient(#4b5568 0% 78%, #8b95a7 78% 90%, #c1c7d0 90% 96%, #e5e7eb 96% 100%)",
                  }}
                >
                  <div
                    className="
                      w-[82px]
                      h-[82px]
                      bg-white
                      rounded-full
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                  >
                    <span className="text-[20px] font-bold text-[#1f2733]">
                      186
                    </span>

                    <span className="text-[9px] text-[#7a8393]">
                      طالب
                    </span>
                  </div>
                </div>

                <div className="flex-1 grid gap-[8px]">
                  <Legend label="مكتمل" value="78%" />
                  <Legend label="قيد التنفيذ" value="12%" />
                  <Legend label="قيد المراجعة" value="6%" />
                  <Legend label="لم يبدأ" value="4%" />
                </div>
              </div>
            </Card>

            {/* Specializations */}
            <Card title="التدريب حسب التخصص">
              <div className="grid gap-[8px] py-[8px]">
                {specialties.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[55px_1fr_25px] gap-[8px] items-center"
                  >
                    <span className="text-[9px] text-[#667085]">
                      {item.name}
                    </span>

                    <div className="h-[7px] bg-[#eceff4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4b5568] rounded-full"
                        style={{
                          width: `${(item.value / 46) * 100}%`,
                        }}
                      />
                    </div>

                    <span className="text-[9px] font-semibold text-[#3b4454]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ================= BOTTOM AREA ================= */}
          <section className="grid grid-cols-[1.4fr_1fr_230px] gap-[12px]">
            {/* Latest Reports */}
            <div
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
                  أحدث التقارير الصادرة
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "#",
                        "اسم التقرير",
                        "نوع التقرير",
                        "تاريخ الإصدار",
                        "الحالة",
                        "إجراءات",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="
                            px-[9px]
                            py-[8px]
                            text-[9px]
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
                    {latestReports.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                          {report.id}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                          {report.name}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                          {report.type}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                          {report.date}
                        </td>

                        <td className="px-[9px] py-[9px]">
                          <span
                            className="
                              inline-flex
                              px-[9px]
                              py-[3px]
                              rounded-full
                              bg-[#dff1e6]
                              text-[#236a45]
                              text-[9px]
                            "
                          >
                            {report.status}
                          </span>
                        </td>

                        <td className="px-[9px] py-[9px]">
                          <button
                            type="button"
                            className="
                              h-[27px]
                              px-[10px]
                              rounded-[6px]
                              border
                              border-[#b9c0cc]
                              bg-white
                              text-[9px]
                              text-[#3b4454]
                              hover:bg-[#eef0f4]
                            "
                          >
                            عرض
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Reports */}
            <Card title="التقارير السريعة">
              <div>
                {quickReports.map((report) => (
                  <button
                    key={report}
                    type="button"
                    className="
                      w-full
                      flex
                      items-center
                      gap-[8px]
                      py-[6px]
                      border-b
                      border-[#eceff4]
                      last:border-b-0
                      text-[10px]
                      text-[#3b4454]
                      hover:bg-[#f8f9fb]
                    "
                  >
                    <span className="text-[#8a93a3]">▤</span>
                    {report}
                  </button>
                ))}
              </div>
            </Card>

            {/* Export */}
            <div className="grid gap-[8px] content-start">
              <Card title="خيارات التصدير">
                <div className="grid gap-[6px]">
                  <ExportButton text="↓ تصدير إلى PDF" />
                  <ExportButton text="↓ تصدير إلى Excel" />
                  <ExportButton text="↓ تصدير إلى Word" />
                </div>
              </Card>

              <button
                type="button"
                onClick={() => navigate("/admin/reports/custom")}
                className="
                  w-full
                  h-[36px]
                  rounded-[7px]
                  bg-[#4b5568]
                  text-white
                  text-[10px]
                  font-semibold
                  hover:bg-[#3f4858]
                "
              >
                ⚙ إعداد تقرير مخصص
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
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
          text-[11px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[11px]
      "
    >
      <h2 className="text-[14px] font-bold text-[#1f2733] mb-[8px]">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Legend({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[7px]">
        <span className="w-[7px] h-[7px] rounded-full bg-[#4b5568]" />

        <span className="text-[10px] text-[#4a5465]">
          {label}
        </span>
      </div>

      <span className="text-[10px] font-semibold text-[#2b3340]">
        {value}
      </span>
    </div>
  );
}

function ExportButton({ text }) {
  return (
    <button
      type="button"
      className="
        w-full
        h-[30px]
        rounded-[6px]
        border
        border-[#b9c0cc]
        bg-white
        text-[9px]
        text-[#3b4454]
        hover:bg-[#eef0f4]
      "
    >
      {text}
    </button>
  );
}