import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Users() {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "أحمد محمد علي",
      employeeId: "TR-001",
      role: "مسؤول التدريب",
      department: "إدارة التدريب",
      status: "نشط",
      lastLogin: "2025/04/20 10:24",
    },
    {
      id: 2,
      name: "سارة أحمد حسن",
      employeeId: "ST-002",
      role: "مشرف أكاديمي",
      department: "كلية الهندسة",
      status: "نشط",
      lastLogin: "2025/04/19 14:32",
    },
    {
      id: 3,
      name: "محمد خالد محمود",
      employeeId: "ST-003",
      role: "جهة تدريب",
      department: "مؤسسة المستقبل",
      status: "نشط",
      lastLogin: "2025/04/18 09:15",
    },
    {
      id: 4,
      name: "ليلى حسن علي",
      employeeId: "AD-004",
      role: "مدير قسم",
      department: "كلية العلوم",
      status: "نشط",
      lastLogin: "2025/04/17 16:45",
    },
    {
      id: 5,
      name: "عمر يوسف أحمد",
      employeeId: "ST-005",
      role: "مشرف ميداني",
      department: "شركة النهضة",
      status: "معطل",
      lastLogin: "2025/04/12 11:20",
    },
    {
      id: 6,
      name: "فاطمة الزهراء محمد",
      employeeId: "AD-006",
      role: "مدقق جودة",
      department: "وحدة الجودة",
      status: "نشط",
      lastLogin: "2025/04/10 13:50",
    },
  ];

  const statusStyle = (status) => {
    if (status === "نشط") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#fbe1e1] text-[#a22b2b]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="mb-[10px]">
            <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
              <span>الرئيسية</span>
              <span>›</span>
              <span>الإعدادات</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              إدارة المستخدمين والصلاحيات
            </h1>
          </div>

          {/* ================= TABS ================= */}
          <div className="flex gap-[6px] mb-[12px] border-b border-[#dfe3ea]">
            <Tab
              label="إدارة المستخدمين"
              active
            />

            <Tab
              label="الأدوار والصلاحيات"
              onClick={() => navigate("/admin/users/permissions")}
            />

            <Tab label="سجل العمليات" />
            <Tab label="إعدادات النظام" />
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard
              title="إجمالي المستخدمين"
              value="48"
              icon="♟"
            />

            <StatCard
              title="المستخدمون النشطون"
              value="42"
              icon="✓"
            />

            <StatCard
              title="المستخدمون المعطلون"
              value="6"
              icon="×"
            />

            <StatCard
              title="المستخدمون الجدد (هذا الشهر)"
              value="8"
              icon="+"
            />
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= USER DETAILS ================= */}
            <aside className="w-[310px] shrink-0 grid gap-[10px] content-start">
              {/* User Details */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                  تفاصيل المستخدم
                </h2>

                <div className="flex gap-[12px] items-center mb-[10px]">
                  <div
                    className="
                      w-[54px]
                      h-[54px]
                      rounded-full
                      bg-[#eceff4]
                      flex
                      items-center
                      justify-center
                      text-[22px]
                      text-[#8a93a3]
                    "
                  >
                    ♙
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-[#1f2733]">
                      أحمد محمد علي
                    </h3>

                    <p className="text-[10px] text-[#667085] mb-[4px]">
                      مسؤول التدريب
                    </p>

                    <span
                      className="
                        inline-flex
                        px-[9px]
                        py-[3px]
                        rounded-full
                        bg-[#dff1e6]
                        text-[#236a45]
                        text-[9px]
                      "
                    >
                      نشط
                    </span>
                  </div>
                </div>

                <div className="grid gap-[8px]">
                  <DetailRow
                    label="الرقم الوظيفي"
                    value="TR-001"
                  />

                  <DetailRow
                    label="البريد الجامعي"
                    value="ahmed@azhar.edu.ps"
                  />

                  <DetailRow
                    label="رقم الجوال"
                    value="0599123456"
                  />

                  <DetailRow
                    label="القسم/الجهة"
                    value="إدارة التدريب"
                  />

                  <DetailRow
                    label="تاريخ الانضمام"
                    value="2023/09/01"
                  />
                </div>
              </section>

              {/* Roles */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                  الأدوار والصلاحيات
                </h2>

                <div className="flex items-center justify-between gap-[10px]">
                  <span
                    className="
                      inline-flex
                      px-[10px]
                      py-[4px]
                      rounded-full
                      bg-[#eceff4]
                      text-[#4a5465]
                      text-[9px]
                      font-semibold
                    "
                  >
                    مسؤول التدريب
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/users/permissions")}
                    className="
                      h-[28px]
                      px-[10px]
                      rounded-[6px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[9px]
                      text-[#3b4454]
                      hover:bg-[#eef0f4]
                    "
                  >
                    عرض الصلاحيات
                  </button>
                </div>
              </section>

              {/* Activity Stats */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[14px]
                  py-[12px]
                "
              >
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                  إحصائيات النشاط
                </h2>

                <div className="grid gap-[8px]">
                  <DetailRow
                    label="آخر دخول"
                    value="2025/04/20 10:24"
                  />

                  <DetailRow
                    label="عدد العمليات"
                    value="124"
                  />

                  <DetailRow
                    label="المهام المنجزة"
                    value="98"
                  />
                </div>
              </section>

              {/* Actions */}
              <div className="flex gap-[6px] flex-wrap">
                <ActionButton text="تعديل" />
                <ActionButton text="تعطيل" />
                <ActionButton text="إعادة تعيين كلمة المرور" />
              </div>
            </aside>

            {/* ================= USERS LIST ================= */}
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
              <div className="px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
                  قائمة المستخدمين
                </h2>

                <div className="flex items-center gap-[10px]">
                  <div
                    className="
                      flex-1
                      h-[38px]
                      border
                      border-[#c9cfd9]
                      rounded-[8px]
                      flex
                      items-center
                      px-[12px]
                    "
                  >
                    <input
                      type="text"
                      placeholder="ابحث بالاسم أو الرقم الوظيفي ..."
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

                  <button
                    type="button"
                    className="
                      h-[38px]
                      px-[14px]
                      rounded-[7px]
                      bg-[#4b5568]
                      text-white
                      text-[10px]
                      font-semibold
                      hover:bg-[#3f4858]
                    "
                  >
                    + إضافة مستخدم جديد
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "#",
                        "الاسم",
                        "الرقم الوظيفي",
                        "الدور",
                        "القسم/الجهة",
                        "الحالة",
                        "آخر دخول",
                        "الإجراءات",
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
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                          {user.id}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                          {user.name}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                          {user.employeeId}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                          {user.role}
                        </td>

                        <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                          {user.department}
                        </td>

                        <td className="px-[9px] py-[9px]">
                          <span
                            className={`
                              inline-flex
                              px-[9px]
                              py-[3px]
                              rounded-full
                              text-[9px]
                              font-medium
                              ${statusStyle(user.status)}
                            `}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-[9px] py-[9px] text-[9px] text-[#667085] whitespace-nowrap">
                          {user.lastLogin}
                        </td>

                        <td className="px-[9px] py-[9px]">
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/admin/users/permissions")
                            }
                            className="
                              h-[27px]
                              px-[10px]
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
                {["‹", "1", "2", "3", "4", "5", "›"].map((page) => (
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
          </div>
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

function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[10px]
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p className="text-[10px] text-[#667085] mb-[2px]">
          {title}
        </p>

        <p className="text-[22px] font-bold text-[#1f2733]">
          {value}
        </p>
      </div>

      <div
        className="
          w-[38px]
          h-[38px]
          rounded-[10px]
          bg-[#eceff4]
          flex
          items-center
          justify-center
          text-[#667085]
        "
      >
        {icon}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <span className="text-[10px] text-[#7a8393]">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-[#2b3340] text-left">
        {value}
      </span>
    </div>
  );
}

function ActionButton({ text }) {
  return (
    <button
      type="button"
      className="
        h-[30px]
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
      {text}
    </button>
  );
}