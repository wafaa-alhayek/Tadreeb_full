import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Courses() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      name: "أساسيات تطوير الويب",
      trainer: "م. أحمد محمد",
      mode: "حضوري",
      startDate: "2026/06/10",
      capacity: "28 / 30",
      status: "التسجيل مفتوح",
    },
    {
      id: 2,
      name: "إدارة المشاريع",
      trainer: "د. سارة علي",
      mode: "عن بعد",
      startDate: "2026/06/15",
      capacity: "35 / 40",
      status: "قيد التنفيذ",
    },
    {
      id: 3,
      name: "التسويق الرقمي",
      trainer: "أ. محمد خالد",
      mode: "مدمج",
      startDate: "2026/06/20",
      capacity: "22 / 25",
      status: "التسجيل مفتوح",
    },
    {
      id: 4,
      name: "تحليل البيانات",
      trainer: "م. ليلى حسن",
      mode: "حضوري",
      startDate: "2026/07/01",
      capacity: "18 / 30",
      status: "مسودة",
    },
    {
      id: 5,
      name: "مهارات الاتصال",
      trainer: "د. خالد يوسف",
      mode: "عن بعد",
      startDate: "2026/07/05",
      capacity: "30 / 30",
      status: "مكتملة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "التسجيل مفتوح") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد التنفيذ") {
      return "bg-[#e2eaf5] text-[#375d8b]";
    }

    if (status === "مسودة") {
      return "bg-[#eceff4] text-[#596273]";
    }

    return "bg-[#f1edf8] text-[#684b87]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between mb-[6px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                الدورات التدريبية
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/courses/add")}
              className="
                h-[34px]
                px-[15px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[11px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              + إنشاء دورة جديدة
            </button>
          </div>

          <p className="text-[11px] text-[#667085] mb-[10px]">
            إدارة الدورات ومتابعة التسجيل وحالة كل دورة
          </p>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي الدورات" value="24" />
            <StatCard title="التسجيل مفتوح" value="8" />
            <StatCard title="قيد التنفيذ" value="6" />
            <StatCard title="مسودات" value="4" />
          </section>

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
                  placeholder="ابحث باسم الدورة أو المدرب ..."
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

              <div
                className="
                  flex
                  items-center
                  bg-[#f1f3f7]
                  rounded-[7px]
                  p-[3px]
                "
              >
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

            <div className="grid grid-cols-2 gap-[12px] mt-[10px]">
              <Filter label="حالة الدورة">
                <option>كل الحالات</option>
                <option>التسجيل مفتوح</option>
                <option>قيد التنفيذ</option>
                <option>مسودة</option>
                <option>مكتملة</option>
              </Filter>

              <Filter label="نمط التدريب">
                <option>الكل</option>
                <option>حضوري</option>
                <option>عن بعد</option>
                <option>مدمج</option>
              </Filter>
            </div>
          </section>

          {/* ================= COURSES LIST ================= */}
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
                قائمة الدورات
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "اسم الدورة",
                      "المدرب",
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
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {course.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                        {course.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {course.trainer}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {course.mode}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {course.startDate}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {course.capacity}
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
                            ${getStatusStyle(course.status)}
                          `}
                        >
                          {course.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <div className="flex gap-[6px]">
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
                            عرض
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/courses/${course.id}/edit`
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
                            تعديل
                          </button>

                          <button
                            type="button"
                            className="
                              w-[27px]
                              h-[27px]
                              rounded-[6px]
                              border
                              border-[#b9c0cc]
                              bg-white
                              text-[12px]
                              text-[#3b4454]
                              hover:bg-[#eef0f4]
                            "
                          >
                            ⋯
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
              {["‹", "1", "2", "3", "4", "5", "›"].map((page) => (
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

      <p className="text-[22px] font-bold text-[#1f2733]">
        {value}
      </p>
    </div>
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