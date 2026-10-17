import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Reports() {
  const availableReports = [
    "تقرير الحضور والغياب",
    "تقرير أداء الطالب",
    "تقرير تقييم المدرب",
    "تقرير ختامي للتدريب",
  ];

  const weeklyHours = [
    { week: "الأسبوع الأول", hours: 28 },
    { week: "الأسبوع الثاني", hours: 32 },
    { week: "الأسبوع الثالث", hours: 30 },
    { week: "الأسبوع الرابع", hours: 30 },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 px-[28px] pt-[15px] pb-8">
          {/* ================= BREADCRUMB ================= */}
          <div className="text-[8px] text-[#9aa3ae] mb-[11px]">
            الرئيسية
            <span className="mx-[5px]">‹</span>
            التقارير
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            التقارير
          </h1>

          {/* ================= FILTERS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[12px]
            "
          >
            <div className="grid grid-cols-4 gap-[10px] items-end">
              {/* Report Type */}
              <div>
                <label className="block text-[8px] text-[#596575] font-bold mb-[6px]">
                  نوع التقرير
                </label>

                <select
                  className="
                    w-full
                    h-[34px]
                    border
                    border-[#d9dee5]
                    rounded-[6px]
                    bg-white
                    px-[10px]
                    text-[9px]
                    text-[#566170]
                    outline-none
                  "
                >
                  <option>تقرير الحضور والغياب</option>
                  <option>تقرير أداء الطالب</option>
                  <option>تقرير تقييم المدرب</option>
                  <option>تقرير ختامي للتدريب</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-[8px] text-[#596575] font-bold mb-[6px]">
                  الفترة الزمنية
                </label>

                <input
                  type="text"
                  placeholder="من تاريخ - إلى تاريخ"
                  className="
                    w-full
                    h-[34px]
                    border
                    border-[#d9dee5]
                    rounded-[6px]
                    px-[10px]
                    text-[9px]
                    text-[#566170]
                    placeholder:text-[#9aa3ae]
                    outline-none
                  "
                />
              </div>

              {/* Training Program */}
              <div>
                <label className="block text-[8px] text-[#596575] font-bold mb-[6px]">
                  البرنامج التدريبي
                </label>

                <select
                  className="
                    w-full
                    h-[34px]
                    border
                    border-[#d9dee5]
                    rounded-[6px]
                    bg-white
                    px-[10px]
                    text-[9px]
                    text-[#566170]
                    outline-none
                  "
                >
                  <option>جميع البرامج</option>
                  <option>هندسة الاتصالات</option>
                  <option>تقنية المعلومات</option>
                </select>
              </div>

              {/* Download */}
              <button
                type="button"
                className="
                  h-[34px]
                  px-[16px]
                  rounded-[5px]
                  bg-[#505b70]
                  text-white
                  text-[9px]
                  font-bold
                  hover:bg-[#414b5f]
                  transition
                "
              >
                تحميل تقرير
              </button>
            </div>
          </section>

          {/* ================= STATISTICS ================= */}
          <section className="grid grid-cols-4 gap-[10px] mb-[12px]">
            <div className="border border-[#e0e3e7] rounded-[8px] px-[14px] py-[12px]">
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                إجمالي الساعات
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                120
              </p>
            </div>

            <div className="border border-[#e0e3e7] rounded-[8px] px-[14px] py-[12px]">
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                نسبة الحضور
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                92%
              </p>
            </div>

            <div className="border border-[#e0e3e7] rounded-[8px] px-[14px] py-[12px]">
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                عدد الأيام الفعلية
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                24
              </p>
            </div>

            <div className="border border-[#e0e3e7] rounded-[8px] px-[14px] py-[12px]">
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                عدد مرات الغياب
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                2
              </p>
            </div>
          </section>

          {/* ================= TWO COLUMNS ================= */}
          <section className="grid grid-cols-2 gap-[12px] mb-[12px]">
            {/* Attendance */}
            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[16px]
                py-[14px]
              "
            >
              <h2 className="text-[12px] font-bold text-[#293444] mb-[12px]">
                نسبة الحضور والغياب
              </h2>

              <div className="flex items-end gap-[18px] h-[120px]">
                <div className="flex flex-col items-center justify-end h-full">
                  <div className="w-[40px] h-[92px] rounded-t-[5px] bg-[#dfe8e2]" />

                  <span className="text-[8px] text-[#687485] mt-[5px]">
                    حضور
                  </span>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                  <div className="w-[40px] h-[8px] rounded-t-[5px] bg-[#ecdede]" />

                  <span className="text-[8px] text-[#687485] mt-[5px]">
                    غياب
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[15px] mt-[10px]">
                <div className="flex items-center gap-[5px]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#8da898]" />

                  <span className="text-[8px] text-[#687485]">
                    حضور
                  </span>
                </div>

                <div className="flex items-center gap-[5px]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#c79090]" />

                  <span className="text-[8px] text-[#687485]">
                    غياب
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Hours */}
            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[16px]
                py-[14px]
              "
            >
              <h2 className="text-[12px] font-bold text-[#293444] mb-[12px]">
                توزيع الساعات حسب الأسابيع
              </h2>

              <div className="space-y-[12px]">
                {weeklyHours.map((item) => (
                  <div key={item.week}>
                    <div className="flex justify-between mb-[4px]">
                      <span className="text-[8px] text-[#687485]">
                        {item.week}
                      </span>

                      <span className="text-[8px] font-bold text-[#4f5a68]">
                        {item.hours} ساعة
                      </span>
                    </div>

                    <div className="h-[6px] rounded-full bg-[#eef1f4] overflow-hidden">
                      <div
                        className="h-full bg-[#9ba7b6] rounded-full"
                        style={{
                          width: `${(item.hours / 32) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= AVAILABLE REPORTS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[14px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[10px]">
              أهم التقارير المتاحة
            </h2>

            <div className="grid grid-cols-2 gap-[8px]">
              {availableReports.map((report) => (
                <div
                  key={report}
                  className="
                    h-[36px]
                    border
                    border-[#e5e8ec]
                    rounded-[6px]
                    px-[11px]
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span className="text-[9px] text-[#566170]">
                    {report}
                  </span>

                  <span className="text-[10px] text-[#8b95a2]">
                    ▥
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}