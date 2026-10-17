import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Evaluations() {
  const navigate = useNavigate();

  const evaluations = [
    {
      id: 1,
      student: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة البرمجيات",
      organization: "شركة التقنية",
      supervisor: "د. محمد علي",
      type: "جهة التدريب",
      result: "90%",
      status: "مكتمل",
    },
    {
      id: 2,
      student: "سارة علي",
      studentId: "20230876",
      specialization: "إدارة الأعمال",
      organization: "مؤسسة الإبداع",
      supervisor: "أ. ليلى حسن",
      type: "المشرف الأكاديمي",
      result: "85%",
      status: "مكتمل",
    },
    {
      id: 3,
      student: "محمد علي",
      studentId: "20231234",
      specialization: "هندسة الشبكات",
      organization: "مستشفى القدس",
      supervisor: "د. خالد يوسف",
      type: "جهة التدريب",
      result: "75%",
      status: "قيد المراجعة",
    },
    {
      id: 4,
      student: "ليلى حسن",
      studentId: "20230987",
      specialization: "التصميم الجرافيكي",
      organization: "مركز الإبداع الرقمي",
      supervisor: "أ. أحمد الشريف",
      type: "المشرف الأكاديمي",
      result: "92%",
      status: "مكتمل",
    },
    {
      id: 5,
      student: "عمر يوسف",
      studentId: "20231109",
      specialization: "التسويق",
      organization: "شركة السلام",
      supervisor: "د. محمد علي",
      type: "جهة التدريب",
      result: "88%",
      status: "مكتمل",
    },
  ];

  const evaluationLog = [
    {
      date: "2025/04/20",
      type: "جهة التدريب",
      evaluator: "م. أحمد علي",
      result: "90%",
      status: "مكتمل",
      notes: "تقييم شامل من جهة التدريب",
    },
    {
      date: "2025/04/15",
      type: "المشرف الأكاديمي",
      evaluator: "أ. ليلى حسن",
      result: "85%",
      status: "مكتمل",
      notes: "ملاحظات إيجابية مع بعض الملاحظات",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد المراجعة") {
      return "bg-[#fff1cc] text-[#8a6515]";
    }

    return "bg-[#fbe1e1] text-[#a22b2b]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>التقييمات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التقييمات
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/evaluations/add")}
              className="
                h-[34px]
                px-[15px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[11px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              + إضافة تقييم جديد
            </button>
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي التقييمات" value="186" icon="☆" />
            <StatCard title="قيد المراجعة" value="28" icon="◷" />
            <StatCard title="مكتملة" value="142" icon="✓" />
            <StatCard title="غير معتمدة" value="16" icon="×" />
          </section>

          {/* ================= SEARCH + FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[10px]
              mb-[10px]
            "
          >
            <div
              className="
                h-[38px]
                border
                border-[#c9cfd9]
                rounded-[8px]
                flex
                items-center
                px-[12px]
                gap-[8px]
              "
            >
              <input
                type="text"
                placeholder="ابحث بالاسم، الرقم الجامعي، الجهة أو المشرف ..."
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">⌕</span>
            </div>

            <div className="grid grid-cols-6 gap-[12px] mt-[10px]">
              <Filter label="التخصص">
                <option>كل التخصصات</option>
                <option>هندسة البرمجيات</option>
                <option>إدارة الأعمال</option>
                <option>هندسة الشبكات</option>
              </Filter>

              <Filter label="نوع التقييم">
                <option>كل الأنواع</option>
                <option>جهة التدريب</option>
                <option>المشرف الأكاديمي</option>
              </Filter>

              <Filter label="جهة التدريب">
                <option>كل الجهات</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>مستشفى القدس</option>
              </Filter>

              <Filter label="المشرف">
                <option>كل المشرفين</option>
                <option>د. محمد علي</option>
                <option>أ. ليلى حسن</option>
                <option>د. خالد يوسف</option>
              </Filter>

              <Filter label="حالة التقييم">
                <option>كل الحالات</option>
                <option>مكتمل</option>
                <option>قيد المراجعة</option>
                <option>غير معتمد</option>
              </Filter>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  الفترة الزمنية
                </label>

                <input
                  type="text"
                  placeholder="من - إلى"
                  className="
                    w-full
                    h-[38px]
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    px-[10px]
                    outline-none
                    text-[11px]
                    text-[#4a5465]
                    placeholder:text-[#8a93a3]
                  "
                />
              </div>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= SIDE DETAILS ================= */}
            <aside className="w-[300px] shrink-0 grid gap-[10px] content-start">
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
                  تفاصيل التقييم
                </h2>

                <div className="flex items-center gap-[10px] mb-[10px]">
                  <div
                    className="
                      w-[46px]
                      h-[46px]
                      rounded-full
                      bg-[#eceff4]
                      flex
                      items-center
                      justify-center
                      text-[#8a93a3]
                    "
                  >
                    ♙
                  </div>

                  <div>
                    <h3 className="text-[13px] font-bold text-[#1f2733]">
                      أحمد خالد
                    </h3>

                    <p className="text-[10px] text-[#667085]">
                      20231045 · هندسة البرمجيات
                    </p>
                  </div>
                </div>

                <div className="grid gap-[8px]">
                  <DetailRow label="جهة التدريب" value="شركة التقنية" />
                  <DetailRow label="المشرف الأكاديمي" value="د. محمد علي" />
                  <DetailRow label="نوع التقييم" value="جهة التدريب" />
                  <DetailRow label="تاريخ التقييم" value="2025/04/20" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#7a8393]">
                      حالة التقييم
                    </span>

                    <span
                      className="
                        inline-flex
                        px-[9px]
                        py-[3px]
                        rounded-full
                        bg-[#dff1e6]
                        text-[#236a45]
                        text-[9px]
                      "
                    >
                      مكتمل
                    </span>
                  </div>
                </div>
              </section>

              {/* Grades */}
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
                  درجات التقييم
                </h2>

                <div className="grid gap-[8px]">
                  <DetailRow label="المهارات الفنية" value="95" />
                  <DetailRow label="الالتزام والانضباط" value="90" />
                  <DetailRow label="التواصل والعمل الجماعي" value="88" />
                  <DetailRow label="الابتكار وحل المشكلات" value="85" />
                </div>

                <div
                  className="
                    mt-[10px]
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[10px]
                    py-[9px]
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span className="text-[10px] font-bold text-[#1f2733]">
                    النتيجة النهائية
                  </span>

                  <span className="text-[15px] font-bold text-[#1f2733]">
                    90%
                  </span>
                </div>
              </section>

              {/* Notes */}
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                  ملاحظات التقييم
                </h2>

                <div
                  className="
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[10px]
                    py-[9px]
                    text-[11px]
                    leading-[1.8]
                    text-[#4a5465]
                  "
                >
                  أداء ممتاز، وأوصي باستمراره في التدريب.
                </div>
              </section>

              <div className="flex gap-[6px]">
                <ActionButton text="✎ تعديل" />
                <ActionButton text="طباعة" />
                <ActionButton text="إرسال للتقييم" />
              </div>
            </aside>

            {/* ================= MAIN COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Evaluations Table */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    قائمة التقييمات
                  </h2>

                  <span className="text-[10px] text-[#667085]">
                    عدد الصفوف: 20
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "الطالب",
                          "الرقم الجامعي",
                          "التخصص",
                          "جهة التدريب",
                          "المشرف",
                          "نوع التقييم",
                          "النتيجة",
                          "الحالة",
                          "الإجراءات",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[8px]
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
                      {evaluations.map((evaluation) => (
                        <tr
                          key={evaluation.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[8px] py-[9px] text-[10px] text-[#667085]">
                            {evaluation.id}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {evaluation.student}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] text-[#4a5465]">
                            {evaluation.studentId}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] text-[#4a5465]">
                            {evaluation.specialization}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] text-[#4a5465]">
                            {evaluation.organization}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] text-[#4a5465]">
                            {evaluation.supervisor}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] text-[#4a5465]">
                            {evaluation.type}
                          </td>

                          <td className="px-[8px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                            {evaluation.result}
                          </td>

                          <td className="px-[8px] py-[9px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                ${getStatusStyle(evaluation.status)}
                              `}
                            >
                              {evaluation.status}
                            </span>
                          </td>

                          <td className="px-[8px] py-[9px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/evaluations/${evaluation.id}`
                                )
                              }
                              className="
                                h-[27px]
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
                              عرض
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
                  {["‹", "1", "2", "3", "4", "5", "›"].map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`
                        min-w-[30px]
                        h-[28px]
                        rounded-[6px]
                        border
                        text-[10px]
                        ${
                          page === "1"
                            ? "bg-[#4b5568] border-[#4b5568] text-white"
                            : "bg-white border-[#c9cfd9] text-[#4a5465]"
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </section>

              {/* Evaluation Log */}
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
                    سجل التقييمات
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "التاريخ",
                          "نوع التقييم",
                          "المقيم",
                          "النتيجة",
                          "الحالة",
                          "ملاحظات",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[9px]
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
                      {evaluationLog.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.date}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.type}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.evaluator}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-bold">
                            {item.result}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                ${getStatusStyle(item.status)}
                              `}
                            >
                              {item.status}
                            </span>
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {item.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[10px]
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p className="text-[10px] text-[#667085] mb-[2px]">
          {title}
        </p>

        <p className="text-[22px] font-bold text-[#1f2733]">
          {value}
        </p>
      </div>

      <div
        className="
          w-[38px]
          h-[38px]
          rounded-[10px]
          bg-[#eceff4]
          flex
          items-center
          justify-center
          text-[#667085]
        "
      >
        {icon}
      </div>
    </div>
  );
}

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
        {label}
      </label>

      <select
        className="
          w-full
          h-[38px]
          rounded-[8px]
          border
          border-[#c9cfd9]
          bg-white
          px-[10px]
          outline-none
          text-[11px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <span className="text-[10px] text-[#7a8393]">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-[#2b3340]">
        {value}
      </span>
    </div>
  );
}

function ActionButton({ text }) {
  return (
    <button
      type="button"
      className="
        flex-1
        min-h-[30px]
        px-[7px]
        rounded-[6px]
        border
        border-[#b9c0cc]
        bg-white
        text-[9px]
        text-[#3b4454]
        hover:bg-[#eef0f4]
      "
    >
      {text}
    </button>
  );
}