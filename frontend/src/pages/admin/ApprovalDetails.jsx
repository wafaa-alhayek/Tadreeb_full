import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function ApprovalDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const previousApprovals = [
    {
      date: "2025/04/21",
      action: "مراجعة الطلب",
      responsible: "مسؤول التدريب",
      notes: "-",
    },
    {
      date: "2025/04/22",
      action: "توزيع الطالب",
      responsible: "مسؤول التدريب",
      notes: "-",
    },
    {
      date: "2025/04/23",
      action: "موافقة جهة التدريب",
      responsible: "شركة التقنية",
      notes: "-",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>

                <span
                  onClick={() => navigate("/admin/approvals")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  الموافقات والاعتمادات
                </span>

                <span>›</span>
                <span>تفاصيل الموافقة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تفاصيل الموافقة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/approvals")}
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
              رجوع ←
            </button>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= MAIN COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Request Data */}
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
                  بيانات الطلب
                </h2>

                <div className="grid grid-cols-3 gap-[8px]">
                  <InfoBox
                    label="اسم الطالب"
                    value="أحمد خالد"
                  />

                  <InfoBox
                    label="الرقم الجامعي"
                    value="20231045"
                  />

                  <InfoBox
                    label="التخصص"
                    value="هندسة البرمجيات"
                  />

                  <InfoBox
                    label="جهة التدريب"
                    value="شركة التقنية"
                  />

                  <InfoBox
                    label="فرصة التدريب"
                    value="مطور برمجيات متدرب"
                  />

                  <StatusBox
                    label="حالة الطلب"
                    text="بانتظار الموافقة"
                    type="waiting"
                  />

                  <InfoBox
                    label="تاريخ التقديم"
                    value="2025/04/20"
                  />

                  <InfoBox
                    label="تاريخ التوزيع"
                    value="2025/04/22"
                  />

                  <InfoBox
                    label="اسم المسؤول عن الموافقة"
                    value="عميد الكلية"
                  />
                </div>
              </section>

              {/* Approval Status */}
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
                  حالة الموافقات
                </h2>

                <div className="grid grid-cols-2 gap-[8px]">
                  <StatusBox
                    label="حالة موافقة جهة التدريب"
                    text="تمت الموافقة"
                    type="approved"
                  />

                  <StatusBox
                    label="حالة موافقة الكلية"
                    text="بانتظار الموافقة"
                    type="waiting"
                  />
                </div>
              </section>

              {/* Approval Notes */}
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
                  ملاحظات الموافقة
                </h2>

                <textarea
                  placeholder="أضف ملاحظاتك هنا ..."
                  className="
                    w-full
                    min-h-[100px]
                    resize-none
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    bg-white
                    px-[12px]
                    py-[10px]
                    outline-none
                    text-[11px]
                    text-[#2b3340]
                    placeholder:text-[#8a93a3]
                    focus:border-[#8a93a3]
                  "
                />
              </section>

              {/* Previous Approvals */}
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
                    سجل الموافقات السابقة
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "التاريخ",
                          "الإجراء",
                          "المسؤول",
                          "الملاحظات",
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
                      {previousApprovals.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                            {item.date}
                          </td>

                          <td className="px-[10px] py-[9px] text-[10px] text-[#2b3340]">
                            {item.action}
                          </td>

                          <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                            {item.responsible}
                          </td>

                          <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                            {item.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* ================= SIDE COLUMN ================= */}
            <aside className="w-[300px] shrink-0">
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
                  مسار الموافقة
                </h2>

                <TimelineItem
                  title="تقديم الطلب"
                  status="done"
                />

                <TimelineItem
                  title="مراجعة الطلب"
                  status="done"
                />

                <TimelineItem
                  title="توزيع الطالب"
                  status="done"
                />

                <TimelineItem
                  title="موافقة جهة التدريب"
                  status="done"
                />

                <TimelineItem
                  title="موافقة الكلية"
                  status="current"
                />

                <TimelineItem
                  title="بدء التدريب"
                  status="todo"
                  last
                />
              </section>
            </aside>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-[10px] mt-[10px]">
            <button
              type="button"
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[11px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              ✓ موافقة
            </button>

            <button
              type="button"
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                border
                border-[#b9c0cc]
                bg-white
                text-[11px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              × رفض
            </button>

            <button
              type="button"
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                border
                border-[#b9c0cc]
                bg-white
                text-[11px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              ✎ طلب تعديل
            </button>

            <button
              type="button"
              className="
                h-[34px]
                px-[16px]
                rounded-[7px]
                border
                border-[#b9c0cc]
                bg-white
                text-[11px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              ✎ إضافة ملاحظة
            </button>
          </div>

          <div className="hidden">{id}</div>
        </main>
      </div>
    </div>
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
        px-[11px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p className="text-[10px] font-semibold text-[#2b3340]">
        {value}
      </p>
    </div>
  );
}

function StatusBox({ label, text, type }) {
  const statusClass =
    type === "approved"
      ? "bg-[#dff1e6] text-[#236a45]"
      : "bg-[#fff1cc] text-[#8a6515]";

  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[11px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[4px]">
        {label}
      </p>

      <span
        className={`
          inline-flex
          px-[9px]
          py-[3px]
          rounded-full
          text-[9px]
          font-medium
          ${statusClass}
        `}
      >
        {text}
      </span>
    </div>
  );
}

function TimelineItem({ title, status, last = false }) {
  const circleStyle =
    status === "done"
      ? "bg-[#4b5568] text-white"
      : status === "current"
      ? "bg-[#fff1cc] text-[#8a6515] border border-[#e8cc7c]"
      : "bg-[#eceff4] text-[#8a93a3]";

  return (
    <div className="flex gap-[9px]">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-[22px]
            h-[22px]
            rounded-full
            flex
            items-center
            justify-center
            text-[9px]
            shrink-0
            ${circleStyle}
          `}
        >
          {status === "done"
            ? "✓"
            : status === "current"
            ? "◷"
            : "•"}
        </div>

        {!last && (
          <div className="w-px h-[34px] bg-[#dfe3ea]" />
        )}
      </div>

      <div className="pt-[2px]">
        <p className="text-[10px] font-semibold text-[#2b3340]">
          {title}
        </p>

        <p className="text-[9px] text-[#7a8393]">
          {status === "done"
            ? "مكتمل"
            : status === "current"
            ? "قيد التنفيذ"
            : "لم يبدأ بعد"}
        </p>
      </div>
    </div>
  );
}