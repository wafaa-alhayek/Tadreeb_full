import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseRegistrationRequestDetails() {
  const navigate = useNavigate();
  const { id, requestId } = useParams();

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px] relative">
          {/* ================= PAGE HEADER ================= */}
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

              <span className="text-[#8a93a3]">
                ⌕
              </span>
            </div>

            <div className="grid grid-cols-2 gap-[12px] mt-[10px]">
              <Filter label="الدورة">
                <option>مهارات الحاسوب الأساسية</option>
              </Filter>

              <Filter label="حالة الطلب">
                <option>جميع الحالات</option>
                <option>قيد المراجعة</option>
                <option>مقبول</option>
                <option>قائمة الانتظار</option>
                <option>مرفوض</option>
              </Filter>
            </div>
          </section>

          {/* ================= TABLE BACKGROUND ================= */}
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
                  <tr className="border-b border-[#eceff4]">
                    <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                      R-2026-001
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
                      عرض الطلب
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= OVERLAY ================= */}
          <div
            className="
              fixed
              inset-0
              bg-black/20
              z-[40]
            "
            onClick={() =>
              navigate(`/admin/courses/${id}/registration-requests`)
            }
          />

          {/* ================= SIDE DRAWER ================= */}
          <aside
            className="
              fixed
              top-[64px]
              left-0
              bottom-0
              w-[390px]
              bg-white
              border-r
              border-[#dfe3ea]
              z-[50]
              shadow-xl
              overflow-y-auto
            "
          >
            {/* DRAWER HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                px-[18px]
                py-[14px]
                border-b
                border-[#e4e7ec]
              "
            >
              <h2 className="text-[17px] font-bold text-[#1f2733]">
                تفاصيل طلب التسجيل
              </h2>

              <button
                type="button"
                onClick={() =>
                  navigate(`/admin/courses/${id}/registration-requests`)
                }
                className="
                  w-[30px]
                  h-[30px]
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

            {/* DRAWER CONTENT */}
            <div className="px-[18px] py-[16px]">
              <div className="flex items-center gap-[8px] mb-[10px]">
                <b className="text-[13px] text-[#1f2733]">
                  {requestId || "R-2026-001"}
                </b>

                <span
                  className="
                    inline-flex
                    px-[9px]
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

              {/* REQUEST INFO */}
              <div className="grid gap-[8px]">
                <InfoBox
                  label="الطالب"
                  value="أحمد محمد"
                />

                <InfoBox
                  label="الرقم الجامعي"
                  value="20241001"
                />

                <InfoBox
                  label="التخصص"
                  value="نظم المعلومات"
                />

                <InfoBox
                  label="الدورة"
                  value="مهارات الحاسوب الأساسية"
                />

                <InfoBox
                  label="تاريخ التقديم"
                  value="2026/10/02"
                />

                <InfoBox
                  label="المقاعد المتبقية"
                  value="7 من 25"
                />
              </div>

              {/* ================= TIMELINE ================= */}
              <div className="mt-[16px]">
                <h3 className="text-[13px] font-bold text-[#1f2733] mb-[10px]">
                  حالة الطلب
                </h3>

                <TimelineItem
                  title="تقديم الطلب"
                  subtitle="2026/10/02"
                  status="done"
                />

                <TimelineItem
                  title="مراجعة الإدارة"
                  subtitle="قيد المراجعة"
                  status="current"
                />

                <TimelineItem
                  title="القرار"
                  subtitle=""
                  status="todo"
                  last
                />
              </div>

              {/* ================= ACTIONS ================= */}
              <div className="flex gap-[8px] mt-[18px]">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${id}/registration-requests/${
                        requestId || "R-2026-001"
                      }/decision?type=accept`
                    )
                  }
                  className="
                    flex-1
                    h-[34px]
                    rounded-[7px]
                    bg-[#4b5568]
                    text-white
                    text-[10px]
                    font-semibold
                    hover:bg-[#3f4858]
                  "
                >
                  قبول
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${id}/registration-requests/${
                        requestId || "R-2026-001"
                      }/decision?type=waiting`
                    )
                  }
                  className="
                    flex-1
                    h-[34px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  قائمة الانتظار
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${id}/registration-requests/${
                        requestId || "R-2026-001"
                      }/decision?type=reject`
                    )
                  }
                  className="
                    flex-1
                    h-[34px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  رفض
                </button>
              </div>
            </div>
          </aside>
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

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
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
          text-[10px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
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

function TimelineItem({
  title,
  subtitle,
  status,
  last = false,
}) {
  const circleStyle =
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
            ${circleStyle}
          `}
        >
          {status === "done" ? "✓" : status === "current" ? "•" : ""}
        </span>

        {!last && (
          <div className="w-px flex-1 min-h-[34px] bg-[#dfe3ea]" />
        )}
      </div>

      <div className={last ? "" : "pb-[14px]"}>
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