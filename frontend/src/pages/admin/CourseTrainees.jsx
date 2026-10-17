import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseTrainees() {
  const navigate = useNavigate();

  const trainees = [
    {
      studentId: "20241001",
      name: "أحمد محمد",
      specialization: "نظم المعلومات",
      registrationDate: "2026/10/03",
      status: "مسجل",
      progress: 80,
      attendance: "92%",
    },
    {
      studentId: "20241002",
      name: "سارة خالد",
      specialization: "إدارة الأعمال",
      registrationDate: "2026/10/03",
      status: "مسجل",
      progress: 75,
      attendance: "88%",
    },
    {
      studentId: "20241003",
      name: "محمد علي",
      specialization: "علوم الحاسوب",
      registrationDate: "2026/10/04",
      status: "منسحب",
      progress: 20,
      attendance: "40%",
    },
    {
      studentId: "20241004",
      name: "نور حسن",
      specialization: "المحاسبة",
      registrationDate: "2026/10/06",
      status: "مسجل",
      progress: 65,
      attendance: "95%",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مسجل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#f6e5e5] text-[#8b3e3e]";
  };

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
                <span>المتدربون</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة المتدربين
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
          <div className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي المتدربين" value="18" />
            <StatCard title="السعة القصوى" value="25" />
            <StatCard title="متوسط نسبة الإنجاز" value="72%" />
            <StatCard title="متوسط نسبة الحضور" value="89%" />
          </div>

          {/* ================= SEARCH + FILTER ================= */}
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
            <div className="flex items-center gap-[10px]">
              <div
                className="
                  flex-1
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
                  placeholder="ابحث باسم المتدرب أو رقمه الجامعي ..."
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

                <span className="text-[#8a93a3]">⌕</span>
              </div>

              <div className="flex items-center bg-[#f1f3f7] rounded-[7px] p-[3px]">
                <button
                  type="button"
                  className="
                    h-[28px]
                    px-[12px]
                    rounded-[6px]
                    bg-white
                    text-[9px]
                    font-semibold
                    text-[#2b3340]
                    shadow-sm
                  "
                >
                  جدول
                </button>

                <button
                  type="button"
                  className="
                    h-[28px]
                    px-[12px]
                    rounded-[6px]
                    text-[9px]
                    text-[#667085]
                  "
                >
                  بطاقات
                </button>
              </div>
            </div>

            <div className="mt-[10px] max-w-[360px]">
              <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                حالة التسجيل
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
                <option>جميع الحالات</option>
                <option>مسجل</option>
                <option>منسحب</option>
              </select>
            </div>
          </section>

          {/* ================= TRAINEES TABLE ================= */}
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
                قائمة المتدربين
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "الرقم الجامعي",
                      "اسم المتدرب",
                      "التخصص",
                      "تاريخ التسجيل",
                      "حالة التسجيل",
                      "نسبة الإنجاز",
                      "نسبة الحضور",
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
                  {trainees.map((trainee) => (
                    <tr
                      key={trainee.studentId}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {trainee.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                        {trainee.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {trainee.specialization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {trainee.registrationDate}
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <span
                          className={`
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            text-[9px]
                            font-medium
                            ${getStatusStyle(trainee.status)}
                          `}
                        >
                          {trainee.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px] min-w-[130px]">
                        <div className="flex items-center gap-[8px]">
                          <div className="flex-1 h-[7px] rounded-full bg-[#e8ebf0] overflow-hidden">
                            <div
                              className="h-full bg-[#687386]"
                              style={{
                                width: `${trainee.progress}%`,
                              }}
                            />
                          </div>

                          <span className="text-[9px] font-semibold text-[#4a5465]">
                            {trainee.progress}%
                          </span>
                        </div>
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {trainee.attendance}
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/courses/1/trainees/${trainee.studentId}`
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
                          عرض الملف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex items-center justify-between px-[14px] py-[10px]">
              <span className="text-[9px] text-[#7a8393]">
                حالة التسجيل منفصلة عن حالة الحضور
              </span>

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