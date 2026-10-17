import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseStates() {
  const navigate = useNavigate();

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
                <span>حالات الواجهة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                حالات الواجهة — قائمة الدورات
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
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
              رجوع إلى القائمة
            </button>
          </div>

          <p className="text-[11px] text-[#667085] mb-[10px]">
            هذه الحالات تُصمَّم لكل شاشة قائمة في النظام: الدورات، الطلبات،
            المتدربون، المدربون، الشهادات والتقارير.
          </p>

          {/* ================= STATES GRID ================= */}
          <div className="grid grid-cols-3 gap-[14px]">
            {/* EMPTY STATE */}
            <StateCard title="Empty State — لا توجد دورات">
              <div className="text-center">
                <div className="text-[34px] text-[#9aa3b2] mb-[6px]">
                  ◫
                </div>

                <h3 className="text-[14px] font-bold text-[#1f2733] mb-[4px]">
                  لا توجد دورات مسجلة بعد
                </h3>

                <p className="text-[11px] text-[#667085] mb-[10px]">
                  ابدأ بإنشاء أول دورة تدريبية
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/admin/courses/add")}
                  className="
                    h-[32px]
                    px-[13px]
                    rounded-[7px]
                    bg-[#4b5568]
                    text-white
                    text-[10px]
                    font-semibold
                    hover:bg-[#3f4858]
                  "
                >
                  + إنشاء أول دورة
                </button>
              </div>
            </StateCard>

            {/* NO RESULTS */}
            <StateCard title="No Results — لا نتائج للبحث">
              <div className="text-center">
                <div className="text-[34px] text-[#9aa3b2] mb-[6px]">
                  ⌕
                </div>

                <h3 className="text-[14px] font-bold text-[#1f2733] mb-[4px]">
                  لا توجد دورات مطابقة
                </h3>

                <p className="text-[11px] text-[#667085] mb-[10px]">
                  جرّب كلمات مختلفة أو امسح الفلاتر
                </p>

                <button
                  type="button"
                  className="
                    h-[32px]
                    px-[13px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            </StateCard>

            {/* LOADING */}
            <StateCard title="Loading — أثناء التحميل">
              <div className="text-center">
                <div className="text-[34px] text-[#9aa3b2] mb-[10px]">
                  ◷
                </div>

                <div className="grid gap-[8px]">
                  <Skeleton width="90%" />
                  <Skeleton width="70%" />
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </div>
              </div>
            </StateCard>

            {/* ERROR */}
            <StateCard title="Error — تعذر تحميل البيانات">
              <div className="text-center">
                <div className="text-[34px] text-[#9aa3b2] mb-[6px]">
                  !
                </div>

                <h3 className="text-[14px] font-bold text-[#1f2733] mb-[4px]">
                  تعذر تحميل البيانات
                </h3>

                <p className="text-[11px] text-[#667085] mb-[10px]">
                  حدثت مشكلة أثناء جلب البيانات
                </p>

                <button
                  type="button"
                  className="
                    h-[32px]
                    px-[13px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  إعادة المحاولة
                </button>
              </div>
            </StateCard>

            {/* ACTIONS MENU */}
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
              <div className="text-[10px] text-[#7a8393] mb-[8px] font-semibold">
                Actions Menu — حسب الحالة والصلاحية
              </div>

              <div className="border border-[#e1e5ec] rounded-[8px] overflow-hidden">
                {[
                  "عرض التفاصيل",
                  "تعديل الدورة",
                  "نشر الدورة / فتح التسجيل",
                  "إلغاء النشر",
                  "إلغاء الدورة",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="
                      w-full
                      text-right
                      px-[14px]
                      py-[8px]
                      text-[11px]
                      text-[#3b4454]
                      border-b
                      border-[#eceff4]
                      last:border-b-0
                      hover:bg-[#f7f8fa]
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {/* PERMISSION STATE */}
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
              <div className="text-[10px] text-[#7a8393] mb-[8px] font-semibold">
                Permission State — صلاحية عرض فقط
              </div>

              <div className="grid gap-[8px]">
                <button
                  type="button"
                  disabled
                  className="
                    h-[34px]
                    px-[14px]
                    rounded-[7px]
                    bg-[#aeb4bf]
                    text-white
                    text-[10px]
                    cursor-not-allowed
                    opacity-60
                  "
                >
                  + إنشاء دورة جديدة
                </button>

                <button
                  type="button"
                  disabled
                  className="
                    h-[34px]
                    px-[14px]
                    rounded-[7px]
                    border
                    border-[#d3d7de]
                    bg-[#f5f6f8]
                    text-[10px]
                    text-[#9aa3b2]
                    cursor-not-allowed
                  "
                >
                  تعديل
                </button>

                <div
                  className="
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[11px]
                    py-[9px]
                    text-[10px]
                    text-[#667085]
                  "
                >
                  🔒 لا تملك صلاحية التعديل. تظهر الأزرار الإجرائية معطلة.
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StateCard({ title, children }) {
  return (
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
      <div className="text-[10px] text-[#7a8393] text-right mb-[6px] font-semibold">
        {title}
      </div>

      {children}
    </section>
  );
}

function Skeleton({ width }) {
  return (
    <div
      className="
        h-[14px]
        bg-[#e6e9ef]
        rounded-full
        mx-auto
      "
      style={{ width }}
    />
  );
}