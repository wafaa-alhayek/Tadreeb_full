import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingOpportunities() {
  const navigate = useNavigate();

  const stats = [
    { title: "فرص نشطة", value: "32", icon: "◷" },
    { title: "الطلبة المسجلين", value: "186", icon: "♟" },
    { title: "التخصصات", value: "10", icon: "♙" },
    { title: "جهات التدريب", value: "12", icon: "▦" },
    { title: "إجمالي الفرص", value: "48", icon: "▣" },
  ];

  const opportunities = [
    {
      id: 1,
      title: "مطور برمجيات متدرب",
      organization: "شركة التقنية",
      specialization: "هندسة البرمجيات",
      students: 5,
      duration: "3 أشهر",
      location: "رام الله",
      availableDate: "2025/06/01",
      status: "متاحة",
    },
    {
      id: 2,
      title: "مساعد إداري",
      organization: "مستشفى القدس",
      specialization: "إدارة الأعمال",
      students: 3,
      duration: "2 شهر",
      location: "القدس",
      availableDate: "2025/05/20",
      status: "متاحة",
    },
    {
      id: 3,
      title: "تدريب في المحاسبة",
      organization: "شركة الأمانة",
      specialization: "المحاسبة",
      students: 4,
      duration: "3 أشهر",
      location: "غزة",
      availableDate: "2025/05/15",
      status: "مغلقة",
    },
    {
      id: 4,
      title: "تدريب في التصميم الجرافيكي",
      organization: "مؤسسة الإبداع",
      specialization: "التصميم الجرافيكي",
      students: 2,
      duration: "2 شهر",
      location: "الخليل",
      availableDate: "2025/05/10",
      status: "متاحة",
    },
    {
      id: 5,
      title: "تدريب في التسويق الرقمي",
      organization: "شركة المستقبل",
      specialization: "التسويق",
      students: 6,
      duration: "3 أشهر",
      location: "نابلس",
      availableDate: "2025/05/05",
      status: "متاحة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "متاحة") {
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
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>فرص التدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                فرص التدريب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/training-opportunities/add")}
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
              + إضافة فرصة تدريب جديدة
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
                placeholder="ابحث عن فرصة تدريب بالاسم أو الجهة أو التخصص ..."
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  text-[12px]
                  text-[#2b3340]
                  placeholder:text-[#8a93a3]
                "
              />

              <span className="text-[#8a93a3]">
                ⌕
              </span>
            </div>

            <div className="grid grid-cols-6 gap-[12px] mt-[10px]">
              <Filter label="الجهة التدريبية">
                <option>الكل</option>
                <option>شركة التقنية</option>
                <option>مستشفى القدس</option>
                <option>شركة الأمانة</option>
              </Filter>

              <Filter label="التخصص المطلوب">
                <option>الكل</option>
                <option>هندسة البرمجيات</option>
                <option>إدارة الأعمال</option>
                <option>المحاسبة</option>
              </Filter>

              <Filter label="المجال">
                <option>الكل</option>
                <option>تقنية</option>
                <option>صحة</option>
                <option>إدارة</option>
              </Filter>

              <Filter label="المدة">
                <option>الكل</option>
                <option>شهر</option>
                <option>شهرين</option>
                <option>3 أشهر</option>
              </Filter>

              <Filter label="المكان">
                <option>الكل</option>
                <option>غزة</option>
                <option>رام الله</option>
                <option>نابلس</option>
              </Filter>

              <Filter label="حالة الفرصة">
                <option>الكل</option>
                <option>متاحة</option>
                <option>مغلقة</option>
              </Filter>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-5 gap-[12px] mb-[12px]">
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

          {/* ================= TABLE ================= */}
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
                قائمة الفرص
              </h2>

              <div className="flex items-center gap-[10px]">
                <span className="text-[10px] text-[#667085]">
                  عدد الصفوف: 10
                </span>

                <button
                  type="button"
                  className="
                    h-[28px]
                    px-[11px]
                    rounded-[6px]
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "#",
                      "عنوان الفرصة",
                      "الجهة التدريبية",
                      "التخصص المطلوب",
                      "عدد الطلبة",
                      "مدة التدريب",
                      "المكان",
                      "تاريخ الإتاحة",
                      "الحالة",
                      "إجراءات",
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
                  {opportunities.map((opportunity) => (
                    <tr
                      key={opportunity.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {opportunity.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {opportunity.title}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {opportunity.organization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {opportunity.specialization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {opportunity.students}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {opportunity.duration}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {opportunity.location}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {opportunity.availableDate}
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
                            ${getStatusStyle(opportunity.status)}
                          `}
                        >
                          {opportunity.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/training-opportunities/${opportunity.id}`
                            )
                          }
                          className="
                            h-[28px]
                            px-[11px]
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
              {["‹", "1", "2", "3", "4", "5", "›"].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`
                    min-w-[30px]
                    h-[28px]
                    px-[7px]
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
          border
          border-[#c9cfd9]
          rounded-[8px]
          px-[10px]
          bg-white
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