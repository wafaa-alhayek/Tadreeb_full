import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CustomReport() {
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    details: true,
    statistics: true,
    totals: true,
  });

  const previewRows = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      organization: "شركة التقنية",
      status: "مستمر",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "هندسة برمجيات",
      organization: "مؤسسة الإبداع",
      status: "مستمر",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      studentId: "20231234",
      specialization: "علوم حاسوب",
      organization: "شركة التقنية",
      status: "مكتمل",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "هندسة برمجيات",
      organization: "مؤسسة الإبداع",
      status: "مستمر",
    },
  ];

  const toggleOption = (name) => {
    setOptions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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
                <span>التقارير والإحصائيات</span>
                <span>›</span>
                <span>تقرير مخصص</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إنشاء تقرير مخصص
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/reports")}
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

          {/* ================= REPORT TYPE + DATE ================= */}
          <div className="grid grid-cols-2 gap-[10px] mb-[10px] items-start">
            <Section title="نوع التقرير">
              <select
                defaultValue="students"
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
                <option value="students">تقرير الطلبة</option>
                <option value="organizations">تقرير جهات التدريب</option>
                <option value="opportunities">تقرير فرص التدريب</option>
                <option value="evaluations">تقرير التقييمات</option>
              </select>
            </Section>

            <Section title="الفترة الزمنية">
              <div className="grid grid-cols-2 gap-[12px]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                    من تاريخ
                  </label>

                  <input
                    type="date"
                    className="
                      w-full
                      h-[38px]
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      px-[10px]
                      outline-none
                      text-[11px]
                      text-[#4a5465]
                    "
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                    إلى تاريخ
                  </label>

                  <input
                    type="date"
                    className="
                      w-full
                      h-[38px]
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      px-[10px]
                      outline-none
                      text-[11px]
                      text-[#4a5465]
                    "
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* ================= FILTERS ================= */}
          <Section title="الفلاتر">
            <div className="grid grid-cols-3 gap-x-[16px] gap-y-[10px]">
              <Filter label="الكلية / القسم">
                <option>اختر الكلية / القسم</option>
                <option>كلية الهندسة</option>
                <option>كلية الاقتصاد</option>
                <option>كلية تكنولوجيا المعلومات</option>
              </Filter>

              <Filter label="التخصص">
                <option>اختر التخصص</option>
                <option>هندسة برمجيات</option>
                <option>علوم حاسوب</option>
                <option>إدارة الأعمال</option>
              </Filter>

              <Filter label="حالة التدريب">
                <option>اختر حالة التدريب</option>
                <option>مستمر</option>
                <option>مكتمل</option>
                <option>لم يبدأ</option>
              </Filter>

              <Filter label="جهة التدريب">
                <option>اختر جهة التدريب</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <Filter label="فرصة التدريب">
                <option>اختر فرصة التدريب</option>
                <option>مطور برمجيات</option>
                <option>محلل بيانات</option>
                <option>مهندس شبكات</option>
              </Filter>

              <Filter label="المشرف الأكاديمي">
                <option>اختر المشرف</option>
                <option>د. أحمد محمد</option>
                <option>د. محمد علي</option>
                <option>أ. ليلى حسن</option>
              </Filter>
            </div>
          </Section>

          {/* ================= REPORT OPTIONS ================= */}
          <Section title="خيارات التقرير">
            <div className="flex items-center gap-[28px]">
              <CheckOption
                label="إظهار التفاصيل"
                checked={options.details}
                onChange={() => toggleOption("details")}
              />

              <CheckOption
                label="إظهار الإحصائيات"
                checked={options.statistics}
                onChange={() => toggleOption("statistics")}
              />

              <CheckOption
                label="إظهار الإجماليات"
                checked={options.totals}
                onChange={() => toggleOption("totals")}
              />

              <div className="flex-1" />

              <button
                type="button"
                className="
                  h-[32px]
                  px-[13px]
                  rounded-[6px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                معاينة التقرير
              </button>
            </div>
          </Section>

          {/* ================= PREVIEW ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[12px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
              معاينة التقرير
            </h2>

            <div className="flex gap-[14px]">
              {/* Table */}
              <div className="flex-1 min-w-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "اسم الطالب",
                          "الرقم الجامعي",
                          "التخصص",
                          "جهة التدريب",
                          "حالة التدريب",
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
                      {previewRows.map((student) => (
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
                                ${
                                  student.status === "مكتمل"
                                    ? "bg-[#dff1e6] text-[#236a45]"
                                    : "bg-[#fff1cc] text-[#8a6515]"
                                }
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
              </div>

              {/* Summary */}
              <aside className="w-[240px] shrink-0 grid gap-[8px] content-start">
                <div
                  className="
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[12px]
                    py-[10px]
                  "
                >
                  <SummaryRow label="إجمالي الطلبة" value="120" />
                  <SummaryRow label="الطلبة المقبولون" value="95" />
                  <SummaryRow label="قيد التدريب" value="72" />
                  <SummaryRow label="المكتملون" value="23" />
                </div>

                <div className="flex gap-[8px]">
                  <button
                    type="button"
                    className="
                      flex-1
                      h-[30px]
                      rounded-[6px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[9px]
                      text-[#3b4454]
                      hover:bg-[#eef0f4]
                    "
                  >
                    ↓ PDF
                  </button>

                  <button
                    type="button"
                    className="
                      flex-1
                      h-[30px]
                      rounded-[6px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[9px]
                      text-[#3b4454]
                      hover:bg-[#eef0f4]
                    "
                  >
                    ↓ Excel
                  </button>
                </div>
              </aside>
            </div>
          </section>

          {/* ================= CANCEL ================= */}
          <div className="flex justify-end mt-[8px]">
            <button
              type="button"
              onClick={() => navigate("/admin/reports")}
              className="
                h-[32px]
                px-[14px]
                rounded-[6px]
                border
                border-[#b9c0cc]
                bg-white
                text-[10px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              إلغاء
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[16px]
        py-[13px]
        mb-[10px]
      "
    >
      <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
        {title}
      </h2>

      {children}
    </section>
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

function CheckOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-[8px] text-[11px] text-[#3b4454] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[#4b5568]"
      />

      {label}
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-[5px] border-b border-[#eceff4] last:border-b-0">
      <span className="text-[10px] text-[#667085]">
        {label}
      </span>

      <span className="text-[11px] font-bold text-[#1f2733]">
        {value}
      </span>
    </div>
  );
}