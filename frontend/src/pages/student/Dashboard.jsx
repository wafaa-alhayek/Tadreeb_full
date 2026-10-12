import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  // =========================
  // Statistics
  // =========================
  const statistics = [
    {
      title: "إجمالي الساعات",
      value: "120",
      icon: "◷",
    },
    {
      title: "تدريبي الحالي",
      value: "1",
      icon: "□",
    },
    {
      title: "طلباتي الحالية",
      value: "2",
      icon: "▤",
    },
    {
      title: "فرص تدريب متاحة",
      value: "12",
      icon: "⌕",
    },
  ];

  // =========================
  // Training Opportunities
  // =========================
  const opportunities = [
    {
      title: "تدريب في شركة التقنية الحديثة",
      field: "تقنية المعلومات",
      type: "حضوري",
    },
    {
      title: "تدريب في مركز فلسطين للتطوير",
      field: "إدارة أعمال",
      type: "عن بعد",
    },
    {
      title: "تدريب في مستشفى الشهيد الأزهر",
      field: "خدمات طبية",
      type: "حضوري",
    },
  ];

  // =========================
  // Notifications
  // =========================
  const notifications = [
    {
      title: "فتح باب التسجيل في دورات تدريبية جديدة",
      date: "2025/10/01",
    },
    {
      title: "إعلان عن فرص تدريب ميداني في عدة جهات",
      date: "2025/09/28",
    },
    {
      title: "تحديث سياسة التدريب الميداني",
      date: "2025/09/25",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white"
    >
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 px-[28px] pt-[18px] pb-8">

          {/* ================= WELCOME ================= */}
          <section className="h-[112px] rounded-[9px] bg-[#eef2f7] px-[28px] flex items-center justify-between mb-[14px]">

            <div>
              <h1 className="text-[25px] font-bold text-[#293444] mb-2">
                مرحبًا أمل
              </h1>

              <p className="text-[10px] text-[#8791a0]">
                نتمنى لك رحلة تدريبية مليئة بالنجاح والتميز
              </p>
            </div>

            {/* Graduation icon */}
            <div className="text-[48px] text-[#9aa7b8]">
              🎓
            </div>

          </section>


          {/* ================= STATISTICS ================= */}
          <section className="grid grid-cols-4 gap-[12px] mb-[13px]">

            {statistics.map((item) => (
              <div
                key={item.title}
                className="h-[67px] rounded-[8px] border border-[#e0e3e7] bg-white px-[13px] flex items-center justify-between"
              >

                {/* Text */}
                <div className="text-right">

                  <p className="text-[9px] text-[#858e9b] mb-[2px]">
                    {item.title}
                  </p>

                  <p className="text-[20px] font-bold text-[#293444] leading-none">
                    {item.value}
                  </p>

                </div>

                {/* Icon */}
                <div className="w-[30px] h-[30px] rounded-[7px] bg-[#eef2f7] flex items-center justify-center text-[#78869a] text-[15px]">
                  {item.icon}
                </div>

              </div>
            ))}

          </section>


          {/* ================= TWO COLUMNS ================= */}
          <section className="grid grid-cols-2 gap-[12px]">


            {/* ================================================= */}
            {/* TRAINING OPPORTUNITIES */}
            {/* ================================================= */}

            <div className="border border-[#e0e3e7] rounded-[8px] bg-white overflow-hidden">

              {/* Card Header */}
              <div className="h-[51px] px-[14px] flex items-center justify-between border-b border-[#eceef1]">

                <h2 className="text-[13px] font-bold text-[#293444]">
                  فرص تدريب مقترحة لك
                </h2>

                <button
                  type="button"
                  className="h-[27px] px-[12px] border border-[#cbd1d8] rounded-[5px] bg-white text-[9px] text-[#4d5968] hover:bg-[#f7f8fa] transition"
                >
                  عرض الكل
                </button>

              </div>


              {/* Opportunities */}
              <div className="px-[12px]">

                {opportunities.map((opportunity, index) => (
                  <div
                    key={opportunity.title}
                    className={`
                      min-h-[55px]
                      flex
                      items-center
                      gap-3
                      ${
                        index !== opportunities.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    `}
                  >

                    {/* Company Icon */}
                    <div className="w-[40px] h-[40px] shrink-0 rounded-[7px] bg-[#e9eef5] flex items-center justify-center text-[#78869a]">
                      ▥
                    </div>


                    {/* Content */}
                    <div className="flex-1 text-right">

                      <h3 className="text-[10px] font-bold text-[#303846] mb-[5px]">
                        {opportunity.title}
                      </h3>

                      <div className="flex items-center gap-1">

                        <span className="px-[8px] py-[2px] rounded-full bg-[#eef1f5] text-[#697386] text-[8px]">
                          {opportunity.field}
                        </span>

                        <span className="px-[8px] py-[2px] rounded-full bg-[#eef1f5] text-[#697386] text-[8px]">
                          {opportunity.type}
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>


            {/* ================================================= */}
            {/* NOTIFICATIONS */}
            {/* ================================================= */}

            <div className="border border-[#e0e3e7] rounded-[8px] bg-white overflow-hidden">

              {/* Card Header */}
              <div className="h-[51px] px-[14px] flex items-center justify-between border-b border-[#eceef1]">

                <h2 className="text-[13px] font-bold text-[#293444]">
                  آخر الإشعارات
                </h2>

                <button
                  type="button"
                  className="h-[27px] px-[12px] border border-[#cbd1d8] rounded-[5px] bg-white text-[9px] text-[#4d5968] hover:bg-[#f7f8fa] transition"
                >
                  عرض الكل
                </button>

              </div>


              {/* Notifications */}
              <div className="px-[12px]">

                {notifications.map((notification, index) => (
                  <div
                    key={notification.title}
                    className={`
                      min-h-[55px]
                      flex
                      items-center
                      gap-2
                      ${
                        index !== notifications.length - 1
                          ? "border-b border-[#edf0f2]"
                          : ""
                      }
                    `}
                  >

                    {/* Notification Icon */}
                    <div className="text-[#9aa3ae] text-[13px]">
                      ♧
                    </div>


                    {/* Notification Content */}
                    <div className="flex-1 text-right">

                      <p className="text-[10px] text-[#303846] font-medium">
                        {notification.title}
                      </p>

                      <p className="text-[8px] text-[#9aa3ae] mt-[3px]">
                        {notification.date}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}