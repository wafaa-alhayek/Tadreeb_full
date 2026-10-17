import { useNavigate } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Certificates() {
  const navigate = useNavigate();

  const certificates = [
    {
      id: 1,
      student: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة البرمجيات",
      organization: "شركة الاتصالات",
      endDate: "2025/04/20",
      status: "صادرة",
    },
    {
      id: 2,
      student: "سارة علي",
      studentId: "20230876",
      specialization: "إدارة الأعمال",
      organization: "مؤسسة الإبداع",
      endDate: "2025/04/18",
      status: "صادرة",
    },
    {
      id: 3,
      student: "محمد علي",
      studentId: "20231234",
      specialization: "هندسة الشبكات",
      organization: "شركة الحلول",
      endDate: "2025/04/16",
      status: "قيد الإصدار",
    },
    {
      id: 4,
      student: "ليلى حسن",
      studentId: "20230987",
      specialization: "التصميم الجرافيكي",
      organization: "مركز الإبداع الرقمي",
      endDate: "2025/04/12",
      status: "صادرة",
    },
    {
      id: 5,
      student: "عمر يوسف",
      studentId: "20231109",
      specialization: "التسويق",
      organization: "شركة المستقبل",
      endDate: "2025/04/10",
      status: "ملغاة",
    },
    {
      id: 6,
      student: "نور أحمد",
      studentId: "20231456",
      specialization: "علوم الحاسوب",
      organization: "شركة التقنية",
      endDate: "2025/04/05",
      status: "صادرة",
    },
    {
      id: 7,
      student: "فاطمة الزهراء",
      studentId: "20231789",
      specialization: "المحاسبة",
      organization: "شركة الأمل",
      endDate: "2025/04/02",
      status: "قيد الإصدار",
    },
    {
      id: 8,
      student: "محمود عبد الله",
      studentId: "20232011",
      specialization: "هندسة مدنية",
      organization: "بلدية غزة",
      endDate: "2025/03/28",
      status: "صادرة",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "صادرة") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    if (status === "قيد الإصدار") {
      return "bg-[#fff1cc] text-[#8a6515]";
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
              <span>الشهادات</span>
            </div>

            <h1 className="text-[23px] font-bold text-[#1b2430]">
              الشهادات
            </h1>
          </div>

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[10px]">
            <StatCard
              title="إجمالي الشهادات"
              value="186"
              icon="☆"
            />

            <StatCard
              title="قيد الإصدار"
              value="24"
              icon="◷"
            />

            <StatCard
              title="تم إصدارها"
              value="142"
              icon="✓"
            />

            <StatCard
              title="ملغاة"
              value="6"
              icon="×"
            />
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
                  placeholder="بحث باسم الطالب أو الرقم الجامعي أو رقم الشهادة ..."
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

              <button
                type="button"
                onClick={() => navigate("/admin/certificates/issue")}
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
                + إصدار شهادة جديدة
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
              <Filter label="حالة الشهادة">
                <option>الكل</option>
                <option>صادرة</option>
                <option>قيد الإصدار</option>
                <option>ملغاة</option>
              </Filter>

              <Filter label="التخصص">
                <option>كل التخصصات</option>
                <option>هندسة البرمجيات</option>
                <option>إدارة الأعمال</option>
                <option>هندسة الشبكات</option>
              </Filter>

              <Filter label="جهة التدريب">
                <option>كل الجهات</option>
                <option>شركة الاتصالات</option>
                <option>مؤسسة الإبداع</option>
                <option>شركة الحلول</option>
              </Filter>

              <div>
                <label className="block text-[11px] font-semibold text-[#3b4454] mb-[4px]">
                  تاريخ الإنهاء
                </label>

                <input
                  type="text"
                  placeholder="من - إلى"
                  className="
                    w-full
                    h-[38px]
                    rounded-[8px]
                    border
                    border-[#c9cfd9]
                    px-[10px]
                    outline-none
                    text-[11px]
                    text-[#4a5465]
                    placeholder:text-[#8a93a3]
                  "
                />
              </div>

              <Filter label="سنة الشهادة">
                <option>كل السنوات</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </Filter>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px]">
            {/* ================= SIDE DETAILS ================= */}
            <aside className="w-[310px] shrink-0 grid gap-[10px] content-start">
              {/* Certificate Details */}
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
                  تفاصيل الشهادة
                </h2>

                <div className="flex items-center gap-[10px] mb-[10px]">
                  <div
                    className="
                      w-[46px]
                      h-[46px]
                      rounded-full
                      bg-[#eceff4]
                      flex
                      items-center
                      justify-center
                      text-[#8a93a3]
                    "
                  >
                    ♙
                  </div>

                  <div>
                    <h3 className="text-[13px] font-bold text-[#1f2733]">
                      أحمد خالد
                    </h3>

                    <p className="text-[10px] text-[#667085]">
                      20231045 · هندسة البرمجيات
                    </p>
                  </div>
                </div>

                <div className="grid gap-[8px]">
                  <DetailRow
                    label="جهة التدريب"
                    value="شركة الاتصالات"
                  />

                  <DetailRow
                    label="فرصة التدريب"
                    value="تطوير تطبيقات الويب"
                  />

                  <DetailRow
                    label="تاريخ الإصدار"
                    value="2025/04/20"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#7a8393]">
                      حالة الشهادة
                    </span>

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
                      صادرة
                    </span>
                  </div>

                  <DetailRow
                    label="رقم الشهادة"
                    value="C-2025-00123"
                  />
                </div>
              </section>

              {/* Certificate Preview */}
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
                  معاينة الشهادة
                </h2>

                <div className="border-2 border-[#4b5568] p-[6px]">
                  <div
                    className="
                      border
                      border-[#b9c0cc]
                      px-[12px]
                      py-[14px]
                      text-center
                    "
                  >
                    <div className="text-[14px] font-bold text-[#1f2733] mb-[5px]">
                      شهادة إتمام التدريب
                    </div>

                    <p className="text-[10px] text-[#4a5465]">
                      تمنح هذه الشهادة للطالب
                    </p>

                    <div className="text-[14px] font-bold text-[#1f2733] my-[4px]">
                      أحمد خالد
                    </div>

                    <p className="text-[10px] leading-[1.8] text-[#4a5465]">
                      لإتمامه برنامج التدريب الميداني
                      <br />
                      في شركة الاتصالات
                    </p>

                    <div className="flex items-center justify-between mt-[10px]">
                      <div
                        className="
                          w-[34px]
                          h-[34px]
                          rounded-[4px]
                          bg-[#eceff4]
                          flex
                          items-center
                          justify-center
                          text-[8px]
                          text-[#667085]
                        "
                      >
                        QR
                      </div>

                      <span className="text-[9px] text-[#667085]">
                        ختم الجامعة
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex gap-[6px]">
                <ActionButton text="طباعة" />
                <ActionButton text="↓ تحميل PDF" />
                <ActionButton text="إرسال للطالب" />
              </div>
            </aside>

            {/* ================= CERTIFICATES TABLE ================= */}
            <div className="flex-1 min-w-0">
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
                    قائمة الشهادات (186)
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
                          "الطالب",
                          "الرقم الجامعي",
                          "التخصص",
                          "جهة التدريب",
                          "تاريخ الانتهاء",
                          "حالة الشهادة",
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
                      {certificates.map((certificate) => (
                        <tr
                          key={certificate.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {certificate.id}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                            {certificate.student}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {certificate.studentId}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {certificate.specialization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#4a5465]">
                            {certificate.organization}
                          </td>

                          <td className="px-[9px] py-[9px] text-[10px] text-[#667085]">
                            {certificate.endDate}
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
                                ${getStatusStyle(certificate.status)}
                              `}
                            >
                              {certificate.status}
                            </span>
                          </td>

                          <td className="px-[9px] py-[9px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/certificates/${certificate.id}`
                                )
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
          </div>
        </main>
      </div>
    </div>
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
        flex-1
        min-h-[30px]
        px-[6px]
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