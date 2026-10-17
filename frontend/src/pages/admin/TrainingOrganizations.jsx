import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingOrganizations() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "جهات غير نشطة",
      value: "6",
      icon: "×",
    },
    {
      title: "جهات نشطة",
      value: "42",
      icon: "✓",
    },
    {
      title: "إجمالي الجهات",
      value: "48",
      icon: "▦",
    },
    {
      title: "إجمالي الطلاب المتدربين",
      value: "680",
      icon: "♟",
    },
    {
      title: "متوسط التقييم",
      value: "4.2",
      icon: "☆",
    },
  ];

  const organizations = [
    {
      id: 1,
      name: "شركة التقنية المتقدمة",
      field: "تكنولوجيا المعلومات",
      specializations: "برمجة، شبكات، أمن سيبراني",
      address: "رام الله - البيرة",
      contact: "0599123456",
      email: "info@tech.com",
      capacity: 20,
      rating: "4.5 ★",
      status: "نشطة",
    },
    {
      id: 2,
      name: "مستشفى القدس",
      field: "الصحة",
      specializations: "تمريض، مختبرات، صيدلة",
      address: "القدس",
      contact: "02-2345678",
      email: "hr@alqudsmed.ps",
      capacity: 15,
      rating: "4.2 ★",
      status: "نشطة",
    },
    {
      id: 3,
      name: "بنك فلسطين",
      field: "المال والأعمال",
      specializations: "محاسبة، إدارة أعمال، تسويق",
      address: "غزة",
      contact: "08-2822222",
      email: "training@bank.ps",
      capacity: 10,
      rating: "4.0 ★",
      status: "نشطة",
    },
    {
      id: 4,
      name: "شركة الهندسة الحديثة",
      field: "الهندسة",
      specializations: "هندسة مدنية، ميكانيكية، كهربائية",
      address: "الخليل",
      contact: "02-2223333",
      email: "hr@modern-eng.ps",
      capacity: 12,
      rating: "3.8 ★",
      status: "نشطة",
    },
    {
      id: 5,
      name: "مركز الإبداع الرقمي",
      field: "التقنية والإعلام",
      specializations: "تصميم جرافيكي، إعلام رقمي",
      address: "نابلس",
      contact: "09-2388888",
      email: "info@creativity.ps",
      capacity: 8,
      rating: "3.5 ★",
      status: "غير نشطة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "نشطة") {
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
                <span>جهات التدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                جهات التدريب
              </h1>
            </div>

            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => navigate("/admin/training-organizations/add")}
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
                + إضافة جهة جديدة
              </button>

              <button
                type="button"
                className="
                  h-[34px]
                  px-[15px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[11px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                ↓ تصدير البيانات
              </button>
            </div>
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
                placeholder="ابحث عن جهة تدريب بالاسم أو المجال أو الموقع ..."
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

            <div className="grid grid-cols-5 gap-[12px] mt-[10px]">
              <Filter label="المجال">
                <option>الكل</option>
                <option>تكنولوجيا المعلومات</option>
                <option>الصحة</option>
                <option>المال والأعمال</option>
                <option>الهندسة</option>
              </Filter>

              <Filter label="التخصصات المقبولة">
                <option>الكل</option>
                <option>هندسة البرمجيات</option>
                <option>تمريض</option>
                <option>إدارة الأعمال</option>
              </Filter>

              <Filter label="المدينة">
                <option>الكل</option>
                <option>غزة</option>
                <option>رام الله</option>
                <option>القدس</option>
                <option>نابلس</option>
              </Filter>

              <Filter label="التقييم">
                <option>الكل</option>
                <option>5 نجوم</option>
                <option>4 نجوم فأكثر</option>
                <option>3 نجوم فأكثر</option>
              </Filter>

              <Filter label="حالة التعاون">
                <option>الكل</option>
                <option>نشطة</option>
                <option>غير نشطة</option>
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
                قائمة الجهات
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
                      "اسم الجهة",
                      "المجال",
                      "التخصصات المقبولة",
                      "العنوان",
                      "التواصل",
                      "الطاقة الاستيعابية",
                      "التقييم",
                      "الحالة",
                      "إجراء",
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
                  {organizations.map((organization) => (
                    <tr
                      key={organization.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {organization.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {organization.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {organization.field}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {organization.specializations}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {organization.address}
                      </td>

                      <td className="px-[10px] py-[9px] text-[9px] text-[#4a5465]">
                        <div>{organization.contact}</div>
                        <div className="text-[#7a8393]">
                          {organization.email}
                        </div>
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {organization.capacity}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#2b3340]">
                        {organization.rating}
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
                            ${getStatusStyle(organization.status)}
                          `}
                        >
                          {organization.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/training-organizations/${organization.id}`
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
                          👁 عرض
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