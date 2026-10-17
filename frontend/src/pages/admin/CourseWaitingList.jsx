import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseWaitingList() {
  const navigate = useNavigate();

  const waitingStudents = [
    {
      order: 1,
      student: "نور حسن",
      studentId: "20241004",
      date: "2026/10/05",
      eligibility: "مستوفٍ",
    },
    {
      order: 2,
      student: "خالد سامر",
      studentId: "20241006",
      date: "2026/10/06",
      eligibility: "مستوفٍ",
    },
    {
      order: 3,
      student: "ريم أحمد",
      studentId: "20241007",
      date: "2026/10/07",
      eligibility: "مستوفٍ",
    },
    {
      order: 4,
      student: "يزن عادل",
      studentId: "20241009",
      date: "2026/10/08",
      eligibility: "مستوفٍ",
    },
    {
      order: 5,
      student: "هبة سمير",
      studentId: "20241011",
      date: "2026/10/09",
      eligibility: "مستوفٍ",
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
                <span>قائمة الانتظار</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                قائمة الانتظار
              </h1>
            </div>

            <div
              className="
                border
                border-[#dfe3ea]
                rounded-[8px]
                bg-[#fbfcfd]
                px-[12px]
                py-[7px]
              "
            >
              <p className="text-[9px] text-[#7a8393]">
                الدورة الحالية
              </p>

              <p className="text-[10px] font-semibold text-[#2b3340]">
                مهارات الحاسوب الأساسية
              </p>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 gap-[12px] mb-[10px] max-w-[520px]">
            <StatCard title="عدد المنتظرين" value="7" />
            <StatCard title="المقاعد المتاحة" value="2" />
          </div>

          {/* ================= ALERT ================= */}
          <div
            className="
              border
              border-[#eadcae]
              bg-[#fffaf0]
              rounded-[9px]
              px-[13px]
              py-[10px]
              mb-[10px]
              flex
              items-center
              gap-[10px]
            "
          >
            <span
              className="
                w-[28px]
                h-[28px]
                rounded-full
                bg-[#fff1cc]
                text-[#8a6515]
                flex
                items-center
                justify-center
                font-bold
              "
            >
              !
            </span>

            <div>
              <p className="text-[11px] font-bold text-[#5e4a1e]">
                يوجد مقعدان متاحان
              </p>

              <p className="text-[9px] text-[#7a6b45] mt-[2px]">
                يجب التحقق من السعة الفعلية وحالة التسجيل قبل نقل أي متقدم.
              </p>
            </div>
          </div>

          {/* ================= SEARCH ================= */}
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
            <div
              className="
                h-[38px]
                border
                border-[#c9cfd9]
                rounded-[8px]
                flex
                items-center
                px-[12px]
                gap-[8px]
              "
            >
              <input
                type="text"
                placeholder="ابحث باسم الطالب أو رقمه الجامعي ..."
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  text-[11px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">
                ⌕
              </span>
            </div>
          </section>

          {/* ================= WAITING LIST ================= */}
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
                الطلبة المنتظرون
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "الترتيب",
                      "الطالب",
                      "الرقم الجامعي",
                      "تاريخ تقديم الطلب",
                      "الحالة",
                      "الأهلية",
                      "الإجراءات",
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
                  {waitingStudents.map((student) => (
                    <tr
                      key={student.studentId}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                        {student.order}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                        {student.student}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {student.date}
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <span
                          className="
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            bg-[#fff1cc]
                            text-[#8a6515]
                            text-[9px]
                            font-medium
                          "
                        >
                          انتظار
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <span
                          className="
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            bg-[#dff1e6]
                            text-[#236a45]
                            text-[9px]
                            font-medium
                          "
                        >
                          {student.eligibility}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <div className="flex gap-[6px]">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/courses/1/registration-requests/R-2026-004`
                              )
                            }
                            className="
                              h-[27px]
                              px-[9px]
                              rounded-[6px]
                              border
                              border-[#b9c0cc]
                              bg-white
                              text-[9px]
                              text-[#3b4454]
                              hover:bg-[#eef0f4]
                            "
                          >
                            التفاصيل
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/courses/1/waiting-list/${student.studentId}/review-seat`
                              )
                            }
                            className="
                              h-[27px]
                              px-[9px]
                              rounded-[6px]
                              bg-[#4b5568]
                              text-white
                              text-[9px]
                              font-semibold
                              hover:bg-[#3f4858]
                            "
                          >
                            مراجعة المقعد
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex items-center justify-between px-[14px] py-[10px]">
              <p className="text-[9px] text-[#7a8393]">
                ترتيب الانتظار بحسب تاريخ التقديم فقط إلى أن تعتمد الجامعة سياسة أخرى
              </p>

              <div className="flex gap-[5px]">
                {["‹", "1", "2", "3", "›"].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`
                      min-w-[30px]
                      h-[28px]
                      rounded-[6px]
                      border
                      text-[10px]
                      ${
                        page === "1"
                          ? "bg-[#4b5568] border-[#4b5568] text-white"
                          : "bg-white border-[#c9cfd9] text-[#4a5465]"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
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