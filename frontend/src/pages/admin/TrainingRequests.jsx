import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingRequests() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "إجمالي الطلبات",
      value: "124",
      icon: "▤",
    },
    {
      title: "قيد المراجعة",
      value: "28",
      icon: "◷",
    },
    {
      title: "مقبولة",
      value: "72",
      icon: "✓",
    },
    {
      title: "مرفوضة",
      value: "14",
      icon: "×",
    },
  ];

  const requests = [
    {
      id: 1,
      student: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      organization: "شركة التقنية",
      date: "2025/04/20",
      status: "قيد المراجعة",
    },
    {
      id: 2,
      student: "سارة علي",
      studentId: "20230876",
      specialization: "إدارة الأعمال",
      organization: "مركز التدريب المهني",
      date: "2025/04/18",
      status: "مقبول",
    },
    {
      id: 3,
      student: "محمد علي",
      studentId: "20231234",
      specialization: "هندسة الشبكات",
      organization: "شركة الحلول",
      date: "2025/04/16",
      status: "بانتظار الموافقة",
    },
    {
      id: 4,
      student: "ليلى حسن",
      studentId: "20230987",
      specialization: "التصميم الجرافيكي",
      organization: "مؤسسة الإبداع",
      date: "2025/04/14",
      status: "مرفوض",
    },
    {
      id: 5,
      student: "عمر يوسف",
      studentId: "20231109",
      specialization: "إدارة الموارد",
      organization: "مجموعة الأمين",
      date: "2025/04/12",
      status: "قيد المراجعة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مقبول") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد المراجعة") {
      return "bg-[#dde7f6] text-[#2c5698]";
    }

    if (status === "بانتظار الموافقة") {
      return "bg-[#fbf0d4] text-[#85590a]";
    }

    if (status === "مرفوض") {
      return "bg-[#fbe1e1] text-[#a22b2b]";
    }

    return "bg-[#e8ebf0] text-[#3b4454]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= BREADCRUMB ================= */}
          <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
            <span>الرئيسية</span>
            <span>›</span>
            <span>طلبات التدريب</span>
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-[23px] font-bold text-[#1b2430] mb-[10px]">
            إدارة طلبات التدريب
          </h1>

          {/* ================= SEARCH + FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[12px]
              mb-[12px]
            "
          >
            {/* Search */}
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
                  outline-none
                  bg-transparent
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">
                ⌕
              </span>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-4 gap-[12px] mt-[10px]">
              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  الحالة
                </label>

                <select
                  className="
                    w-full
                    h-[38px]
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
                    px-[10px]
                    text-[11px]
                    text-[#4a5465]
                    outline-none
                    bg-white
                  "
                >
                  <option>كل الحالات</option>
                  <option>قيد المراجعة</option>
                  <option>مقبول</option>
                  <option>بانتظار الموافقة</option>
                  <option>مرفوض</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  التخصص
                </label>

                <select
                  className="
                    w-full
                    h-[38px]
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
                    px-[10px]
                    text-[11px]
                    text-[#4a5465]
                    outline-none
                    bg-white
                  "
                >
                  <option>كل التخصصات</option>
                  <option>هندسة البرمجيات</option>
                  <option>إدارة الأعمال</option>
                  <option>هندسة الشبكات</option>
                  <option>التصميم الجرافيكي</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  جهة التدريب
                </label>

                <select
                  className="
                    w-full
                    h-[38px]
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
                    px-[10px]
                    text-[11px]
                    text-[#4a5465]
                    outline-none
                    bg-white
                  "
                >
                  <option>كل الجهات</option>
                  <option>شركة التقنية</option>
                  <option>مركز التدريب المهني</option>
                  <option>شركة الحلول</option>
                  <option>مؤسسة الإبداع</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  الفترة الزمنية
                </label>

                <select
                  className="
                    w-full
                    h-[38px]
                    border
                    border-[#c9cfd9]
                    rounded-[8px]
                    px-[10px]
                    text-[11px]
                    text-[#4a5465]
                    outline-none
                    bg-white
                  "
                >
                  <option>كل التواريخ</option>
                  <option>هذا الأسبوع</option>
                  <option>هذا الشهر</option>
                  <option>آخر 3 أشهر</option>
                </select>
              </div>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[12px]">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[16px]
                  py-[10px]
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p className="text-[11px] text-[#667085] mb-[2px]">
                    {stat.title}
                  </p>

                  <p className="text-[24px] font-bold text-[#1f2733]">
                    {stat.value}
                  </p>
                </div>

                <div
                  className="
                    w-[40px]
                    h-[40px]
                    rounded-[10px]
                    bg-[#eceff4]
                    flex
                    items-center
                    justify-center
                    text-[#667085]
                    text-[17px]
                  "
                >
                  {stat.icon}
                </div>
              </div>
            ))}
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
            {/* Table Header */}
            <div className="flex items-center justify-between px-[14px] py-[11px]">
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                قائمة الطلبات
              </h2>

              <button
                type="button"
                className="
                  h-[29px]
                  px-[12px]
                  rounded-[6px]
                  border
                  border-[#b9c0cc]
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                ↻ إعادة تعيين الفلاتر
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "الطالب",
                      "الرقم الجامعي",
                      "التخصص",
                      "جهة التدريب",
                      "تاريخ التقديم",
                      "الحالة",
                      "الإجراء",
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
                      key={request.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {request.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {request.student}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {request.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {request.specialization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {request.organization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {request.date}
                      </td>

                      <td className="px-[10px] py-[9px]">
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

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/training-requests/${request.id}`
                            )
                          }
                          className="
                            h-[28px]
                            px-[11px]
                            rounded-[6px]
                            border
                            border-[#b9c0cc]
                            bg-white
                            text-[10px]
                            text-[#3b4454]
                            hover:bg-[#eef0f4]
                          "
                        >
                          👁 عرض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div
              className="
                flex
                items-center
                justify-end
                gap-[5px]
                px-[14px]
                py-[10px]
              "
            >
              {["‹", "1", "2", "3", "4", "5", "›"].map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    className={`
                      min-w-[30px]
                      h-[28px]
                      px-[7px]
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
                )
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}