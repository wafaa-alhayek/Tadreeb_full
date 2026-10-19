import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseDetails() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between mb-[6px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>

                <span
                  onClick={() => navigate("/admin/courses")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  الدورات التدريبية
                </span>

                <span>›</span>
                <span>تفاصيل الدورة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                مهارات الحاسوب الأساسية
              </h1>
            </div>

            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={() => navigate("/admin/courses/1/edit")}
                className="
                  h-[34px]
                  px-[14px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                تعديل الدورة
              </button>

              <button
                type="button"
                className="
                  h-[34px]
                  px-[15px]
                  rounded-[7px]
                  bg-[#4b5568]
                  text-white
                  text-[10px]
                  font-semibold
                  hover:bg-[#3f4858]
                "
              >
                نشر الدورة / فتح التسجيل
              </button>
            </div>
          </div>

          {/* ================= CODE + STATUS ================= */}
          <div className="flex gap-[8px] items-center mb-[10px]">
            <span className="text-[11px] text-[#667085]">
              رمز الدورة: CRS-001
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
              التسجيل مفتوح
            </span>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard
              title="المسجلون"
              value="18 / 25"
            />

            <StatCard
              title="الساعات التدريبية"
              value="20"
            />

            <StatCard
              title="طلبات قيد المراجعة"
              value="10"
            />

            <StatCard
              title="قائمة الانتظار"
              value="3"
            />
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[4px] border-b border-[#dfe3ea] mb-[12px]">
            <Tab label="المعلومات" active />

            <Tab
              label="طلبات التسجيل"
              onClick={() =>
                navigate("/admin/courses/1/registration-requests")
              }
            />

            <Tab
              label="المتدربون"
              onClick={() =>
                navigate("/admin/courses/1/trainees")
              }
            />

            <Tab
              label="الحضور"
              onClick={() =>
                navigate("/admin/courses/1/attendance")
              }
            />

            <Tab
              label="التقييم"
              onClick={() =>
                navigate("/admin/courses/1/evaluations")
              }
            />

            <Tab
              label="الشهادات"
              onClick={() =>
                navigate("/admin/courses/1/certificates")
              }
            />
          </div>

          {/* ================= COURSE INFO ================= */}
          <div className="grid grid-cols-2 gap-[12px] items-start">
            {/* INFORMATION */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <div className="flex items-center justify-between mb-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  معلومات الدورة
                </h2>

                <button
                  type="button"
                  onClick={() => navigate("/admin/courses/1/edit")}
                  className="
                    h-[28px]
                    px-[10px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[9px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  تعديل معلومات الدورة
                </button>
              </div>

              <div className="grid gap-[8px]">
                <InfoBox
                  label="الوصف"
                  value="دورة تدريبية تهدف إلى تطوير المهارات الأساسية في استخدام الحاسوب."
                />

                <InfoBox
                  label="أهداف الدورة"
                  value="اكتساب مهارات استخدام الحاسوب والتطبيقات المكتبية الأساسية."
                />
              </div>
            </section>

            {/* DATE / TRAINER / MODE */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                الموعد والمدرب والنمط
              </h2>

              <div className="grid grid-cols-2 gap-[8px]">
                <InfoBox
                  label="موعد الدورة"
                  value="15 – 30 نوفمبر 2026"
                />

                <InfoBox
                  label="المدرب"
                  value="أحمد خالد"
                />

                <InfoBox
                  label="نمط التدريب"
                  value="حضوري"
                />

                <InfoBox
                  label="المكان"
                  value="قاعة تدريب (تجريبي)"
                />

                <InfoBox
                  label="الفئة المستهدفة"
                  value="طلبة الجامعة"
                />

                <InfoBox
                  label="السعة القصوى"
                  value="25 متدرباً"
                />
              </div>
            </section>
          </div>

          {/* ================= QUICK NAVIGATION ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[12px]
              mt-[12px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
              الانتقال السريع لأقسام الدورة
            </h2>

            <div className="flex gap-[10px] flex-wrap">
              <QuickButton
                label="فتح إدارة الطلبات"
                onClick={() =>
                  navigate("/admin/courses/1/registration-requests")
                }
              />

              <QuickButton
                label="فتح قائمة المتدربين"
                onClick={() =>
                  navigate("/admin/courses/1/trainees")
                }
              />

              <QuickButton
                label="فتح سجل الحضور"
                onClick={() =>
                  navigate("/admin/courses/1/attendance")
                }
              />

              <QuickButton
                label="فتح التقييم والنتائج"
                onClick={() =>
                  navigate("/admin/courses/1/evaluations")
                }
              />

              <QuickButton
                label="فتح إدارة الشهادات"
                onClick={() =>
                  navigate("/admin/courses/1/certificates")
                }
              />
            </div>

            <p className="text-[9px] text-[#7a8393] mt-[8px]">
              كل تبويب يفتح شاشة الإدارة الخاصة به مع بقاء سياق الدورة ظاهراً في الأعلى.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[10px]
      "
    >
      <p className="text-[10px] text-[#667085] mb-[2px]">
        {title}
      </p>

      <p className="text-[22px] font-bold text-[#1f2733]">
        {value}
      </p>
    </div>
  );
}

function Tab({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-[14px]
        py-[9px]
        text-[10px]
        border-b-2
        transition
        ${
          active
            ? "border-[#4b5568] text-[#1f2733] font-bold"
            : "border-transparent text-[#667085] hover:text-[#3b4454]"
        }
      `}
    >
      {label}
    </button>
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
        px-[10px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p className="text-[10px] font-semibold text-[#2b3340] leading-[1.7]">
        {value}
      </p>
    </div>
  );
}

function QuickButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        h-[30px]
        px-[11px]
        rounded-[6px]
        border
        border-[#b9c0cc]
        bg-white
        text-[9px]
        text-[#3b4454]
        hover:bg-[#eef0f4]
      "
    >
      {label}
    </button>
  );
}