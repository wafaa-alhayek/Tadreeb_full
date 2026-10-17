import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddVisit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "أحمد خالد",
    studentId: "20231045",
    specialization: "هندسة برمجيات",
    opportunity: "مطور برمجيات",
    supervisorName: "د. أحمد محمد",
    supervisorType: "مشرف أكاديمي",
    visitDate: "2025-06-10",
    followType: "زيارة ميدانية",
    location: "مقر جهة التدريب",
    visitTime: "10:00",
    notes: "مستوى التزام الطالب جيد، وتمت متابعة المهام المطلوبة منه.",
    hasProblem: "no",
    problemDescription: "",
    actionTaken: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/visits");
  };

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
                  onClick={() => navigate("/admin/visits")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  الزيارات والمتابعة
                </span>

                <span>›</span>
                <span>إضافة زيارة متابعة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إضافة زيارة متابعة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/visits")}
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

          <form onSubmit={handleSubmit}>
            {/* ================= STUDENT DATA ================= */}
            <Section title="بيانات الطالب" icon="♙">
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

                <Select
                  label="التخصص"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="هندسة برمجيات">هندسة برمجيات</option>
                  <option value="علوم حاسوب">علوم حاسوب</option>
                  <option value="نظم معلومات">نظم معلومات</option>
                  <option value="إدارة الأعمال">إدارة الأعمال</option>
                </Select>

                <Select
                  label="فرصة التدريب"
                  name="opportunity"
                  value={formData.opportunity}
                  onChange={handleChange}
                >
                  <option value="مطور برمجيات">مطور برمجيات</option>
                  <option value="محلل بيانات">محلل بيانات</option>
                  <option value="مهندس شبكات">مهندس شبكات</option>
                  <option value="مساعد إداري">مساعد إداري</option>
                </Select>
              </div>
            </Section>

            {/* ================= SUPERVISOR DATA ================= */}
            <Section title="بيانات المشرف" icon="♙">
              <div className="grid grid-cols-3 gap-x-[16px] gap-y-[10px]">
                <Input
                  label="اسم المشرف"
                  name="supervisorName"
                  value={formData.supervisorName}
                  onChange={handleChange}
                />

                <Select
                  label="نوع المشرف"
                  name="supervisorType"
                  value={formData.supervisorType}
                  onChange={handleChange}
                >
                  <option value="مشرف أكاديمي">مشرف أكاديمي</option>
                  <option value="مشرف ميداني">مشرف ميداني</option>
                </Select>

                <Input
                  label="تاريخ الزيارة"
                  name="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={handleChange}
                />
              </div>
            </Section>

            {/* ================= VISIT DETAILS ================= */}
            <Section title="تفاصيل الزيارة" icon="◷">
              <div className="mb-[12px]">
                <span className="block text-[11px] font-semibold text-[#3b4454] mb-[8px]">
                  نوع المتابعة
                </span>

                <div className="flex gap-[24px]">
                  <Radio
                    label="زيارة ميدانية"
                    value="زيارة ميدانية"
                    checked={formData.followType === "زيارة ميدانية"}
                    onChange={handleChange}
                  />

                  <Radio
                    label="متابعة إلكترونية"
                    value="متابعة إلكترونية"
                    checked={formData.followType === "متابعة إلكترونية"}
                    onChange={handleChange}
                  />

                  <Radio
                    label="اتصال"
                    value="اتصال"
                    checked={formData.followType === "اتصال"}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
                <Input
                  label="مكان الزيارة"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <Input
                  label="وقت الزيارة"
                  name="visitTime"
                  type="time"
                  value={formData.visitTime}
                  onChange={handleChange}
                />
              </div>
            </Section>

            {/* ================= FOLLOW-UP NOTES ================= */}
            <Section title="ملاحظات المتابعة" icon="▣">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="
                  w-full
                  min-h-[100px]
                  resize-none
                  rounded-[8px]
                  border
                  border-[#c9cfd9]
                  bg-white
                  px-[12px]
                  py-[10px]
                  outline-none
                  text-[11px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                  focus:border-[#8a93a3]
                "
              />
            </Section>

            {/* ================= PROBLEMS ================= */}
            <Section title="المشاكل والإجراءات" icon="!">
              <div className="mb-[12px]">
                <span className="block text-[11px] font-semibold text-[#3b4454] mb-[8px]">
                  هل توجد مشكلة؟
                </span>

                <div className="flex gap-[24px]">
                  <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
                    <input
                      type="radio"
                      name="hasProblem"
                      value="yes"
                      checked={formData.hasProblem === "yes"}
                      onChange={handleChange}
                      className="accent-[#4b5568]"
                    />

                    نعم
                  </label>

                  <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
                    <input
                      type="radio"
                      name="hasProblem"
                      value="no"
                      checked={formData.hasProblem === "no"}
                      onChange={handleChange}
                      className="accent-[#4b5568]"
                    />

                    لا
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div>
                  <label
                    htmlFor="problemDescription"
                    className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
                  >
                    وصف المشكلة
                  </label>

                  <textarea
                    id="problemDescription"
                    name="problemDescription"
                    value={formData.problemDescription}
                    onChange={handleChange}
                    placeholder="اكتب وصف المشكلة ..."
                    disabled={formData.hasProblem === "no"}
                    className="
                      w-full
                      min-h-[100px]
                      resize-none
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[12px]
                      py-[10px]
                      outline-none
                      text-[11px]
                      text-[#2b3340]
                      placeholder:text-[#8a93a3]
                      disabled:bg-[#f5f6f8]
                      disabled:text-[#9aa3b2]
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="actionTaken"
                    className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
                  >
                    الإجراء المتخذ
                  </label>

                  <textarea
                    id="actionTaken"
                    name="actionTaken"
                    value={formData.actionTaken}
                    onChange={handleChange}
                    placeholder="اكتب الإجراء المتخذ ..."
                    disabled={formData.hasProblem === "no"}
                    className="
                      w-full
                      min-h-[100px]
                      resize-none
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[12px]
                      py-[10px]
                      outline-none
                      text-[11px]
                      text-[#2b3340]
                      placeholder:text-[#8a93a3]
                      disabled:bg-[#f5f6f8]
                      disabled:text-[#9aa3b2]
                    "
                  />
                </div>
              </div>
            </Section>

            {/* ================= ACTIONS ================= */}
            <div className="flex justify-end gap-[10px] mt-[10px]">
              <button
                type="submit"
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
                ✓ حفظ الزيارة
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/visits")}
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
          </form>
        </main>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
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
      <div className="flex items-center gap-[7px] mb-[11px]">
        <span className="text-[#667085]">{icon}</span>

        <h2 className="text-[15px] font-bold text-[#1f2733]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function Input({
  label,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
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
          focus:border-[#8a93a3]
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
        className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
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
          px-[12px]
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

function Radio({ label, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
      <input
        type="radio"
        name="followType"
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[#4b5568]"
      />

      {label}
    </label>
  );
}