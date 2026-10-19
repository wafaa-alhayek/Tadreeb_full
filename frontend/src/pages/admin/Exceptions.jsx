import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Exceptions() {
  const navigate = useNavigate();

  const [exceptionType, setExceptionType] = useState("تغيير جهة التدريب");
  const [description, setDescription] = useState("");
  const [proposedAction, setProposedAction] = useState("");
  const [notes, setNotes] = useState("");
  const [alternativeOrg, setAlternativeOrg] = useState("");
  const [extensionDate, setExtensionDate] = useState("");
  const [otherAction, setOtherAction] = useState("");

  const exceptionTypes = [
    "تغيير جهة التدريب",
    "رفض جهة التدريب للطالب",
    "انقطاع التدريب",
    "تمديد فترة التدريب",
    "مشكلة أثناء التدريب",
    "استبدال الطالب",
    "تعديل بيانات التدريب",
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
                <span>الحالات الاستثنائية</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                الحالات الاستثنائية
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
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
            <div className="flex gap-[16px] items-center">
              <div className="grid grid-cols-3 gap-[8px] flex-1">
                <InfoBox label="اسم الطالب" value="أحمد خالد" />
                <InfoBox label="الرقم الجامعي" value="20231045" />
                <InfoBox label="التخصص" value="هندسة برمجيات" />

                <InfoBox label="جهة التدريب" value="شركة التقنية" />
                <InfoBox label="فرصة التدريب" value="مطور برمجيات" />
                <InfoBox label="المشرف الأكاديمي" value="د. أحمد محمد" />
              </div>

              <div
                className="
                  min-w-[145px]
                  border
                  border-[#e1e5ec]
                  rounded-[8px]
                  bg-[#fbfcfd]
                  px-[12px]
                  py-[9px]
                "
              >
                <p className="text-[9px] text-[#7a8393] mb-[4px]">
                  حالة التدريب
                </p>

                <span
                  className="
                    inline-flex
                    px-[10px]
                    py-[3px]
                    rounded-full
                    bg-[#e2eaf5]
                    text-[#375d8b]
                    text-[9px]
                    font-semibold
                  "
                >
                  مستمر
                </span>
              </div>
            </div>
          </Section>

          {/* ================= EXCEPTION TYPE + DETAILS ================= */}
          <div className="flex gap-[12px] mb-[10px] items-stretch">
            {/* Exception Type */}
            <section
              className="
                w-[300px]
                shrink-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                نوع الحالة الاستثنائية
              </h2>

              <select
                value={exceptionType}
                onChange={(e) => setExceptionType(e.target.value)}
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
                <option value="">اختر نوع الحالة</option>

                {exceptionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <div className="grid gap-[7px] mt-[10px]">
                {exceptionTypes.map((type) => (
                  <label
                    key={type}
                    className="
                      flex
                      items-center
                      gap-[8px]
                      text-[11px]
                      text-[#3b4454]
                      cursor-pointer
                    "
                  >
                    <input
                      type="radio"
                      name="exceptionType"
                      value={type}
                      checked={exceptionType === type}
                      onChange={(e) => setExceptionType(e.target.value)}
                      className="accent-[#4b5568]"
                    />

                    {type}
                  </label>
                ))}
              </div>
            </section>

            {/* Details + Attachments */}
            <div className="flex-1 grid gap-[10px] content-start">
              <Card title="تفاصيل الحالة">
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  وصف الحالة / سبب الطلب
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب تفاصيل الحالة هنا ..."
                  className="
                    w-full
                    min-h-[110px]
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
                  "
                />
              </Card>

              <Card title="المرفقات">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "اسم الملف",
                          "نوع الملف",
                          "تاريخ الرفع",
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
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                          خطاب الجهة.pdf
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                          PDF
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                          2025/08/30
                        </td>

                        <td className="px-[9px] py-[9px]">
                          <div className="flex gap-[6px]">
                            <SmallButton text="عرض" />
                            <SmallButton text="حذف" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  className="
                    mt-[8px]
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
                  + إضافة مرفق
                </button>
              </Card>
            </div>
          </div>

          {/* ================= ACTION AREA ================= */}
          <div className="grid grid-cols-3 gap-[12px] items-stretch">
            {/* Requested Action */}
            <Card title="الإجراء المطلوب">
              <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                الإجراء المقترح
              </label>

              <select
                value={proposedAction}
                onChange={(e) => setProposedAction(e.target.value)}
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
                <option value="">اختر الإجراء المناسب</option>
                <option value="موافقة">موافقة</option>
                <option value="إحالة للمراجعة">إحالة للمراجعة</option>
                <option value="طلب مستندات إضافية">
                  طلب مستندات إضافية
                </option>
                <option value="رفض">رفض</option>
              </select>

              <div className="mt-[8px]">
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  ملاحظات إضافية
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أضف أي ملاحظات إضافية ..."
                  className="
                    w-full
                    min-h-[90px]
                    resize-none
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    bg-white
                    px-[12px]
                    py-[9px]
                    outline-none
                    text-[11px]
                    text-[#2b3340]
                    placeholder:text-[#8a93a3]
                  "
                />
              </div>
            </Card>

            {/* Special Action */}
            <Card title="إجراء خاص حسب نوع الحالة">
              <div className="grid gap-[8px]">
                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    الجهة البديلة (في حالة تغيير الجهة)
                  </label>

                  <select
                    value={alternativeOrg}
                    onChange={(e) => setAlternativeOrg(e.target.value)}
                    className="
                      w-full
                      h-[36px]
                      rounded-[7px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[10px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  >
                    <option value="">اختر جهة التدريب</option>
                    <option value="شركة التقنية">شركة التقنية</option>
                    <option value="مؤسسة الإبداع">مؤسسة الإبداع</option>
                    <option value="شركة الاتصالات">شركة الاتصالات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    تاريخ التمديد (في حالة التمديد)
                  </label>

                  <input
                    type="text"
                    value={extensionDate}
                    onChange={(e) => setExtensionDate(e.target.value)}
                    placeholder="من / إلى"
                    className="
                      w-full
                      h-[36px]
                      rounded-[7px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[10px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                      placeholder:text-[#8a93a3]
                    "
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    الإجراء المقترح (في حالات أخرى)
                  </label>

                  <select
                    value={otherAction}
                    onChange={(e) => setOtherAction(e.target.value)}
                    className="
                      w-full
                      h-[36px]
                      rounded-[7px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[10px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  >
                    <option value="">اختر الإجراء</option>
                    <option value="تحديث بيانات التدريب">
                      تحديث بيانات التدريب
                    </option>
                    <option value="تمديد فترة التدريب">
                      تمديد فترة التدريب
                    </option>
                    <option value="تغيير جهة التدريب">
                      تغيير جهة التدريب
                    </option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Request Status */}
            <Card title="سجل حالة الطلب">
              <TimelineItem
                title="تقديم الحالة"
                subtitle="أحمد خالد"
                status="done"
              />

              <TimelineItem
                title="مراجعة مسؤول التدريب"
                subtitle="قيد المراجعة"
                status="current"
              />

              <TimelineItem
                title="اعتماد / رفض"
                subtitle=""
                status="todo"
                last
              />
            </Card>
          </div>

          {/* ================= FOOTER ACTIONS ================= */}
          <div className="flex justify-between items-center mt-[10px]">
            <div className="flex items-center gap-[6px] text-[11px] text-[#3b4454]">
              <span>الحالة الحالية:</span>

              <span
                className="
                  inline-flex
                  px-[10px]
                  py-[3px]
                  rounded-full
                  bg-[#e2eaf5]
                  text-[#375d8b]
                  text-[9px]
                  font-semibold
                "
              >
                قيد المراجعة
              </span>
            </div>

            <div className="flex gap-[10px]">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
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
                إرسال للمراجعة
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
                حفظ كمسودة
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
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
                إلغاء
              </button>
            </div>
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

function SmallButton({ text }) {
  return (
    <button
      type="button"
      className="
        h-[27px]
        px-[9px]
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

function TimelineItem({
  title,
  subtitle,
  status,
  last = false,
}) {
  const statusClass =
    status === "done"
      ? "bg-[#dff1e6] text-[#236a45]"
      : status === "current"
      ? "bg-[#e2eaf5] text-[#375d8b]"
      : "bg-[#eceff4] text-[#8a93a3]";

  return (
    <div className="flex gap-[10px]">
      <div className="flex flex-col items-center">
        <span
          className={`
            w-[20px]
            h-[20px]
            rounded-full
            flex
            items-center
            justify-center
            text-[9px]
            shrink-0
            ${statusClass}
          `}
        >
          {status === "done" ? "✓" : status === "current" ? "•" : ""}
        </span>

        {!last && (
          <div className="w-px flex-1 min-h-[32px] bg-[#dfe3ea]" />
        )}
      </div>

      <div className={last ? "" : "pb-[12px]"}>
        <p className="text-[10px] font-semibold text-[#2b3340]">
          {title}
        </p>

        {subtitle && (
          <p className="text-[9px] text-[#7a8393] mt-[2px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}