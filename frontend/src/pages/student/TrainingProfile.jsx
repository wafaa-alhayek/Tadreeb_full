import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TrainingProfile() {
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
            ملفي التدريبي
            <span className="mx-[5px]">‹</span>
            ملف التدريب
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            ملف التدريب
          </h1>

          {/* ================= TRAINING HEADER ================= */}
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
            <div className="flex items-center gap-[13px]">

              {/* Company Icon */}
              <div
                className="
                  w-[52px]
                  h-[52px]
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

              {/* Info */}
              <div className="flex-1">

                <h2 className="text-[13px] font-bold text-[#293444] mb-[4px]">
                  شركة القدس للاتصالات
                </h2>

                <p className="text-[9px] text-[#687485] mb-[7px]">
                  تدريب في مجال هندسة الاتصالات
                </p>

                <div className="flex items-center gap-[16px] text-[8px] text-[#8b95a2]">
                  <span>⌖ غزة - الرمال</span>
                  <span>▣ 2025/10/01 - 2025/12/01</span>
                  <span>◷ 8 أسابيع</span>
                </div>

              </div>
            </div>
          </section>

          {/* ================= TABS ================= */}
          <div
            className="
              h-[38px]
              border
              border-[#e0e3e7]
              rounded-[7px]
              bg-white
              flex
              items-center
              px-[5px]
              mb-[12px]
            "
          >
            <button
              type="button"
              className="
                h-[28px]
                px-[16px]
                rounded-[5px]
                bg-[#e7edf5]
                text-[#293444]
                text-[9px]
                font-bold
              "
            >
              البيانات الأساسية
            </button>

            <button
              type="button"
              className="
                h-[28px]
                px-[16px]
                text-[#7a8593]
                text-[9px]
                hover:text-[#293444]
              "
            >
              المرفقات
            </button>

            <button
              type="button"
              className="
                h-[28px]
                px-[16px]
                text-[#7a8593]
                text-[9px]
                hover:text-[#293444]
              "
            >
              التقييمات
            </button>

            <button
              type="button"
              className="
                h-[28px]
                px-[16px]
                text-[#7a8593]
                text-[9px]
                hover:text-[#293444]
              "
            >
              الشهادة
            </button>
          </div>

          {/* ================= BASIC DATA ================= */}
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
              البيانات الأساسية
            </h2>

            <div className="grid grid-cols-2 gap-x-[35px] gap-y-[15px]">

              {/* Student */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  اسم الطالب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  أمل أحمد
                </p>
              </div>

              {/* Training Company */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  الجهة التدريبية
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة القدس للاتصالات
                </p>
              </div>

              {/* Academic Supervisor */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  المشرف الأكاديمي
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  د. أحمد محمد
                </p>
              </div>

              {/* Company Supervisor */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  المشرف في جهة التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  م. سارة خليل
                </p>
              </div>

              {/* Specialization */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  التخصص
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  هندسة الاتصالات
                </p>
              </div>

              {/* Location */}
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  مكان التدريب
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  غزة - الرمال
                </p>
              </div>

            </div>

            {/* Description */}
            <div className="mt-[17px] pt-[13px] border-t border-[#edf0f2]">

              <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                وصف التدريب
              </p>

              <p className="text-[9px] leading-[20px] text-[#5f6a78]">
                التدريب على الأنظمة والشبكات والمعدات الحديثة في مجال الاتصالات.
              </p>

            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-[10px]">

            {/* Training Plan */}
            <button
              type="button"
              onClick={() => navigate("/training-plan")}
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
              خطة التدريب
            </button>

            {/* Daily Log */}
            <button
              type="button"
              onClick={() => navigate("/daily-training-log")}
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
              السجل التدريبي اليومي
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}