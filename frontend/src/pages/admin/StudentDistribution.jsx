import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function StudentDistribution() {
  const navigate = useNavigate();

  const stats = [
    { title: "جهات التدريب", value: "6", icon: "▦" },
    { title: "الفرص المتاحة", value: "12", icon: "▣" },
    { title: "الطلبة المتبقين", value: "38", icon: "♙" },
    { title: "الطلبة الموزعين", value: "142", icon: "♟" },
  ];

  const students = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة البرمجيات",
      opportunity: "مطور برمجيات متدرب",
      organization: "شركة التقنية",
      status: "تم التوزيع",
      date: "2025/04/20",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "إدارة الأعمال",
      opportunity: "مساعد إداري",
      organization: "مؤسسة الإبداع",
      status: "تم التوزيع",
      date: "2025/04/18",
    },
    {
      id: 3,
      name: "محمد علي",
      studentId: "20231234",
      specialization: "هندسة الشبكات",
      opportunity: "مهندس شبكات",
      organization: "شركة الحلول",
      status: "قيد التوزيع",
      date: "-",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "التصميم الجرافيكي",
      opportunity: "مصمم جرافيك",
      organization: "مؤسسة الإبداع",
      status: "قيد التوزيع",
      date: "-",
    },
    {
      id: 5,
      name: "عمر يوسف",
      studentId: "20231109",
      specialization: "إدارة الموارد",
      opportunity: "مساعد موارد بشرية",
      organization: "شركة المستقبل",
      status: "لم يتم التوزيع",
      date: "-",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "تم التوزيع") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد التوزيع") {
      return "bg-[#fff1cc] text-[#8a6515]";
    }

    return "bg-[#eceff4] text-[#596273]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>توزيع الطلبة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                توزيع الطلبة
              </h1>
            </div>

            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => navigate("/admin/student-distribution/process")}
                className="
                  h-[34px]
                  px-[14px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[11px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                ⚙ توزيع تلقائي
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/student-distribution/process")}
                className="
                  h-[34px]
                  px-[14px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[11px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                توزيع يدوي
              </button>
            </div>
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
                placeholder="ابحث عن طالب أو فرصة تدريب أو جهة ..."
                className="
                  flex-1
                  h-full
                  outline-none
                  bg-transparent
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">⌕</span>
            </div>

            <div className="grid grid-cols-5 gap-[12px] mt-[10px]">
              <Filter label="الجهة التدريبية">
                <option>الكل</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <Filter label="فرصة التدريب">
                <option>الكل</option>
                <option>مطور برمجيات متدرب</option>
                <option>مساعد إداري</option>
                <option>مهندس شبكات</option>
              </Filter>

              <Filter label="التخصص">
                <option>الكل</option>
                <option>هندسة البرمجيات</option>
                <option>إدارة الأعمال</option>
                <option>هندسة الشبكات</option>
              </Filter>

              <Filter label="المستوى الدراسي">
                <option>الكل</option>
                <option>الثاني</option>
                <option>الثالث</option>
                <option>الرابع</option>
              </Filter>

              <Filter label="الحالة">
                <option>الكل</option>
                <option>تم التوزيع</option>
                <option>قيد التوزيع</option>
                <option>لم يتم التوزيع</option>
              </Filter>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[12px]">
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

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= DISTRIBUTION CONTROL ================= */}
            <aside className="w-[290px] shrink-0 grid gap-[10px] content-start">
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                  توزيع الطلبة
                </h2>

                <div className="grid gap-[10px]">
                  <SelectBox
                    label="اختر الفرصة التدريبية"
                    value="مطور برمجيات متدرب"
                  />

                  <SelectBox
                    label="اختر الجهة التدريبية"
                    value="شركة التقنية"
                  />

                  <SelectBox
                    label="اختر عدد الطلبة"
                    value="5"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/admin/student-distribution/process")
                    }
                    className="
                      w-full
                      h-[34px]
                      rounded-[7px]
                      bg-[#4b5568]
                      text-white
                      text-[11px]
                      font-semibold
                      hover:bg-[#3f4858]
                    "
                  >
                    توزيع الطلبة
                  </button>
                </div>
              </section>

              {/* Extra Actions */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                  إجراءات إضافية
                </h2>

                <div className="grid gap-[6px]">
                  <ActionButton text="✎ تعديل التوزيع" />
                  <ActionButton text="↻ إعادة التوزيع" />
                  <ActionButton text="🗑 إلغاء التوزيع" />
                </div>
              </section>
            </aside>

            {/* ================= STUDENTS COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Students Table */}
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

                  <div className="flex items-center gap-[8px]">
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
                      ↓ تصدير
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
                          "الفرصة التدريبية",
                          "الجهة التدريبية",
                          "الحالة",
                          "تاريخ التوزيع",
                          "إجراءات",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[9px]
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
                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {student.id}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {student.name}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {student.studentId}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {student.specialization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {student.opportunity}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {student.organization}
                          </td>

                          <td className="px-[9px] py-[9px]">
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

                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {student.date}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  "/admin/student-distribution/process"
                                )
                              }
                              className="
                                h-[28px]
                                px-[10px]
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
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

              {/* ================= RECENT DISTRIBUTION LOG ================= */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <div className="flex items-center justify-between mb-[6px]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    سجل التوزيعات الأخيرة
                  </h2>

                  <button
                    type="button"
                    className="
                      h-[27px]
                      px-[10px]
                      rounded-[6px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[9px]
                      text-[#3b4454]
                    "
                  >
                    عرض الكل
                  </button>
                </div>

                <div className="text-[11px] leading-[2] text-[#4a5465]">
                  <p>
                    تم توزيع 5 طلبة على شركة التقنية - تخصص هندسة البرمجيات
                    <span className="text-[#7a8393]">
                      {" "}
                      · 2025/04/20 10:30
                    </span>
                  </p>

                  <p>
                    تم توزيع 3 طلبة على مؤسسة الإبداع - تخصص إدارة الأعمال
                    <span className="text-[#7a8393]">
                      {" "}
                      · 2025/04/16 14:20
                    </span>
                  </p>

                  <p>
                    تم توزيع طالب واحد على شركة الحلول - تخصص إدارة الأعمال
                    <span className="text-[#7a8393]">
                      {" "}
                      · 2025/04/16 09:15
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
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

function SelectBox({ label, value }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
        {label}
      </label>

      <select
        defaultValue={value}
        className="
          w-full
          h-[36px]
          rounded-[7px]
          border
          border-[#c9cfd9]
          bg-white
          px-[10px]
          text-[10px]
          text-[#4a5465]
          outline-none
        "
      >
        <option>{value}</option>
      </select>
    </div>
  );
}

function ActionButton({ text }) {
  return (
    <button
      type="button"
      className="
        w-full
        h-[32px]
        rounded-[7px]
        border
        border-[#b9c0cc]
        bg-white
        text-[10px]
        text-[#3b4454]
        hover:bg-[#eef0f4]
      "
    >
      {text}
    </button>
  );
}