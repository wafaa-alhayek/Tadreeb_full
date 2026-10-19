import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddTrainingOpportunity() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    specialization: "",
    studentsCount: "5",
    startDate: "",
    endDate: "",
    location: "",
    tasks: "",
    requirements: "",
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

    navigate("/admin/training-opportunities");
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
                  onClick={() => navigate("/admin/training-opportunities")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  فرص التدريب
                </span>

                <span>›</span>
                <span>إضافة فرصة تدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إضافة فرصة تدريب
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

          <form onSubmit={handleSubmit}>
            {/* ================= OPPORTUNITY INFORMATION ================= */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[18px]
                py-[14px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
                معلومات الفرصة
              </h2>

              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[12px]">
                <Input
                  label="اسم فرصة التدريب *"
                  name="title"
                  value={formData.title}
                  placeholder="أدخل اسم فرصة التدريب"
                  onChange={handleChange}
                />

                <Select
                  label="جهة التدريب *"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                >
                  <option value="">اختر جهة التدريب</option>
                  <option value="tech">شركة التقنية</option>
                  <option value="hospital">مستشفى القدس</option>
                  <option value="bank">بنك فلسطين</option>
                  <option value="creative">مؤسسة الإبداع</option>
                </Select>

                <Select
                  label="التخصص المطلوب *"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">اختر التخصص</option>
                  <option value="software">هندسة البرمجيات</option>
                  <option value="it">تقنية المعلومات</option>
                  <option value="business">إدارة الأعمال</option>
                  <option value="accounting">المحاسبة</option>
                  <option value="design">التصميم الجرافيكي</option>
                </Select>

                <Select
                  label="عدد الطلبة *"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Select>

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

              {/* ================= LOCATION ================= */}
              <div className="mt-[12px]">
                <Input
                  label="موقع التدريب *"
                  name="location"
                  value={formData.location}
                  placeholder="أدخل موقع التدريب"
                  onChange={handleChange}
                />
              </div>

              {/* ================= TASKS ================= */}
              <div className="mt-[12px]">
                <label
                  htmlFor="tasks"
                  className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
                >
                  المهام والمهارات المطلوبة *
                </label>

                <textarea
                  id="tasks"
                  name="tasks"
                  value={formData.tasks}
                  onChange={handleChange}
                  placeholder="أدخل المهام والمهارات المطلوبة..."
                  className="
                    w-full
                    min-h-[85px]
                    resize-none
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    px-[12px]
                    py-[10px]
                    bg-white
                    outline-none
                    text-[11px]
                    text-[#2b3340]
                    placeholder:text-[#8a93a3]
                    focus:border-[#8a93a3]
                  "
                />
              </div>

              {/* ================= REQUIREMENTS ================= */}
              <div className="mt-[12px]">
                <label
                  htmlFor="requirements"
                  className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]"
                >
                  شروط القبول *
                </label>

                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="أدخل شروط القبول..."
                  className="
                    w-full
                    min-h-[85px]
                    resize-none
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    px-[12px]
                    py-[10px]
                    bg-white
                    outline-none
                    text-[11px]
                    text-[#2b3340]
                    placeholder:text-[#8a93a3]
                    focus:border-[#8a93a3]
                  "
                />
              </div>
            </section>

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
                حفظ الفرصة
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/training-opportunities")}
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
          px-[12px]
          bg-white
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
          px-[12px]
          bg-white
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