export default function Header() {
  return (
    <header
      dir="rtl"
      className="
        h-[64px]
        w-full
        bg-white
        border-b
        border-[#dfe3ea]
        flex
        items-center
        justify-between
        px-[28px]
        gap-[24px]
      "
    >
      {/* ================= BRAND ================= */}
      <div className="flex items-center gap-[12px] shrink-0">
        <div
          className="
            w-[38px]
            h-[38px]
            rounded-[9px]
            bg-[#e4e8ef]
            flex
            items-center
            justify-center
            text-[#4b5568]
            text-[18px]
          "
        >
          🎓
        </div>

        <div className="leading-[1.3]">
          <p className="text-[16px] font-bold text-[#1f2733]">
            جامعة الأزهر
          </p>

          <p className="text-[11px] text-[#7a8393]">
            نظام إدارة التدريب الميداني للطلبة
          </p>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div
        className="
          flex-1
          max-w-[520px]
          h-[38px]
          border
          border-[#c9cfd9]
          rounded-[8px]
          bg-white
          flex
          items-center
          justify-between
          px-[13px]
        "
      >
        <input
          type="text"
          placeholder="ابحث عن طالب، دورة، جهة تدريب، فرصة تدريب ..."
          className="
            flex-1
            h-full
            outline-none
            bg-transparent
            text-[12px]
            text-[#2b3340]
            placeholder:text-[#8a93a3]
          "
        />

        <span className="text-[#8a93a3] text-[16px]">
          ⌕
        </span>
      </div>

      {/* ================= USER ================= */}
      <div className="flex items-center gap-[14px] shrink-0">
        {/* Notifications */}
        <button
          type="button"
          className="
            relative
            text-[#7a8393]
            text-[20px]
            hover:text-[#4b5568]
            transition
          "
        >
          ♧

          <span
            className="
              absolute
              -top-[5px]
              -left-[7px]
              w-[16px]
              h-[16px]
              rounded-full
              bg-[#4b5568]
              text-white
              text-[9px]
              flex
              items-center
              justify-center
            "
          >
            3
          </span>
        </button>

        {/* User Info */}
        <div className="text-right leading-[1.3]">
          <p className="text-[12px] font-bold text-[#1f2733]">
            أ. أحمد محمد
          </p>

          <p className="text-[10px] text-[#7a8393]">
            مدير النظام
          </p>
        </div>

        {/* Avatar */}
        <div
          className="
            w-[38px]
            h-[38px]
            rounded-full
            bg-[#d5dae3]
            flex
            items-center
            justify-center
            text-[#667085]
            text-[17px]
          "
        >
          ♙
        </div>
      </div>
    </header>
  );
}