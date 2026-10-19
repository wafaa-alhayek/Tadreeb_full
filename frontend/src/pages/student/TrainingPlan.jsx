import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingPlan() {
  const activities = [
    {
      week: "1",
      tasks: "التدريب على الأنظمة وصيانة الشبكات",
      output: "تقرير أسبوعي",
    },
    {
      week: "2-3",
      tasks: "المشاركة في تركيب وصيانة الشبكات",
      output: "تقرير أسبوعي",
    },
    {
      week: "4-5",
      tasks: "العمل على مشاريع عملية",
      output: "تقرير أسبوعي",
    },
    {
      week: "6-7",
      tasks: "تجهيز التقرير النهائي",
      output: "تقرير نهائي",
    },
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
            ملفي التدريبي
            <span className="mx-[5px]">‹</span>
            خطة التدريب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            خطة التدريب
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

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  مدة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  8 أسابيع
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  تاريخ البدء
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/01
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  تاريخ الانتهاء
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/12/01
                </p>
              </div>

            </div>
          </section>

          {/* ================= GOALS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
              mb-[12px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[10px]">
              أهداف التدريب
            </h2>

            <ul className="space-y-[7px] text-[9px] text-[#5f6a78]">
              <li className="flex items-start gap-[7px]">
                <span className="text-[#7b8795]">•</span>
                <span>التعرف على بيئة العمل في قطاع الاتصالات.</span>
              </li>

              <li className="flex items-start gap-[7px]">
                <span className="text-[#7b8795]">•</span>
                <span>اكتساب مهارات عملية في صيانة الشبكات.</span>
              </li>

              <li className="flex items-start gap-[7px]">
                <span className="text-[#7b8795]">•</span>
                <span>تطوير مهارات العمل الجماعي والتواصل.</span>
              </li>
            </ul>
          </section>

          {/* ================= TASKS ================= */}
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
                المهام والأنشطة
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">

                <thead className="bg-[#f1f3f6]">
                  <tr>
                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      الأسبوع
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      المهام
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      المخرجات المتوقعة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activities.map((activity, index) => (
                    <tr
                      key={activity.week}
                      className={
                        index !== activities.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    >
                      <td className="px-[14px] py-[11px] text-[8px] text-[#3f4957] font-bold">
                        {activity.week}
                      </td>

                      <td className="px-[14px] py-[11px] text-[8px] text-[#5f6a78]">
                        {activity.tasks}
                      </td>

                      <td className="px-[14px] py-[11px] text-[8px] text-[#5f6a78]">
                        {activity.output}
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