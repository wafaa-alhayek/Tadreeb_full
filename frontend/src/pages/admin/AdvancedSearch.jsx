import { useState } from "react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    search: "",
    dataType: "جميع البيانات",

    students: true,
    trainingRequests: false,
    organizations: false,
    opportunities: false,
    supervisors: false,
    visits: false,
    evaluations: false,
    reports: false,
    certificates: false,

    college: "الكل",
    specialization: "هندسة برمجيات",
    trainingStatus: "مستمر",
    organization: "شركة التقنية",
    supervisor: "الكل",
    fromDate: "",
    toDate: "",
  });

  const results = [
    {
      id: 1,
      student: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      organization: "شركة التقنية",
      status: "مستمر",
      startDate: "2026/06/01",
      endDate: "2026/08/30",
    },
    {
      id: 2,
      student: "محمد علي",
      studentId: "20231052",
      specialization: "هندسة برمجيات",
      organization: "شركة التقنية",
      status: "مكتمل",
      startDate: "2026/05/01",
      endDate: "2026/07/30",
    },
    {
      id: 3,
      student: "سارة محمد",
      studentId: "20231061",
      specialization: "شبكات",
      organization: "مؤسسة الإبداع",
      status: "مستمر",
      startDate: "2026/06/15",
      endDate: "2026/09/15",
    },
  ];

  const dataOptions = [
    ["students", "الطلبة"],
    ["trainingRequests", "طلبات التدريب"],
    ["organizations", "جهات التدريب"],
    ["opportunities", "فرص التدريب"],
    ["supervisors", "المشرفون"],
    ["visits", "الزيارات"],
    ["evaluations", "التقييمات"],
    ["reports", "التقارير"],
    ["certificates", "الشهادات"],
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      dataType: "جميع البيانات",

      students: true,
      trainingRequests: false,
      organizations: false,
      opportunities: false,
      supervisors: false,
      visits: false,
      evaluations: false,
      reports: false,
      certificates: false,

      college: "الكل",
      specialization: "هندسة برمجيات",
      trainingStatus: "مستمر",
      organization: "شركة التقنية",
      supervisor: "الكل",
      fromDate: "",
      toDate: "",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#e2eaf5] text-[#375d8b]";
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
              <span>البحث المتقدم</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              البحث المتقدم
            </h1>
          </div>

          {/* ================= MAIN SEARCH ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[14px]
              py-[12px]
              mt-[8px]
              mb-[10px]
            "
          >
            <div className="flex gap-[12px] items-end">
              <div className="flex-1">
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  البحث
                </label>

                <div
                  className="
                    w-full
                    h-[40px]
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    bg-white
                    flex
                    items-center
                    px-[11px]
                    gap-[8px]
                  "
                >
                  <span className="text-[#8a93a3]">
                    ⌕
                  </span>

                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                    placeholder="ابحث عن طالب، رقم جامعي، جهة تدريب، فرصة تدريب ..."
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
                </div>
              </div>

              <div className="w-[260px]">
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  نوع البيانات
                </label>

                <select
                  name="dataType"
                  value={filters.dataType}
                  onChange={handleChange}
                  className="
                    w-full
                    h-[40px]
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
                  <option>جميع البيانات</option>
                  <option>الطلبة</option>
                  <option>طلبات التدريب</option>
                  <option>جهات التدريب</option>
                  <option>فرص التدريب</option>
                  <option>المشرفون</option>
                  <option>الزيارات</option>
                  <option>التقييمات</option>
                  <option>التقارير</option>
                  <option>الشهادات</option>
                </select>
              </div>
            </div>

            {/* ================= DATA TYPES ================= */}
            <div className="grid grid-cols-5 gap-x-[12px] gap-y-[8px] mt-[12px]">
              {dataOptions.map(([name, label]) => (
                <label
                  key={name}
                  className="
                    flex
                    items-center
                    gap-[8px]
                    text-[11px]
                    text-[#3b4454]
                    cursor-pointer
                  "
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={filters[name]}
                    onChange={handleChange}
                    className="accent-[#4b5568]"
                  />

                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* ================= ADVANCED FILTERS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[13px]
              mb-[10px]
            "
          >
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
              الفلاتر المتقدمة
            </h2>

            <div className="grid grid-cols-3 gap-x-[16px] gap-y-[10px]">
              <Filter
                label="الكلية / القسم"
                name="college"
                value={filters.college}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>كلية الهندسة</option>
                <option>كلية العلوم</option>
                <option>كلية الاقتصاد</option>
              </Filter>

              <Filter
                label="التخصص"
                name="specialization"
                value={filters.specialization}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>هندسة برمجيات</option>
                <option>شبكات</option>
                <option>علوم حاسوب</option>
              </Filter>

              <Filter
                label="حالة التدريب"
                name="trainingStatus"
                value={filters.trainingStatus}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>مستمر</option>
                <option>مكتمل</option>
                <option>لم يبدأ</option>
              </Filter>

              <Filter
                label="جهة التدريب"
                name="organization"
                value={filters.organization}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>شركة التقنية</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الاتصالات</option>
              </Filter>

              <Filter
                label="المشرف الأكاديمي"
                name="supervisor"
                value={filters.supervisor}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>د. أحمد محمد</option>
                <option>د. محمد علي</option>
                <option>أ. ليلى حسن</option>
              </Filter>

              <div>
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  الفترة الزمنية
                </label>

                <div className="grid grid-cols-2 gap-[10px]">
                  <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleChange}
                    className="
                      w-full
                      h-[38px]
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[9px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  />

                  <input
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleChange}
                    className="
                      w-full
                      h-[38px]
                      rounded-[8px]
                      border
                      border-[#c9cfd9]
                      bg-white
                      px-[9px]
                      outline-none
                      text-[10px]
                      text-[#4a5465]
                    "
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-[10px] mt-[10px]">
              <button
                type="button"
                className="
                  h-[34px]
                  px-[16px]
                  rounded-[7px]
                  bg-[#4b5568]
                  text-white
                  text-[10px]
                  font-semibold
                  hover:bg-[#3f4858]
                "
              >
                بحث
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  h-[34px]
                  px-[16px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[10px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                إعادة تعيين
              </button>
            </div>
          </section>

          {/* ================= SEARCH RESULTS ================= */}
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
              <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                نتائج البحث
              </h2>

              <div className="flex gap-[8px]">
                <button
                  type="button"
                  className="
                    h-[30px]
                    px-[11px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[9px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  ↓ تصدير PDF
                </button>

                <button
                  type="button"
                  className="
                    h-[30px]
                    px-[11px]
                    rounded-[6px]
                    border
                    border-[#b9c0cc]
                    bg-white
                    text-[9px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  ↓ تصدير Excel
                </button>
              </div>
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
                      "الحالة",
                      "تاريخ البداية",
                      "تاريخ النهاية",
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
                  {results.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                        {item.id}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {item.student}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.studentId}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.specialization}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                        {item.organization}
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
                            ${getStatusStyle(item.status)}
                          `}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                        {item.startDate}
                      </td>

                      <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                        {item.endDate}
                      </td>

                      <td className="px-[9px] py-[9px]">
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

            {/* ================= RESULT FOOTER ================= */}
            <div className="flex justify-between items-center px-[14px] py-[10px]">
              <span className="text-[10px] text-[#667085]">
                عدد النتائج: 3
              </span>

              <div className="flex gap-[5px]">
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Filter({
  label,
  name,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
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