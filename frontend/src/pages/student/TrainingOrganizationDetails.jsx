import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TrainingOrganizationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const opportunities = [
    {
      id: 1,
      title: "مطور برمجيات متدرب",
      specialization: "هندسة برمجيات",
      seats: 5,
      status: "مفتوحة",
      start: "2025/04/20",
      end: "2025/06/20",
    },
    {
      id: 2,
      title: "محلل بيانات",
      specialization: "علوم حاسوب",
      seats: 2,
      status: "مفتوحة",
      start: "2025/05/01",
      end: "2025/07/01",
    },
  ];

  const trainees = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      supervisor: "د. يوسف مصطفى",
      status: "مستمر",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "علوم حاسوب",
      supervisor: "أ. ليلى حسين",
      status: "مستمر",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      studentId: "20231234",
      specialization: "نظم معلومات",
      supervisor: "د. خالد محمد",
      status: "مكتمل",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "هندسة برمجيات",
      supervisor: "أ. أحمد مصطفى",
      status: "مكتمل",
    },
  ];

  const history = [
    {
      title: "تم إضافة جهة التدريب",
      details: "أحمد محمد - 2025/04/01",
    },
    {
      title: "تم تحديث بيانات الجهة",
      details: "أحمد محمد - 2025/04/10",
    },
    {
      title: "تم إضافة فرصة تدريب جديدة",
      details: "أحمد محمد - 2025/04/20",
    },
    {
      title: "تم تحديث تقييم الجهة",
      details: "أحمد محمد - 2025/05/01",
    },
  ];

  const specializations = [
    "هندسة برمجيات",
    "علوم حاسوب",
    "نظم معلومات",
    "تقنية الشبكات",
  ];

  const getStatusStyle = (status) => {
    if (
      status === "نشطة" ||
      status === "مفتوحة" ||
      status === "مستمر" ||
      status === "مكتمل"
    ) {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#e8ebf0] text-[#3b4454]";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-[12px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>جهات التدريب</span>
                <span>›</span>
                <span>تفاصيل جهة التدريب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تفاصيل جهة التدريب
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/training-organizations")}
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

          <div className="flex gap-[14px]">
            {/* ================= MAIN COLUMN ================= */}
            <div className="flex-1 min-w-0 grid gap-[10px] content-start">
              {/* Organization Header */}
              <section
                className="
                  border
                  border-[#dfe3ea]
                  rounded-[10px]
                  bg-white
                  px-[18px]
                  py-[14px]
                "
              >
                <div className="flex items-center gap-[18px]">
                  <div
                    className="
                      w-[110px]
                      h-[96px]
                      rounded-[8px]
                      bg-[#e6e9ef]
                      flex
                      items-center
                      justify-center
                      text-[#9aa3b2]
                      text-[30px]
                      shrink-0
                    "
                  >
                    ▦
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-[10px] mb-[8px]">
                      <h2 className="text-[20px] font-bold text-[#1f2733]">
                        شركة التقنية
                      </h2>

                      <span
                        className="
                          inline-flex
                          px-[10px]
                          py-[3px]
                          rounded-full
                          bg-[#dff1e6]
                          text-[#236a45]
                          text-[9px]
                          font-medium
                        "
                      >
                        نشطة
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-[24px] gap-y-[4px]">
                      <Details label="المجال" value="تقنية المعلومات" />
                      <Details label="رقم الهاتف" value="0599876543" />

                      <Details
                        label="العنوان"
                        value="غزة - شارع فلسطين"
                      />

                      <Details
                        label="البريد الإلكتروني"
                        value="info@tech.com"
                      />

                      <Details
                        label="المسؤول"
                        value="أحمد محمد"
                      />

                      <Details
                        label="الموقع الإلكتروني"
                        value="www.tech.com"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Specializations */}
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[9px]">
                  التخصصات المقبولة
                </h2>

                <div className="flex flex-wrap gap-[8px]">
                  {specializations.map((specialization) => (
                    <span
                      key={specialization}
                      className="
                        px-[12px]
                        py-[5px]
                        rounded-full
                        border
                        border-[#c9cfd9]
                        text-[10px]
                        text-[#4a5465]
                      "
                    >
                      {specialization}
                    </span>
                  ))}

                  <button
                    type="button"
                    className="
                      px-[12px]
                      py-[5px]
                      rounded-full
                      border
                      border-dashed
                      border-[#b9c0cc]
                      text-[10px]
                      text-[#4a5465]
                      hover:bg-[#eef0f4]
                    "
                  >
                    + إضافة تخصص
                  </button>
                </div>
              </section>

              {/* Current Opportunities */}
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
                    فرص التدريب الحالية
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/admin/training-opportunities/add")
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
                    + إضافة فرصة تدريب
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "اسم الفرصة",
                          "التخصص المطلوب",
                          "عدد المقاعد",
                          "الحالة",
                          "تاريخ البداية",
                          "تاريخ النهاية",
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
                      {opportunities.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[10px] py-[8px] text-[10px]">
                            {item.id}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px] font-semibold">
                            {item.title}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {item.specialization}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {item.seats}
                          </td>

                          <td className="px-[10px] py-[8px]">
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

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {item.start}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {item.end}
                          </td>

                          <td className="px-[10px] py-[8px]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/training-opportunities/${item.id}`
                                )
                              }
                              className="
                                h-[27px]
                                px-[10px]
                                rounded-[6px]
                                border
                                border-[#b9c0cc]
                                text-[9px]
                                text-[#3b4454]
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
              </section>

              {/* Current Students */}
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
                    الطلبة المتدربون حالياً
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "#",
                          "اسم الطالب",
                          "الرقم الجامعي",
                          "التخصص",
                          "اسم المشرف",
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
                            "
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {trainees.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[10px] py-[8px] text-[10px]">
                            {student.id}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px] font-semibold">
                            {student.name}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {student.studentId}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {student.specialization}
                          </td>

                          <td className="px-[10px] py-[8px] text-[10px]">
                            {student.supervisor}
                          </td>

                          <td className="px-[10px] py-[8px]">
                            <span
                              className={`
                                inline-flex
                                px-[9px]
                                py-[3px]
                                rounded-full
                                text-[9px]
                                ${getStatusStyle(student.status)}
                              `}
                            >
                              {student.status}
                            </span>
                          </td>

                          <td className="px-[10px] py-[8px]">
                            <button
                              type="button"
                              className="
                                h-[27px]
                                px-[10px]
                                rounded-[6px]
                                border
                                border-[#b9c0cc]
                                text-[9px]
                                text-[#3b4454]
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
              </section>
            </div>

            {/* ================= SIDE COLUMN ================= */}
            <aside className="w-[270px] shrink-0 grid gap-[10px] content-start">
              {/* Rating */}
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                  ☆ التقييم السابق
                </h2>

                <div className="text-[25px] font-bold text-[#1f2733]">
                  4.5 / 5
                </div>

                <div className="text-[15px] text-[#4b5568] my-[3px]">
                  ★★★★★
                </div>

                <p className="text-[10px] text-[#667085]">
                  عدد التقييمات: 8
                </p>
              </section>

              {/* Capacity */}
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
                <Details
                  label="الطاقة الاستيعابية"
                  value="10 طلاب"
                />

                <Details
                  label="عدد الطلبة الحاليين"
                  value="6 طلاب"
                />
              </section>

              {/* History */}
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
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                  سجل التعامل مع الجهة
                </h2>

                {history.map((item) => (
                  <div
                    key={item.title}
                    className="
                      flex
                      gap-[8px]
                      py-[7px]
                      border-b
                      border-[#eceff4]
                      last:border-b-0
                    "
                  >
                    <span className="text-[#8a93a3]">
                      ◷
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-[#2b3340]">
                        {item.title}
                      </p>

                      <p className="text-[9px] text-[#7a8393]">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              <button
                type="button"
                className="
                  w-full
                  h-[34px]
                  rounded-[7px]
                  border
                  border-[#b9c0cc]
                  bg-white
                  text-[11px]
                  text-[#3b4454]
                  hover:bg-[#eef0f4]
                "
              >
                ✎ تعديل الجهة
              </button>
            </aside>
          </div>

          <div className="hidden">{id}</div>
        </main>
      </div>
    </div>
  );
}

function Details({ label, value }) {
  return (
    <div className="flex gap-[8px] py-[3px] text-[10px]">
      <span className="text-[#7a8393] min-w-[85px]">
        {label}
      </span>

      <span className="font-semibold text-[#2b3340]">
        {value}
      </span>
    </div>
  );
}