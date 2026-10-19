import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseEvaluationResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState({
    "20241001": "",
    "20241002": "",
    "20241003": "",
    "20241004": "",
  });

  const trainees = [
    {
      name: "أحمد محمد",
      studentId: "20241001",
      type: "تقييم نهائي",
      status: "مكتمل",
    },
    {
      name: "سارة خالد",
      studentId: "20241002",
      type: "تقييم نهائي",
      status: "مكتمل",
    },
    {
      name: "محمد علي",
      studentId: "20241003",
      type: "تقييم نهائي",
      status: "قيد المراجعة",
    },
    {
      name: "نور حسن",
      studentId: "20241004",
      type: "تقييم نهائي",
      status: "مكتمل",
    },
  ];

  const handleResultChange = (studentId, value) => {
    setResults((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const getStatusStyle = (status) => {
    if (status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#e2eaf5] text-[#375d8b]";
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
                <span>التقييم والنتائج</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التقييم والنتائج
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
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <StatCard title="التقييمات المستلمة" value="16" />
            <StatCard title="النتائج المدخلة" value="12 / 18" />
            <StatCard title="نتائج غير مكتملة" value="6" />
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[4px] border-b border-[#dfe3ea] mb-[12px]">
            <Tab
              label="تقييم الدورة والمدرب"
              onClick={() =>
                navigate("/admin/courses/1/evaluations")
              }
            />

            <Tab
              label="نتائج المتدربين"
              active
            />
          </div>

          {/* ================= SEARCH + FILTERS ================= */}
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
                placeholder="ابحث باسم المتدرب أو رقمه ..."
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

            <div className="grid grid-cols-2 gap-[12px] mt-[10px]">
              <Filter label="نوع التقييم">
                <option>الكل</option>
                <option>تقييم نهائي</option>
              </Filter>

              <Filter label="حالة الإكمال">
                <option>الكل</option>
                <option>مكتمل</option>
                <option>قيد المراجعة</option>
              </Filter>
            </div>
          </section>

          {/* ================= RESULTS TABLE ================= */}
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
                نتائج المتدربين
              </h2>

              <p className="text-[10px] text-[#667085] mt-[4px]">
                إدخال أو مراجعة نتائج التقييم النهائي إذا كانت الدورة تتضمن اختباراً أو تقييماً معتمداً.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "المتدرب",
                      "الرقم الجامعي",
                      "نوع التقييم",
                      "حالة الإكمال",
                      "النتيجة",
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
                      <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                        {trainee.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {trainee.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {trainee.type}
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

                      <td className="px-[10px] py-[9px] min-w-[230px]">
                        <input
                          type="text"
                          value={results[trainee.studentId]}
                          onChange={(e) =>
                            handleResultChange(
                              trainee.studentId,
                              e.target.value
                            )
                          }
                          placeholder={
                            trainee.status === "قيد المراجعة"
                              ? "—"
                              : "أدخلي النتيجة حسب المقياس المعتمد"
                          }
                          className="
                            w-full
                            h-[34px]
                            rounded-[7px]
                            border
                            border-[#c9cfd9]
                            bg-white
                            px-[9px]
                            outline-none
                            text-[9px]
                            text-[#2b3340]
                            placeholder:text-[#8a93a3]
                          "
                        />
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
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
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= FOOTER ================= */}
            <div
              className="
                flex
                justify-between
                items-center
                gap-[15px]
                px-[14px]
                py-[10px]
              "
            >
              <p className="text-[9px] text-[#7a8393] leading-[1.7]">
                لم يُحدَّد حدّ النجاح ولا مقياس العلامات. الاختبار النهائي يظهر عند الحاجة فقط.
              </p>

              <div className="flex gap-[8px] shrink-0">
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
                  حفظ النتائج
                </button>

                <button
                  type="button"
                  className="
                    h-[34px]
                    px-[15px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  مراجعة قواعد النتائج
                </button>
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

function Tab({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-[14px]
        py-[9px]
        text-[10px]
        border-b-2
        transition
        ${
          active
            ? "border-[#4b5568] text-[#1f2733] font-bold"
            : "border-transparent text-[#667085] hover:text-[#3b4454]"
        }
      `}
    >
      {label}
    </button>
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