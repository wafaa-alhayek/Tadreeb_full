import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseCertificateVerify() {
  const navigate = useNavigate();

  const [certificateNumber, setCertificateNumber] = useState("CERT-2026-001");

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
                <span>الشهادات</span>
                <span>›</span>
                <span>التحقق</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التحقق من شهادة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/course-certificates")}
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

          {/* ================= SEARCH BOX ================= */}
          <section
            className="
              max-w-[640px]
              mx-auto
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[20px]
              py-[16px]
              mb-[12px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
              أدخلي رقم الشهادة أو رمز QR
            </h2>

            <div className="flex gap-[10px]">
              <input
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="CERT-2026-001"
                className="
                  flex-1
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

              <button
                type="button"
                className="
                  h-[38px]
                  px-[16px]
                  rounded-[7px]
                  bg-[#4b5568]
                  text-white
                  text-[10px]
                  font-semibold
                  hover:bg-[#3f4858]
                "
              >
                تحقق
              </button>
            </div>
          </section>

          {/* ================= RESULT STATES ================= */}
          <div className="grid grid-cols-3 gap-[12px] items-start">
            {/* VALID CERTIFICATE */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[16px]
                py-[14px]
              "
            >
              <div className="text-[10px] text-[#7a8393] font-semibold mb-[6px]">
                شهادة صالحة
              </div>

              <div className="text-center mb-[8px]">
                <div
                  className="
                    w-[46px]
                    h-[46px]
                    rounded-full
                    bg-[#dff1e6]
                    text-[#236a45]
                    flex
                    items-center
                    justify-center
                    mx-auto
                    text-[22px]
                    font-bold
                  "
                >
                  ✓
                </div>
              </div>

              <div className="grid gap-[8px]">
                <InfoRow
                  label="اسم المتدرب"
                  value="أحمد محمد"
                />

                <InfoRow
                  label="الدورة"
                  value="مهارات الحاسوب الأساسية"
                />

                <InfoRow
                  label="تاريخ الإصدار"
                  value="2026/12/02"
                />

                <div className="flex items-center justify-between gap-[10px]">
                  <span className="text-[9px] text-[#7a8393]">
                    الحالة
                  </span>

                  <span
                    className="
                      inline-flex
                      px-[9px]
                      py-[3px]
                      rounded-full
                      bg-[#dff1e6]
                      text-[#236a45]
                      text-[9px]
                      font-semibold
                    "
                  >
                    صالحة
                  </span>
                </div>
              </div>

              <p className="text-[9px] text-[#7a8393] mt-[10px] leading-[1.7]">
                تُعرض الحدود الدنيا من البيانات الشخصية
              </p>
            </section>

            {/* NOT FOUND */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[16px]
                py-[14px]
                text-center
              "
            >
              <div className="text-[10px] text-[#7a8393] font-semibold mb-[6px] text-right">
                رقم غير موجود
              </div>

              <div
                className="
                  w-[46px]
                  h-[46px]
                  rounded-full
                  bg-[#f6e5e5]
                  text-[#b4483f]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  text-[22px]
                  font-bold
                "
              >
                ×
              </div>

              <h3 className="text-[14px] font-bold text-[#1f2733] mt-[8px] mb-[3px]">
                لم يتم العثور على الشهادة
              </h3>

              <p className="text-[10px] text-[#667085]">
                تأكدي من الرقم وحاولي مرة أخرى
              </p>
            </section>

            {/* SERVICE ERROR */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[16px]
                py-[14px]
                text-center
              "
            >
              <div className="text-[10px] text-[#7a8393] font-semibold mb-[6px] text-right">
                تعذر خدمة التحقق
              </div>

              <div
                className="
                  w-[46px]
                  h-[46px]
                  rounded-full
                  bg-[#eceff4]
                  text-[#8a93a3]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  text-[22px]
                  font-bold
                "
              >
                !
              </div>

              <h3 className="text-[14px] font-bold text-[#1f2733] mt-[8px] mb-[3px]">
                تعذر الاتصال بخدمة التحقق
              </h3>

              <p className="text-[10px] text-[#667085] mb-[10px]">
                حاولي لاحقاً
              </p>

              <button
                type="button"
                className="
                  h-[30px]
                  px-[12px]
                  rounded-[6px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[9px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                إعادة المحاولة
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[10px]
        border-b
        border-[#eceff4]
        pb-[7px]
      "
    >
      <span className="text-[9px] text-[#7a8393]">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-[#2b3340] text-left">
        {value}
      </span>
    </div>
  );
}