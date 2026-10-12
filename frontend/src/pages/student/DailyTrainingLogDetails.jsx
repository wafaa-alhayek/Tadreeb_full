import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function DailyTrainingLogDetails() {
  const navigate = useNavigate();

  const tasks = [
    "متابعة تركيب الشبكات",
    "تجربة استخدام جهاز الفحص",
    "الاطلاع على نظام الدعم الفني",
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
            السجل التدريبي اليومي
            <span className="mx-[5px]">‹</span>
            تفاصيل السجل
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            تفاصيل السجل التدريبي اليومي
          </h1>

          {/* ================= BASIC INFO ================= */}
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
            <div className="grid grid-cols-3 gap-[10px]">
              {/* Date */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  التاريخ
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/05
                </p>
              </div>

              {/* Day */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  اليوم
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  الأحد
                </p>
              </div>

              {/* Duration */}
              <div className="border border-[#e0e3e7] rounded-[6px] px-[12px] py-[10px]">
                <p className="text-[8px] text-[#8b95a2] mb-[5px]">
                  المدة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  6 ساعات
                </p>
              </div>
            </div>
          </section>

          {/* ================= DAY DETAILS ================= */}
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
            <h2 className="text-[12px] font-bold text-[#293444] mb-[9px]">
              تفاصيل اليوم
            </h2>

            <p className="text-[9px] leading-[20px] text-[#5f6a78]">
              تم العمل على متابعة تركيب الشبكات وتعلم آلية فحص الأجهزة الجديدة.
            </p>
          </section>

          {/* ================= COMPLETED TASKS ================= */}
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
            <h2 className="text-[12px] font-bold text-[#293444] mb-[10px]">
              المهام المنجزة
            </h2>

            <div className="space-y-[8px]">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="flex items-center gap-[8px] text-[9px] text-[#5f6a78]"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-[#7d8998] shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-[10px]">
            {/* Edit */}
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
              تعديل السجل
            </button>

            {/* Back */}
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
              رجوع
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}