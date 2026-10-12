import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "الرئيسية", icon: "⌂", path: "/dashboard" },
    { name: "فرص التدريب", icon: "⌕", path: "/opportunities" },
    { name: "طلباتي", icon: "▤", path: "/applications" },
    { name: "ملفي التدريبي", icon: "□", path: "/training-profile" },
    { name: "الحضور والغياب", icon: "▣", path: "/attendance" },
    { name: "التقارير", icon: "▥", path: "/reports" },
    { name: "التقييم", icon: "☆", path: "/evaluation" },
    { name: "إنهاء التدريب", icon: "⚑", path: "/finish-training" },
    { name: "الشهادة", icon: "♙", path: "/certificate" },
    { name: "الإشعارات", icon: "♧", path: "/notifications" },
    { name: "الملف الشخصي", icon: "♙", path: "/profile" },
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