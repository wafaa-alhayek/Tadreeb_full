import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseRegistrationDecision() {
  const navigate = useNavigate();
  const { id, requestId } = useParams();
  const [searchParams] = useSearchParams();

  const decisionType = searchParams.get("type") || "accept";
  const [rejectReason, setRejectReason] = useState("");

  const backToRequests = () => {
    navigate(`/admin/courses/${id}/registration-requests`);
  };

  const confirmDecision = () => {
    backToRequests();
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
                <span>طلبات التسجيل</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                طلبات التسجيل
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
          <div className="grid grid-cols-5 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي الطلبات" value="32" />
            <StatCard title="قيد المراجعة" value="10" />
            <StatCard title="مقبولون" value="18" />
            <StatCard title="قائمة الانتظار" value="3" />
            <StatCard title="مرفوضة" value="1" />
          </div>

          {/* ================= SEARCH ================= */}
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
                placeholder="ابحث باسم الطالب أو رقم الطلب ..."
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  text-[11px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">⌕</span>
            </div>
          </section>

          {/* ================= REQUESTS TABLE ================= */}
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
                      "رقم الطلب",
                      "الطالب / الرقم الجامعي",
                      "الدورة",
                      "تاريخ التقديم",
                      "حالة الطلب",
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
                    <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                      {requestId || "R-2026-001"}
                    </td>

                    <td className="px-[10px] py-[9px]">
                      <p className="text-[10px] font-bold text-[#2b3340]">
                        أحمد محمد
                      </p>

                      <p className="text-[9px] text-[#667085]">
                        20241001 · نظم المعلومات
                      </p>
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                      مهارات الحاسوب الأساسية
                    </td>

                    <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                      2026/10/02
                    </td>

                    <td className="px-[10px] py-[9px]">
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
                        قيد المراجعة
                      </span>
                    </td>

                    <td className="px-[10px] py-[9px] text-[9px] text-[#667085]">
                      مراجعة واتخاذ قرار
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
            {decisionType === "reject" ? (
              <RejectModal
                rejectReason={rejectReason}
                setRejectReason={setRejectReason}
                onConfirm={confirmDecision}
                onCancel={backToRequests}
              />
            ) : decisionType === "waiting" ? (
              <WaitingModal
                onConfirm={confirmDecision}
                onCancel={backToRequests}
              />
            ) : (
              <AcceptModal
                onConfirm={confirmDecision}
                onCancel={backToRequests}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function AcceptModal({ onConfirm, onCancel }) {
  return (
    <div
      className="
        w-[430px]
        max-w-full
        bg-white
        rounded-[12px]
        border
        border-[#dfe3ea]
        shadow-2xl
        overflow-hidden
      "
    >
      <ModalHeader title="تأكيد قبول الطلب" onClose={onCancel} />

      <div className="px-[18px] py-[16px]">
        <p className="text-[11px] leading-[1.8] text-[#4a5465] mb-[10px]">
          سيتم قبول الطالب{" "}
          <strong className="text-[#1f2733]">
            أحمد محمد
          </strong>{" "}
          في دورة «مهارات الحاسوب الأساسية».
        </p>

        <div
          className="
            border
            border-[#e1e5ec]
            rounded-[8px]
            bg-[#fbfcfd]
            px-[12px]
            py-[10px]
            text-[10px]
            text-[#4a5465]
            mb-[12px]
          "
        >
          المقاعد المتبقية قبل القبول:{" "}
          <strong className="text-[#1f2733]">
            7 من 25
          </strong>
        </div>

        <div className="flex justify-end gap-[10px]">
          <button
            type="button"
            onClick={onConfirm}
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
            ✓ تأكيد القبول
          </button>

          <CancelButton onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

function RejectModal({
  rejectReason,
  setRejectReason,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="
        w-[430px]
        max-w-full
        bg-white
        rounded-[12px]
        border
        border-[#dfe3ea]
        shadow-2xl
        overflow-hidden
      "
    >
      <ModalHeader title="تأكيد رفض الطلب" onClose={onCancel} />

      <div className="px-[18px] py-[16px]">
        <p className="text-[11px] leading-[1.8] text-[#4a5465] mb-[10px]">
          سيتم رفض طلب الطالب{" "}
          <strong className="text-[#1f2733]">
            أحمد محمد
          </strong>
          .
        </p>

        <div>
          <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
            سبب الرفض (إن كانت سياسة الجامعة تتطلبه)
          </label>

          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="اكتبي سبب الرفض..."
            className="
              w-full
              min-h-[100px]
              resize-none
              rounded-[8px]
              border
              border-[#c9cfd9]
              bg-white
              px-[10px]
              py-[9px]
              outline-none
              text-[10px]
              text-[#2b3340]
              placeholder:text-[#8a93a3]
            "
          />
        </div>

        <div className="flex justify-end gap-[10px] mt-[12px]">
          <button
            type="button"
            onClick={onConfirm}
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
            × تأكيد الرفض
          </button>

          <CancelButton onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

function WaitingModal({ onConfirm, onCancel }) {
  return (
    <div
      className="
        w-[430px]
        max-w-full
        bg-white
        rounded-[12px]
        border
        border-[#dfe3ea]
        shadow-2xl
        overflow-hidden
      "
    >
      <ModalHeader
        title="إضافة إلى قائمة الانتظار"
        onClose={onCancel}
      />

      <div className="px-[18px] py-[16px]">
        <p className="text-[11px] leading-[1.8] text-[#4a5465] mb-[10px]">
          سيتم نقل الطالب{" "}
          <strong className="text-[#1f2733]">
            أحمد محمد
          </strong>{" "}
          إلى قائمة الانتظار للدورة.
        </p>

        <div
          className="
            border
            border-[#e1e5ec]
            rounded-[8px]
            bg-[#fbfcfd]
            px-[12px]
            py-[10px]
            mb-[12px]
          "
        >
          <p className="text-[9px] text-[#7a8393]">
            الدورة
          </p>

          <p className="text-[10px] font-semibold text-[#2b3340] mt-[2px]">
            مهارات الحاسوب الأساسية
          </p>
        </div>

        <div className="flex justify-end gap-[10px]">
          <button
            type="button"
            onClick={onConfirm}
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
            تأكيد
          </button>

          <CancelButton onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
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
        {title}
      </h2>

      <button
        type="button"
        onClick={onClose}
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
  );
}

function CancelButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
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