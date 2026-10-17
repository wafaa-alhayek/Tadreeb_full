import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseCertificates() {
  const navigate = useNavigate();

  const certificates = [
    {
      trainee: "أحمد محمد",
      course: "مهارات الحاسوب الأساسية",
      certificateNo: "CERT-2026-001",
      issueDate: "2026/12/02",
      status: "صادرة",
    },
    {
      trainee: "سارة خالد",
      course: "مهارات الحاسوب الأساسية",
      certificateNo: "CERT-2026-002",
      issueDate: "2026/12/02",
      status: "صادرة",
    },
    {
      trainee: "محمد علي",
      course: "مهارات الحاسوب الأساسية",
      certificateNo: "—",
      issueDate: "—",
      status: "بانتظار الإصدار",
    },
    {
      trainee: "نور حسن",
      course: "مهارات الحاسوب الأساسية",
      certificateNo: "—",
      issueDate: "—",
      status: "بانتظار الإصدار",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "صادرة") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#fff1cc] text-[#8a6515]";
  };

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
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>الشهادات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة الشهادات
              </h1>
            </div>

            <div className="flex items-center gap-[8px]">
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

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/course-certificates/verify")
                }
                className="
                  h-[32px]
                  px-[12px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                التحقق من شهادة
              </button>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <StatCard title="الشهادات الصادرة" value="12" />
            <StatCard title="بانتظار الإصدار" value="6" />
            <StatCard title="غير مكتملة الشروط" value="25" />
          </div>

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
                placeholder="ابحث باسم المتدرب أو رقم الشهادة ..."
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

              <Filter label="حالة الشهادة">
                <option>جميع الحالات</option>
                <option>صادرة</option>
                <option>بانتظار الإصدار</option>
                <option>غير مكتملة الشروط</option>
              </Filter>
            </div>
          </section>

          {/* ================= CERTIFICATES TABLE ================= */}
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
                          whitespace-nowrap
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {certificates.map((item, index) => (
                    <tr
                      key={`${item.trainee}-${index}`}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[10px] text-[10px] font-bold text-[#2b3340]">
                        {item.trainee}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {item.course}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {item.certificateNo}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#667085]">
                        {item.issueDate}
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <span
                          className={`
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            text-[9px]
                            font-medium
                            ${getStatusStyle(item.status)}
                          `}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[10px]">
                        {item.status === "صادرة" ? (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/course-certificates/${index + 1}/preview`
                              )
                            }
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
                            معاينة الشهادة
                          </button>
                        ) : (
                          <div className="flex gap-[6px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/course-certificates/${index + 1}/preview`
                                )
                              }
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
                              معاينة
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/course-certificates/${index + 1}/preview`
                                )
                              }
                              className="
                                h-[27px]
                                px-[9px]
                                rounded-[6px]
                                bg-[#4b5568]
                                text-white
                                text-[9px]
                                font-semibold
                                hover:bg-[#3f4858]
                              "
                            >
                              مراجعة الإصدار
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
              {["‹", "1", "2", "3", "›"].map((page) => (
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