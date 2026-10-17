import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseWaitingListDecision() {
  const navigate = useNavigate();
  const { id } = useParams();

  // غيّر القيمة للتجربة:
  // 2 = يوجد مقاعد
  // 0 = لا توجد مقاعد
  const availableSeats = 0;

  const backToWaitingList = () => {
    navigate(`/admin/courses/${id}/waiting-list`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px] relative">
          {/* ================= BACKGROUND HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>قائمة الانتظار</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                قائمة الانتظار
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
          <div className="grid grid-cols-2 gap-[12px] max-w-[520px] mb-[10px]">
            <StatCard title="عدد المنتظرين" value="7" />

            <StatCard
              title="المقاعد المتاحة"
              value={availableSeats}
            />
          </div>

          {/* ================= ALERT ================= */}
          {availableSeats > 0 ? (
            <div
              className="
                border
                border-[#eadcae]
                bg-[#fffaf0]
                rounded-[9px]
                px-[13px]
                py-[10px]
                mb-[10px]
              "
            >
              <p className="text-[11px] font-bold text-[#5e4a1e]">
                يوجد {availableSeats} مقاعد متاحة
              </p>

              <p className="text-[9px] text-[#7a6b45] mt-[2px]">
                يجب التحقق من السعة الفعلية وحالة التسجيل قبل نقل أي متقدم.
              </p>
            </div>
          ) : (
            <div
              className="
                border
                border-[#e3c5c5]
                bg-[#fff6f6]
                rounded-[9px]
                px-[13px]
                py-[10px]
                mb-[10px]
              "
            >
              <p className="text-[11px] font-bold text-[#8b3e3e]">
                السعة ممتلئة
              </p>

              <p className="text-[9px] text-[#856161] mt-[2px]">
                لا توجد مقاعد متاحة حالياً لنقل أي متقدم من قائمة الانتظار.
              </p>
            </div>
          )}

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
                الطلبة المنتظرون
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "الترتيب",
                      "الطالب",
                      "الرقم الجامعي",
                      "تاريخ تقديم الطلب",
                      "الحالة",
                      "الأهلية",
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
                          whitespace-nowrap
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-[10px] py-[9px] text-[10px]">
                      1
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] font-bold">
                      نور حسن
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      20241004
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px]">
                      2026/10/05
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
                        انتظار
                      </span>
                    </td>

                    <td className="px-[10px] py-[9px]">
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
                        مستوفٍ
                      </span>
                    </td>

                    <td className="px-[10px] py-[9px]">
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
                        "
                      >
                        مراجعة المقعد
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= OVERLAY ================= */}
          <div className="fixed inset-0 bg-black/30 z-[40]" />

          {/* ================= MODAL ================= */}
          {availableSeats > 0 ? (
            /* ================= AVAILABLE SEATS MODAL ================= */
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
                  w-[470px]
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
                    نقل الطالب إلى المقبولين
                  </h2>

                  <button
                    type="button"
                    onClick={backToWaitingList}
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

                {/* MODAL CONTENT */}
                <div className="px-[18px] py-[16px]">
                  <p className="text-[11px] leading-[1.8] text-[#4a5465] mb-[10px]">
                    سيتم نقل{" "}
                    <strong className="text-[#1f2733]">
                      نور حسن
                    </strong>{" "}
                    من قائمة الانتظار إلى المقبولين في دورة
                    «مهارات الحاسوب الأساسية».
                  </p>

                  <div className="grid grid-cols-2 gap-[8px] mb-[12px]">
                    <InfoBox
                      label="المقاعد المتاحة"
                      value={availableSeats}
                    />

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
                        أهلية المتقدم
                      </p>

                      <span
                        className="
                          inline-flex
                          px-[9px]
                          py-[3px]
                          rounded-full
                          bg-[#dff1e6]
                          text-[#236a45]
                          text-[9px]
                          font-semibold
                        "
                      >
                        مستوفٍ
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-[10px]">
                    <button
                      type="button"
                      onClick={backToWaitingList}
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
                      ✓ تأكيد النقل
                    </button>

                    <button
                      type="button"
                      onClick={backToWaitingList}
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
                </div>
              </div>
            </div>
          ) : (
            /* ================= NO AVAILABLE SEATS MODAL ================= */
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
                  w-[420px]
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
                    لا توجد مقاعد متاحة
                  </h2>

                  <button
                    type="button"
                    onClick={backToWaitingList}
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

                {/* MODAL CONTENT */}
                <div className="px-[20px] py-[24px] text-center">
                  <div
                    className="
                      w-[52px]
                      h-[52px]
                      rounded-full
                      bg-[#f1f3f7]
                      text-[#8a93a3]
                      flex
                      items-center
                      justify-center
                      mx-auto
                      text-[25px]
                      font-bold
                      mb-[12px]
                    "
                  >
                    !
                  </div>

                  <h3 className="text-[14px] font-bold text-[#1f2733] mb-[6px]">
                    السعة ممتلئة حالياً
                  </h3>

                  <p className="text-[11px] leading-[1.8] text-[#667085] mb-[16px]">
                    لا توجد مقاعد متاحة حالياً ولا يمكن تأكيد نقل الطالب من قائمة الانتظار إلى المقبولين.
                  </p>

                  <button
                    type="button"
                    onClick={backToWaitingList}
                    className="
                      h-[34px]
                      px-[18px]
                      rounded-[7px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[10px]
                      text-[#3b4454]
                      hover:bg-[#eef0f4]
                    "
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          )}
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

      <p className="text-[11px] font-bold text-[#2b3340]">
        {value}
      </p>
    </div>
  );
}