import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseCertificatePreview() {
  const navigate = useNavigate();
  const { certificateId } = useParams();

  const backToCertificates = () => {
    navigate("/admin/course-certificates");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px] relative">
          {/* ================= PAGE BACKGROUND ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>الشهادات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة الشهادات
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

          {/* ================= BACKGROUND STATS ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <StatCard title="الشهادات الصادرة" value="12" />
            <StatCard title="بانتظار الإصدار" value="6" />
            <StatCard title="غير مكتملة الشروط" value="25" />
          </div>

          {/* ================= BACKGROUND TABLE ================= */}
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
                قائمة الشهادات
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "المتدرب",
                      "الدورة",
                      "رقم الشهادة",
                      "تاريخ الإصدار",
                      "الحالة",
                      "الإجراءات",
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
                  <tr>
                    <td className="px-[10px] py-[9px] text-[10px] font-bold text-[#2b3340]">
                      محمد علي
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      مهارات الحاسوب الأساسية
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      —
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      —
                    </td>

                    <td className="px-[10px] py-[9px]">
                      <span
                        className="
                          inline-flex
                          px-[9px]
                          py-[3px]
                          rounded-full
                          bg-[#fff1cc]
                          text-[#8a6515]
                          text-[9px]
                        "
                      >
                        بانتظار الإصدار
                      </span>
                    </td>

                    <td className="px-[10px] py-[9px] text-[9px]">
                      مراجعة الإصدار
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= OVERLAY ================= */}
          <div className="fixed inset-0 bg-black/30 z-[40]" />

          {/* ================= MODAL ================= */}
          <div
            className="
              fixed
              inset-0
              z-[50]
              flex
              items-center
              justify-center
              px-[20px]
            "
          >
            <div
              className="
                w-[760px]
                max-w-full
                bg-white
                rounded-[12px]
                border
                border-[#dfe3ea]
                shadow-2xl
                overflow-hidden
              "
            >
              {/* MODAL HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-[18px]
                  py-[13px]
                  border-b
                  border-[#e4e7ec]
                "
              >
                <h2 className="text-[16px] font-bold text-[#1f2733]">
                  مراجعة إصدار شهادة
                </h2>

                <button
                  type="button"
                  onClick={backToCertificates}
                  className="
                    w-[28px]
                    h-[28px]
                    rounded-[6px]
                    border
                    border-[#d5d9e0]
                    text-[#667085]
                    hover:bg-[#f3f5f8]
                  "
                >
                  ×
                </button>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="px-[18px] py-[16px]">
                <div className="flex gap-[18px]">
                  {/* ================= CERTIFICATE PREVIEW ================= */}
                  <div className="flex-[1.2]">
                    <div className="border-2 border-[#4b5568] p-[6px]">
                      <div
                        className="
                          border
                          border-[#b9c0cc]
                          px-[20px]
                          py-[16px]
                          text-center
                        "
                      >
                        <div
                          className="
                            w-[44px]
                            h-[44px]
                            mx-auto
                            rounded-full
                            bg-[#eef0f4]
                            flex
                            items-center
                            justify-center
                            text-[#667085]
                            mb-[4px]
                          "
                        >
                          ◉
                        </div>

                        <div className="text-[14px] font-bold text-[#1f2733]">
                          جامعة الأزهر
                        </div>

                        <div className="text-[21px] font-bold text-[#1f2733] my-[4px]">
                          شهادة إتمام دورة تدريبية
                        </div>

                        <div className="text-[11px] text-[#4a5465]">
                          تمنح هذه الشهادة للمتدرب
                        </div>

                        <div className="text-[19px] font-bold text-[#1f2733] my-[3px]">
                          محمد علي
                        </div>

                        <div className="text-[11px] text-[#3b4454]">
                          لإتمامه دورة «مهارات الحاسوب الأساسية»
                        </div>

                        <div
                          className="
                            flex
                            justify-between
                            items-end
                            mt-[14px]
                            text-[10px]
                            text-[#4a5465]
                          "
                        >
                          <span>
                            رقم الشهادة: يُولَّد عند الإصدار
                          </span>

                          <div
                            className="
                              w-[44px]
                              h-[44px]
                              rounded-[5px]
                              border
                              border-[#c9cfd9]
                              bg-[#f4f5f7]
                              flex
                              items-center
                              justify-center
                              text-[9px]
                              font-bold
                              text-[#667085]
                            "
                          >
                            QR
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================= ELIGIBILITY ================= */}
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-[#1f2733] mb-[8px]">
                      حالة الاستحقاق
                    </h3>

                    <EligibilityItem text="التسجيل مقبول" />
                    <EligibilityItem text="الحضور مسجل" />
                    <EligibilityItem text="التقييم والنتيجة مكتملان" />

                    <p className="text-[9px] text-[#7a8393] leading-[1.7] mt-[6px] mb-[10px]">
                      شروط الإتمام تتبع سياسة الجامعة المعتمدة.
                    </p>

                    <div className="flex gap-[8px] flex-wrap">
                      <button
                        type="button"
                        onClick={backToCertificates}
                        className="
                          h-[34px]
                          px-[16px]
                          rounded-[7px]
                          bg-[#4b5568]
                          text-white
                          text-[10px]
                          font-semibold
                          hover:bg-[#3f4858]
                        "
                      >
                        ✓ تأكيد الإصدار
                      </button>

                      <button
                        type="button"
                        onClick={backToCertificates}
                        className="
                          h-[34px]
                          px-[16px]
                          rounded-[7px]
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

                    <div
                      className="
                        mt-[14px]
                        border
                        border-[#e1e5ec]
                        rounded-[8px]
                        bg-[#fbfcfd]
                        px-[11px]
                        py-[8px]
                      "
                    >
                      <p className="text-[9px] text-[#7a8393]">
                        رقم السجل
                      </p>

                      <p className="text-[10px] font-semibold text-[#2b3340] mt-[2px]">
                        {certificateId || "3"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EligibilityItem({ text }) {
  return (
    <div className="flex items-center gap-[8px] py-[6px] border-b border-[#eceff4] last:border-b-0">
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