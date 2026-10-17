import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseTrainers() {
  const navigate = useNavigate();

  const trainers = [
    {
      name: "أحمد خالد",
      specialization: "تقنية المعلومات",
      email: "trainer1@example.com",
      courses: 2,
      status: "نشط",
    },
    {
      name: "سارة أحمد",
      specialization: "تصميم وإعلام",
      email: "trainer2@example.com",
      courses: 2,
      status: "نشط",
    },
    {
      name: "محمد علي",
      specialization: "تحليل البيانات",
      email: "trainer3@example.com",
      courses: 2,
      status: "نشط",
    },
    {
      name: "ليان خالد",
      specialization: "مهارات مهنية",
      email: "trainer4@example.com",
      courses: 1,
      status: "نشط",
    },
    {
      name: "خالد عمر",
      specialization: "إدارة المشاريع",
      email: "trainer5@example.com",
      courses: 1,
      status: "معطل",
    },
  ];

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
          <div className="flex items-start justify-between mb-[6px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>المدربون</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                إدارة المدربين
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/course-trainers/add")}
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
              + إضافة مدرب
            </button>
          </div>

          <p className="text-[11px] text-[#667085] mb-[10px]">
            عرض مدربي الدورات وربطهم بالدورات التدريبية. مدربو الدورات منفصلون عن مشرفي التدريب الميداني.
          </p>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-3 gap-[12px] mb-[10px]">
            <StatCard title="المدربون المسجلون" value="24" />
            <StatCard title="مدربون نشطون" value="21" />
            <StatCard title="مدربون بدورات حالية" value="12" />
          </div>

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
                placeholder="ابحث باسم المدرب أو التخصص أو البريد الإلكتروني ..."
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
              <Filter label="التخصص">
                <option>جميع التخصصات</option>
                <option>تقنية المعلومات</option>
                <option>تصميم وإعلام</option>
                <option>تحليل البيانات</option>
                <option>مهارات مهنية</option>
                <option>إدارة المشاريع</option>
              </Filter>

              <Filter label="الحالة">
                <option>الكل</option>
                <option>نشط</option>
                <option>معطل</option>
              </Filter>

              <Filter label="الدورة">
                <option>الكل</option>
                <option>مهارات الحاسوب الأساسية</option>
                <option>أساسيات البرمجة</option>
              </Filter>
            </div>
          </section>

          {/* ================= TRAINERS TABLE ================= */}
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
                قائمة المدربين
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[#f1f3f7]">
                  <tr>
                    {[
                      "اسم المدرب",
                      "التخصص",
                      "بيانات التواصل",
                      "الدورات المرتبطة",
                      "الحالة",
                      "الإجراءات",
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
                  {trainers.map((trainer, index) => (
                    <tr
                      key={trainer.email}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[10px] text-[10px] font-bold text-[#2b3340]">
                        {trainer.name}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {trainer.specialization}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                        {trainer.email}
                      </td>

                      <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                        {trainer.courses} دورات
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <span
                          className={`
                            inline-flex
                            px-[9px]
                            py-[3px]
                            rounded-full
                            text-[9px]
                            font-medium
                            ${getStatusStyle(trainer.status)}
                          `}
                        >
                          {trainer.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[10px]">
                        <div className="flex gap-[6px]">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/course-trainers/${index + 1}`)
                            }
                            className="
                              h-[27px]
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
                            عرض ملف المدرب
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/course-trainers/${index + 1}/edit`
                              )
                            }
                            className="
                              h-[27px]
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
                            تعديل
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-end gap-[5px] px-[14px] py-[10px]">
              {["‹", "1", "2", "3", "4", "›"].map((page) => (
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
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      className="
        border
        border-[#dfe3ea]
        rounded-[10px]
        bg-white
        px-[14px]
        py-[10px]
      "
    >
      <p className="text-[10px] text-[#667085] mb-[2px]">
        {title}
      </p>

      <p className="text-[21px] font-bold text-[#1f2733]">
        {value}
      </p>
    </div>
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