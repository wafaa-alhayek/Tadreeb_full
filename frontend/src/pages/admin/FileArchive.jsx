import { useState } from "react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function FileArchive() {
  const [filters, setFilters] = useState({
    search: "",
    type: "الكل",
    student: "الكل",
    organization: "الكل",
    status: "الكل",
    dateRange: "",
  });

  const files = [
    {
      id: 1,
      name: "طلب_التدريب.pdf",
      type: "طلب",
      relatedTo: "أحمد خالد",
      date: "2025/06/01",
      status: "نشط",
      size: "245 KB",
    },
    {
      id: 2,
      name: "التقرير_النهائي.pdf",
      type: "تقرير",
      relatedTo: "أحمد خالد",
      date: "2025/08/30",
      status: "نشط",
      size: "1.2 MB",
    },
    {
      id: 3,
      name: "تقييم_الجهة.pdf",
      type: "تقييم",
      relatedTo: "أحمد خالد",
      date: "2025/08/30",
      status: "مؤرشف",
      size: "856 KB",
    },
    {
      id: 4,
      name: "شهادة_التدريب.pdf",
      type: "شهادة",
      relatedTo: "أحمد خالد",
      date: "2025/09/05",
      status: "نشط",
      size: "320 KB",
    },
    {
      id: 5,
      name: "مرفقات_أخرى.zip",
      type: "مرفق",
      relatedTo: "أحمد خالد",
      date: "2025/07/15",
      status: "نشط",
      size: "670 KB",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "الكل",
      student: "الكل",
      organization: "الكل",
      status: "الكل",
      dateRange: "",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "نشط") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#eceff4] text-[#596273]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>إدارة الملفات والأرشفة</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة الملفات والأرشفة
              </h1>
            </div>

            <button
              type="button"
              className="
                h-[34px]
                px-[15px]
                rounded-[7px]
                bg-[#4b5568]
                text-white
                text-[11px]
                font-semibold
                hover:bg-[#3f4858]
              "
            >
              + رفع ملف جديد
            </button>
          </div>

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
            <h2 className="text-[15px] font-bold text-[#1f2733] mb-[10px]">
              بحث وفلاتر
            </h2>

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
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="ابحث عن ملف ..."
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

            <div className="grid grid-cols-3 gap-[12px] mt-[10px]">
              <Filter
                label="نوع الملف"
                name="type"
                value={filters.type}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>طلب</option>
                <option>تقرير</option>
                <option>تقييم</option>
                <option>شهادة</option>
                <option>مرفق</option>
              </Filter>

              <Filter
                label="الطالب"
                name="student"
                value={filters.student}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>أحمد خالد</option>
                <option>سارة علي</option>
                <option>محمد عبد الله</option>
              </Filter>

              <Filter
                label="الجهة"
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
                label="الحالة"
                name="status"
                value={filters.status}
                onChange={handleChange}
              >
                <option>الكل</option>
                <option>نشط</option>
                <option>مؤرشف</option>
              </Filter>

              <div>
                <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                  الفترة الزمنية
                </label>

                <input
                  type="text"
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleChange}
                  placeholder="من تاريخ - إلى تاريخ"
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
                    placeholder:text-[#8a93a3]
                  "
                />
              </div>

              <div className="flex items-end gap-[8px]">
                <button
                  type="button"
                  className="
                    h-[38px]
                    px-[15px]
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
                    h-[38px]
                    px-[15px]
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
            </div>
          </section>

          {/* ================= FILES TABLE ================= */}
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
              <h2 className="text-[15px] font-bold text-[#1f2733]">
                قائمة الملفات
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "الإجراءات",
                      "الحالة",
                      "التاريخ",
                      "الطالب / المرتبط بـ",
                      "النوع",
                      "اسم الملف",
                      "الحجم",
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
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px]">
                        <div className="flex gap-[5px]">
                          <IconButton title="عرض">◉</IconButton>
                          <IconButton title="تحميل">↓</IconButton>
                          <IconButton title="أرشفة">▣</IconButton>
                        </div>
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
                            ${getStatusStyle(file.status)}
                          `}
                        >
                          {file.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {file.date}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {file.relatedTo}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {file.type}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {file.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {file.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= TABLE FOOTER ================= */}
            <div className="flex justify-between items-center px-[14px] py-[10px]">
              <span className="text-[10px] text-[#667085]">
                إجمالي الملفات: 25 ملف
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

function IconButton({ title, children }) {
  return (
    <button
      type="button"
      title={title}
      className="
        w-[28px]
        h-[28px]
        rounded-[6px]
        border
        border-[#b9c0cc]
        bg-white
        flex
        items-center
        justify-center
        text-[10px]
        text-[#3b4454]
        hover:bg-[#eef0f4]
      "
    >
      {children}
    </button>
  );
}