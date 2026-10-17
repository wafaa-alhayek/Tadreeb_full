import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Students() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "إجمالي الطلبة",
      value: "248",
      icon: "♟",
    },
    {
      title: "طلاب مسجلون",
      value: "210",
      icon: "♙",
    },
    {
      title: "قيد التدريب",
      value: "72",
      icon: "◷",
    },
    {
      title: "مكتمل التدريب",
      value: "118",
      icon: "✓",
    },
    {
      title: "لم يبدأ التدريب",
      value: "58",
      icon: "×",
    },
  ];

  const students = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة البرمجيات",
      level: "الرابع",
      status: "قيد التدريب",
      organization: "شركة التقنية",
      updatedAt: "2025/04/20",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "إدارة الأعمال",
      level: "الثالث",
      status: "مكتمل",
      organization: "مؤسسة الإبداع",
      updatedAt: "2025/04/18",
    },
    {
      id: 3,
      name: "محمد علي",
      studentId: "20231234",
      specialization: "هندسة الشبكات",
      level: "الرابع",
      status: "قيد التدريب",
      organization: "شركة الحلول",
      updatedAt: "2025/04/16",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "التصميم الجرافيكي",
      level: "الثالث",
      status: "لم يبدأ",
      organization: "مؤسسة الإبداع",
      updatedAt: "2025/04/14",
    },
    {
      id: 5,
      name: "عمر يوسف",
      studentId: "20231109",
      specialization: "إدارة الموارد",
      level: "الثاني",
      status: "مكتمل",
      organization: "شركة المستقبل",
      updatedAt: "2025/04/12",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد التدريب") {
      return "bg-[#dde7f6] text-[#2c5698]";
    }

    if (status === "لم يبدأ") {
      return "bg-[#fbf0d4] text-[#85590a]";
    }

    return "bg-[#e8ebf0] text-[#3b4454]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>إدارة الطلبة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة الطلبة
              </h1>
            </div>

            <button
              type="button"
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
              + إضافة طالب جديد
            </button>
          </div>

          {/* ================= SEARCH + FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[12px]
              mb-[12px]
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
                placeholder="ابحث عن طالب بالاسم أو الرقم الجامعي ..."
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">
                ⌕
              </span>
            </div>

            <div className="grid grid-cols-4 gap-[12px] mt-[10px]">
              <Filter label="الحالة التدريبية">
                <option>الكل</option>
                <option>قيد التدريب</option>
                <option>مكتمل</option>
                <option>لم يبدأ</option>
              </Filter>

              <Filter label="التخصص">
                <option>الكل</option>
                <option>هندسة البرمجيات</option>
                <option>إدارة الأعمال</option>
                <option>هندسة الشبكات</option>
                <option>التصميم الجرافيكي</option>
              </Filter>

              <Filter label="المستوى الدراسي">
                <option>الكل</option>
                <option>الأول</option>
                <option>الثاني</option>
                <option>الثالث</option>
                <option>الرابع</option>
              </Filter>

              <Filter label="سنة الالتحاق">
                <option>الكل</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </Filter>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-5 gap-[12px] mb-[12px]">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[10px]
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p className="text-[10px] text-[#667085] mb-[2px]">
                    {stat.title}
                  </p>

                  <p className="text-[22px] font-bold text-[#1f2733]">
                    {stat.value}
                  </p>
                </div>

                <div
                  className="
                    w-[38px]
                    h-[38px]
                    rounded-[10px]
                    bg-[#eceff4]
                    flex
                    items-center
                    justify-center
                    text-[#667085]
                  "
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </section>

          {/* ================= STUDENTS TABLE ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              overflow-hidden
            "
          >
            <div className="flex items-center justify-between px-[14px] py-[10px]">
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                قائمة الطلبة
              </h2>

              <div className="flex items-center gap-[10px]">
                <span className="text-[10px] text-[#667085]">
                  عدد الصفوف: 10
                </span>

                <button
                  type="button"
                  className="
                    h-[28px]
                    px-[11px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  ↓ تصدير البيانات
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "اسم الطالب",
                      "الرقم الجامعي",
                      "التخصص",
                      "المستوى الدراسي",
                      "الحالة التدريبية",
                      "جهة التدريب",
                      "تاريخ آخر تحديث",
                      "إجراءات",
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
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {student.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {student.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.specialization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.level}
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
                            ${getStatusStyle(student.status)}
                          `}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.organization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {student.updatedAt}
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/students/${student.id}`)
                          }
                          className="
                            h-[28px]
                            px-[11px]
                            rounded-[6px]
                            border
                            border-[#b9c0cc]
                            bg-white
                            text-[10px]
                            text-[#3b4454]
                            hover:bg-[#eef0f4]
                          "
                        >
                          👁 عرض
                        </button>
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
                    px-[7px]
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

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
        {label}
      </label>

      <select
        className="
          w-full
          h-[38px]
          border
          border-[#c9cfd9]
          rounded-[8px]
          px-[10px]
          bg-white
          outline-none
          text-[11px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
    </div>
  );
}