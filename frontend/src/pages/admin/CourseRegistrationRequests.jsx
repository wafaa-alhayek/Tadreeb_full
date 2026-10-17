import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseRegistrationRequests() {
  const navigate = useNavigate();
  const { id } = useParams();

  const requests = [
    {
      requestId: "R-2026-001",
      student: "أحمد محمد",
      studentInfo: "20241001 · نظم المعلومات",
      date: "2026/10/02",
      status: "قيد المراجعة",
    },
    {
      requestId: "R-2026-002",
      student: "سارة خالد",
      studentInfo: "20241002 · إدارة الأعمال",
      date: "2026/10/02",
      status: "مقبول",
    },
    {
      requestId: "R-2026-003",
      student: "محمد علي",
      studentInfo: "20241003 · علوم الحاسوب",
      date: "2026/10/03",
      status: "قيد المراجعة",
    },
    {
      requestId: "R-2026-004",
      student: "نور حسن",
      studentInfo: "20241004 · المحاسبة",
      date: "2026/10/05",
      status: "قائمة الانتظار",
    },
    {
      requestId: "R-2026-005",
      student: "ليان محمود",
      studentInfo: "20241005 · نظم المعلومات",
      date: "2026/10/05",
      status: "مرفوض",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "مقبول":
        return "bg-[#dff1e6] text-[#236a45]";
      case "قيد المراجعة":
        return "bg-[#e2eaf5] text-[#375d8b]";
      case "قائمة الانتظار":
        return "bg-[#fff1cc] text-[#8a6515]";
      case "مرفوض":
        return "bg-[#f6e5e5] text-[#9b3f3f]";
      default:
        return "bg-[#eceff4] text-[#596273]";
    }
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
                <span>طلبات التسجيل</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                طلبات التسجيل
              </h1>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/admin/courses/${id}/waiting-list`)
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
              قائمة الانتظار
            </button>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-5 gap-[12px] mb-[10px]">
            <StatCard title="إجمالي الطلبات" value="32" />
            <StatCard title="قيد المراجعة" value="10" />
            <StatCard title="المقبولة" value="18" />
            <StatCard title="قائمة الانتظار" value="3" />
            <StatCard title="المرفوضة" value="1" />
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
                placeholder="ابحث باسم الطالب أو الرقم الجامعي ..."
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

          {/* ================= TABLE ================= */}
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
                قائمة طلبات التسجيل
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "رقم الطلب",
                      "الطالب",
                      "تاريخ التقديم",
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
                  {requests.map((request) => (
                    <tr
                      key={request.requestId}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                        {request.requestId}
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <div className="text-[10px] font-bold text-[#2b3340]">
                          {request.student}
                        </div>

                        <div className="text-[9px] text-[#7a8393] mt-[2px]">
                          {request.studentInfo}
                        </div>
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#667085]">
                        {request.date}
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
                            ${getStatusStyle(request.status)}
                          `}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <div className="flex gap-[6px]">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/courses/${id}/registration-requests/${request.requestId}`
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
                            عرض
                          </button>

                          {request.status === "قيد المراجعة" && (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/courses/${id}/registration-requests/${request.requestId}/decision`
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
                              مراجعة
                            </button>
                          )}
                        </div>
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