import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Approvals() {
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      type: "طلب تدريب",
      student: "أحمد خالد",
      organization: "شركة التقنية",
      opportunity: "مطور برمجيات متدرب",
      status: "بانتظار الموافقة",
      date: "2025/04/20",
    },
    {
      id: 2,
      type: "تمديد فترة التدريب",
      student: "سارة علي",
      organization: "مؤسسة الإبداع",
      opportunity: "محاسب مساعد",
      status: "تمت الموافقة",
      date: "2025/04/18",
    },
    {
      id: 3,
      type: "تغيير جهة التدريب",
      student: "محمد علي",
      organization: "شركة الحلول",
      opportunity: "مهندس شبكات",
      status: "مرفوض",
      date: "2025/04/16",
    },
    {
      id: 4,
      type: "طلب تدريب",
      student: "ليلى حسن",
      organization: "مؤسسة الإبداع",
      opportunity: "مصمم جرافيك",
      status: "بانتظار الموافقة",
      date: "2025/04/14",
    },
    {
      id: 5,
      type: "تمديد فترة التدريب",
      student: "عمر يوسف",
      organization: "شركة المستقبل",
      opportunity: "مساعد موارد بشرية",
      status: "تمت الموافقة",
      date: "2025/04/12",
    },
  ];

  const recentApprovals = [
    {
      date: "2025/04/19",
      type: "طلب تدريب",
      student: "سارة علي",
      organization: "مؤسسة الإبداع",
      result: "تمت الموافقة",
      notes: "لا يوجد ملاحظات",
    },
    {
      date: "2025/04/17",
      type: "تمديد فترة التدريب",
      student: "أحمد محمود",
      organization: "شركة الحلول",
      result: "تمت الموافقة",
      notes: "موافقة على التمديد لمدة شهر",
    },
    {
      date: "2025/04/15",
      type: "تغيير جهة التدريب",
      student: "علي حسين",
      organization: "شركة التقنية",
      result: "مرفوض",
      notes: "الجهة غير معتمدة حالياً",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "تمت الموافقة") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "بانتظار الموافقة") {
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
          <div className="mb-[10px]">
            <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
              <span>الرئيسية</span>
              <span>›</span>
              <span>الموافقات والاعتمادات</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              الموافقات والاعتمادات
            </h1>
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي الطلبات" value="66" icon="▣" />
            <StatCard title="مرفوضة" value="6" icon="×" />
            <StatCard title="تمت الموافقة" value="42" icon="✓" />
            <StatCard title="بانتظار الموافقة" value="18" icon="◷" />
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
            <div className="flex items-center gap-[10px]">
              <div
                className="
                  flex-1
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
                  placeholder="ابحث باسم الطالب، الجهة، الفرصة ..."
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

              <button
                type="button"
                className="
                  h-[38px]
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
                ↓ تصدير البيانات
              </button>
            </div>

            <div className="grid grid-cols-5 gap-[12px] mt-[10px]">
              <Filter label="نوع الطلب">
                <option>الكل</option>
                <option>طلب تدريب</option>
                <option>تمديد فترة التدريب</option>
                <option>تغيير جهة التدريب</option>
              </Filter>

              <Filter label="الحالة">
                <option>الكل</option>
                <option>بانتظار الموافقة</option>
                <option>تمت الموافقة</option>
                <option>مرفوض</option>
              </Filter>

              <Filter label="الجهة">
                <option>كل الجهات</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <Filter label="الأولوية">
                <option>الكل</option>
                <option>عالية</option>
                <option>متوسطة</option>
                <option>منخفضة</option>
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
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
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
            <aside className="w-[290px] shrink-0 grid gap-[10px] content-start">
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
                  تفاصيل الطلب
                </h2>

                <div className="grid gap-[8px]">
                  <DetailRow label="نوع الطلب" value="طلب تدريب" />
                  <DetailRow label="الطالب" value="أحمد خالد" />
                  <DetailRow label="الجهة" value="شركة التقنية" />
                  <DetailRow
                    label="الفرصة"
                    value="مطور برمجيات متدرب"
                  />
                  <DetailRow label="تاريخ الطلب" value="2025/04/20" />

                  <div className="flex items-center justify-between gap-[10px]">
                    <span className="text-[10px] text-[#7a8393]">
                      الحالة الحالية
                    </span>

                    <span
                      className="
                        px-[9px]
                        py-[3px]
                        rounded-full
                        bg-[#fff1cc]
                        text-[#8a6515]
                        text-[9px]
                      "
                    >
                      بانتظار الموافقة
                    </span>
                  </div>

                  <DetailRow
                    label="الموافقة المطلوبة من"
                    value="عميد الكلية"
                  />
                </div>
              </section>

              {/* Approval Stages */}
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
                  مراحل الاعتماد
                </h2>

                <TimelineItem
                  title="تقديم الطلب"
                  subtitle="2025/04/20"
                  status="done"
                />

                <TimelineItem
                  title="مراجعة قسم التدريب"
                  subtitle="2025/04/21"
                  status="done"
                />

                <TimelineItem
                  title="موافقة عميد الكلية"
                  subtitle="بانتظار الموافقة"
                  status="current"
                />

                <TimelineItem
                  title="الاعتماد النهائي"
                  subtitle="لم يبدأ بعد"
                  status="todo"
                  last
                />
              </section>

              {/* Actions */}
              <div className="flex flex-wrap gap-[6px]">
                <SmallButton text="✓ موافقة" />
                <SmallButton text="× رفض" />
                <SmallButton text="✎ إضافة ملاحظة" />
              </div>
            </aside>

            {/* ================= MAIN LIST ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Tabs */}
              <div className="flex flex-wrap gap-[7px]">
                <Chip active text="الكل (66)" />
                <Chip text="بانتظار الموافقة (18)" />
                <Chip text="تمت الموافقة (42)" />
                <Chip text="مرفوضة (6)" />
              </div>

              {/* Requests Table */}
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
                    قائمة الطلبات
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "نوع الطلب",
                          "الطالب",
                          "الجهة",
                          "الفرصة",
                          "الحالة",
                          "تاريخ الطلب",
                          "إجراءات",
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
                      {requests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {request.id}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#2b3340]">
                            {request.type}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {request.student}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {request.organization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {request.opportunity}
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
                                ${getStatusStyle(request.status)}
                              `}
                            >
                              {request.status}
                            </span>
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {request.date}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/admin/approvals/${request.id}`)
                              }
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
                        px-[7px]
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

              {/* Recent Approvals */}
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
                    سجل الموافقات الأخيرة
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "التاريخ",
                          "نوع الطلب",
                          "الطالب",
                          "الجهة",
                          "النتيجة",
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
                      {recentApprovals.map((item, index) => (
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
                            {item.student}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.organization}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                ${getStatusStyle(item.result)}
                              `}
                            >
                              {item.result}
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

      <span className="text-[10px] font-semibold text-[#2b3340] text-left">
        {value}
      </span>
    </div>
  );
}

function TimelineItem({ title, subtitle, status, last = false }) {
  const dotStyle =
    status === "done"
      ? "bg-[#4b5568] text-white"
      : status === "current"
      ? "bg-[#fff1cc] text-[#8a6515] border border-[#e8cc7c]"
      : "bg-[#eceff4] text-[#8a93a3]";

  return (
    <div className="flex gap-[8px]">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-[20px]
            h-[20px]
            rounded-full
            flex
            items-center
            justify-center
            text-[9px]
            ${dotStyle}
          `}
        >
          {status === "done" ? "✓" : status === "current" ? "◷" : "•"}
        </div>

        {!last && (
          <div className="w-px h-[28px] bg-[#dfe3ea]" />
        )}
      </div>

      <div className="pb-[10px]">
        <p className="text-[10px] font-semibold text-[#2b3340]">
          {title}
        </p>

        <p className="text-[9px] text-[#7a8393]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function SmallButton({ text }) {
  return (
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
      {text}
    </button>
  );
}

function Chip({ text, active = false }) {
  return (
    <button
      type="button"
      className={`
        h-[30px]
        px-[12px]
        rounded-full
        border
        text-[10px]
        ${
          active
            ? "bg-[#4b5568] border-[#4b5568] text-white"
            : "bg-white border-[#c9cfd9] text-[#4a5465]"
        }
      `}
    >
      {text}
    </button>
  );
}