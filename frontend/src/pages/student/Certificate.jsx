import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Certificate() {
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
            الشهادة
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            الشهادة
          </h1>

          {/* ================= CERTIFICATE CARD ================= */}
          <section
            className="
              border
              border-[#dfe3e8]
              rounded-[8px]
              bg-white
              px-[32px]
              py-[28px]
              mb-[14px]
              text-center
            "
          >
            {/* College */}
            <p className="text-[10px] font-bold text-[#4d5867] mb-[4px]">
              كلية الدراسات المتوسطة الأزهر
            </p>

            <p className="text-[9px] text-[#7b8795] mb-[20px]">
              قسم التدريب الميداني والتطوير
            </p>

            {/* Certificate Title */}
            <h2 className="text-[24px] font-bold text-[#293444] mb-[18px]">
              شهادة إتمام تدريب
            </h2>

            {/* Student */}
            <p className="text-[10px] text-[#697386] mb-[7px]">
              تمنح هذه الشهادة للطالبة
            </p>

            <h3 className="text-[20px] font-bold text-[#293444] mb-[14px]">
              أمل أحمد
            </h3>

            {/* Description */}
            <p className="text-[9px] leading-[22px] text-[#5f6a78] max-w-[620px] mx-auto mb-[16px]">
              وذلك لإتمامها برنامج التدريب الميداني في شركة الابتكار التقني
              خلال الفترة من 2025/10/01 إلى 2025/12/01 بمجموع ساعات تدريبية
              (120) ساعة.
            </p>

            {/* Divider */}
            <div className="h-px bg-[#e4e7eb] my-[20px]" />

            {/* Bottom Content */}
            <div className="grid grid-cols-3 items-end">

              {/* QR */}
              <div className="flex justify-start">
                <div
                  className="
                    w-[70px]
                    h-[70px]
                    border
                    border-[#dfe3e8]
                    rounded-[6px]
                    bg-[#f7f8fa]
                    flex
                    items-center
                    justify-center
                    text-[9px]
                    text-[#8b95a2]
                  "
                >
                  QR
                </div>
              </div>

              {/* Signature */}
              <div className="text-center">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  رئيس القسم
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  د. محمد الأسطل
                </p>
              </div>

              {/* Spacer */}
              <div />
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-[10px]">

            {/* Download */}
            <button
              type="button"
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
              تحميل الشهادة
            </button>

            {/* Share */}
            <button
              type="button"
              className="
                h-[33px]
                px-[17px]
                rounded-[5px]
                border
                border-[#d7dce3]
                bg-white
                text-[#596575]
                text-[9px]
                font-bold
                hover:bg-[#f7f8fa]
                transition
              "
            >
              مشاركة الشهادة
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}