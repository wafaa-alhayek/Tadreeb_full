import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function StudentDistributionProcess() {
  const navigate = useNavigate();

  const [selectedStudents, setSelectedStudents] = useState([1, 2, 4]);

  const candidates = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      preference: "الأولى",
      status: "لم يتم التوزيع",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "هندسة برمجيات",
      preference: "الأولى",
      status: "لم يتم التوزيع",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      studentId: "20231234",
      specialization: "علوم حاسوب",
      preference: "الثانية",
      status: "موزع مسبقاً",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "هندسة برمجيات",
      preference: "الأولى",
      status: "لم يتم التوزيع",
    },
    {
      id: 5,
      name: "عمر يوسف",
      studentId: "20231111",
      specialization: "علوم حاسوب",
      preference: "الثالثة",
      status: "لم يتم التوزيع",
    },
    {
      id: 6,
      name: "دينا محمود",
      studentId: "20230890",
      specialization: "هندسة برمجيات",
      preference: "الثانية",
      status: "لم يتم التوزيع",
    },
  ];

  const toggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  const getStatusStyle = (status) => {
    if (status === "موزع مسبقاً") {
      return "bg-[#eceff4] text-[#596273]";
    }

    return "bg-[#fff1cc] text-[#8a6515]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span
                  onClick={() => navigate("/admin/student-distribution")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  توزيع الطلبة
                </span>
                <span>›</span>
                <span>تنفيذ التوزيع</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                توزيع الطلبة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/student-distribution")}
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
          </div>

          {/* ================= FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[12px]
              mb-[10px]
            "
          >
            <div className="grid grid-cols-4 gap-[12px]">
              <Filter label="التخصص">
                <option>كل التخصصات</option>
                <option>هندسة برمجيات</option>
                <option>علوم حاسوب</option>
                <option>نظم معلومات</option>
              </Filter>

              <Filter label="جهة التدريب">
                <option>كل الجهات</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <Filter label="الفرصة التدريبية">
                <option>كل الفرص</option>
                <option>مطور برمجيات</option>
                <option>محلل بيانات</option>
                <option>مهندس شبكات</option>
              </Filter>

              <Filter label="حالة الطالب">
                <option>كل الحالات</option>
                <option>لم يتم التوزيع</option>
                <option>موزع مسبقاً</option>
              </Filter>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= RIGHT / MAIN COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Selected Opportunity */}
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
                  الفرصة المحددة للتوزيع
                </h2>

                <div className="flex items-center gap-[16px]">
                  <div
                    className="
                      w-[60px]
                      h-[60px]
                      rounded-[10px]
                      bg-[#eceff4]
                      flex
                      items-center
                      justify-center
                      text-[#8a93a3]
                      text-[22px]
                      shrink-0
                    "
                  >
                    ▣
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-[#1f2733]">
                      مطور برمجيات
                    </h3>

                    <p className="text-[12px] text-[#667085]">
                      جهة التدريب: شركة التقنية
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-[8px] w-[340px]">
                    <InfoBox
                      label="المقاعد المتاحة"
                      value="5"
                    />

                    <InfoBox
                      label="المقاعد المستخدمة"
                      value="2"
                    />
                  </div>
                </div>
              </section>

              {/* ================= CANDIDATES TABLE ================= */}
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
                    قائمة الطلبة المرشحين للتوزيع
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "",
                          "اسم الطالب",
                          "الرقم الجامعي",
                          "التخصص",
                          "التفضيل",
                          "حالة التوزيع",
                        ].map((heading, index) => (
                          <th
                            key={index}
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
                      {candidates.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[10px] py-[9px]">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              disabled={student.status === "موزع مسبقاً"}
                              onChange={() => toggleStudent(student.id)}
                              className="accent-[#4b5568]"
                            />
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
                            {student.preference}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <span className="text-[10px] text-[#667085]">
                    1 من 2
                  </span>

                  <div className="flex items-center gap-[8px]">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/admin/student-distribution")
                      }
                      className="
                        h-[30px]
                        px-[12px]
                        rounded-[6px]
                        bg-[#4b5568]
                        text-white
                        text-[10px]
                        font-semibold
                        hover:bg-[#3f4858]
                      "
                    >
                      ✓ تأكيد التوزيع
                    </button>

                    <button
                      type="button"
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
                      ✎ توزيع يدوي
                    </button>

                    <button
                      type="button"
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
                      ⚙ توزيع تلقائي
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* ================= SIDE COLUMN ================= */}
            <aside className="w-[280px] shrink-0 grid gap-[10px] content-start">
              {/* Criteria */}
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
                  ملخص معايير التوزيع
                </h2>

                <div className="grid gap-[8px]">
                  <InfoBox
                    label="التخصص"
                    value="هندسة برمجيات"
                  />

                  <InfoBox
                    label="الطاقة الاستيعابية"
                    value="5 طلاب"
                  />

                  <InfoBox
                    label="تفضيل الطالب"
                    value="الأولوية الأولى"
                  />
                </div>
              </section>

              {/* Reason */}
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
                  سبب التعديل
                </h2>

                <textarea
                  placeholder="أدخل سبب التعديل هنا ..."
                  className="
                    w-full
                    min-h-[110px]
                    resize-none
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    bg-white
                    px-[10px]
                    py-[9px]
                    outline-none
                    text-[10px]
                    text-[#2b3340]
                    placeholder:text-[#8a93a3]
                  "
                />
              </section>
            </aside>
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
          rounded-[8px]
          border
          border-[#c9cfd9]
          bg-white
          px-[10px]
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

function InfoBox({ label, value }) {
  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[11px]
        py-[7px]
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