import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#tasks") {
      setTimeout(() => {
        document
          .getElementById("tasks")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  }, [location]);

  const courseStats = [
    {
      title: "إجمالي الدورات",
      value: "24",
      path: "/admin/courses",
    },
    {
      title: "طلبات تسجيل بانتظار القرار",
      value: "10",
      path: "/admin/courses/1/registration-requests",
    },
    {
      title: "قائمة الانتظار",
      value: "7",
      path: "/admin/courses/1/waiting-list",
    },
    {
      title: "شهادات بانتظار الإصدار",
      value: "6",
      path: "/admin/course-certificates",
    },
  ];

  const fieldTrainingStats = [
    {
      title: "إجمالي الطلبة",
      value: "124",
      path: "/admin/students",
    },
    {
      title: "طلبات بانتظار الإجراء",
      value: "18",
      path: "/admin/training-requests",
    },
    {
      title: "فرص التدريب المتاحة",
      value: "32",
      path: "/admin/training-opportunities",
    },
    {
      title: "جهات التدريب",
      value: "24",
      path: "/admin/training-organizations",
    },
  ];

  const actionItems = [
    {
      title: "طلبات تدريب بانتظار المراجعة",
      value: "12",
      path: "/admin/training-requests",
    },
    {
      title: "طلبات بانتظار الموافقة",
      value: "5",
      path: "/admin/approvals",
    },
    {
      title: "طلبات تسجيل بدورات بانتظار القرار",
      value: "10",
      path: "/admin/courses/1/registration-requests",
    },
    {
      title: "حالات تحتاج متابعة",
      value: "3",
      path: "/admin/visits",
    },
  ];

  const latestRequests = [
    {
      id: 1,
      student: "أحمد خالد",
      specialization: "هندسة البرمجيات",
      organization: "شركة التقنية",
      status: "قيد المراجعة",
      date: "2025/04/20",
    },
    {
      id: 2,
      student: "سارة محمود",
      specialization: "إدارة الأعمال",
      organization: "مركز التدريب المهني",
      status: "مقبول",
      date: "2025/04/18",
    },
    {
      id: 3,
      student: "محمد علي",
      specialization: "هندسة الشبكات",
      organization: "شركة الحلول",
      status: "بانتظار الموافقة",
      date: "2025/04/16",
    },
    {
      id: 4,
      student: "ليلى حسن",
      specialization: "التصميم الجرافيكي",
      organization: "مؤسسة الإبداع",
      status: "مرفوض",
      date: "2025/04/14",
    },
  ];

  const specializationStats = [
    {
      name: "هندسة البرمجيات",
      value: 35,
    },
    {
      name: "إدارة الأعمال",
      value: 26,
    },
    {
      name: "التصميم الجرافيكي",
      value: 19,
    },
    {
      name: "الشبكات",
      value: 15,
    },
    {
      name: "أخرى",
      value: 8,
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
        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px] bg-white">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-end justify-between mb-[10px]">
            <div>
              <h1 className="text-[23px] font-bold text-[#1b2430] leading-tight">
                مرحباً، أ. أحمد محمد
              </h1>

              <p className="text-[13px] text-[#667085] mt-[2px]">
                لوحة تحكم مدير النظام
              </p>
            </div>

            <div
              className="
                min-h-[36px]
                px-[12px]
                border
                border-[#c9cfd9]
                rounded-[8px]
                flex
                items-center
                gap-[10px]
                text-[12px]
                text-[#4a5465]
                bg-white
              "
            >
              <span>▣</span>

              <span>
                السبت، 26 أبريل 2025
              </span>
            </div>
          </div>

          {/* ================= TOP SECTIONS ================= */}
          <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
            {/* Courses */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[10px]
              "
            >
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="text-[#667085]">
                  ♙
                </span>

                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  الدورات التدريبية
                </h2>

                <button
                  type="button"
                  onClick={() => navigate("/admin/courses")}
                  className="
                    mr-auto
                    text-[11px]
                    text-[#4b5568]
                    hover:underline
                  "
                >
                  فتح القائمة ←
                </button>
              </div>

              <div className="grid grid-cols-4 gap-[8px]">
                {courseStats.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="
                      text-right
                      border
                      border-[#e1e5ec]
                      rounded-[8px]
                      bg-[#fbfcfd]
                      px-[10px]
                      py-[8px]
                      hover:bg-[#f3f5f8]
                      transition
                    "
                  >
                    <p className="text-[10px] text-[#7a8393] mb-[3px]">
                      {item.title}
                    </p>

                    <p className="text-[20px] font-bold text-[#1f2733]">
                      {item.value}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Field Training */}
            <section
              className="
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[10px]
              "
            >
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="text-[#667085]">
                  ▣
                </span>

                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  التدريب الميداني
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/training-requests")
                  }
                  className="
                    mr-auto
                    text-[11px]
                    text-[#4b5568]
                    hover:underline
                  "
                >
                  فتح الطلبات ←
                </button>
              </div>

              <div className="grid grid-cols-4 gap-[8px]">
                {fieldTrainingStats.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="
                      text-right
                      border
                      border-[#e1e5ec]
                      rounded-[8px]
                      bg-[#fbfcfd]
                      px-[10px]
                      py-[8px]
                      hover:bg-[#f3f5f8]
                      transition
                    "
                  >
                    <p className="text-[10px] text-[#7a8393] mb-[3px]">
                      {item.title}
                    </p>

                    <p className="text-[20px] font-bold text-[#1f2733]">
                      {item.value}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* ================= MIDDLE SECTION ================= */}
          <div className="flex gap-[14px] mb-[12px]">
            {/* ================= NEEDS ACTION ================= */}
            <section
              id="tasks"
              className="
                w-[290px]
                shrink-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
                scroll-mt-[80px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                يحتاج إلى إجراء
              </h2>

              <div>
                {actionItems.map((item) => (
                  <div
                    key={item.title}
                    className="
                      border
                      border-[#e1e5ec]
                      rounded-[8px]
                      bg-[#fbfcfd]
                      px-[9px]
                      py-[7px]
                      flex
                      items-center
                      gap-[9px]
                      mb-[6px]
                      last:mb-0
                    "
                  >
                    <div
                      className="
                        w-[32px]
                        h-[32px]
                        rounded-full
                        bg-[#e1e6ee]
                        flex
                        items-center
                        justify-center
                        text-[12px]
                        font-bold
                        text-[#1f2733]
                        shrink-0
                      "
                    >
                      {item.value}
                    </div>

                    <p className="flex-1 text-[11px] font-semibold text-[#3b4454]">
                      {item.title}
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate(item.path)}
                      className="
                        h-[27px]
                        px-[10px]
                        rounded-[6px]
                        border
                        border-[#b9c0cc]
                        bg-white
                        text-[10px]
                        text-[#3b4454]
                        hover:bg-[#eef0f4]
                      "
                    >
                      عرض
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= LATEST REQUESTS ================= */}
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
              <div className="flex items-center justify-between px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  آخر طلبات التدريب
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/training-requests")
                  }
                  className="
                    h-[27px]
                    px-[11px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  عرض الكل
                </button>
              </div>

              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "اسم الطالب",
                      "التخصص",
                      "جهة التدريب",
                      "الحالة",
                      "تاريخ التقديم",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="
                          px-[10px]
                          py-[7px]
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
                  {latestRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[8px] text-[10px] text-[#667085]">
                        {request.id}
                      </td>

                      <td className="px-[10px] py-[8px] text-[10px] font-medium text-[#2b3340]">
                        {request.student}
                      </td>

                      <td className="px-[10px] py-[8px] text-[10px] text-[#4a5465]">
                        {request.specialization}
                      </td>

                      <td className="px-[10px] py-[8px] text-[10px] text-[#4a5465]">
                        {request.organization}
                      </td>

                      <td className="px-[10px] py-[8px]">
                        <span
                          className={`
                            inline-flex
                            px-[8px]
                            py-[2px]
                            rounded-full
                            text-[9px]
                            font-medium
                            ${getStatusStyle(request.status)}
                          `}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[8px] text-[10px] text-[#667085]">
                        {request.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="flex gap-[14px]">
            {/* REQUEST STATUS */}
            <section
              className="
                w-[36%]
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[12px]">
                حالة الطلبات
              </h2>

              <div className="flex items-center gap-[18px]">
                <div
                  className="
                    w-[120px]
                    h-[120px]
                    rounded-full
                    bg-[#e5e8ed]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <div
                    className="
                      w-[82px]
                      h-[82px]
                      rounded-full
                      bg-white
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                  >
                    <p className="text-[19px] font-bold text-[#1f2733]">
                      124
                    </p>

                    <p className="text-[8px] text-[#667085]">
                      إجمالي الطلبات
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-[7px]">
                  {[
                    ["مقبول", "72"],
                    ["قيد المراجعة", "28"],
                    ["مرفوض", "14"],
                    ["مغلق", "10"],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className="flex items-center gap-[7px]"
                    >
                      <span
                        className={`
                          w-[10px]
                          h-[10px]
                          rounded-full
                          ${
                            index === 0
                              ? "bg-[#4b5568]"
                              : index === 1
                              ? "bg-[#8793a8]"
                              : index === 2
                              ? "bg-[#b8c0cd]"
                              : "bg-[#dde1e8]"
                          }
                        `}
                      />

                      <span className="flex-1 text-[10px] text-[#4a5465]">
                        {label}
                      </span>

                      <span className="text-[10px] font-bold text-[#1f2733]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* OPPORTUNITIES BY SPECIALIZATION */}
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
                فرص التدريب حسب التخصص
              </h2>

              <div className="h-[120px] flex items-end gap-[16px] border-b border-[#cdd3dc] px-[10px]">
                {specializationStats.map((item) => (
                  <div
                    key={item.name}
                    className="flex-1 h-full flex flex-col items-center justify-end"
                  >
                    <span className="text-[9px] font-semibold text-[#2b3340] mb-[4px]">
                      {item.value}
                    </span>

                    <div
                      className="
                        w-full
                        max-w-[55px]
                        bg-[#7f8da7]
                        rounded-t-[4px]
                      "
                      style={{
                        height: `${(item.value / 40) * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-[16px] px-[10px] pt-[6px]">
                {specializationStats.map((item) => (
                  <span
                    key={item.name}
                    className="
                      flex-1
                      text-center
                      text-[8px]
                      text-[#7a8393]
                    "
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}