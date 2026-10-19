import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function StudentEvaluation() {
  const navigate = useNavigate();

  const [academicRatings, setAcademicRatings] = useState({
    commitment: 5,
    benefit: 4,
    development: 4,
    reports: 5,
    goals: 4,
  });

  const [organizationRatings, setOrganizationRatings] = useState({
    attendance: 5,
    punctuality: 4,
    tasks: 5,
    technical: 4,
    communication: 4,
    teamwork: 5,
    responsibility: 4,
  });

  const [notes, setNotes] = useState(
    "مستوى الطالب جيد جداً، وأظهر تطوراً واضحاً خلال فترة التدريب."
  );

  const handleAcademicChange = (name, value) => {
    setAcademicRatings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleOrganizationChange = (name, value) => {
    setOrganizationRatings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = () => {
    navigate("/admin/evaluations");
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
                  onClick={() => navigate("/admin/evaluations")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  التقييمات
                </span>

                <span>›</span>
                <span>تقييم الطالب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تقييم الطالب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/evaluations")}
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

          {/* ================= STUDENT DATA ================= */}
          <Section title="بيانات الطالب">
            <div className="grid grid-cols-3 gap-[8px]">
              <InfoBox label="اسم الطالب" value="أحمد خالد" />
              <InfoBox label="الرقم الجامعي" value="20231045" />
              <InfoBox label="التخصص" value="هندسة برمجيات" />

              <InfoBox label="جهة التدريب" value="شركة التقنية" />
              <InfoBox label="فرصة التدريب" value="مطور برمجيات" />
              <InfoBox
                label="فترة التدريب"
                value="2025/06/01 - 2025/08/30"
              />
            </div>
          </Section>

          {/* ================= EVALUATIONS ================= */}
          <div className="grid grid-cols-2 gap-[10px] mb-[10px] items-start">
            {/* Academic Supervisor */}
            <div className="grid gap-[10px]">
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="px-[14px] py-[10px] border-b border-[#eceff4]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    تقييم المشرف الأكاديمي
                  </h2>
                </div>

                <RatingTable
                  rows={[
                    ["مستوى الالتزام", "commitment", academicRatings.commitment],
                    ["الاستفادة من التدريب", "benefit", academicRatings.benefit],
                    [
                      "التطور خلال فترة التدريب",
                      "development",
                      academicRatings.development,
                    ],
                    ["جودة التقارير", "reports", academicRatings.reports],
                    ["تحقيق أهداف التدريب", "goals", academicRatings.goals],
                  ]}
                  onChange={handleAcademicChange}
                />
              </section>

              {/* Final Result */}
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
                  النتيجة النهائية
                </h2>

                <div className="grid grid-cols-3 gap-[8px]">
                  <InfoBox
                    label="متوسط تقييم جهة التدريب"
                    value="4.5 / 5"
                  />

                  <InfoBox
                    label="متوسط تقييم المشرف"
                    value="4.2 / 5"
                  />

                  <InfoBox
                    label="الدرجة النهائية"
                    value="87%"
                    strong
                  />
                </div>
              </section>
            </div>

            {/* Organization Evaluation */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                overflow-hidden
              "
            >
              <div className="px-[14px] py-[10px] border-b border-[#eceff4]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  تقييم جهة التدريب
                </h2>
              </div>

              <RatingTable
                rows={[
                  [
                    "الالتزام بالحضور",
                    "attendance",
                    organizationRatings.attendance,
                  ],
                  [
                    "الالتزام بالمواعيد",
                    "punctuality",
                    organizationRatings.punctuality,
                  ],
                  ["أداء المهام", "tasks", organizationRatings.tasks],
                  [
                    "المهارات الفنية",
                    "technical",
                    organizationRatings.technical,
                  ],
                  [
                    "التواصل",
                    "communication",
                    organizationRatings.communication,
                  ],
                  [
                    "العمل الجماعي",
                    "teamwork",
                    organizationRatings.teamwork,
                  ],
                  [
                    "تحمل المسؤولية",
                    "responsibility",
                    organizationRatings.responsibility,
                  ],
                ]}
                onChange={handleOrganizationChange}
              />
            </section>
          </div>

          {/* ================= GENERAL NOTES ================= */}
          <Section title="ملاحظات عامة">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="
                w-full
                min-h-[105px]
                resize-none
                rounded-[8px]
                border
                border-[#c9cfd9]
                bg-white
                px-[12px]
                py-[10px]
                outline-none
                text-[11px]
                leading-[1.8]
                text-[#2b3340]
                focus:border-[#8a93a3]
              "
            />
          </Section>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-[10px] mt-[10px]">
            <button
              type="button"
              onClick={handleSubmit}
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[11px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              إرسال التقييم
            </button>

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
              ✓ حفظ كمسودة
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/evaluations")}
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
        px-[14px]
        py-[12px]
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

function InfoBox({ label, value, strong = false }) {
  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[11px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p
        className={`
          text-[10px]
          text-[#2b3340]
          ${strong ? "font-bold text-[13px]" : "font-semibold"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

function RatingTable({ rows, onChange }) {
  return (
    <table className="w-full text-right">
      <thead className="bg-[#f1f3f7]">
        <tr>
          <th
            className="
              px-[12px]
              py-[8px]
              text-[10px]
              font-semibold
              text-[#3b4454]
              border-b
              border-[#dfe3ea]
            "
          >
            المعيار
          </th>

          <th
            className="
              px-[12px]
              py-[8px]
              text-[10px]
              font-semibold
              text-[#3b4454]
              border-b
              border-[#dfe3ea]
              w-[130px]
            "
          >
            التقييم (من 5)
          </th>
        </tr>
      </thead>

      <tbody>
        {rows.map(([label, name, value]) => (
          <tr
            key={name}
            className="border-b border-[#eceff4] last:border-b-0"
          >
            <td className="px-[12px] py-[9px] text-[10px] text-[#2b3340]">
              {label}
            </td>

            <td className="px-[12px] py-[7px]">
              <select
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="
                  w-[90px]
                  h-[31px]
                  rounded-[6px]
                  border
                  border-[#c9cfd9]
                  bg-white
                  px-[8px]
                  outline-none
                  text-[10px]
                  text-[#3b4454]
                "
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}