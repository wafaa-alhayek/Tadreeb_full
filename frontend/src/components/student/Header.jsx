export default function Header() {
  return (
    <header
      dir="rtl"
      className="h-[55px] w-full bg-white border-b border-[#e1e4e8] flex items-center justify-between px-5"
    >
      {/* Right Side */}
      <div className="flex items-center gap-2">
        <div className="w-[28px] h-[28px] rounded-[7px] bg-[#e9eef5] flex items-center justify-center text-[#64748b] text-sm">
          🎓
        </div>

        <span className="text-[12px] font-bold text-[#252b36]">
          نظام إدارة التدريب الميداني للطلبة
        </span>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          type="button"
          className="text-[#697386] text-[16px] hover:text-[#252b36] transition"
        >
          ♧
        </button>

        {/* Student */}
        <div className="flex items-center gap-2">

          <div className="w-[31px] h-[31px] rounded-full bg-[#e8edf3] flex items-center justify-center text-[#64748b]">
            ♙
          </div>

          <div className="text-right leading-tight">
            <p className="text-[11px] font-bold text-[#252b36]">
              أمل أحمد
            </p>

            <p className="text-[9px] text-[#7b8491]">
              طالبة
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}