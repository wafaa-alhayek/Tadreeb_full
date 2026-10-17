import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function SupervisorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const students = [
    {
      id: 1,
      name: "أحمد خالد",
      studentId: "20231045",
      specialization: "هندسة برمجيات",
      organization: "شركة التقنية",
      status: "مستمر",
    },
    {
      id: 2,
      name: "سارة علي",
      studentId: "20230876",
      specialization: "هندسة برمجيات",
      organization: "مؤسسة الإبداع",
      status: "مستمر",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      studentId: "20231234",
      specialization: "علوم حاسوب",
      organization: "شركة التقنية",
      status: "مكتمل",
    },
    {
      id: 4,
      name: "ليلى حسن",
      studentId: "20230987",
      specialization: "هندسة برمجيات",
      organization: "مؤسسة الإبداع",
      status: "مستمر",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "مكتمل") {
      return "bg-[#dff1e6] text-[#236a45]";
    }

    return "bg-[#fff1cc] text-[#8a6515]";
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

                <span
                  onClick={() => navigate("/admin/supervisors")}
                  className="cursor-pointer hover:text-[#4b5568]"
                >
                  المشرفون
                </span>

                <span>›</span>
                <span>تفاصيل المشرف</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                تفاصيل المشرف
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/supervisors")}
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

          {/* ================= SUPERVISOR STATUS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[10px]
              mb-[10px]
              flex
              items-center
              gap-[12px]
              flex-wrap
            "
          >
            <span className="text-[11px] text-[#3b4454]">
              حالة المشرف:
            </span>

            <div className="flex items-center gap-[8px]">
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
                فعال
              </span>

              <div
                className="
                  w-[40px]
                  h-[22px]
                  rounded-full
                  bg-[#4b5568]
                  relative
                "
              >
                <div
                  className="
                    absolute
                    top-[3px]
                    right-[3px]
                    w-[16px]
                    h-[16px]
                    rounded-full
                    bg-white
                  "
                />
              </div>
            </div>

            <div className="flex-1" />

            <button
              type="button"
              className="
                h-[29px]
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
              عرض الطلبة
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/visits")}
              className="
                h-[29px]
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
              عرض الزيارات
            </button>

            <button
              type="button"
              className="
                h-[29px]
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
              ✎ تعديل بيانات المشرف
            </button>
          </section>

          {/* ================= SUPERVISOR INFO ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              px-[16px]
              py-[14px]
              mb-[10px]
            "
          >
            <div className="flex items-center gap-[7px] mb-[12px]">
              <span className="text-[#667085]">♙</span>

              <h2 className="text-[15px] font-bold text-[#1f2733]">
                معلومات المشرف
              </h2>
            </div>

            <div className="flex gap-[18px] items-center">
              <div
                className="
                  w-[120px]
                  h-[120px]
                  rounded-[10px]
                  bg-[#eceff4]
                  flex
                  items-center
                  justify-center
                  text-[36px]
                  text-[#8a93a3]
                  shrink-0
                "
              >
                ♙
              </div>

              <div className="grid grid-cols-3 gap-[8px] flex-1">
                <InfoBox
                  label="اسم المشرف"
                  value="د. أحمد محمد"
                />

                <InfoBox
                  label="الرقم الوظيفي"
                  value="10235"
                />

                <InfoBox
                  label="رقم الهاتف"
                  value="0591234567"
                />

                <InfoBox
                  label="الكلية"
                  value="كلية الهندسة"
                />

                <InfoBox
                  label="البريد الإلكتروني"
                  value="ahmad@azhar.edu.ps"
                />

                <InfoBox
                  label="القسم"
                  value="هندسة البرمجيات"
                />

                <InfoBox
                  label="التخصص"
                  value="هندسة برمجيات"
                />

                <InfoBox
                  label="نوع المشرف"
                  value="مشرف أكاديمي"
                />

                <InfoBox
                  label="عدد الطلبة المكلف بمتابعتهم"
                  value="8"
                />
              </div>
            </div>
          </section>

          {/* ================= SUPERVISION SUMMARY ================= */}
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
            <div className="flex items-center gap-[7px] mb-[10px]">
              <span className="text-[#667085]">▥</span>

              <h2 className="text-[15px] font-bold text-[#1f2733]">
                ملخص الإشراف
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-[10px]">
              <InfoBox
                label="عدد الطلبة"
                value="8"
              />

              <InfoBox
                label="آخر زيارة"
                value="2025/05/28"
              />

              <InfoBox
                label="آخر تقرير متابعة"
                value="2025/06/05"
              />

              <InfoBox
                label="آخر تحديث"
                value="2025/06/10"
              />
            </div>
          </section>

          {/* ================= ASSIGNED STUDENTS ================= */}
          <section
            className="
              border
              border-[#dfe3ea]
              rounded-[10px]
              bg-white
              overflow-hidden
            "
          >
            <div className="flex items-center gap-[7px] px-[14px] py-[10px]">
              <span className="text-[#667085]">♟</span>

              <h2 className="text-[15px] font-bold text-[#1f2733]">
                الطلبة المكلف بمتابعتهم
              </h2>
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
                      "حالة التدريب",
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
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-[#eceff4] last:border-b-0"
                    >
                      <td className="px-[10px] py-[9px] text-[10px] text-[#667085]">
                        {student.id}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] font-semibold text-[#2b3340]">
                        {student.name}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.studentId}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.specialization}
                      </td>

                      <td className="px-[10px] py-[9px] text-[10px] text-[#4a5465]">
                        {student.organization}
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
                            ${getStatusStyle(student.status)}
                          `}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-[10px] py-[9px]">
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

            <div className="px-[14px] py-[9px] text-[10px] text-[#667085]">
              1 من 2
            </div>
          </section>

          <div className="hidden">{id}</div>
        </main>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div
      className="
        border
        border-[#e1e5ec]
        rounded-[8px]
        bg-[#fbfcfd]
        px-[11px]
        py-[8px]
      "
    >
      <p className="text-[9px] text-[#7a8393] mb-[2px]">
        {label}
      </p>

      <p className="text-[10px] font-semibold text-[#2b3340] break-words">
        {value}
      </p>
    </div>
  );
}