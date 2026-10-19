import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AddTrainingOrganization() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    field: "",
    address: "",
    region: "",
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
    capacity: "10",
    status: "active",
  });

  const [specializations, setSpecializations] = useState([
    "هندسة البرمجيات",
    "تقنية المعلومات",
    "علوم حاسوب",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeSpecialization = (item) => {
    setSpecializations((prev) =>
      prev.filter((specialization) => specialization !== item)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/admin/training-organizations");
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
                  onClick={() => navigate("/admin/training-organizations")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  جهات التدريب
                </span>
                <span>›</span>
                <span>إضافة جهة تدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إضافة جهة تدريب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/training-organizations")}
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
            {/* ================= ORGANIZATION INFO ================= */}
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
                معلومات الجهة
              </h2>

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[12px]">
                <Input
                  label="اسم جهة التدريب *"
                  name="name"
                  value={formData.name}
                  placeholder="أدخل اسم جهة التدريب"
                  onChange={handleChange}
                />

                <Select
                  label="مجال الجهة *"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                >
                  <option value="">اختر المجال</option>
                  <option value="it">تكنولوجيا المعلومات</option>
                  <option value="health">الصحة</option>
                  <option value="business">المال والأعمال</option>
                  <option value="engineering">الهندسة</option>
                  <option value="media">الإعلام</option>
                </Select>

                <Input
                  label="العنوان *"
                  name="address"
                  value={formData.address}
                  placeholder="أدخل العنوان بالتفصيل"
                  onChange={handleChange}
                />

                <Select
                  label="المنطقة"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value="">اختر المنطقة</option>
                  <option value="gaza">غزة</option>
                  <option value="ramallah">رام الله</option>
                  <option value="nablus">نابلس</option>
                  <option value="hebron">الخليل</option>
                  <option value="jerusalem">القدس</option>
                </Select>

                <Input
                  label="المسؤول عن التواصل *"
                  name="contactPerson"
                  value={formData.contactPerson}
                  placeholder="اسم المسؤول"
                  onChange={handleChange}
                />

                <Input
                  label="رقم التواصل *"
                  name="phone"
                  value={formData.phone}
                  placeholder="أدخل رقم الهاتف"
                  onChange={handleChange}
                />

                <Input
                  label="البريد الإلكتروني"
                  name="email"
                  value={formData.email}
                  placeholder="example@domain.com"
                  onChange={handleChange}
                  type="email"
                />

                <Input
                  label="الموقع الإلكتروني"
                  name="website"
                  value={formData.website}
                  placeholder="https://"
                  onChange={handleChange}
                />
              </div>

              {/* ================= SPECIALIZATIONS ================= */}
              <div className="mt-[12px]">
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  التخصصات المقبولة *
                </label>

                <div
                  className="
                    min-h-[44px]
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
                    bg-white
                    px-[10px]
                    py-[7px]
                    flex
                    flex-wrap
                    items-center
                    gap-[8px]
                  "
                >
                  {specializations.map((specialization) => (
                    <span
                      key={specialization}
                      className="
                        inline-flex
                        items-center
                        gap-[6px]
                        px-[12px]
                        py-[5px]
                        rounded-full
                        border
                        border-[#c9cfd9]
                        text-[10px]
                        text-[#4a5465]
                        bg-white
                      "
                    >
                      {specialization}

                      <button
                        type="button"
                        onClick={() =>
                          removeSpecialization(specialization)
                        }
                        className="text-[#7a8393] hover:text-[#1f2733]"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <button
                    type="button"
                    className="
                      px-[12px]
                      py-[5px]
                      rounded-full
                      border
                      border-dashed
                      border-[#b9c0cc]
                      text-[10px]
                      text-[#4a5465]
                      hover:bg-[#eef0f4]
                    "
                  >
                    + إضافة تخصص
                  </button>
                </div>
              </div>

              {/* ================= CAPACITY + STATUS ================= */}
              <div className="grid grid-cols-2 gap-[20px] mt-[12px]">
                <Select
                  label="الطاقة الاستيعابية *"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </Select>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3b4454] mb-[8px]">
                    حالة الجهة
                  </label>

                  <div className="flex items-center gap-[24px]">
                    <label className="flex items-center gap-[7px] text-[11px] text-[#3b4454] cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === "active"}
                        onChange={handleChange}
                        className="accent-[#4b5568]"
                      />

                      نشطة
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

                      غير نشطة
                    </label>
                  </div>
                </div>
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
                حفظ جهة التدريب
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/training-organizations")}
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