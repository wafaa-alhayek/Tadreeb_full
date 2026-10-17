import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingRequestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const timeline = [
    {
      title: "تم تقديم الطلب",
      date: "2025/04/20",
      status: "done",
    },
    {
      title: "تمت المراجعة من قبل مسؤول التدريب",
      date: "2025/04/21",
      status: "done",
    },
    {
      title: "بانتظار الموافقة",
      date: "2025/04/22",
      status: "current",
    },
    {
      title: "تمت الموافقة",
      date: "",
      status: "todo",
    },
    {
      title: "تم إشعار الطالب",
      date: "",
      status: "todo",
    },
  ];

  const attachments = [
    {
      name: "السيرة الذاتية.pdf",
      date: "2025/04/20",
    },
    {
      name: "خطاب التدريب.pdf",
      date: "2025/04/20",
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
            <h1 className="text-[23px] font-bold text-[#1b2430]">
              تفاصيل طلب التدريب
            </h1>

            <button
              type="button"
              onClick={() => navigate("/admin/training-requests")}
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
              العودة إلى طلبات التدريب ←
            </button>
          </div>

          {/* ================= STUDENT DATA ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[12px]
              mb-[10px]
            "
          >
            <div className="flex items-center justify-between mb-[8px]">
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                بيانات الطالب
              </h2>

              <span
                className="
                  inline-flex
                  px-[10px]
                  py-[3px]
                  rounded-full
                  bg-[#dde7f6]
                  text-[#2c5698]
                  text-[9px]
                  font-medium
                "
              >
                قيد المراجعة
              </span>
            </div>

            <div className="flex items-center gap-[18px]">
              <div
                className="
                  w-[96px]
                  h-[96px]
                  rounded-[8px]
                  bg-[#e6e9ef]
                  flex
                  items-center
                  justify-center
                  text-[#9aa3b2]
                  text-[28px]
                  shrink-0
                "
              >
                ♙
              </div>

              <div className="grid grid-cols-3 gap-[8px] flex-1">
                <InfoBox
                  label="الاسم الكامل"
                  value="أحمد خالد محمد"
                />

                <InfoBox
                  label="الرقم الجامعي"
                  value="20231045"
                />

                <InfoBox
                  label="المستوى الدراسي"
                  value="الرابع"
                />

                <InfoBox
                  label="التخصص"
                  value="هندسة البرمجيات"
                />

                <InfoBox
                  label="البريد الإلكتروني"
                  value="ahmad@example.com"
                />

                <InfoBox
                  label="رقم الهاتف"
                  value="0599123456"
                />
              </div>
            </div>
          </section>

          {/* ================= TRAINING INFO ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[12px]
              mb-[10px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
              معلومات التدريب
            </h2>

            <div className="grid grid-cols-3 gap-[8px]">
              <InfoBox
                label="القسم الأكاديمي"
                value="هندسة الحاسوب"
              />

              <InfoBox
                label="التخصص الدقيق"
                value="برمجة وتطوير البرمجيات"
              />

              <InfoBox
                label="المشرف الأكاديمي"
                value="د. سامر يوسف"
              />

              <InfoBox
                label="جهة التدريب"
                value="شركة التقنية"
              />

              <InfoBox
                label="الفرصة التدريبية"
                value="مطور برمجيات متدرب"
              />

              <InfoBox
                label="المدرب"
                value="م. ليلى أحمد"
              />

              <InfoBox
                label="تاريخ البداية"
                value="2025/06/01"
              />

              <InfoBox
                label="تاريخ النهاية"
                value="2025/08/01"
              />

              <InfoBox
                label="مدة التدريب"
                value="شهرين"
              />
            </div>
          </section>

          {/* ================= MIDDLE ================= */}
          <div className="flex gap-[12px] mb-[10px]">
            {/* Request Log */}
            <section
              className="
                flex-1
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
                سجل الطلب
              </h2>

              <div>
                {timeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-[12px] relative pb-[14px] last:pb-0"
                  >
                    {index !== timeline.length - 1 && (
                      <span
                        className="
                          absolute
                          right-[9px]
                          top-[20px]
                          bottom-0
                          w-[2px]
                          bg-[#d5dae3]
                        "
                      />
                    )}

                    <div
                      className={`
                        w-[20px]
                        h-[20px]
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        shrink-0
                        z-[1]

                        ${
                          item.status === "done"
                            ? "bg-[#4b5568] border-[#4b5568] text-white"
                            : item.status === "current"
                            ? "bg-white border-[#4b5568] shadow-[0_0_0_3px_#e1e6ee]"
                            : "bg-white border-[#b9c0cc]"
                        }
                      `}
                    >
                      {item.status === "done" ? "✓" : ""}
                    </div>

                    <div>
                      <p
                        className={`
                          text-[11px]
                          ${
                            item.status === "todo"
                              ? "text-[#7a8393]"
                              : "text-[#1b2430] font-semibold"
                          }
                        `}
                      >
                        {item.title}
                      </p>

                      {item.date && (
                        <p className="text-[9px] text-[#7a8393] mt-[1px]">
                          {item.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Right Side */}
            <div className="flex-[1.2] grid gap-[10px]">
              {/* Attachments */}
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
                  المرفقات
                </h2>

                {attachments.map((file) => (
                  <div
                    key={file.name}
                    className="
                      border
                      border-[#e1e5ec]
                      rounded-[8px]
                      bg-[#fbfcfd]
                      px-[10px]
                      py-[8px]
                      flex
                      items-center
                      gap-[10px]
                      mb-[6px]
                      last:mb-0
                    "
                  >
                    <span className="text-[20px] text-[#8a93a3]">
                      □
                    </span>

                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-[#2b3340]">
                        {file.name}
                      </p>

                      <p className="text-[9px] text-[#7a8393]">
                        تم الرفع بتاريخ {file.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        h-[27px]
                        px-[10px]
                        rounded-[6px]
                        border
                        border-[#b9c0cc]
                        text-[9px]
                        text-[#3b4454]
                      "
                    >
                      عرض
                    </button>

                    <button
                      type="button"
                      className="
                        h-[27px]
                        px-[10px]
                        rounded-[6px]
                        border
                        border-[#b9c0cc]
                        text-[9px]
                        text-[#3b4454]
                      "
                    >
                      تحميل
                    </button>
                  </div>
                ))}
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
                  ملاحظات وإجراءات سابقة
                </h2>

                <div
                  className="
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[10px]
                    py-[8px]
                    mb-[6px]
                  "
                >
                  <p className="text-[10px] font-semibold text-[#2b3340]">
                    أ. أحمد محمد (مسؤول التدريب)
                  </p>

                  <p className="text-[9px] text-[#7a8393] mb-[3px]">
                    2025/04/20 10:24 ص
                  </p>

                  <p className="text-[10px] text-[#4a5465]">
                    يرجى إرفاق خطاب من جهة التدريب
                  </p>
                </div>

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
                  <p className="text-[10px] font-semibold text-[#2b3340]">
                    د. سامر يوسف (المشرف الأكاديمي)
                  </p>

                  <p className="text-[9px] text-[#7a8393] mb-[3px]">
                    2025/04/21 2:30 م
                  </p>

                  <p className="text-[10px] text-[#4a5465]">
                    تمت المراجعة الأكاديمية، والطلب مستكمل
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-[10px]">
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
              ✓ قبول الطلب
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
              × رفض الطلب
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
        px-[12px]
        py-[7px]
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