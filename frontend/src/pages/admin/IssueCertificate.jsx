import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function IssueCertificate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "أحمد خالد",
    studentId: "20231045",
    specialization: "هندسة برمجيات",
    college: "كلية الهندسة / قسم هندسة البرمجيات",
    organization: "شركة التقنية",
    opportunity: "مطور برمجيات",
    startDate: "2025-06-01",
    endDate: "2025-08-30",
    supervisor: "د. أحمد محمد",
    certificateNumber: "AZ-2025-00123",
    issueDate: "2025-08-30",
    duration: "3 أشهر",
    certificateType: "شهادة إتمام تدريب",
    finalGrade: "ممتاز",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIssue = () => {
    navigate("/admin/certificates");
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
                  onClick={() => navigate("/admin/certificates")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  الشهادات
                </span>

                <span>›</span>
                <span>إصدار الشهادة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إصدار الشهادة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/certificates")}
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
            <div className="grid grid-cols-4 gap-x-[16px] gap-y-[10px]">
              <Input
                label="اسم الطالب"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
              />

              <Input
                label="الرقم الجامعي"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
              />

              <Input
                label="التخصص"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />

              <Input
                label="الكلية / القسم"
                name="college"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ================= TRAINING DATA ================= */}
          <Section title="بيانات التدريب">
            <div className="grid grid-cols-5 gap-x-[16px] gap-y-[10px]">
              <Input
                label="جهة التدريب"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />

              <Input
                label="فرصة التدريب"
                name="opportunity"
                value={formData.opportunity}
                onChange={handleChange}
              />

              <Input
                label="تاريخ البداية"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />

              <Input
                label="تاريخ النهاية"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />

              <Input
                label="المشرف الأكاديمي"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ================= CERTIFICATE MAIN AREA ================= */}
          <div className="flex gap-[12px] mb-[10px] items-stretch">
            {/* Preview */}
            <section
              className="
                flex-[1.3]
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                معاينة الشهادة
              </h2>

              <div className="border-2 border-[#4b5568] p-[7px] bg-[#fbfcfd]">
                <div
                  className="
                    border
                    border-[#b9c0cc]
                    px-[22px]
                    py-[14px]
                    text-center
                  "
                >
                  <div className="text-[30px] text-[#667085] mb-[2px]">
                    ♙
                  </div>

                  <div className="text-[13px] font-bold text-[#1f2733]">
                    جامعة الأزهر
                  </div>

                  <div className="text-[22px] font-bold text-[#1f2733] my-[4px]">
                    شهادة إتمام تدريب
                  </div>

                  <p className="text-[12px] text-[#4a5465]">
                    تشهد جامعة الأزهر بأن الطالب
                  </p>

                  <div className="text-[19px] font-bold text-[#1f2733] my-[4px]">
                    {formData.studentName}
                  </div>

                  <p className="text-[11px] leading-[1.9] text-[#3b4454]">
                    قد أتم فترة التدريب بنجاح
                    <br />
                    جهة التدريب: {formData.organization}
                    {" · "}
                    الفترة: 2025/06/01 - 2025/08/30
                    {" · "}
                    التقدير: {formData.finalGrade}
                  </p>

                  <div className="flex justify-between items-end mt-[14px] text-[10px] text-[#4a5465]">
                    <span className="border-t border-[#8a93a3] pt-[4px] w-[110px]">
                      عميد الكلية
                    </span>

                    <span
                      className="
                        w-[46px]
                        h-[46px]
                        rounded-full
                        bg-[#eceff4]
                        flex
                        items-center
                        justify-center
                        text-[9px]
                        text-[#667085]
                      "
                    >
                      ختم
                    </span>

                    <span className="border-t border-[#8a93a3] pt-[4px] w-[110px]">
                      المسؤول المختص
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Data + Completion */}
            <div className="flex-1 grid gap-[10px] content-start">
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
                  بيانات الشهادة
                </h2>

                <div className="grid grid-cols-2 gap-[8px]">
                  <Input
                    label="رقم الشهادة"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleChange}
                  />

                  <Input
                    label="تاريخ الإصدار"
                    name="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="مدة التدريب"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />

                  <Input
                    label="نوع الشهادة"
                    name="certificateType"
                    value={formData.certificateType}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-[8px]">
                  <Select
                    label="التقدير النهائي"
                    name="finalGrade"
                    value={formData.finalGrade}
                    onChange={handleChange}
                  >
                    <option value="ممتاز">ممتاز</option>
                    <option value="جيد جداً">جيد جداً</option>
                    <option value="جيد">جيد</option>
                    <option value="مقبول">مقبول</option>
                  </Select>
                </div>
              </section>

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
                  حالة الإتمام
                </h2>

                <CompletionItem text="التقييم مكتمل" />
                <CompletionItem text="التقرير النهائي مكتمل" />
                <CompletionItem text="الموافقات مكتملة" />
                <CompletionItem text="التدريب مكتمل" />
              </section>
            </div>
          </div>

          {/* ================= NOTES ================= */}
          <Section title="ملاحظات عامة">
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="يمكنك إضافة أي ملاحظات إضافية هنا ..."
              className="
                w-full
                h-[38px]
                rounded-[8px]
                border
                border-[#c9cfd9]
                bg-white
                px-[12px]
                outline-none
                text-[11px]
                text-[#2b3340]
                placeholder:text-[#8a93a3]
              "
            />
          </Section>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-[10px] mt-[10px]">
            <button
              type="button"
              onClick={handleIssue}
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
              إصدار الشهادة
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
              معاينة الشهادة
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/certificates")}
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

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-[36px]
          rounded-[7px]
          border
          border-[#c9cfd9]
          bg-white
          px-[10px]
          outline-none
          text-[10px]
          text-[#2b3340]
          placeholder:text-[#8a93a3]
        "
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-[36px]
          rounded-[7px]
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

function CompletionItem({ text }) {
  return (
    <div className="flex items-center gap-[8px] py-[6px] border-b border-[#eceff4] last:border-b-0">
      <span
        className="
          w-[18px]
          h-[18px]
          rounded-full
          bg-[#dff1e6]
          text-[#236a45]
          flex
          items-center
          justify-center
          text-[9px]
        "
      >
        ✓
      </span>

      <span className="text-[10px] text-[#3b4454]">
        {text}
      </span>
    </div>
  );
}