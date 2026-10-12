import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TrainingOpportunities() {
  const opportunities = [
    {
      title: "تدريب في شركة التقنية الحديثة",
      field: "تقنية المعلومات",
      type: "حضوري",
      location: "غزة - الرمال",
      hours: "120 ساعة",
      date: "2025/10/15",
    },
    {
      title: "تدريب في مركز فلسطين للتطوير",
      field: "إدارة أعمال",
      type: "عن بعد",
      location: "غزة",
      hours: "100 ساعة",
      date: "2025/10/10",
    },
    {
      title: "تدريب في مستشفى الشهيد الأزهر",
      field: "خدمات طبية",
      type: "حضوري",
      location: "غزة - الرمال",
      hours: "150 ساعة",
      date: "2025/10/20",
    },
  ];

  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 px-[28px] pt-[18px] pb-8">

          {/* ================= PAGE TITLE ================= */}
          <div className="mb-[20px]">
            <h1 className="text-[20px] font-bold text-[#293444] mb-[6px]">
              فرص التدريب
            </h1>

            <p className="text-[10px] text-[#8791a0]">
              اكتشف الفرص التدريبية المناسبة لتخصصك وابدأ رحلتك المهنية
            </p>
          </div>

          {/* ================= SEARCH + FILTER ================= */}
          <div className="flex items-center gap-[10px] mb-[14px]">

            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ابحث عن فرصة تدريب..."
                className="
                  w-full
                  h-[37px]
                  border
                  border-[#dfe3e8]
                  rounded-[8px]
                  pr-[35px]
                  pl-3
                  text-[10px]
                  text-[#4d5968]
                  outline-none
                  placeholder:text-[#9aa3ae]
                  focus:border-[#9ca8b8]
                  focus:ring-1
                  focus:ring-[#e7ebf0]
                  transition
                "
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3ae] text-[13px]">
                ⌕
              </span>
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="
                h-[37px]
                px-[20px]
                border
                border-[#dfe3e8]
                rounded-full
                bg-white
                text-[10px]
                text-[#4d5968]
                hover:bg-[#f7f8fa]
                transition
              "
            >
              تصفية
            </button>

          </div>

          {/* ================= FILTER TABS ================= */}
          <div className="flex items-center gap-[8px] mb-[18px]">

            <button
              type="button"
              className="
                h-[29px]
                px-[16px]
                rounded-full
                bg-[#e7edf5]
                text-[#27364a]
                text-[9px]
                font-bold
                transition
              "
            >
              الكل
            </button>

            <button
              type="button"
              className="
                h-[29px]
                px-[16px]
                rounded-full
                border
                border-[#e0e3e7]
                bg-white
                text-[#697386]
                text-[9px]
                hover:bg-[#f5f7f9]
                transition
              "
            >
              داخلي
            </button>

            <button
              type="button"
              className="
                h-[29px]
                px-[16px]
                rounded-full
                border
                border-[#e0e3e7]
                bg-white
                text-[#697386]
                text-[9px]
                hover:bg-[#f5f7f9]
                transition
              "
            >
              خارجي
            </button>

            <button
              type="button"
              className="
                h-[29px]
                px-[16px]
                rounded-full
                border
                border-[#e0e3e7]
                bg-white
                text-[#697386]
                text-[9px]
                hover:bg-[#f5f7f9]
                transition
              "
            >
              حضوري
            </button>

            <button
              type="button"
              className="
                h-[29px]
                px-[16px]
                rounded-full
                border
                border-[#e0e3e7]
                bg-white
                text-[#697386]
                text-[9px]
                hover:bg-[#f5f7f9]
                transition
              "
            >
              عن بعد
            </button>

          </div>

          {/* ================= OPPORTUNITIES ================= */}
          <div className="space-y-[10px]">

            {opportunities.map((opportunity) => (
              <div
                key={opportunity.title}
                className="
                  border
                  border-[#e0e3e7]
                  rounded-[8px]
                  bg-white
                  px-[16px]
                  py-[14px]
                  flex
                  items-center
                  justify-between
                "
              >

                {/* Right Content */}
                <div className="flex items-center gap-[13px]">

                  {/* Company Icon */}
                  <div
                    className="
                      w-[44px]
                      h-[44px]
                      shrink-0
                      rounded-[8px]
                      bg-[#e9eef5]
                      flex
                      items-center
                      justify-center
                      text-[#78869a]
                      text-[16px]
                    "
                  >
                    ▥
                  </div>

                  {/* Opportunity Info */}
                  <div>

                    <h2 className="text-[11px] font-bold text-[#303846] mb-[6px]">
                      {opportunity.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex items-center gap-[6px] mb-[7px]">

                      <span
                        className="
                          px-[9px]
                          py-[3px]
                          rounded-full
                          bg-[#eef1f5]
                          text-[#697386]
                          text-[8px]
                        "
                      >
                        {opportunity.field}
                      </span>

                      <span
                        className="
                          px-[9px]
                          py-[3px]
                          rounded-full
                          bg-[#eef1f5]
                          text-[#697386]
                          text-[8px]
                        "
                      >
                        {opportunity.type}
                      </span>

                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-[15px] text-[8px] text-[#8b95a2]">
                      <span>{opportunity.location}</span>
                      <span>{opportunity.hours}</span>
                      <span>{opportunity.date}</span>
                    </div>

                  </div>

                </div>

                {/* Details Button */}
                <button
                type="button"
                onClick={() => navigate("/opportunities/details")}
                className="
                    h-[30px]
                    px-[14px]
                    rounded-[5px]
                    bg-[#505b70]
                    text-white
                    text-[9px]
                    font-medium
                    hover:bg-[#414b5f]
                    transition
                "
                >
                عرض التفاصيل
                </button>

              </div>
            ))}

          </div>

        </main>

      </div>
    </div>
  );
}