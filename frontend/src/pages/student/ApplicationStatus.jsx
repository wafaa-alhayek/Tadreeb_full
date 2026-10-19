import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";
import { useNavigate } from "react-router-dom";

export default function ApplicationStatus() {
  const navigate = useNavigate();

  const reviews = [
    {
      date: "2025/09/10",
      action: "تقديم الطلب",
      responsible: "الطالب",
      status: "مكتمل",
      type: "success",
    },
    {
      date: "2025/09/12",
      action: "مراجعة الطلب",
      responsible: "مسؤول التدريب",
      status: "مكتمل",
      type: "success",
    },
    {
      date: "2025/09/14",
      action: "قيد الانتظار",
      responsible: "رئيس القسم",
      status: "قيد الانتظار",
      type: "waiting",
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
            طلباتي
            <span className="mx-[5px]">‹</span>
            متابعة حالة الطلب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[16px]">
            متابعة حالة الطلب
          </h1>

          {/* ================= STEPS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[25px]
              py-[18px]
              mb-[14px]
            "
          >
            <div className="flex items-start justify-center">
              <div className="flex items-start w-[560px]">
                {/* Step 1 */}
                <div className="flex flex-col items-center min-w-[95px]">
                  <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>

                  <span className="text-[8px] text-[#4c5766] mt-[5px]">
                    تقديم الطلب
                  </span>
                </div>

                <div className="h-px bg-[#505b70] flex-1 mt-[12px]" />

                {/* Step 2 */}
                <div className="flex flex-col items-center min-w-[95px]">
                  <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>

                  <span className="text-[8px] text-[#4c5766] mt-[5px]">
                    قيد المراجعة
                  </span>
                </div>

                <div className="h-px bg-[#505b70] flex-1 mt-[12px]" />

                {/* Step 3 */}
                <div className="flex flex-col items-center min-w-[95px]">
                  <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[9px] font-bold">
                    3
                  </div>

                  <span className="text-[8px] text-[#293444] font-bold mt-[5px]">
                    قيد الانتظار
                  </span>
                </div>

                <div className="h-px bg-[#cdd3db] flex-1 mt-[12px]" />

                {/* Step 4 */}
                <div className="flex flex-col items-center min-w-[95px]">
                  <div className="w-[25px] h-[25px] rounded-full border border-[#b8c0ca] bg-white text-[#7b8795] flex items-center justify-center text-[9px]">
                    4
                  </div>

                  <span className="text-[8px] text-[#8b95a2] mt-[5px]">
                    تم القبول
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= REQUEST DETAILS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
              mb-[14px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[13px]">
              تفاصيل الطلب
            </h2>

            <div className="grid grid-cols-3 gap-[10px] mb-[10px]">
              {/* Request Number */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  رقم الطلب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  #TR-2025-045
                </p>
              </div>

              {/* Status */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  الحالة
                </p>

                <span
                  className="
                    inline-flex
                    px-[9px]
                    py-[3px]
                    rounded-full
                    bg-[#eaf0f7]
                    text-[#596779]
                    text-[8px]
                    font-bold
                  "
                >
                  قيد المراجعة
                </span>
              </div>

              {/* Submission Date */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  تاريخ التقديم
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/09/10
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[10px]">
              {/* Opportunity */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  اسم الفرصة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  تدريب في شركة القدس للاتصالات
                </p>
              </div>

              {/* Company */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  جهة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة القدس للاتصالات
                </p>
              </div>

              {/* Specialization */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  التخصص
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  هندسة الاتصالات
                </p>
              </div>
            </div>
          </section>

          {/* ================= REVIEW TABLE ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              overflow-hidden
              mb-[14px]
            "
          >
            <div className="px-[16px] py-[13px]">
              <h2 className="text-[12px] font-bold text-[#293444]">
                جدول المراجعات
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
                      الإجراء
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      المسؤول
                    </th>

                    <th className="px-[14px] py-[9px] text-[8px] font-bold text-[#596575]">
                      الحالة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reviews.map((review, index) => (
                    <tr
                      key={index}
                      className={
                        index !== reviews.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    >
                      <td className="px-[14px] py-[10px] text-[8px] text-[#657181]">
                        {review.date}
                      </td>

                      <td className="px-[14px] py-[10px] text-[8px] text-[#3f4957]">
                        {review.action}
                      </td>

                      <td className="px-[14px] py-[10px] text-[8px] text-[#3f4957]">
                        {review.responsible}
                      </td>

                      <td className="px-[14px] py-[10px]">
                        <span
                          className={`
                            inline-flex
                            px-[8px]
                            py-[3px]
                            rounded-full
                            text-[7px]
                            font-bold
                            ${
                              review.type === "success"
                                ? "bg-[#e6f3eb] text-[#4f8060]"
                                : "bg-[#fff3d8] text-[#9a793b]"
                            }
                          `}
                        >
                          {review.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => navigate("/applications/accepted")}
              className="
                h-[33px]
                px-[17px]
                rounded-[5px]
                bg-[#505b70]
                text-white
                text-[9px]
                font-bold
                hover:bg-[#414b5f]
                transition
              "
            >
              عرض حالة القبول
              <span className="mr-[6px]">←</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}