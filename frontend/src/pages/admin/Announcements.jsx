import { useState } from "react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Announcements() {
  const [formData, setFormData] = useState({
    title: "",
    type: "إعلان عام",
    target: "جميع الطلبة",
    content: "",
    publishDate: "",
    endDate: "",
    platformNotification: true,
    emailNotification: true,
  });

  const announcements = [
    {
      title: "فتح التسجيل للتدريب الميداني",
      target: "طلبة هندسة",
      date: "2026/06/01",
      status: "منشور",
      action: "عرض",
    },
    {
      title: "موعد تسليم التقرير النهائي",
      target: "المتدربون",
      date: "2026/08/25",
      status: "منشور",
      action: "عرض",
    },
    {
      title: "زيارة المتابعة",
      target: "المشرفون",
      date: "2026/08/10",
      status: "مجدول",
      action: "تعديل",
    },
    {
      title: "تحديث بيانات جهات التدريب",
      target: "جهات التدريب",
      date: "2026/09/05",
      status: "منشور",
      action: "عرض",
    },
    {
      title: "إغلاق باب التسجيل",
      target: "جميع الطلبة",
      date: "2026/08/20",
      status: "منشور",
      action: "عرض",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getStatusStyle = (status) => {
    if (status === "منشور") {
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
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between mb-[10px]">
            <div>
              <div className="flex items-center gap-[6px] text-[11px] text-[#7a8393] mb-[2px]">
                <span>الرئيسية</span>
                <span>›</span>
                <span>الإعلانات والإشعارات</span>
              </div>

              <h1 className="text-[23px] font-bold text-[#1b2430]">
                الإعلانات والإشعارات
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
              + إنشاء إعلان
            </button>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex gap-[14px] mt-[8px]">
            {/* ================= PREVIOUS ANNOUNCEMENTS ================= */}
            <section
              className="
                flex-1
                min-w-0
                border
                border-[#dfe3ea]
                rounded-[10px]
                bg-white
                overflow-hidden
              "
            >
              <div className="px-[14px] py-[10px]">
                <h2 className="text-[15px] font-bold text-[#1f2733]">
                  الإعلانات السابقة
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-[#f1f3f7]">
                    <tr>
                      {[
                        "العنوان",
                        "المستهدفون",
                        "تاريخ النشر",
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
                    {announcements.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#eceff4] last:border-b-0"
                      >
                        <td className="px-[10px] py-[10px] text-[10px] font-semibold text-[#2b3340]">
                          {item.title}
                        </td>

                        <td className="px-[10px] py-[10px] text-[10px] text-[#4a5465]">
                          {item.target}
                        </td>

                        <td className="px-[10px] py-[10px] text-[10px] text-[#667085]">
                          {item.date}
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
                              ${getStatusStyle(item.status)}
                            `}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-[10px] py-[10px]">
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
                            {item.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-[14px] py-[10px] text-[10px] text-[#667085]">
                إجمالي الإعلانات: 5
              </div>
            </section>

            {/* ================= CREATE ANNOUNCEMENT ================= */}
            <aside className="w-[470px] shrink-0">
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
                  إنشاء إعلان
                </h2>

                <div className="grid gap-[10px]">
                  {/* Title */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                      عنوان الإعلان *
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="أدخل عنوان الإعلان هنا ..."
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
                        text-[#2b3340]
                        placeholder:text-[#8a93a3]
                      "
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <span className="block text-[10px] font-semibold text-[#3b4454] mb-[6px]">
                      نوع الإعلان *
                    </span>

                    <div className="flex gap-[20px]">
                      {["إعلان عام", "تنبيه", "تذكير"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-[7px] text-[10px] text-[#3b4454] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={handleChange}
                            className="accent-[#4b5568]"
                          />

                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Target */}
                  <div>
                    <span className="block text-[10px] font-semibold text-[#3b4454] mb-[6px]">
                      المستهدفون *
                    </span>

                    <div
                      className="
                        border
                        border-[#dfe3ea]
                        rounded-[8px]
                        bg-[#fbfcfd]
                        px-[12px]
                        py-[10px]
                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      {[
                        "جميع الطلبة",
                        "تخصص محدد",
                        "المشرفون",
                        "كلية / قسم",
                        "جهات تدريب",
                      ].map((target) => (
                        <label
                          key={target}
                          className="flex items-center gap-[7px] text-[10px] text-[#3b4454] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="target"
                            value={target}
                            checked={formData.target === target}
                            onChange={handleChange}
                            className="accent-[#4b5568]"
                          />

                          {target}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                      محتوى الإعلان *
                    </label>

                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="اكتب محتوى الإعلان هنا ..."
                      className="
                        w-full
                        min-h-[105px]
                        resize-none
                        rounded-[8px]
                        border
                        border-[#c9cfd9]
                        bg-white
                        px-[10px]
                        py-[9px]
                        outline-none
                        text-[11px]
                        text-[#2b3340]
                        placeholder:text-[#8a93a3]
                      "
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                        تاريخ النشر *
                      </label>

                      <input
                        type="datetime-local"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
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
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#3b4454] mb-[4px]">
                        تاريخ الانتهاء (اختياري)
                      </label>

                      <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
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
                      />
                    </div>
                  </div>

                  {/* Notification Options */}
                  <div>
                    <span className="block text-[10px] font-semibold text-[#3b4454] mb-[6px]">
                      خيارات الإشعار
                    </span>

                    <div className="flex gap-[24px]">
                      <label className="flex items-center gap-[8px] text-[10px] text-[#3b4454] cursor-pointer">
                        <input
                          type="checkbox"
                          name="platformNotification"
                          checked={formData.platformNotification}
                          onChange={handleChange}
                          className="accent-[#4b5568]"
                        />

                        إشعار داخل المنصة
                      </label>

                      <label className="flex items-center gap-[8px] text-[10px] text-[#3b4454] cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotification"
                          checked={formData.emailNotification}
                          onChange={handleChange}
                          className="accent-[#4b5568]"
                        />

                        إرسال عبر البريد الإلكتروني
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-[8px] mt-[10px]">
                <button
                  type="button"
                  className="
                    h-[34px]
                    px-[15px]
                    rounded-[7px]
                    bg-[#4b5568]
                    text-white
                    text-[10px]
                    font-semibold
                    hover:bg-[#3f4858]
                  "
                >
                  نشر الإعلان
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
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  حفظ كمسودة
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
                    text-[10px]
                    text-[#3b4454]
                    hover:bg-[#eef0f4]
                  "
                >
                  إلغاء
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}