import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseEvaluations() {
  const navigate = useNavigate();

  const evaluationItems = [
    {
      item: "وضوح محتوى الدورة",
      average: "4.4",
      progress: 88,
    },
    {
      item: "تنظيم الجلسات",
      average: "4.1",
      progress: 82,
    },
    {
      item: "أداء المدرب",
      average: "4.6",
      progress: 92,
    },
    {
      item: "الاستفادة من التدريب",
      average: "4.2",
      progress: 84,
    },
  ];

  const latestEvaluations = [
    {
      trainee: "أحمد محمد",
      trainerPerformance: "ممتاز",
      benefit: "جيد جداً",
      notes: "—",
    },
    {
      trainee: "سارة خالد",
      trainerPerformance: "جيد جداً",
      benefit: "جيد جداً",
      notes: "—",
    },
    {
      trainee: "نور حسن",
      trainerPerformance: "ممتاز",
      benefit: "ممتاز",
      notes: "دورة مفيدة",
    },
    {
      trainee: "ريم أحمد",
      trainerPerformance: "جيد",
      benefit: "جيد",
      notes: "—",
    },
  ];

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
                <span>التقييم والنتائج</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التقييم والنتائج
              </h1>
            </div>

            <div
              className="
                border
                border-[#dfe3ea]
                rounded-[8px]
                bg-[#fbfcfd]
                px-[12px]
                py-[7px]
              "
            >
              <p className="text-[9px] text-[#7a8393]">
                الدورة الحالية
              </p>

              <p className="text-[10px] font-semibold text-[#2b3340]">
                مهارات الحاسوب الأساسية
              </p>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <StatCard title="التقييمات المستلمة" value="16" />
            <StatCard title="النتائج المدخلة" value="12 / 18" />
            <StatCard title="متوسط تقييم الدورة" value="4.3 / 5" />
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[4px] border-b border-[#dfe3ea] mb-[12px]">
            <Tab
              label="تقييم الدورة والمدرب"
              active
            />

            <Tab
              label="نتائج المتدربين"
              onClick={() =>
                navigate("/admin/courses/1/evaluations/results")
              }
            />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex gap-[14px] items-start">
            {/* ================= COURSE AVERAGE ================= */}
            <section
              className="
                flex-1
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                overflow-hidden
              "
            >
              <div className="px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  متوسط تقييم الدورة
                </h2>
              </div>

              <div className="px-[14px] pb-[12px]">
                <div className="flex gap-[14px] items-center mb-[10px]">
                  <strong className="text-[30px] text-[#1f2733]">
                    4.3 / 5
                  </strong>

                  <div className="flex gap-[2px] text-[18px] text-[#6d7686]">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span className="text-[#d8dde5]">
                      ★
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#eceff4] rounded-[8px]">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "عنصر التقييم",
                          "المتوسط",
                          "التوزيع",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[10px]
                              py-[8px]
                              text-[10px]
                              font-semibold
                              text-[#3b4454]
                              border-b
                              border-[#dfe3ea]
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {evaluationItems.map((item) => (
                        <tr
                          key={item.item}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {item.item}
                          </td>

                          <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                            {item.average}
                          </td>

                          <td className="px-[10px] py-[9px] min-w-[160px]">
                            <div className="flex items-center gap-[8px]">
                              <div className="flex-1 h-[7px] bg-[#e8ebf0] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#687386]"
                                  style={{
                                    width: `${item.progress}%`,
                                  }}
                                />
                              </div>

                              <span className="text-[9px] text-[#667085]">
                                {item.progress}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[9px] text-[#7a8393] mt-[7px] leading-[1.7]">
                  عناصر مقترحة لتوضيح شكل التقييم. لا يُفترض مقياس رقمي دون اعتماد الجامعة.
                </p>
              </div>
            </section>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex-1 grid gap-[10px]">
              {/* RECENT EVALUATIONS */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="px-[14px] py-[10px]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    تقييمات المتدربين الأخيرة
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "المتدرب",
                          "أداء المدرب",
                          "الاستفادة",
                          "ملاحظات",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[9px]
                              py-[8px]
                              text-[9px]
                              font-semibold
                              text-[#3b4454]
                              border-b
                              border-[#dfe3ea]
                              whitespace-nowrap
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {latestEvaluations.map((item) => (
                        <tr
                          key={item.trainee}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[9px] font-semibold text-[#2b3340]">
                            {item.trainee}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#4a5465]">
                            {item.trainerPerformance}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#4a5465]">
                            {item.benefit}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#667085]">
                            {item.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* INCOMPLETE EVALUATIONS */}
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[9px]">
                  تقييمات غير مكتملة
                </h2>

                <div
                  className="
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[11px]
                    py-[9px]
                    flex
                    justify-between
                    items-center
                    gap-[10px]
                  "
                >
                  <span className="text-[10px] text-[#4a5465]">
                    2 متدربين لم يكملوا التقييم
                  </span>

                  <button
                    type="button"
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
                    تذكير
                  </button>
                </div>
              </section>
            </div>
          </div>
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

      <p className="text-[21px] font-bold text-[#1f2733]">
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