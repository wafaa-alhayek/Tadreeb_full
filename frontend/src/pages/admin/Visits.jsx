import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Visits() {
  const navigate = useNavigate();

  const visits = [
    {
      id: 1,
      student: "أحمد خالد",
      supervisor: "د. محمد علي",
      organization: "مستشفى القدس",
      date: "2025/04/20",
      type: "زيارة ميدانية",
      status: "مكتملة",
    },
    {
      id: 2,
      student: "سارة علي",
      supervisor: "أ. ليلى حسن",
      organization: "شركة الاتصالات",
      date: "2025/04/18",
      type: "متابعة دورية",
      status: "مكتملة",
    },
    {
      id: 3,
      student: "محمد عادل",
      supervisor: "د. محمد شريف",
      organization: "مركز الإبداع الرقمي",
      date: "2025/04/16",
      type: "زيارة ميدانية",
      status: "تحتاج متابعة",
    },
    {
      id: 4,
      student: "فاطمة الزهراء",
      supervisor: "أ. خالد يوسف",
      organization: "جمعية الهلال الأحمر",
      date: "2025/04/14",
      type: "متابعة دورية",
      status: "مكتملة",
    },
    {
      id: 5,
      student: "عمر يوسف",
      supervisor: "د. سمير كمال",
      organization: "مستشفى الأمل",
      date: "2025/04/12",
      type: "زيارة ميدانية",
      status: "مؤجلة",
    },
    {
      id: 6,
      student: "ليلى حسن",
      supervisor: "أ. محمد عبد الله",
      organization: "شركة السلام",
      date: "2025/04/10",
      type: "متابعة دورية",
      status: "مكتملة",
    },
    {
      id: 7,
      student: "خالد محمود",
      supervisor: "د. نادر فارس",
      organization: "المركز الطبي الجامعي",
      date: "2025/04/08",
      type: "زيارة ميدانية",
      status: "تحتاج متابعة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مكتملة") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "تحتاج متابعة") {
      return "bg-[#fff1cc] text-[#8a6515]";
    }

    return "bg-[#eceff4] text-[#596273]";
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
                <span>الزيارات والمتابعة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                الزيارات والمتابعة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/visits/add")}
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
              + إضافة زيارة جديدة
            </button>
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard
              title="زيارات تتطلب متابعة"
              value="28"
              icon="!"
            />

            <StatCard
              title="زيارات مكتملة"
              value="96"
              icon="✓"
            />

            <StatCard
              title="زيارات هذا الأسبوع"
              value="18"
              icon="◷"
            />

            <StatCard
              title="إجمالي الزيارات"
              value="124"
              icon="▣"
            />
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
                placeholder="ابحث عن اسم الطالب أو المشرف أو الجهة ..."
                className="
                  flex-1
                  h-full
                  outline-none
                  bg-transparent
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">⌕</span>
            </div>

            <div className="grid grid-cols-6 gap-[12px] mt-[10px]">
              <Filter label="نوع الزيارة">
                <option>الكل</option>
                <option>زيارة ميدانية</option>
                <option>متابعة دورية</option>
              </Filter>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  التاريخ
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

              <Filter label="الطالب">
                <option>كل الطلبة</option>
                <option>أحمد خالد</option>
                <option>سارة علي</option>
                <option>محمد عادل</option>
              </Filter>

              <Filter label="المشرف">
                <option>كل المشرفين</option>
                <option>د. محمد علي</option>
                <option>أ. ليلى حسن</option>
                <option>د. محمد شريف</option>
              </Filter>

              <Filter label="الجهة التدريبية">
                <option>كل الجهات</option>
                <option>مستشفى القدس</option>
                <option>شركة الاتصالات</option>
                <option>مركز الإبداع الرقمي</option>
              </Filter>

              <Filter label="حالة المتابعة">
                <option>الكل</option>
                <option>مكتملة</option>
                <option>تحتاج متابعة</option>
                <option>مؤجلة</option>
              </Filter>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= VISIT DETAILS ================= */}
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
                  تفاصيل الزيارة
                </h2>

                <div className="grid gap-[8px]">
                  <DetailRow label="الطالب" value="أحمد خالد" />
                  <DetailRow label="الرقم الجامعي" value="20231045" />
                  <DetailRow label="المشرف" value="د. محمد علي" />
                  <DetailRow label="جهة التدريب" value="مستشفى القدس" />
                  <DetailRow label="نوع الزيارة" value="زيارة ميدانية" />
                  <DetailRow label="تاريخ الزيارة" value="2025/04/20" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#7a8393]">
                      الحالة
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
                      مكتملة
                    </span>
                  </div>
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
                  ملاحظات الزيارة
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
                  تم متابعة أداء الطالب في المهام الموكلة إليه وظهر تقدمه
                  جيداً في التعامل مع الأنظمة.
                </div>
              </section>

              {/* Problems */}
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
                  المشاكل والإجراءات المطلوبة
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
                    text-[#4a5465]
                  "
                >
                  لا توجد مشاكل حالياً.
                </div>
              </section>

              {/* Follow-up */}
              <div
                className="
                  border
                  border-[#e1e5ec]
                  rounded-[8px]
                  bg-[#fbfcfd]
                  px-[11px]
                  py-[9px]
                  text-[10px]
                  text-[#4a5465]
                "
              >
                متابعة لاحقة · تاريخ المتابعة القادمة:{" "}
                <strong className="text-[#1f2733]">
                  2025/05/10
                </strong>
              </div>

              {/* Actions */}
              <div className="flex gap-[6px]">
                <ActionButton text="✎ تعديل" />
                <ActionButton text="▣ تقرير الزيارة" />
                <ActionButton text="➤ إرسال تنبيه" />
              </div>
            </aside>

            {/* ================= VISITS TABLE ================= */}
            <div className="flex-1 min-w-0">
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
                    قائمة الزيارات
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
                          "المشرف",
                          "جهة التدريب",
                          "تاريخ الزيارة",
                          "نوع الزيارة",
                          "الحالة",
                          "الإجراءات",
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
                              whitespace-nowrap
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {visits.map((visit) => (
                        <tr
                          key={visit.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {visit.id}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {visit.student}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {visit.supervisor}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {visit.organization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {visit.date}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {visit.type}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                font-medium
                                ${getStatusStyle(visit.status)}
                              `}
                            >
                              {visit.status}
                            </span>
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <button
                              type="button"
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

      <span className="text-[10px] font-semibold text-[#2b3340] text-left">
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