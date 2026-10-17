import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Permissions() {
  const navigate = useNavigate();

  const roles = [
    "مسؤول النظام",
    "مسؤول التدريب",
    "رئيس القسم / الأكاديمي",
    "المشرف الأكاديمي",
    "المدرب",
    "الطالب",
    "جهة التدريب",
  ];

  const permissionRows = [
    "إدارة المستخدمين",
    "إدارة الأدوار",
    "إدارة الصلاحيات",
    "إدارة الطلبات",
    "إدارة التدريب",
    "التقارير والإحصائيات",
    "سجل العمليات",
  ];

  const [permissions, setPermissions] = useState(() => {
    const initial = {};

    permissionRows.forEach((row) => {
      initial[row] = {
        view: true,
        add: true,
        delete: true,
        approve: true,
        export: true,
      };
    });

    return initial;
  });

  const operations = [
    {
      id: 1,
      user: "أحمد محمد",
      operation: "تعديل",
      target: "جهة تدريب",
      date: "2025/06/10 10:30 ص",
      ip: "192.168.1.10",
      details: "تم تعديل بيانات جهة التدريب (شركة التقنية)",
    },
    {
      id: 2,
      user: "سارة علي",
      operation: "إضافة",
      target: "مستخدم جديد",
      date: "2025/06/09 02:15 م",
      ip: "192.168.1.15",
      details: "تم إضافة مستخدم (محمد خالد)",
    },
    {
      id: 3,
      user: "محمد خالد",
      operation: "تسجيل دخول",
      target: "النظام",
      date: "2025/06/08 09:45 ص",
      ip: "192.168.1.22",
      details: "تسجيل الدخول إلى النظام",
    },
    {
      id: 4,
      user: "ليلى حسن",
      operation: "اعتماد",
      target: "طلب تدريب",
      date: "2025/06/07 04:20 م",
      ip: "192.168.1.30",
      details: "تم اعتماد طلب التدريب رقم (TR-2025-001)",
    },
  ];

  const togglePermission = (row, key) => {
    setPermissions((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [key]: !prev[row][key],
      },
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الإعدادات</span>
                <span>›</span>
                <span>الأدوار والصلاحيات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة المستخدمين والصلاحيات
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="
                h-[30px]
                px-[12px]
                rounded-[6px]
                border
                border-[#b9c0cc]
                bg-white
                text-[10px]
                text-[#3b4454]
                hover:bg-[#eef0f4]
              "
            >
              رجوع ←
            </button>
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[6px] mb-[12px] border-b border-[#dfe3ea]">
            <Tab
              label="إدارة المستخدمين"
              onClick={() => navigate("/admin/users")}
            />

            <Tab
              label="الأدوار والصلاحيات"
              active
            />

            <Tab label="سجل العمليات" />
            <Tab label="إعدادات النظام" />
          </div>

          {/* ================= ROLES + PERMISSIONS ================= */}
          <div className="flex gap-[14px] mb-[12px]">
            {/* Roles */}
            <section
              className="
                w-[240px]
                shrink-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                px-[14px]
                py-[12px]
              "
            >
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                الأدوار
              </h2>

              <div className="grid gap-[3px]">
                {roles.map((role, index) => (
                  <button
                    key={role}
                    type="button"
                    className={`
                      w-full
                      text-right
                      px-[12px]
                      py-[8px]
                      rounded-[8px]
                      text-[11px]
                      transition
                      ${
                        index === 0
                          ? "bg-[#e1e6ee] text-[#1f2733] font-bold"
                          : "text-[#4a5465] hover:bg-[#f3f5f8]"
                      }
                    `}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </section>

            {/* Permissions */}
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
              <div className="px-[14px] py-[10px] border-b border-[#eceff4]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  الصلاحيات — مسؤول النظام
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "الصلاحية",
                        "عرض",
                        "إضافة",
                        "حذف",
                        "اعتماد",
                        "تصدير",
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
                            text-center
                            first:text-right
                          "
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {permissionRows.map((row) => (
                      <tr
                        key={row}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                          {row}
                        </td>

                        {[
                          "view",
                          "add",
                          "delete",
                          "approve",
                          "export",
                        ].map((key) => (
                          <td
                            key={key}
                            className="px-[10px] py-[10px] text-center"
                          >
                            <input
                              type="checkbox"
                              checked={permissions[row][key]}
                              onChange={() =>
                                togglePermission(row, key)
                              }
                              className="
                                w-[15px]
                                h-[15px]
                                accent-[#4b5568]
                                cursor-pointer
                              "
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* ================= OPERATION LOG ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              overflow-hidden
            "
          >
            <div className="px-[14px] pt-[12px]">
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                سجل العمليات
              </h2>

              {/* Filters */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-[10px] items-end mb-[10px]">
                <Filter label="المستخدم">
                  <option>جميع المستخدمين</option>
                  <option>أحمد محمد</option>
                  <option>سارة علي</option>
                  <option>محمد خالد</option>
                  <option>ليلى حسن</option>
                </Filter>

                <Filter label="العملية">
                  <option>جميع العمليات</option>
                  <option>إضافة</option>
                  <option>تعديل</option>
                  <option>اعتماد</option>
                  <option>تسجيل دخول</option>
                </Filter>

                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    من تاريخ
                  </label>

                  <input
                    type="date"
                    className="
                      w-full
                      h-[36px]
                      rounded-[7px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[10px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                    إلى تاريخ
                  </label>

                  <input
                    type="date"
                    className="
                      w-full
                      h-[36px]
                      rounded-[7px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[10px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  />
                </div>

                <button
                  type="button"
                  className="
                    h-[36px]
                    px-[14px]
                    rounded-[7px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  تصفية
                </button>
              </div>
            </div>

            {/* Log Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "المستخدم",
                      "العملية",
                      "الهدف / العنصر",
                      "التاريخ والوقت",
                      "عنوان IP",
                      "التفاصيل",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="
                          px-[9px]
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
                  {operations.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                        {item.id}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {item.user}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.operation}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.target}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085] whitespace-nowrap">
                        {item.date}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085] whitespace-nowrap">
                        {item.ip}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Tab({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-[14px]
        py-[9px]
        text-[11px]
        border-b-2
        transition
        ${
          active
            ? "border-[#4b5568] text-[#1f2733] font-bold"
            : "border-transparent text-[#667085] hover:text-[#3b4454]"
        }
      `}
    >
      {label}
    </button>
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
          h-[36px]
          rounded-[7px]
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