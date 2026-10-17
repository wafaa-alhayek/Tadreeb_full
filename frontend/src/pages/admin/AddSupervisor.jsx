import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddSupervisor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    type: "مشرف أكاديمي",
    phone: "",
    college: "",
    specialization: "",
    studentsCount: "0",
    trainingFields: "",
    status: "active",
    notes: "",
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
    navigate("/admin/supervisors");
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
                  onClick={() => navigate("/admin/supervisors")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  المشرفون
                </span>

                <span>›</span>
                <span>إضافة مشرف أكاديمي</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إضافة مشرف أكاديمي
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/supervisors")}
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
            {/* ================= PERSONAL DATA ================= */}
            <Section title="البيانات الشخصية" icon="♙">
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
                <Input
                  label="اسم المشرف *"
                  name="name"
                  value={formData.name}
                  placeholder="أدخل اسم المشرف"
                  onChange={handleChange}
                />

                <Input
                  label="الرقم الوظيفي *"
                  name="employeeId"
                  value={formData.employeeId}
                  placeholder="أدخل الرقم الوظيفي"
                  onChange={handleChange}
                />

                <Input
                  label="البريد الإلكتروني *"
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="أدخل البريد الإلكتروني"
                  onChange={handleChange}
                />

                <Select
                  label="نوع المشرف *"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="مشرف أكاديمي">مشرف أكاديمي</option>
                  <option value="مشرف ميداني">مشرف ميداني</option>
                </Select>

                <Input
                  label="رقم الهاتف *"
                  name="phone"
                  value={formData.phone}
                  placeholder="أدخل رقم الهاتف"
                  onChange={handleChange}
                />
              </div>
            </Section>

            {/* ================= ACADEMIC INFO ================= */}
            <Section title="معلومات أكاديمية" icon="♙">
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
                <Select
                  label="الكلية / القسم *"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="">اختر الكلية / القسم</option>
                  <option value="engineering">كلية الهندسة</option>
                  <option value="business">كلية الاقتصاد والعلوم الإدارية</option>
                  <option value="it">كلية تكنولوجيا المعلومات</option>
                  <option value="arts">كلية الآداب</option>
                </Select>

                <Select
                  label="التخصص *"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">اختر التخصص</option>
                  <option value="software">هندسة البرمجيات</option>
                  <option value="business">إدارة الأعمال</option>
                  <option value="accounting">المحاسبة</option>
                  <option value="networks">هندسة الشبكات</option>
                </Select>
              </div>
            </Section>

            {/* ================= SUPERVISION SETTINGS ================= */}
            <Section title="إعدادات الإشراف" icon="⚙">
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
                <Select
                  label="عدد الطلبة المكلف بهم *"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleChange}
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </Select>

                <Select
                  label="مجالات التدريب التي يشرف عليها *"
                  name="trainingFields"
                  value={formData.trainingFields}
                  onChange={handleChange}
                >
                  <option value="">اختر مجالات التدريب</option>
                  <option value="software">البرمجيات</option>
                  <option value="networks">الشبكات</option>
                  <option value="business">الإدارة والأعمال</option>
                  <option value="design">التصميم</option>
                </Select>
              </div>

              <div className="mt-[12px]">
                <span className="block text-[11px] font-semibold text-[#3b4454] mb-[8px]">
                  الحالة *
                </span>

                <div className="flex gap-[24px]">
                  <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={handleChange}
                      className="accent-[#4b5568]"
                    />

                    فعال
                  </label>

                  <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === "inactive"}
                      onChange={handleChange}
                      className="accent-[#4b5568]"
                    />

                    غير فعال
                  </label>
                </div>
              </div>
            </Section>

            {/* ================= NOTES ================= */}
            <Section title="ملاحظات إضافية" icon="▣">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="أدخل أي ملاحظات إضافية ..."
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
                حفظ المشرف
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/supervisors")}
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
          focus:border-[#8a93a3]
        "
      >
        {children}
      </select>
    </div>
  );
}