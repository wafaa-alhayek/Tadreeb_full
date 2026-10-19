import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TrainingAccepted() {
  const navigate = useNavigate();

  const nextSteps = [
    "توقيع اتفاقية التدريب",
    "رفع المستندات المطلوبة",
    "إعداد خطة التدريب",
    "بدء التدريب",
  ];

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
            طلباتي
            <span className="mx-[5px]">‹</span>
            قبول التدريب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            قبول التدريب
          </h1>

          {/* ================= SUCCESS MESSAGE ================= */}
          <section
            className="
              border
              border-[#cfe8d7]
              bg-[#eaf7ee]
              rounded-[8px]
              px-[16px]
              py-[14px]
              mb-[14px]
              flex
              items-start
              gap-[12px]
            "
          >
            <div
              className="
                w-[27px]
                h-[27px]
                rounded-full
                bg-[#4f9b67]
                text-white
                flex
                items-center
                justify-center
                text-[12px]
                shrink-0
              "
            >
              ✓
            </div>

            <div>
              <h2 className="text-[11px] font-bold text-[#315d3e] mb-[3px]">
                تم قبولك في التدريب بنجاح
              </h2>

              <p className="text-[8px] text-[#62816c]">
                تهانينا! تم قبولك في فرصة التدريب، يرجى الاطلاع على التفاصيل التالية.
              </p>
            </div>
          </section>

          {/* ================= TRAINING CARD ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
              mb-[14px]
            "
          >
            {/* Training Header */}
            <div className="flex items-center gap-[13px] mb-[14px]">

              <div
                className="
                  w-[50px]
                  h-[50px]
                  rounded-[7px]
                  bg-[#e9eef5]
                  flex
                  items-center
                  justify-center
                  text-[#7d8998]
                  text-[18px]
                  shrink-0
                "
              >
                ▥
              </div>

              <div className="flex-1">

                <h2 className="text-[12px] font-bold text-[#293444] mb-[4px]">
                  شركة القدس للاتصالات
                </h2>

                <p className="text-[9px] text-[#697386] mb-[5px]">
                  تدريب في مجال هندسة الاتصالات
                </p>

                <span
                  className="
                    inline-flex
                    px-[9px]
                    py-[3px]
                    rounded-full
                    bg-[#e7f4eb]
                    text-[#4f8060]
                    text-[8px]
                    font-bold
                  "
                >
                  مقبول
                </span>

              </div>

            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-[10px]">

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  المشرف الأكاديمي
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  د. أحمد محمد
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  تاريخ البدء
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/01
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  المشرف في جهة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  م. سارة خليل
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  تاريخ الانتهاء
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/12/01
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  مكان التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  غزة - الرمال
                </p>
              </div>

              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  مدة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  8 أسابيع
                </p>
              </div>

            </div>
          </section>

          {/* ================= NEXT STEPS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[15px]
              mb-[14px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[12px]">
              خطواتك القادمة
            </h2>

            <div>
              {nextSteps.map((step, index) => (
                <div
                  key={step}
                  className={`
                    flex
                    items-center
                    gap-[10px]
                    py-[8px]
                    ${
                      index !== nextSteps.length - 1
                        ? "border-b border-[#edf0f2]"
                        : ""
                    }
                  `}
                >
                  <div
                    className={`
                      w-[20px]
                      h-[20px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[8px]
                      font-bold
                      ${
                        index < 2
                          ? "bg-[#505b70] text-white"
                          : "border border-[#c7ced6] text-[#7f8996] bg-white"
                      }
                    `}
                  >
                    {index < 2 ? "✓" : index + 1}
                  </div>

                  <span className="text-[9px] text-[#4d5867]">
                    {index + 1}. {step}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-start">

            <button
              type="button"
              onClick={() => navigate("/training-profile")}
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
              الانتقال إلى ملف التدريب
              <span className="mr-[6px]">←</span>
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}