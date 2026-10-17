import { useState } from "react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Evaluation() {
  const [activeTab, setActiveTab] = useState("course");

  const [ratings, setRatings] = useState({
    content: 4.5,
    trainer: 4,
    practical: 4,
    attendance: 5,
  });

  const [notes, setNotes] = useState("");

  const ratingItems = [
    {
      key: "content",
      label: "محتوى الدورة",
    },
    {
      key: "trainer",
      label: "أسلوب المدرب",
    },
    {
      key: "practical",
      label: "التطبيق العملي",
    },
    {
      key: "attendance",
      label: "الالتزام والحضور",
    },
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
            التقييم
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[20px] font-bold text-[#293444] mb-[14px]">
            التقييم
          </h1>

          {/* ================= TRAINING INFO ================= */}
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
              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  جهة الابتكار
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  شركة الابتكار التقني
                </p>
              </div>

              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  البرنامج التدريبي
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  تطوير البرمجيات
                </p>
              </div>

              <div>
                <p className="text-[8px] text-[#8b95a2] mb-[4px]">
                  الفترة
                </p>

                <p className="text-[10px] font-bold text-[#293444]">
                  2025/10/01 - 2025/12/01
                </p>
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
              onClick={() => setActiveTab("trainer")}
              className={`
                h-[28px]
                px-[16px]
                rounded-[5px]
                text-[9px]
                transition
                ${
                  activeTab === "trainer"
                    ? "bg-[#e7edf5] text-[#293444] font-bold"
                    : "text-[#7a8593]"
                }
              `}
            >
              تقييم المدرب
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("course")}
              className={`
                h-[28px]
                px-[16px]
                rounded-[5px]
                text-[9px]
                transition
                ${
                  activeTab === "course"
                    ? "bg-[#e7edf5] text-[#293444] font-bold"
                    : "text-[#7a8593]"
                }
              `}
            >
              تقييم للدورة
            </button>
          </div>

          {/* ================= COURSE EVALUATION ================= */}
          {activeTab === "course" && (
            <>
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
                  تقييم الطالب للدورة
                </h2>

                <div className="space-y-[12px]">
                  {ratingItems.map((item) => (
                    <div
                      key={item.key}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[#edf0f2]
                        pb-[10px]
                        last:border-b-0
                        last:pb-0
                      "
                    >
                      <span className="text-[9px] text-[#4d5867]">
                        {item.label}
                      </span>

                      <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-[2px] text-[14px] text-[#7d8998]">
                          ★★★★★
                        </div>

                        <span className="text-[9px] font-bold text-[#293444]">
                          {ratings[item.key]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ================= NOTES ================= */}
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
                <label
                  htmlFor="notes"
                  className="block text-[12px] font-bold text-[#293444] mb-[9px]"
                >
                  ملاحظات إضافية
                </label>

                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="اكتب ملاحظاتك هنا..."
                  className="
                    w-full
                    min-h-[85px]
                    resize-none
                    rounded-[6px]
                    border
                    border-[#d9dee5]
                    px-[10px]
                    py-[9px]
                    text-[9px]
                    text-[#4d5867]
                    placeholder:text-[#9aa3ae]
                    outline-none
                    focus:border-[#9ba7b6]
                  "
                />
              </section>
            </>
          )}

          {/* ================= TRAINER EVALUATION ================= */}
          {activeTab === "trainer" && (
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
                تقييم المدرب
              </h2>

              <div className="flex items-center gap-[8px] mb-[16px]">
                <div className="flex items-center gap-[2px] text-[15px] text-[#7d8998]">
                  ★★★★★
                </div>

                <span className="text-[11px] font-bold text-[#293444]">
                  4.0
                </span>
              </div>

              <div>
                <p className="text-[9px] font-bold text-[#4d5867] mb-[6px]">
                  ملاحظات المدرب
                </p>

                <div
                  className="
                    border
                    border-[#e5e8ec]
                    rounded-[6px]
                    bg-[#fafbfc]
                    px-[12px]
                    py-[11px]
                  "
                >
                  <p className="text-[9px] leading-[20px] text-[#66717f]">
                    أظهر الطالب التزامًا جيدًا واهتمامًا بالتعلم، يحتاج إلى
                    المزيد من التدريب العملي.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ================= SAVE BUTTON ================= */}
          <div className="flex justify-start">
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
              حفظ التقييم
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}