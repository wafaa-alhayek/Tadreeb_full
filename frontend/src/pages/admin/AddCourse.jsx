import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    objectives: "",

    startDate: "",
    endDate: "",
    hours: "",

    trainer: "",
    trainingMode: "حضوري",
    location: "",

    targetGroup: "",
    registrationConditions: "",
    capacity: "",
    publishRegistrationStatus: "النشر دون فتح التسجيل",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    navigate("/admin/courses/1");
  };

  const handleDraft = () => {
    navigate("/admin/courses");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between mb-[8px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>

                <span
                  onClick={() => navigate("/admin/courses")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  الدورات التدريبية
                </span>

                <span>›</span>
                <span>إنشاء دورة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إنشاء دورة تدريبية جديدة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
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

          <p className="text-[11px] text-[#667085] mb-[8px]">
            أدخلي معلومات الدورة ثم احفظيها كمسودة أو انشريها. حفظ الدورة منفصل عن نشرها.
          </p>

          {/* ================= FORM GRID ================= */}
          <div className="grid grid-cols-2 gap-[12px] items-start">
            {/* LEFT COLUMN */}
            <div className="grid gap-[12px]">
              {/* 01 */}
              <Section title="01 — المعلومات الأساسية">
                <div className="grid gap-[10px]">
                  <Input
                    label="اسم الدورة التدريبية *"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    placeholder="مثال: مهارات الحاسوب الأساسية"
                  />

                  <TextArea
                    label="وصف الدورة *"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="اكتبي نبذة عن الدورة ومحتواها..."
                  />

                  <TextArea
                    label="أهداف الدورة"
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    placeholder="ما المهارات أو المعارف التي سيكتسبها المتدرب؟"
                  />
                </div>
              </Section>

              {/* 02 */}
              <Section title="02 — المواعيد والساعات">
                <div className="grid grid-cols-2 gap-[10px]">
                  <Input
                    label="تاريخ البداية *"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="تاريخ النهاية *"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <p className="text-[9px] text-[#7a8393] mt-[4px] mb-[8px]">
                  يجب ألا يسبق تاريخ النهاية تاريخ البداية
                </p>

                <Input
                  label="عدد الساعات التدريبية *"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="مثال: 20"
                />
              </Section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="grid gap-[12px]">
              {/* 03 */}
              <Section title="03 — المدرب ونمط التدريب">
                <div className="grid gap-[10px]">
                  <Select
                    label="المدرب *"
                    name="trainer"
                    value={formData.trainer}
                    onChange={handleChange}
                  >
                    <option value="">اختر المدرب</option>
                    <option value="م. أحمد محمد">م. أحمد محمد</option>
                    <option value="د. سارة علي">د. سارة علي</option>
                    <option value="أ. محمد خالد">أ. محمد خالد</option>
                  </Select>

                  <div>
                    <span className="block text-[10px] font-semibold text-[#3b4454] mb-[6px]">
                      نمط التدريب *
                    </span>

                    <div className="flex gap-[22px]">
                      {["حضوري", "عن بعد", "مدمج"].map((mode) => (
                        <label
                          key={mode}
                          className="flex items-center gap-[7px] text-[10px] text-[#3b4454] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="trainingMode"
                            value={mode}
                            checked={formData.trainingMode === mode}
                            onChange={handleChange}
                            className="accent-[#4b5568]"
                          />

                          {mode}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="مكان التدريب (يظهر عند اختيار حضوري أو مدمج)"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="اسم القاعة أو الموقع"
                    disabled={formData.trainingMode === "عن بعد"}
                  />
                </div>
              </Section>

              {/* 04 */}
              <Section title="04 — التسجيل والفئة المستهدفة">
                <div className="grid gap-[10px]">
                  <Input
                    label="الفئة المستهدفة *"
                    name="targetGroup"
                    value={formData.targetGroup}
                    onChange={handleChange}
                    placeholder="مثال: طلبة الجامعة"
                  />

                  <TextArea
                    label="شروط التسجيل"
                    name="registrationConditions"
                    value={formData.registrationConditions}
                    onChange={handleChange}
                    placeholder="أدخلي الشروط المطلوبة للالتحاق بالدورة..."
                  />

                  <Input
                    label="السعة القصوى للمتدربين *"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="مثال: 25"
                  />

                  <div>
                    <span className="block text-[10px] font-semibold text-[#3b4454] mb-[6px]">
                      حالة التسجيل عند النشر
                    </span>

                    <div className="flex gap-[22px]">
                      {[
                        "النشر دون فتح التسجيل",
                        "النشر وفتح التسجيل",
                      ].map((status) => (
                        <label
                          key={status}
                          className="flex items-center gap-[7px] text-[10px] text-[#3b4454] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="publishRegistrationStatus"
                            value={status}
                            checked={
                              formData.publishRegistrationStatus === status
                            }
                            onChange={handleChange}
                            className="accent-[#4b5568]"
                          />

                          {status}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-[10px] mt-[12px]">
            <button
              type="button"
              onClick={handleSave}
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[10px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              حفظ الدورة
            </button>

            <button
              type="button"
              onClick={handleDraft}
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                border
                border-[#b9c0cc]
                bg-white
                text-[10px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              حفظ كمسودة
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
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
  disabled = false,
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
        disabled={disabled}
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
          text-[#2b3340]
          placeholder:text-[#8a93a3]
          disabled:bg-[#f4f5f7]
          disabled:text-[#9aa3b2]
        "
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          min-h-[90px]
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