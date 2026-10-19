import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuGroups = [
    {
      title: "الرئيسية",
      items: [
        {
          name: "لوحة التحكم",
          icon: "⌂",
          path: "/admin/dashboard",
        },
        {
          name: "المهام التي تحتاج إجراء",
          icon: "♧",
          path: "/admin/dashboard#tasks",
        },
      ],
    },

    {
      title: "الدورات التدريبية",
      items: [
        {
          name: "قائمة الدورات",
          icon: "♙",
          path: "/admin/courses",
        },
        {
          name: "طلبات التسجيل",
          icon: "▤",
          path: "/admin/courses/1/registration-requests",
        },
        {
          name: "قائمة الانتظار",
          icon: "◷",
          path: "/admin/courses/1/waiting-list",
        },
        {
          name: "المتدربون",
          icon: "♟",
          path: "/admin/courses/1/trainees",
        },
        {
          name: "الحضور والغياب",
          icon: "▣",
          path: "/admin/courses/:id/attendance",
        },
        {
          name: "مدربو الدورات",
          icon: "♙",
          path: "/admin/course-trainers",
        },
        {
          name: "التقييم والنتائج",
          icon: "☆",
          path: "/admin/courses/:id/evaluations",
        },
        {
          name: "شهادات الدورات",
          icon: "♕",
          path: "/admin/course-certificates",
        },
        {
          name: "تقارير الدورات",
          icon: "▥",
          path: "/admin/course-reports",
        },
      ],
    },

    {
      title: "التدريب الميداني",
      items: [
        {
          name: "طلبات التدريب",
          icon: "▤",
          path: "/admin/training-requests",
        },
        {
          name: "الطلبة",
          icon: "♙",
          path: "/admin/students",
        },
        {
          name: "جهات التدريب",
          icon: "▦",
          path: "/admin/training-organizations",
        },
        {
          name: "فرص التدريب",
          icon: "▣",
          path: "/admin/training-opportunities",
        },
        {
          name: "توزيع الطلبة",
          icon: "♟",
          path: "/admin/student-distribution",
        },
        {
          name: "الموافقات",
          icon: "✓",
          path: "/admin/approvals",
        },
        {
          name: "المشرفون",
          icon: "♙",
          path: "/admin/supervisors",
        },
        {
          name: "الزيارات والمتابعة",
          icon: "⌖",
          path: "/admin/visits",
        },
        {
          name: "التقييمات",
          icon: "☆",
          path: "/admin/evaluations",
        },
        {
          name: "التقارير والإحصائيات",
          icon: "▥",
          path: "/admin/reports",
        },
        {
          name: "الشهادات",
          icon: "♕",
          path: "/admin/certificates",
        },
        {
          name: "التقرير النهائي والإتمام",
          icon: "□",
          path: "/admin/final-reports",
        },
        {
          name: "الحالات الاستثنائية",
          icon: "⚠",
          path: "/admin/exceptions",
        },
      ],
    },

    {
      title: "الإدارة العامة",
      items: [
        {
          name: "الملفات والأرشفة",
          icon: "▱",
          path: "/admin/files",
        },
        {
          name: "الإعلانات",
          icon: "◁",
          path: "/admin/announcements",
        },
        {
          name: "البحث المتقدم",
          icon: "⌕",
          path: "/admin/advanced-search",
        },
        {
          name: "المستخدمون والصلاحيات",
          icon: "⚙",
          path: "/admin/users",
        },
      ],
    },
  ];

  return (
    <aside
      dir="rtl"
      className="
        w-[256px]
        min-h-[calc(100vh-64px)]
        bg-[#fafbfc]
        border-l
        border-[#dfe3ea]
        shrink-0
        px-[10px]
        py-[6px]
        overflow-y-auto
      "
    >
      <nav>
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-[8px]">
            {/* Group Title */}
            <div
              className="
                px-[12px]
                py-[7px]
                text-[11px]
                font-bold
                text-[#7a8393]
              "
            >
              {group.title}
            </div>

            {/* Group Items */}
            <div>
              {group.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    min-h-[31px]
                    px-[12px]
                    mb-[1px]
                    rounded-[8px]
                    flex
                    items-center
                    gap-[11px]
                    text-[12px]
                    transition
                    ${
                      isActive
                        ? "bg-[#e1e6ee] text-[#1b2430] font-bold"
                        : "text-[#4a5465] hover:bg-[#eef0f4]"
                    }
                  `}
                >
                  <span
                    className="
                      w-[18px]
                      text-center
                      text-[14px]
                      shrink-0
                    "
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}