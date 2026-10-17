import { useState } from "react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseAttendance() {
  const [session, setSession] = useState("الجلسة الأولى — 2026/11/15");

  const [attendance, setAttendance] = useState({
    "20241001": "حاضر",
    "20241002": "حاضر",
    "20241003": "غائب",
    "20241004": "غائب بعذر",
  });

  const students = [
    {
      studentId: "20241001",
      name: "أحمد محمد",
      note: "—",
    },
    {
      studentId: "20241002",
      name: "سارة خالد",
      note: "—",
    },
    {
      studentId: "20241003",
      name: "محمد علي",
      note: "—",
    },
    {
      studentId: "20241004",
      name: "نور حسن",
      note: "مبرر / مرفق إثبات",
    },
  ];

  const previousSessions = [
    {
      session: "الجلسة الأولى",
      date: "2026/11/15",
      present: 2,
      absent: 2,
    },
    {
      session: "الجلسة الثانية",
      date: "2026/11/17",
      present: 3,
      absent: 1,
    },
    {
      session: "الجلسة الثالثة",
      date: "2026/11/19",
      present: 3,
      absent: 1,
    },
  ];

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-[24px] pt-[14px] pb-[20px]">
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الدورات التدريبية</span>
                <span>›</span>
                <span>الحضور والغياب</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                الحضور والغياب
              </h1>
            </div>

            <div
              className="
                border
                border-[#dfe3ea]
                rounded-[8px]
                bg-[#fbfcfd]
                px-[12px]
                py-[7px]
              "
            >
              <p className="text-[9px] text-[#7a8393]">
                الدورة الحالية
              </p>

              <p className="text-[10px] font-semibold text-[#2b3340]">
                مهارات الحاسوب الأساسية
              </p>
            </div>
          </div>

          {/* ================= SESSION + STATS ================= */}
          <div
            className="
              grid
              grid-cols-[1.2fr_1fr_1fr_1fr_1fr]
              gap-[12px]
              items-end
              mb-[10px]
            "
          >
            <div>
              <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                اختاري الجلسة
              </label>

              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="
                  w-full
                  h-[40px]
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
                <option>الجلسة الأولى — 2026/11/15</option>
                <option>الجلسة الثانية — 2026/11/17</option>
                <option>الجلسة الثالثة — 2026/11/19</option>
              </select>
            </div>

            <StatCard title="حاضر" value="2" />
            <StatCard title="غائب" value="1" />
            <StatCard title="بعذر" value="1" />
            <StatCard title="نسبة الحضور" value="75%" />
          </div>

          {/* ================= ABSENCE ALERT ================= */}
          <div
            className="
              border
              border-[#ecd48a]
              bg-[#fbf0d4]
              rounded-[9px]
              px-[13px]
              py-[10px]
              mb-[10px]
              flex
              gap-[10px]
              items-center
            "
          >
            <span
              className="
                w-[28px]
                h-[28px]
                rounded-full
                bg-[#f8df9a]
                text-[#7a5c13]
                flex
                items-center
                justify-center
                font-bold
                shrink-0
              "
            >
              !
            </span>

            <div>
              <p className="text-[11px] font-bold text-[#5f4b18]">
                تنبيه غياب متكرر
              </p>

              <p className="text-[9px] text-[#75683e] mt-[2px]">
                المتدرب «محمد علي» غاب عن جلستين متتاليتين. حدّ التنبيه يُحدَّد حسب سياسة الجامعة.
              </p>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex gap-[14px] items-start">
            {/* ================= ATTENDANCE REGISTER ================= */}
            <section
              className="
                flex-[1.5]
                min-w-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                overflow-hidden
              "
            >
              <div className="px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733] mb-[8px]">
                  تسجيل الحضور
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
                    placeholder="الاسم أو الرقم الجامعي ..."
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
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "الرقم الجامعي",
                        "اسم المتدرب",
                        "حالة الحضور",
                        "ملاحظات",
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
                        key={student.studentId}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                          {student.studentId}
                        </td>

                        <td className="px-[10px] py-[10px] text-[10px] font-bold text-[#2b3340]">
                          {student.name}
                        </td>

                        <td className="px-[10px] py-[10px]">
                          <div className="flex gap-[14px] flex-wrap">
                            {["حاضر", "غائب", "غائب بعذر"].map(
                              (status) => (
                                <label
                                  key={status}
                                  className="
                                    flex
                                    items-center
                                    gap-[5px]
                                    text-[9px]
                                    text-[#3b4454]
                                    cursor-pointer
                                  "
                                >
                                  <input
                                    type="radio"
                                    name={`attendance-${student.studentId}`}
                                    value={status}
                                    checked={
                                      attendance[student.studentId] === status
                                    }
                                    onChange={() =>
                                      handleAttendanceChange(
                                        student.studentId,
                                        status
                                      )
                                    }
                                    className="accent-[#4b5568]"
                                  />

                                  {status}
                                </label>
                              )
                            )}
                          </div>
                        </td>

                        <td className="px-[10px] py-[10px] text-[9px] text-[#667085]">
                          {student.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end px-[14px] py-[10px]">
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
                  حفظ سجل الحضور
                </button>
              </div>
            </section>

            {/* ================= PREVIOUS ATTENDANCE ================= */}
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
                    سجل الحضور السابق
                  </h2>

                  <button
                    type="button"
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
                    كشف الحضور
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-[#f1f3f7]">
                      <tr>
                        {[
                          "الجلسة",
                          "التاريخ",
                          "حاضر",
                          "غائب",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="
                              px-[9px]
                              py-[8px]
                              text-[9px]
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
                      {previousSessions.map((item) => (
                        <tr
                          key={item.session}
                          className="border-b border-[#eceff4] last:border-b-0"
                        >
                          <td className="px-[9px] py-[9px] text-[9px] font-semibold text-[#2b3340]">
                            {item.session}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#667085]">
                            {item.date}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#4a5465]">
                            {item.present}
                          </td>

                          <td className="px-[9px] py-[9px] text-[9px] text-[#4a5465]">
                            {item.absent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ================= NOTE ================= */}
              <div
                className="
                  border
                  border-[#dfe3ea]
                  bg-[#fbfcfd]
                  rounded-[9px]
                  px-[12px]
                  py-[10px]
                  mt-[10px]
                  text-[9px]
                  leading-[1.8]
                  text-[#667085]
                "
              >
                تنبيه عند مغادرة الشاشة مع وجود تغييرات غير محفوظة. نسبة الحضور لا ترتبط باستحقاق الشهادة قبل اعتماد سياسة الجامعة.
              </div>
            </div>
          </div>
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