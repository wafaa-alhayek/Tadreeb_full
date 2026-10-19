import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingOpportunityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const distributedStudents = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      status: "موزع",
      notes: "-",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "هندسة برمجيات",
      status: "موزع",
      notes: "-",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      studentId: "20231234",
      specialization: "هندسة برمجيات",
      status: "موزع",
      notes: "-",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-[12px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>

                <span
                  onClick={() => navigate("/admin/training-opportunities")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  فرص التدريب
                </span>

                <span>›</span>
                <span>تفاصيل فرصة التدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تفاصيل فرصة التدريب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/training-opportunities")}
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

          {/* ================= OPPORTUNITY MAIN CARD ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[18px]
              py-[14px]
              mb-[10px]
            "
          >
            <div className="flex items-center gap-[18px]">
              <div
                className="
                  w-[120px]
                  h-[100px]
                  rounded-[8px]
                  bg-[#e6e9ef]
                  flex
                  items-center
                  justify-center
                  text-[#9aa3b2]
                  text-[28px]
                  shrink-0
                "
              >
                ▣
              </div>

              <div className="flex-1">
                <p className="text-[11px] text-[#667085]">
                  شركة التقنية · جهة التدريب
                </p>

                <div className="flex items-center gap-[10px] my-[5px]">
                  <h2 className="text-[22px] font-bold text-[#1f2733]">
                    مطور برمجيات
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
                      font-medium
                    "
                  >
                    مفتوحة
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-[8px]">
                  <InfoBox
                    label="الجهة"
                    value="شركة التقنية"
                  />

                  <InfoBox
                    label="التخصص المطلوب"
                    value="هندسة برمجيات"
                  />

                  <InfoBox
                    label="عدد المقاعد"
                    value="5"
                  />

                  <InfoBox
                    label="المقاعد المتبقية"
                    value="3"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[8px] mt-[10px]">
              <InfoBox
                label="تاريخ البداية"
                value="2025/06/01"
              />

              <InfoBox
                label="تاريخ النهاية"
                value="2025/08/01"
              />

              <InfoBox
                label="موقع التدريب"
                value="غزة - شارع فلسطين"
              />
            </div>
          </section>

          {/* ================= REQUIREMENTS + TASKS ================= */}
          <div className="grid grid-cols-2 gap-[10px] mb-[10px]">
            {/* Requirements */}
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
                شروط القبول
              </h2>

              <ul className="list-disc pr-[20px] text-[11px] leading-[2] text-[#4a5465]">
                <li>أن يكون الطالب من كلية الهندسة</li>
                <li>المستوى الرابع أو الخامس</li>
                <li>اجتياز المقابلة الشخصية</li>
                <li>إجادة اللغة الإنجليزية</li>
              </ul>
            </section>

            {/* Tasks */}
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
                المهام والمهارات المطلوبة
              </h2>

              <ul className="list-disc pr-[20px] text-[11px] leading-[2] text-[#4a5465]">
                <li>تطوير تطبيقات الويب والموبايل</li>
                <li>العمل ضمن فريق</li>
                <li>اختبار وتصحيح الأخطاء</li>
                <li>التعلم المستمر واكتساب مهارات جديدة</li>
              </ul>
            </section>
          </div>

          {/* ================= DISTRIBUTED STUDENTS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              overflow-hidden
              mb-[10px]
            "
          >
            <div className="px-[14px] py-[10px]">
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                الطلاب الموزعون على الفرصة
              </h2>
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
                      "الحالة",
                      "ملاحظات",
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
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {distributedStudents.map((student) => (
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
                          {student.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {student.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end">
            <button
              type="button"
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                border
                border-[#b9c0cc]
                bg-white
                text-[11px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              ✎ تعديل الفرصة
            </button>
          </div>

          <div className="hidden">{id}</div>
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
        px-[12px]
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