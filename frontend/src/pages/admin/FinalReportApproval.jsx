import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function FinalReportApproval() {
  const navigate = useNavigate();

  const actions = [
    {
      date: "2025/08/30 10:45 ص",
      user: "أحمد محمد",
      action: "رفع التقرير النهائي",
      description: "تم رفع التقرير النهائي من قبل الطالب",
    },
    {
      date: "2025/08/28 02:15 م",
      user: "سارة علي",
      action: "اعتماد التقييم",
      description: "تم اعتماد تقييم جهة التدريب والمشرف",
    },
    {
      date: "2025/08/25 11:30 ص",
      user: "أحمد محمد",
      action: "تحديث بيانات التدريب",
      description: "تعديل فترة التدريب",
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
                <span>التقرير النهائي</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                التقرير النهائي واعتماد الإتمام
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/certificates")}
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

          {/* ================= STUDENT DATA ================= */}
          <Section title="بيانات الطالب">
            <div className="flex gap-[18px] items-center">
              <div
                className="
                  w-[92px]
                  h-[92px]
                  rounded-[10px]
                  bg-[#eceff4]
                  flex
                  items-center
                  justify-center
                  text-[30px]
                  text-[#8a93a3]
                  shrink-0
                "
              >
                ♙
              </div>

              <div className="grid grid-cols-4 gap-[8px] flex-1">
                <InfoBox label="اسم الطالب" value="أحمد خالد" />
                <InfoBox label="الرقم الجامعي" value="20231045" />
                <InfoBox label="التخصص" value="هندسة برمجيات" />
                <InfoBox label="الكلية / القسم" value="كلية الهندسة" />

                <InfoBox label="جهة التدريب" value="شركة التقنية" />
                <InfoBox label="فرصة التدريب" value="مطور برمجيات" />
                <InfoBox label="المشرف الأكاديمي" value="د. أحمد محمد" />
                <InfoBox
                  label="فترة التدريب"
                  value="2025/06/01 - 2025/08/30"
                />
              </div>
            </div>
          </Section>

          {/* ================= STATUS + RESULT + REPORT ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px] items-stretch">
            {/* Completion Status */}
            <Card title="حالة الإتمام">
              <CompletionItem text="التدريب مكتمل" />
              <CompletionItem text="التقييم مكتمل" />
              <CompletionItem text="التقرير النهائي مرفوع" />
              <CompletionItem text="تقييم جهة التدريب مكتمل" />
              <CompletionItem text="تقييم المشرف مكتمل" />
            </Card>

            {/* Result Summary */}
            <Card title="ملخص النتيجة">
              <div className="grid gap-[8px]">
                <DetailRow
                  label="تقييم جهة التدريب"
                  value="4.5 / 5"
                />

                <DetailRow
                  label="تقييم المشرف الأكاديمي"
                  value="4.2 / 5"
                />

                <DetailRow
                  label="الدرجة النهائية"
                  value="87%"
                />

                <div className="flex items-center justify-between gap-[10px]">
                  <span className="text-[10px] text-[#7a8393]">
                    التقدير
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
                    ممتاز
                  </span>
                </div>
              </div>
            </Card>

            {/* Final Report */}
            <Card title="التقرير النهائي">
              <div className="flex gap-[12px] items-center">
                <div
                  className="
                    w-[60px]
                    h-[76px]
                    rounded-[7px]
                    bg-[#eceff4]
                    flex
                    items-center
                    justify-center
                    text-[22px]
                    text-[#8a93a3]
                    shrink-0
                  "
                >
                  ▤
                </div>

                <div className="flex-1 grid gap-[7px]">
                  <DetailRow
                    label="اسم التقرير"
                    value="التقرير النهائي للتدريب"
                  />

                  <DetailRow
                    label="الملف المرفق"
                    value="التقرير النهائي.pdf"
                  />

                  <DetailRow
                    label="تاريخ الرفع"
                    value="2025/08/30 10:45 ص"
                  />

                  <div className="flex items-center justify-between gap-[10px]">
                    <span className="text-[10px] text-[#7a8393]">
                      الحالة
                    </span>

                    <span
                      className="
                        inline-flex
                        px-[9px]
                        py-[3px]
                        rounded-full
                        bg-[#e2eaf5]
                        text-[#375d8b]
                        text-[9px]
                      "
                    >
                      مرفوع
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-[8px] mt-[10px]">
                <ActionButton text="عرض التقرير" />
                <ActionButton text="تحميل" />
              </div>
            </Card>
          </div>

          {/* ================= ACTION LOG + APPROVAL ================= */}
          <div className="flex gap-[12px] items-stretch">
            {/* Actions Log */}
            <section
              className="
                flex-1
                min-w-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                overflow-hidden
              "
            >
              <div className="px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  سجل الإجراءات
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "التاريخ والوقت",
                        "المستخدم",
                        "الإجراء",
                        "الوصف",
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
                            whitespace-nowrap
                          "
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {actions.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[10px] py-[9px] text-[10px] text-[#667085] whitespace-nowrap">
                          {item.date}
                        </td>

                        <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                          {item.user}
                        </td>

                        <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                          {item.action}
                        </td>

                        <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Training Status */}
            <aside
              className="
                w-[300px]
                shrink-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[16px]
                py-[16px]
              "
            >
              <div className="text-center">
                <div
                  className="
                    w-[44px]
                    h-[44px]
                    rounded-full
                    bg-[#eceff4]
                    flex
                    items-center
                    justify-center
                    mx-auto
                    text-[22px]
                    text-[#667085]
                    mb-[5px]
                  "
                >
                  ✓
                </div>

                <h3 className="text-[15px] font-bold text-[#1f2733] mb-[6px]">
                  حالة التدريب
                </h3>

                <span
                  className="
                    inline-flex
                    px-[11px]
                    py-[4px]
                    rounded-full
                    bg-[#fff1cc]
                    text-[#8a6515]
                    text-[9px]
                    font-semibold
                  "
                >
                  بانتظار اعتماد الإتمام
                </span>

                <p className="text-[10px] leading-[1.7] text-[#667085] my-[10px]">
                  بعد اعتماد الإتمام سيتم إغلاق ملف الطالب
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/admin/certificates/issue")}
                  className="
                    w-full
                    h-[34px]
                    rounded-[7px]
                    bg-[#4b5568]
                    text-white
                    text-[11px]
                    font-semibold
                    hover:bg-[#3f4858]
                  "
                >
                  ✓ اعتماد الإتمام
                </button>
              </div>
            </aside>
          </div>

          {/* ================= CANCEL ================= */}
          <div className="mt-[10px]">
            <button
              type="button"
              onClick={() => navigate("/admin/certificates")}
              className="
                h-[32px]
                px-[14px]
                rounded-[6px]
                border
                border-[#b9c0cc]
                bg-white
                text-[10px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              إلغاء
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[16px]
        py-[13px]
        mb-[10px]
      "
    >
      <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Card({ title, children }) {
  return (
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
        {title}
      </h2>

      {children}
    </section>
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

      <p className="text-[10px] font-semibold text-[#2b3340]">
        {value}
      </p>
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

function CompletionItem({ text }) {
  return (
    <div className="flex items-center gap-[8px] py-[7px] border-b border-[#eceff4] last:border-b-0">
      <span
        className="
          w-[18px]
          h-[18px]
          rounded-full
          bg-[#dff1e6]
          text-[#236a45]
          flex
          items-center
          justify-center
          text-[9px]
          shrink-0
        "
      >
        ✓
      </span>

      <span className="text-[10px] text-[#3b4454]">
        {text}
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
        h-[30px]
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