import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "أمل أحمد ضياء أبو زيد",
    studentId: "20231234",
    phone: "0599123456",
    specialization: "تقنية المعلومات",
    email: "amal@example.com",
    academicYear: "السنة الثالثة",
    reason:
      "أرغب في تعزيز مهاراتي العملية واكتساب الخبرة في مجال تقنية المعلومات.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    navigate("/apply-training/documents");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 px-[28px] pt-[15px] pb-8">

          {/* ================= BREADCRUMB ================= */}
          <div className="text-[8px] text-[#9aa3ae] mb-[11px]">
            الرئيسية
            <span className="mx-[5px]">‹</span>
            فرص التدريب
            <span className="mx-[5px]">‹</span>
            التقديم
          </div>

          {/* ================= PAGE TITLE ================= */}
          <div className="mb-[16px]">
            <h1 className="text-[20px] font-bold text-[#293444] mb-[5px]">
              استمارة التقديم على التدريب
            </h1>

            <p className="text-[9px] text-[#8b95a2]">
              يرجى تعبئة البيانات التالية للتقديم على فرصة التدريب
            </p>
          </div>

          {/* ================= STEPS ================= */}
          <div className="flex items-start justify-center mb-[20px]">
            <div className="flex items-start w-[470px]">

              {/* Step 1 */}
              <div className="flex flex-col items-center min-w-[90px]">
                <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[9px] font-bold">
                  1
                </div>

                <span className="text-[8px] text-[#293444] font-bold mt-[5px]">
                  البيانات الأساسية
                </span>
              </div>

              <div className="h-px bg-[#cdd3db] flex-1 mt-[12px]" />

              {/* Step 2 */}
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-[25px] h-[25px] rounded-full border border-[#b8c0ca] bg-white text-[#7b8795] flex items-center justify-center text-[9px]">
                  2
                </div>

                <span className="text-[8px] text-[#8b95a2] mt-[5px]">
                  المستندات
                </span>
              </div>

              <div className="h-px bg-[#cdd3db] flex-1 mt-[12px]" />

              {/* Step 3 */}
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-[25px] h-[25px] rounded-full border border-[#b8c0ca] bg-white text-[#7b8795] flex items-center justify-center text-[9px]">
                  3
                </div>

                <span className="text-[8px] text-[#8b95a2] mt-[5px]">
                  تأكيد الطلب
                </span>
              </div>

            </div>
          </div>

          {/* ================= FORM CARD ================= */}
          <form
            onSubmit={handleNext}
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[14px]">
              البيانات الأساسية
            </h2>

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-[12px] mb-[12px]">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  الاسم الرباعي
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                />
              </div>

              {/* Student ID */}
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  رقم الطالب
                </label>

                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                />
              </div>

            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-[12px] mb-[12px]">

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  رقم الهاتف
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                />
              </div>

              {/* Specialization */}
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  التخصص
                </label>

                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    bg-white
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                >
                  <option value="تقنية المعلومات">
                    تقنية المعلومات
                  </option>

                  <option value="إدارة أعمال">
                    إدارة أعمال
                  </option>

                  <option value="هندسة الاتصالات">
                    هندسة الاتصالات
                  </option>
                </select>
              </div>

            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-[12px] mb-[12px]">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  البريد الإلكتروني
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                />
              </div>

              {/* Academic Year */}
              <div>
                <label
                  htmlFor="academicYear"
                  className="block text-[9px] font-bold text-[#404958] mb-[6px]"
                >
                  السنة الدراسية
                </label>

                <select
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[35px]
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    bg-white
                    px-[10px]
                    text-[9px]
                    text-[#4d5867]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                >
                  <option value="السنة الأولى">
                    السنة الأولى
                  </option>

                  <option value="السنة الثانية">
                    السنة الثانية
                  </option>

                  <option value="السنة الثالثة">
                    السنة الثالثة
                  </option>

                  <option value="السنة الرابعة">
                    السنة الرابعة
                  </option>
                </select>
              </div>

            </div>

            {/* Reason */}
            <div className="mb-[14px]">
              <label
                htmlFor="reason"
                className="block text-[9px] font-bold text-[#404958] mb-[6px]"
              >
                سبب التقديم
              </label>

              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className="
                  w-full
                  min-h-[76px]
                  resize-none
                  rounded-[6px]
                  border
                  border-[#d9dee5]
                  px-[10px]
                  py-[9px]
                  text-[9px]
                  leading-[18px]
                  text-[#4d5867]
                  outline-none
                  focus:border-[#9ba7b6]
                "
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="
                  h-[33px]
                  px-[17px]
                  rounded-[5px]
                  bg-[#505b70]
                  text-white
                  text-[9px]
                  font-bold
                  hover:bg-[#414b5f]
                  transition
                "
              >
                التالي
                <span className="mr-[6px]">←</span>
              </button>
            </div>

          </form>

        </main>
      </div>
    </div>
  );
}