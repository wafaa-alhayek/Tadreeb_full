import { useState } from "react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Notifications() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      title: "تحديث حالة طلب التدريب",
      description: "تم تحديث حالة طلبك.",
      time: "اليوم — 10:30 ص",
      unread: true,
      icon: "▤",
    },
    {
      id: 2,
      title: "تحديث متعلق بالتدريب",
      description: "يوجد تحديث جديد في ملف تدريبك.",
      time: "أمس — 12:00 م",
      unread: true,
      icon: "⌾",
    },
    {
      id: 3,
      title: "تنبيه بخصوص التقرير",
      description: "يرجى مراجعة حالة التقرير.",
      time: "قبل يومين",
      unread: false,
      icon: "◫",
    },
    {
      id: 4,
      title: "إعلان تدريبي جديد",
      description: "تفاصيل الإعلان",
      time: "2025/10/01 — 09:00 ص",
      unread: false,
      icon: "♢",
    },
  ];

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((item) => item.unread)
      : notifications;

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= BREADCRUMB ================= */}
          <div className="text-[11px] text-[#7a8393] mb-[4px]">
            الرئيسية › الإشعارات
          </div>

          {/* ================= HEADER ================= */}
          <div className="mb-[14px]">
            <h1 className="text-[23px] font-bold text-[#1b2430]">
              الإشعارات
            </h1>

            <p className="text-[12px] text-[#667085] mt-[3px]">
              تابع آخر التحديثات المتعلقة بتدريبك
            </p>
          </div>

          {/* ================= FILTERS ================= */}
          <div className="flex items-center justify-between mb-[12px]">
            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`
                  h-[30px]
                  px-[13px]
                  rounded-full
                  text-[10px]
                  border
                  ${
                    filter === "all"
                      ? "bg-[#4b5568] text-white border-[#4b5568]"
                      : "bg-white text-[#4a5465] border-[#c9cfd9]"
                  }
                `}
              >
                الكل
              </button>

              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`
                  h-[30px]
                  px-[13px]
                  rounded-full
                  text-[10px]
                  border
                  ${
                    filter === "unread"
                      ? "bg-[#4b5568] text-white border-[#4b5568]"
                      : "bg-white text-[#4a5465] border-[#c9cfd9]"
                  }
                `}
              >
                غير مقروءة
              </button>
            </div>

            <button
              type="button"
              className="
                text-[10px]
                text-[#4b5568]
                hover:underline
              "
            >
              تحديد الكل كمقروء
            </button>
          </div>

          {/* ================= NOTIFICATIONS LIST ================= */}
          <div className="grid gap-[10px]">
            {filteredNotifications.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`
                  w-full
                  text-right
                  border
                  rounded-[10px]
                  px-[14px]
                  py-[12px]
                  flex
                  items-center
                  gap-[12px]
                  transition
                  ${
                    item.unread
                      ? "border-[#d7dde7] bg-[#f7f9fc]"
                      : "border-[#e1e5ec] bg-white"
                  }
                  hover:bg-[#f4f6f9]
                `}
              >
                <div
                  className="
                    w-[38px]
                    h-[38px]
                    rounded-[8px]
                    bg-[#e9edf3]
                    flex
                    items-center
                    justify-center
                    text-[#687386]
                    text-[16px]
                    shrink-0
                  "
                >
                  {item.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-[7px]">
                    <h3 className="text-[12px] font-bold text-[#1f2733]">
                      {item.title}
                    </h3>

                    {item.unread && (
                      <span
                        className="
                          w-[6px]
                          h-[6px]
                          rounded-full
                          bg-[#4b5568]
                        "
                      />
                    )}
                  </div>

                  <p className="text-[10px] text-[#667085] mt-[2px]">
                    {item.description}
                  </p>

                  <p className="text-[9px] text-[#8a93a3] mt-[3px]">
                    {item.time}
                  </p>
                </div>

                <span className="text-[#8a93a3] text-[16px]">
                  ‹
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}