import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseTraineeDetails() {
  const navigate = useNavigate();
  const { id, studentId } = useParams();

  const backToTrainees = () => {
    navigate(`/admin/courses/${id}/trainees`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px] relative">
          {/* ================= PAGE BACKGROUND ================= */}
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

          {/* ================= BACKGROUND TABLE ================= */}
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
                  <tr>
                    <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                      {studentId || "20241001"}
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                      أحمد محمد
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                      نظم المعلومات
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                      2026/10/03
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
                        مسجل
                      </span>
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      80%
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      92%
                    </td>

                    <td className="px-[10px] py-[9px] text-[9px] text-[#667085]">
                      عرض الملف
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= OVERLAY ================= */}
          <div
            className="fixed inset-0 bg-black/20 z-[40]"
            onClick={backToTrainees}
          />

          {/* ================= DRAWER ================= */}
          <aside
            className="
              fixed
              top-[64px]
              left-0
              bottom-0
              w-[410px]
              bg-white
              border-r
              border-[#dfe3ea]
              z-[50]
              shadow-xl
              overflow-y-auto
            "
          >
            {/* DRAWER HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                px-[18px]
                py-[14px]
                border-b
                border-[#e4e7ec]
              "
            >
              <h2 className="text-[17px] font-bold text-[#1f2733]">
                ملف المتدرب
              </h2>

              <button
                type="button"
                onClick={backToTrainees}
                className="
                  w-[30px]
                  h-[30px]
                  rounded-[6px]
                  border
                  border-[#d5d9e0]
                  text-[#667085]
                  hover:bg-[#f3f5f8]
                "
              >
                ×
              </button>
            </div>

            {/* ================= TRAINEE HEADER ================= */}
            <div className="px-[18px] py-[16px]">
              <div className="flex gap-[12px] items-center mb-[10px]">
                <div
                  className="
                    w-[54px]
                    h-[54px]
                    rounded-full
                    bg-[#eceff4]
                    flex
                    items-center
                    justify-center
                    text-[20px]
                    text-[#7f8898]
                    shrink-0
                  "
                >
                  ♙
                </div>

                <div>
                  <h3 className="text-[16px] font-bold text-[#1f2733]">
                    أحمد محمد
                  </h3>

                  <p className="text-[10px] text-[#667085] mt-[2px]">
                    {studentId || "20241001"} · نظم المعلومات
                  </p>

                  <span
                    className="
                      inline-flex
                      mt-[5px]
                      px-[9px]
                      py-[3px]
                      rounded-full
                      bg-[#dff1e6]
                      text-[#236a45]
                      text-[9px]
                      font-semibold
                    "
                  >
                    مسجل
                  </span>
                </div>
              </div>

              {/* ================= PROGRESS ================= */}
              <div className="grid grid-cols-2 gap-[8px] mb-[10px]">
                <InfoBox label="نسبة الإنجاز" value="80%" />
                <InfoBox label="نسبة الحضور" value="92%" />
              </div>

              {/* ================= PREVIOUS COURSES ================= */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="px-[12px] py-[9px] border-b border-[#eceff4]">
                  <h3 className="text-[13px] font-bold text-[#1f2733]">
                    السجل التدريبي (الدورات السابقة)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {["الدورة", "النتيجة", "الشهادة"].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[9px]
                              py-[7px]
                              text-[9px]
                              font-semibold
                              text-[#3b4454]
                              border-b
                              border-[#dfe3ea]
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-[#eceff4]">
                        <td className="px-[9px] py-[8px] text-[9px] text-[#2b3340]">
                          أساسيات البرمجة
                        </td>

                        <td className="px-[9px] py-[8px] text-[9px] text-[#4a5465]">
                          مكتمل
                        </td>

                        <td className="px-[9px] py-[8px] text-[9px] font-semibold text-[#4b5568]">
                          CERT-2026-001
                        </td>
                      </tr>

                      <tr>
                        <td className="px-[9px] py-[8px] text-[9px] text-[#2b3340]">
                          مهارات التواصل
                        </td>

                        <td className="px-[9px] py-[8px] text-[9px] text-[#4a5465]">
                          مكتمل
                        </td>

                        <td className="px-[9px] py-[8px] text-[9px] text-[#667085]">
                          —
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ================= QUICK ACTIONS ================= */}
              <div className="flex gap-[8px] mt-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/admin/courses/${id}/attendance`)
                  }
                  className={buttonClass}
                >
                  عرض الحضور
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${id}/evaluations/${studentId || "20241001"}`
                    )
                  }
                  className={buttonClass}
                >
                  عرض التقييم
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/admin/courses/${id}/certificates`)
                  }
                  className={buttonClass}
                >
                  الشهادات
                </button>
              </div>

              <p className="text-[9px] text-[#7a8393] mt-[10px] leading-[1.7]">
                لا إجراءات حذف أو تعديل تسجيل دون صلاحية وتأكيد.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

const buttonClass = `
  flex-1
  h-[30px]
  px-[8px]
  rounded-[6px]
  border
  border-[#b9c0cc]
  bg-white
  text-[9px]
  text-[#3b4454]
  hover:bg-[#eef0f4]
`;

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

function InfoBox({ label, value }) {
  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[10px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p className="text-[12px] font-bold text-[#2b3340]">
        {value}
      </p>
    </div>
  );
}