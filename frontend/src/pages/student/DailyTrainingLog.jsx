import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function DailyTrainingLog() {
  const navigate = useNavigate();

  const logs = [
    {
      day: "الأحد",
      date: "2025/10/05",
      task: "متابعة تركيب الشبكات",
      duration: "6 ساعات",
      notes: "جيد",
    },
    {
      day: "الاثنين",
      date: "2025/10/06",
      task: "دعم فني للعملاء",
      duration: "5 ساعات",
      notes: "—",
    },
    {
      day: "الثلاثاء",
      date: "2025/10/07",
      task: "تجهيز التقارير",
      duration: "4 ساعات",
      notes: "ممتاز",
    },
    {
      day: "الأربعاء",
      date: "2025/10/08",
      task: "صيانة الأجهزة",
      duration: "5 ساعات",
      notes: "—",
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
            السجل التدريبي اليومي
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            السجل التدريبي اليومي
          </h1>

          {/* ================= INFO ================= */}
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
              {/* Company */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  الشركة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة القدس للاتصالات
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  التاريخ
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/05
                </p>
              </div>

              {/* Week */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  الأسبوع
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  الثاني
                </p>
              </div>
            </div>
          </section>

          {/* ================= ADD BUTTON ================= */}
          <div className="flex justify-start mb-[12px]">
            <button
              type="button"
              className="
                h-[32px]
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
              + إضافة سجل جديد
            </button>
          </div>

          {/* ================= TABLE ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              overflow-hidden
            "
          >
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f6]">
                  <tr>
                    <th className="px-[14px] py-[10px] text-[8px] font-bold text-[#596575]">
                      اليوم
                    </th>

                    <th className="px-[14px] py-[10px] text-[8px] font-bold text-[#596575]">
                      المهام المنجزة
                    </th>

                    <th className="px-[14px] py-[10px] text-[8px] font-bold text-[#596575]">
                      المدة
                    </th>

                    <th className="px-[14px] py-[10px] text-[8px] font-bold text-[#596575]">
                      الملاحظات
                    </th>

                    <th className="px-[14px] py-[10px] text-[8px] font-bold text-[#596575]">
                      الإجراء
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {logs.map((log, index) => (
                    <tr
                      key={log.date}
                      className={
                        index !== logs.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    >
                      {/* Day */}
                      <td className="px-[14px] py-[11px]">
                        <p className="text-[8px] font-bold text-[#3f4957]">
                          {log.day}
                        </p>

                        <p className="text-[7px] text-[#9aa3ae] mt-[2px]">
                          {log.date}
                        </p>
                      </td>

                      {/* Task */}
                      <td className="px-[14px] py-[11px] text-[8px] text-[#566170]">
                        {log.task}
                      </td>

                      {/* Duration */}
                      <td className="px-[14px] py-[11px] text-[8px] text-[#566170]">
                        {log.duration}
                      </td>

                      {/* Notes */}
                      <td className="px-[14px] py-[11px] text-[8px] text-[#566170]">
                        {log.notes}
                      </td>

                      {/* Action */}
                      <td className="px-[14px] py-[11px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate("/daily-training-log/details")
                          }
                          className="
                            h-[26px]
                            px-[11px]
                            rounded-[5px]
                            border
                            border-[#d7dce3]
                            bg-white
                            text-[#566170]
                            text-[8px]
                            hover:bg-[#f7f8fa]
                            transition
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
          </section>
        </main>
      </div>
    </div>
  );
}