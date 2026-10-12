import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TrainingDetails() {
  const navigate = useNavigate();

  const skills = [
    "التواصل",
    "العمل الجماعي",
    "التفكير التحليلي",
    "إجادة استخدام الحاسوب",
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
          <div className="text-[8px] text-[#9aa3ae] mb-[12px]">
            الرئيسية
            <span className="mx-[5px]">‹</span>
            فرص التدريب
            <span className="mx-[5px]">‹</span>
            شركة التقنية الحديثة
          </div>

          {/* ================= TRAINING HEADER CARD ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[12px]
            "
          >
            <div className="flex items-center gap-[14px]">

              {/* Company Icon */}
              <div
                className="
                  w-[62px]
                  h-[62px]
                  shrink-0
                  rounded-[6px]
                  bg-[#e9eef5]
                  flex
                  items-center
                  justify-center
                  text-[#8b97a8]
                  text-[23px]
                "
              >
                ▥
              </div>

              {/* Training Info */}
              <div className="flex-1">
                <h1 className="text-[17px] font-bold text-[#293444] mb-[7px]">
                  تدريب في شركة التقنية الحديثة
                </h1>

                {/* Tags */}
                <div className="flex items-center gap-[5px] mb-[8px]">
                  <span
                    className="
                      px-[9px]
                      py-[3px]
                      rounded-full
                      bg-[#eef1f5]
                      text-[#697386]
                      text-[8px]
                    "
                  >
                    تقنية المعلومات
                  </span>

                  <span
                    className="
                      px-[9px]
                      py-[3px]
                      rounded-full
                      bg-[#eef1f5]
                      text-[#697386]
                      text-[8px]
                    "
                  >
                    حضوري
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-[15px] text-[8px] text-[#8a94a3]">
                  <span>⌖ غزة - الرمال</span>

                  <span>◷ 120 ساعة</span>

                  <span>▣ 2025/10/15</span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ABOUT CARD ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[12px]
            "
          >
            {/* About */}
            <div className="mb-[15px]">
              <h2 className="text-[12px] font-bold text-[#293444] mb-[9px]">
                نبذة عن الجهة
              </h2>

              <p className="text-[9px] leading-[20px] text-[#657181]">
                شركة التقنية الحديثة شركة رائدة في مجال تطوير البرمجيات والحلول
                التقنية، وتقدم فرص تدريبية للطلبة لبناء مهاراتهم العملية
                واكتساب الخبرة في بيئة عمل احترافية.
              </p>
            </div>

            {/* Information Boxes */}
            <div className="grid grid-cols-3 gap-[9px]">

              {/* Seats */}
              <div
                className="
                  min-h-[55px]
                  border
                  border-[#e0e3e7]
                  rounded-[6px]
                  px-[12px]
                  py-[9px]
                "
              >
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  عدد المقاعد
                </p>

                <p className="text-[11px] font-bold text-[#293444]">
                  5
                </p>
              </div>

              {/* Specialization */}
              <div
                className="
                  min-h-[55px]
                  border
                  border-[#e0e3e7]
                  rounded-[6px]
                  px-[12px]
                  py-[9px]
                "
              >
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  التخصصات المطلوبة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  تقنية المعلومات
                </p>
              </div>

              {/* Qualification */}
              <div
                className="
                  min-h-[55px]
                  border
                  border-[#e0e3e7]
                  rounded-[6px]
                  px-[12px]
                  py-[9px]
                "
              >
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  المؤهل المطلوب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  طالب في الكلية
                </p>
              </div>

            </div>
          </section>

          {/* ================= SKILLS ================= */}
          <section
            className="
              border
              border-[#e0e3e7]
              rounded-[8px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[15px]
            "
          >
            <h2 className="text-[12px] font-bold text-[#293444] mb-[10px]">
              المهارات المطلوبة
            </h2>

            <div className="flex items-center gap-[7px] flex-wrap">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-[11px]
                    py-[4px]
                    border
                    border-[#d9dee5]
                    rounded-full
                    bg-white
                    text-[#687485]
                    text-[8px]
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center justify-between">

            {/* Apply */}
            <button
              type="button"
              onClick={() => navigate("/apply-training")}
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
              التقديم على التدريب
              <span className="mr-[6px]">←</span>
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/opportunities")}
              className="
                text-[9px]
                text-[#566273]
                underline
                underline-offset-2
                hover:text-[#293444]
                transition
              "
            >
              العودة إلى القائمة
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}