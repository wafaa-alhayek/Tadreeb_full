import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";
import { useNavigate } from "react-router-dom";

export default function FinishTraining() {
  const navigate = useNavigate();

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
            إنهاء التدريب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            إنهاء التدريب
          </h1>

          {/* ================= SUCCESS MESSAGE ================= */}
          <section
            className="
              border
              border-[#d9e5dc]
              rounded-[8px]
              bg-[#f4f8f5]
              px-[16px]
              py-[14px]
              mb-[12px]
            "
          >
            <div className="flex items-start gap-[10px]">
              <div
                className="
                  w-[25px]
                  h-[25px]
                  rounded-full
                  bg-[#6f8f78]
                  text-white
                  flex
                  items-center
                  justify-center
                  text-[11px]
                  shrink-0
                "
              >
                ✓
              </div>

              <div>
                <h2 className="text-[11px] font-bold text-[#3e5e47] mb-[3px]">
                  تم استكمال جميع متطلبات التدريب بنجاح
                </h2>

                <p className="text-[8px] text-[#6b7d70]">
                  يمكنك الآن إنهاء التدريب وإصدار الشهادة بعد اعتماد المسؤول.
                </p>
              </div>
            </div>
          </section>

          {/* ================= TRAINING SUMMARY ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
              mb-[12px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[14px]">
              ملخص التدريب
            </h2>

            <div className="grid grid-cols-3 gap-[10px]">
              {/* Training Company */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  جهة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة الابتكار التقني
                </p>
              </div>

              {/* Period */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  الفترة الزمنية
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/01 - 2025/12/01
                </p>
              </div>

              {/* Hours */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  عدد الساعات
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  120 ساعة
                </p>
              </div>
            </div>
          </section>

          {/* ================= EXTRA DETAILS ================= */}
          <section className="grid grid-cols-2 gap-[10px] mb-[12px]">

            {/* Visits */}
            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                عدد الزيارات
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                12
              </p>
            </div>

            {/* Final Evaluation */}
            <div
              className="
                border
                border-[#e0e3e7]
                rounded-[8px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                التقييم النهائي
              </p>

              <p className="text-[18px] font-bold text-[#293444]">
                4.5 / 5
              </p>
            </div>

          </section>

          {/* ================= STEPS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[20px]
              py-[16px]
              mb-[14px]
            "
          >
            <div className="flex items-start justify-center">
              <div className="flex items-start w-[470px]">

                {/* Step 1 */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <div
                    className="
                      w-[25px]
                      h-[25px]
                      rounded-full
                      bg-[#505b70]
                      text-white
                      flex
                      items-center
                      justify-center
                      text-[10px]
                    "
                  >
                    ✓
                  </div>

                  <span className="text-[8px] text-[#566170] mt-[5px]">
                    مراجعة الملفات
                  </span>
                </div>

                <div className="h-px bg-[#505b70] flex-1 mt-[12px]" />

                {/* Step 2 */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <div
                    className="
                      w-[25px]
                      h-[25px]
                      rounded-full
                      bg-[#505b70]
                      text-white
                      flex
                      items-center
                      justify-center
                      text-[9px]
                      font-bold
                    "
                  >
                    2
                  </div>

                  <span className="text-[8px] font-bold text-[#293444] mt-[5px]">
                    التأكيد النهائي
                  </span>
                </div>

                <div className="h-px bg-[#cdd3db] flex-1 mt-[12px]" />

                {/* Step 3 */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <div
                    className="
                      w-[25px]
                      h-[25px]
                      rounded-full
                      border
                      border-[#b8c0ca]
                      bg-white
                      text-[#7b8795]
                      flex
                      items-center
                      justify-center
                      text-[9px]
                    "
                  >
                    3
                  </div>

                  <span className="text-[8px] text-[#8b95a2] mt-[5px]">
                    إصدار الشهادة
                  </span>
                </div>

              </div>
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-[10px]">

            {/* Finish */}
            <button
              type="button"
              onClick={() => navigate("/certificate")}
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
              إنهاء التدريب
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
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
              إلغاء
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}