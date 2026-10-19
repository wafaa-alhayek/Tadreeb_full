import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "الرئيسية", icon: "⌂", path: "/student/dashboard" },
    { name: "فرص التدريب", icon: "⌕", path: "/student/opportunities" },
    { name: "طلباتي", icon: "▤", path: "/student/applications/status" },
    { name: "ملفي التدريبي", icon: "□", path: "/student/training-profile" },
    { name: "الحضور والغياب", icon: "▣", path: "/student/attendance" },
    { name: "التقارير", icon: "▥", path: "/student/reports" },
    { name: "التقييم", icon: "☆", path: "/student/evaluation" },
    { name: "إنهاء التدريب", icon: "⚑", path: "/student/finish-training" },
    { name: "الشهادة", icon: "♙", path: "/student/certificate" },
    { name: "الإشعارات", icon: "♧", path: "/student/notifications" },
    { name: "الملف الشخصي", icon: "♙", path: "/student/profile" },
  ];

  return (
    <aside
      dir="rtl"
      className="w-[177px] min-h-[calc(100vh-55px)] bg-[#f7f8fb] border-l border-[#e1e4e8] shrink-0"
    >
      <nav className="px-2 pt-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              h-[35px]
              px-3
              mb-[2px]
              rounded-[6px]
              flex
              items-center
              gap-2
              text-[11px]
              cursor-pointer
              transition
              ${
                isActive
                  ? "bg-[#e7edf5] text-[#27364a] font-bold"
                  : "text-[#697386] hover:bg-[#edf1f5]"
              }
            `}
          >
            <span className="w-[18px] text-center text-[15px]">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}