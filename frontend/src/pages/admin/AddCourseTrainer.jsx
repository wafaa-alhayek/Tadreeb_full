import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddCourseTrainer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
    status: "نشط",
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
    navigate("/admin/course-trainers");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>المدربون</span>
                <span>›</span>
                <span>إضافة مدرب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إضافة مدرب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/course-trainers")}
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
            {/* ================= BASIC DATA ================= */}
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
                بيانات المدرب الأساسية
              </h2>

              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
                {/* Name */}
                <Input
                  label="اسم المدرب *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخلي اسم المدرب"
                />

                {/* Specialization */}
                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    التخصص *
                  </label>

                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
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
                    <option value="">اختاري التخصص</option>
                    <option value="تقنية المعلومات">
                      تقنية المعلومات
                    </option>
                    <option value="تصميم وإعلام">
                      تصميم وإعلام
                    </option>
                    <option value="تحليل البيانات">
                      تحليل البيانات
                    </option>
                    <option value="مهارات مهنية">
                      مهارات مهنية
                    </option>
                    <option value="إدارة المشاريع">
                      إدارة المشاريع
                    </option>
                  </select>
                </div>

                {/* Email */}
                <Input
                  label="البريد الإلكتروني *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="trainer@example.com"
                />

                {/* Phone */}
                <Input
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخلي رقم الهاتف"
                />

                {/* Experience */}
                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    الخبرات
                  </label>

                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="نبذة عن الخبرات"
                    className="
                      w-full
                      min-h-[100px]
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

                {/* Status */}
                <div>
                  <span className="block text-[10px] font-semibold text-[#3b4454] mb-[7px]">
                    الحالة
                  </span>

                  <div className="flex gap-[22px] pt-[6px]">
                    {["نشط", "معطل"].map((status) => (
                      <label
                        key={status}
                        className="
                          flex
                          items-center
                          gap-[7px]
                          text-[10px]
                          text-[#3b4454]
                          cursor-pointer
                        "
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={handleChange}
                          className="accent-[#4b5568]"
                        />

                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ================= INFO ================= */}
            <div
              className="
                border
                border-[#dfe3ea]
                rounded-[9px]
                bg-[#fbfcfd]
                px-[13px]
                py-[10px]
                mt-[10px]
                text-[10px]
                leading-[1.8]
                text-[#667085]
              "
            >
              إسناد المدرب إلى دورة معينة يتم من نموذج الدورة، وهو منفصل عن بيانات المدرب الأساسية. يتحقق النظام من عدم تكرار السجل.
            </div>

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
                  text-[10px]
                  font-semibold
                  hover:bg-[#3f4858]
                "
              >
                ✓ حفظ المدرب
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/course-trainers")}
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
          </form>
        </main>
      </div>
    </div>
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
        "
      />
    </div>
  );
}