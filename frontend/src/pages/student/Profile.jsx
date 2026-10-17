import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Profile() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= BREADCRUMB ================= */}
          <div className="text-[11px] text-[#7a8393] mb-[4px]">
            الرئيسية › الملف الشخصي
          </div>

          {/* ================= PAGE HEADER ================= */}
          <div className="mb-[12px]">
            <h1 className="text-[23px] font-bold text-[#1b2430]">
              الملف الشخصي
            </h1>

            <p className="text-[12px] text-[#667085] mt-[3px]">
              عرض بيانات الطالب
            </p>
          </div>

          {/* ================= PROFILE CARD ================= */}
          <section
            className="
              max-w-[900px]
              mx-auto
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[18px]
              py-[20px]
              text-center
              mb-[12px]
            "
          >
            <div
              className="
                w-[72px]
                h-[72px]
                rounded-full
                bg-[#eceff4]
                flex
                items-center
                justify-center
                mx-auto
                text-[28px]
                text-[#7f8898]
                mb-[10px]
              "
            >
              ♙
            </div>

            <h2 className="text-[17px] font-bold text-[#1f2733]">
              أمل أحمد ضياء أبو زيد
            </h2>

            <p className="text-[10px] text-[#667085] mt-[4px]">
              الرقم الجامعي: 20231234
            </p>

            <p className="text-[10px] text-[#667085] mt-[2px]">
              التخصص / القسم: تقنية المعلومات
            </p>
          </section>

          {/* ================= BASIC INFO ================= */}
          <section
            className="
              max-w-[900px]
              mx-auto
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[12px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
              المعلومات الأساسية
            </h2>

            <div className="grid grid-cols-2 gap-[10px]">
              <InfoBox
                label="الاسم الكامل"
                value="أمل أحمد ضياء أبو زيد"
              />

              <InfoBox
                label="الرقم الجامعي"
                value="20231234"
              />

              <InfoBox
                label="التخصص / القسم"
                value="تقنية المعلومات"
              />

              <InfoBox
                label="البريد الإلكتروني"
                value="amal@example.com"
              />

              <InfoBox
                label="رقم الهاتف"
                value="0599123456"
              />
            </div>
          </section>

          {/* ================= ACCOUNT INFO ================= */}
          <section
            className="
              max-w-[900px]
              mx-auto
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[14px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
              معلومات الحساب
            </h2>

            <div
              className="
                border
                border-[#e1e5ec]
                rounded-[8px]
                bg-[#fbfcfd]
                px-[12px]
                py-[10px]
                flex
                items-center
                justify-between
              "
            >
              <span className="text-[10px] text-[#667085]">
                حالة الحساب
              </span>

              <span
                className="
                  inline-flex
                  px-[10px]
                  py-[3px]
                  rounded-full
                  bg-[#dff1e6]
                  text-[#236a45]
                  text-[9px]
                  font-semibold
                "
              >
                نشط
              </span>
            </div>

            <div className="flex justify-end mt-[12px]">
              <button
                type="button"
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
                تعديل البيانات
              </button>
            </div>

            <p className="text-[9px] text-[#7a8393] mt-[8px]">
              مقترح: يعتمد بعد التأكد من الحقول التي يسمح النظام بتعديلها.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[11px]
        py-[9px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[3px]">
        {label}
      </p>

      <p className="text-[11px] font-semibold text-[#2b3340]">
        {value}
      </p>
    </div>
  );
}