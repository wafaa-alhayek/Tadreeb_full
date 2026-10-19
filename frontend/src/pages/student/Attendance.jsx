import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Attendance() {
  const attendanceRows = [
    {
      date: "2025/10/01",
      day: "الأربعاء",
      status: "حاضر",
      notes: "—",
    },
    {
      date: "2025/10/02",
      day: "الخميس",
      status: "حاضر",
      notes: "—",
    },
    {
      date: "2025/10/03",
      day: "الجمعة",
      status: "غائب",
      notes: "مرض",
    },
    {
      date: "2025/10/06",
      day: "الاثنين",
      status: "حاضر",
      notes: "—",
    },
    {
      date: "2025/10/07",
      day: "الثلاثاء",
      status: "حاضر",
      notes: "—",
    },
    {
      date: "2025/10/08",
      day: "الأربعاء",
      status: "حاضر",
      notes: "—",
    },
  ];

  const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

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
            الحضور والغياب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            الحضور والغياب
          </h1>

          {/* ================= TRAINING INFO ================= */}
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
            <div className="grid grid-cols-3 gap-[10px]">
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  جهة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة القدس للاتصالات
                </p>
              </div>

              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  المشرف
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  م. سارة خليل
                </p>
              </div>

              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  الفترة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/01 - 2025/12/01
                </p>
              </div>
            </div>
          </section>

          {/* ================= STATISTICS ================= */}
          <section className="grid grid-cols-3 gap-[10px] mb-[12px]">
            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                عدد أيام الحضور
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                23
              </p>
            </div>

            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                نسبة الحضور
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                92%
              </p>
            </div>

            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                عدد أيام الغياب
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                2
              </p>
            </div>
          </section>

          {/* ================= CALENDAR ================= */}
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
            <h2 className="text-[12px] font-bold text-[#293444] mb-[12px]">
              أكتوبر 2025
            </h2>

            {/* Week Days */}
            <div className="grid grid-cols-7 text-center mb-[7px]">
              <span className="text-[8px] text-[#788493]">السبت</span>
              <span className="text-[8px] text-[#788493]">الأحد</span>
              <span className="text-[8px] text-[#788493]">الاثنين</span>
              <span className="text-[8px] text-[#788493]">الثلاثاء</span>
              <span className="text-[8px] text-[#788493]">الأربعاء</span>
              <span className="text-[8px] text-[#788493]">الخميس</span>
              <span className="text-[8px] text-[#788493]">الجمعة</span>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-[4px]">
              {calendarDays.map((day) => {
                const isAbsent = day === 3;
                const isPresent = [1, 2, 6, 7, 8].includes(day);

                return (
                  <div
                    key={day}
                    className={`
                      h-[28px]
                      rounded-[5px]
                      flex
                      items-center
                      justify-center
                      text-[8px]
                      ${
                        isAbsent
                          ? "bg-[#f8eaea] text-[#a15d5d]"
                          : isPresent
                          ? "bg-[#e9f3ed] text-[#567764]"
                          : "text-[#687485]"
                      }
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-[18px] mt-[12px]">
              <div className="flex items-center gap-[5px]">
                <span className="w-[7px] h-[7px] rounded-full bg-[#7fa78b]" />
                <span className="text-[8px] text-[#687485]">
                  حاضر
                </span>
              </div>

              <div className="flex items-center gap-[5px]">
                <span className="w-[7px] h-[7px] rounded-full bg-[#c98585]" />
                <span className="text-[8px] text-[#687485]">
                  غائب
                </span>
              </div>
            </div>
          </section>

          {/* ================= DETAILS TABLE ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              overflow-hidden
            "
          >
            <div className="px-[16px] py-[13px]">
              <h2 className="text-[12px] font-bold text-[#293444]">
                تفاصيل الحضور والغياب
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f6]">
                  <tr>
                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      التاريخ
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      اليوم
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      الحالة
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      الملاحظات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceRows.map((row, index) => (
                    <tr
                      key={row.date}
                      className={
                        index !== attendanceRows.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    >
                      <td className="px-[14px] py-[10px] text-[8px] text-[#566170]">
                        {row.date}
                      </td>

                      <td className="px-[14px] py-[10px] text-[8px] text-[#566170]">
                        {row.day}
                      </td>

                      <td className="px-[14px] py-[10px]">
                        <span
                          className={`
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            text-[7px]
                            font-bold
                            ${
                              row.status === "حاضر"
                                ? "bg-[#e7f3eb] text-[#567764]"
                                : "bg-[#f8eaea] text-[#a15d5d]"
                            }
                          `}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className="px-[14px] py-[10px] text-[8px] text-[#566170]">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}