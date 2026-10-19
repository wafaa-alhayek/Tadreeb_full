import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Supervisors() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "المشرفون النشطون",
      value: "45",
      icon: "♟",
    },
    {
      title: "مشرفو التدريب",
      value: "16",
      icon: "▣",
    },
    {
      title: "المشرفون الأكاديميون",
      value: "32",
      icon: "♙",
    },
    {
      title: "إجمالي المشرفين",
      value: "48",
      icon: "♟",
    },
  ];

  const supervisors = [
    {
      id: 1,
      name: "د. أحمد خالد",
      type: "أكاديمي",
      specialization: "إدارة الأعمال",
      organization: "كلية الاقتصاد",
      students: 8,
      status: "نشط",
    },
    {
      id: 2,
      name: "د. سارة علي",
      type: "أكاديمي",
      specialization: "المحاسبة",
      organization: "كلية الاقتصاد",
      students: 6,
      status: "نشط",
    },
    {
      id: 3,
      name: "م. محمد حمدي",
      type: "ميداني",
      specialization: "هندسة البرمجيات",
      organization: "شركة تكنولوجيا",
      students: 5,
      status: "نشط",
    },
    {
      id: 4,
      name: "م. ليلى حسن",
      type: "ميداني",
      specialization: "التصميم الجرافيكي",
      organization: "مؤسسة الإبداع",
      students: 7,
      status: "نشط",
    },
    {
      id: 5,
      name: "د. خالد يوسف",
      type: "أكاديمي",
      specialization: "اللغة الإنجليزية",
      organization: "كلية الآداب",
      students: 4,
      status: "معلق",
    },
  ];

  const supervisionLog = [
    {
      date: "2025/04/20",
      student: "أحمد خالد",
      organization: "شركة التقنية",
      opportunity: "مطور برمجيات متدرب",
      type: "ميداني",
      status: "مكتمل",
    },
    {
      date: "2025/04/18",
      student: "سارة علي",
      organization: "مؤسسة الإبداع",
      opportunity: "مصمم جرافيكي",
      type: "أكاديمي",
      status: "جاري",
    },
    {
      date: "2025/04/15",
      student: "محمد حسن",
      organization: "شركة الحلول",
      opportunity: "مهندس شبكات",
      type: "ميداني",
      status: "مكتمل",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "نشط" || status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "جاري") {
      return "bg-[#fff1cc] text-[#8a6515]";
    }

    return "bg-[#eceff4] text-[#596273]";
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
              <span>المشرفون</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              إدارة المشرفين
            </h1>
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            {stats.map((stat) => (
              <div
                key={stat.title}
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
                    {stat.title}
                  </p>

                  <p className="text-[22px] font-bold text-[#1f2733]">
                    {stat.value}
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
                  {stat.icon}
                </div>
              </div>
            ))}
          </section>

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
                  gap-[8px]
                "
              >
                <input
                  type="text"
                  placeholder="ابحث عن مشرف بالاسم أو التخصص ..."
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

                <span className="text-[#8a93a3]">⌕</span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/supervisors/add")}
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
                + إضافة مشرف جديد
              </button>

              <button
                type="button"
                className="
                  h-[38px]
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
                ↓ تصدير البيانات
              </button>
            </div>

            <div className="grid grid-cols-5 gap-[12px] mt-[10px]">
              <Filter label="نوع المشرف">
                <option>الكل</option>
                <option>أكاديمي</option>
                <option>ميداني</option>
              </Filter>

              <Filter label="التخصص">
                <option>كل التخصصات</option>
                <option>إدارة الأعمال</option>
                <option>المحاسبة</option>
                <option>هندسة البرمجيات</option>
              </Filter>

              <Filter label="الجهة">
                <option>كل الجهات</option>
                <option>كلية الاقتصاد</option>
                <option>شركة تكنولوجيا</option>
                <option>مؤسسة الإبداع</option>
              </Filter>

              <Filter label="الحالة">
                <option>الكل</option>
                <option>نشط</option>
                <option>معلق</option>
              </Filter>

              <Filter label="عدد الطلبة المكلفين">
                <option>الكل</option>
                <option>أقل من 5</option>
                <option>من 5 إلى 10</option>
                <option>أكثر من 10</option>
              </Filter>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= SIDE DETAILS ================= */}
            <aside className="w-[310px] shrink-0 grid gap-[10px] content-start">
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
                  تفاصيل المشرف
                </h2>

                <div className="flex items-center gap-[12px] mb-[10px]">
                  <div
                    className="
                      w-[54px]
                      h-[54px]
                      rounded-full
                      bg-[#eceff4]
                      flex
                      items-center
                      justify-center
                      text-[#8a93a3]
                      text-[20px]
                    "
                  >
                    ♙
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-[#1f2733]">
                      د. أحمد خالد
                    </h3>

                    <p className="text-[12px] text-[#667085]">
                      أكاديمي
                    </p>

                    <span
                      className="
                        inline-flex
                        mt-[4px]
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
                    label="التخصص"
                    value="إدارة الأعمال"
                  />

                  <DetailRow
                    label="الجهة"
                    value="كلية الاقتصاد"
                  />

                  <DetailRow
                    label="البريد الإلكتروني"
                    value="ahmed.khalid@azhar.edu.ps"
                  />

                  <DetailRow
                    label="رقم الهاتف"
                    value="0599123456"
                  />
                </div>

                <div
                  className="
                    mt-[10px]
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[11px]
                    py-[8px]
                    text-[10px]
                    text-[#4a5465]
                  "
                >
                  الطلبة المكلفين:{" "}
                  <strong className="text-[#1f2733]">
                    8 طلاب
                  </strong>
                </div>

                <div
                  className="
                    mt-[8px]
                    border
                    border-[#e1e5ec]
                    rounded-[8px]
                    bg-[#fbfcfd]
                    px-[11px]
                    py-[8px]
                    text-[10px]
                    text-[#4a5465]
                  "
                >
                  الطلبات الحالية:
                  <div className="font-semibold text-[#1f2733] mt-[2px]">
                    3 طلب قيد تدريب · 5 متابعة تدريب
                  </div>
                </div>
              </section>

              <div className="flex gap-[8px]">
                <button
                  type="button"
                  onClick={() => navigate("/admin/supervisors/1")}
                  className="
                    flex-1
                    h-[30px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[9px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  ✎ تعديل البيانات
                </button>

                <button
                  type="button"
                  className="
                    flex-1
                    h-[30px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[9px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  × إلغاء التكليف
                </button>
              </div>
            </aside>

            {/* ================= MAIN COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Supervisors Table */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    قائمة المشرفين
                  </h2>

                  <span className="text-[10px] text-[#667085]">
                    عدد الصفوف: 10
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "الاسم",
                          "النوع",
                          "التخصص",
                          "الجهة",
                          "عدد الطلبة المكلفين",
                          "الحالة",
                          "إجراءات",
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
                      {supervisors.map((supervisor) => (
                        <tr
                          key={supervisor.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {supervisor.id}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {supervisor.name}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {supervisor.type}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {supervisor.specialization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {supervisor.organization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {supervisor.students}
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
                                ${getStatusStyle(supervisor.status)}
                              `}
                            >
                              {supervisor.status}
                            </span>
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/admin/supervisors/${supervisor.id}`)
                              }
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

              {/* ================= SUPERVISION LOG ================= */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  overflow-hidden
                "
              >
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <h2 className="text-[15px] font-bold text-[#1f2733]">
                    سجل الإشرافات الأخيرة
                  </h2>

                  <button
                    type="button"
                    className="
                      h-[27px]
                      px-[10px]
                      rounded-[6px]
                      border
                      border-[#b9c0cc]
                      bg-white
                      text-[9px]
                      text-[#3b4454]
                    "
                  >
                    عرض الكل
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "التاريخ",
                          "الطالب",
                          "الجهة",
                          "الفرصة",
                          "نوع الإشراف",
                          "الحالة",
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
                      {supervisionLog.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.date}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold">
                            {item.student}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.organization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.opportunity}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px]">
                            {item.type}
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                ${getStatusStyle(item.status)}
                              `}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Filter({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
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
          text-[11px]
          text-[#4a5465]
        "
      >
        {children}
      </select>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p className="text-[10px] font-semibold text-[#2b3340] break-all">
        {value}
      </p>
    </div>
  );
}