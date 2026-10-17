import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseTrainerDetails() {
  const navigate = useNavigate();
  const { trainerId } = useParams();

  const linkedCourses = [
    {
      id: 1,
      course: "مهارات الحاسوب الأساسية",
      mode: "حضوري",
      startDate: "2026/11/15",
      capacity: "18 / 25",
      status: "مفتوحة",
    },
    {
      id: 2,
      course: "أساسيات البرمجة",
      mode: "إلكتروني",
      startDate: "2026/09/10",
      capacity: "20 / 20",
      status: "منتهية",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مفتوحة") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#eceff4] text-[#596273]";
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
                <span>المدربون</span>
                <span>›</span>
                <span>تفاصيل المدرب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تفاصيل المدرب
              </h1>
            </div>

            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={() => navigate("/admin/course-trainers")}
                className="
                  h-[30px]
                  px-[12px]
                  rounded-[6px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                رجوع ←
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/course-trainers/${trainerId || 1}/edit`
                  )
                }
                className="
                  h-[30px]
                  px-[12px]
                  rounded-[6px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                تعديل بيانات المدرب
              </button>
            </div>
          </div>

          {/* ================= TRAINER PROFILE ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[14px]
              flex
              gap-[18px]
              items-center
              mb-[12px]
            "
          >
            <div
              className="
                w-[90px]
                h-[90px]
                rounded-full
                bg-[#eceff4]
                flex
                items-center
                justify-center
                text-[32px]
                text-[#8a93a3]
                shrink-0
              "
            >
              ♙
            </div>

            <div className="flex-1">
              <div className="flex gap-[10px] items-center mb-[8px]">
                <h2 className="text-[20px] font-bold text-[#1f2733]">
                  أحمد خالد
                </h2>

                <span
                  className="
                    inline-flex
                    px-[10px]
                    py-[3px]
                    rounded-full
                    bg-[#dff1e6]
                    text-[#236a45]
                    text-[9px]
                    font-semibold
                  "
                >
                  نشط
                </span>
              </div>

              <div className="grid grid-cols-3 gap-[8px]">
                <InfoBox
                  label="التخصص"
                  value="تقنية المعلومات"
                />

                <InfoBox
                  label="البريد الإلكتروني"
                  value="trainer1@example.com"
                />

                <InfoBox
                  label="عدد الدورات"
                  value="2 دورات"
                />
              </div>
            </div>
          </section>

          {/* ================= LINKED COURSES ================= */}
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
                الدورات المرتبطة بالمدرب
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "الدورة",
                      "نمط التدريب",
                      "تاريخ البدء",
                      "المسجلون / السعة",
                      "الحالة",
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
                  {linkedCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[10px] text-[10px] font-bold text-[#2b3340]">
                        {course.course}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {course.mode}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#667085]">
                        {course.startDate}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                        {course.capacity}
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <span
                          className={`
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            text-[9px]
                            font-medium
                            ${getStatusStyle(course.status)}
                          `}
                        >
                          {course.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/courses/${course.id}`)
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
                          تفاصيل الدورة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= INFO NOTE ================= */}
          <div
            className="
              border
              border-[#dfe3ea]
              rounded-[9px]
              bg-[#fbfcfd]
              px-[13px]
              py-[10px]
              mt-[10px]
              text-[10px]
              leading-[1.8]
              text-[#667085]
            "
          >
            لا يُحذف مدرب مرتبط بدورة دون معالجة الارتباط. معلومات الاتصال تظهر للمستخدمين المخوّلين فقط.
          </div>
        </main>
      </div>
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

      <p className="text-[10px] font-semibold text-[#2b3340]">
        {value}
      </p>
    </div>
  );
}