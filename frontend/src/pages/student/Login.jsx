import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2.3" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      className="w-11 h-11 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 9.5 12 4l9 5.5-9 5-9-5Z" />
      <path d="M6 11.5V16c3 2.2 9 2.2 12 0v-4.5" />
      <path d="M21 10v5" />
    </svg>
  );
}

function UserFeatureIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21c.6-4.2 3-6.5 7-6.5s6.4 2.3 7 6.5" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 6.5h6l2 2h10v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function UniversityIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M3 9 12 4l9 5-9 5-9-5Z" />
      <path d="M6 11v5m12-5v5M4 18h16" />
    </svg>
  );
}

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-white"
    >
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[54%_46%]">

        {/* =====================================================
            LOGIN - LEFT
        ====================================================== */}
        <section
          className="
            min-h-screen
            bg-white
            flex
            items-center
            justify-center
            px-6
            py-10
          "
        >
          <div className="w-full max-w-[353px]">

            {/* Welcome */}
            <div className="text-center mb-7">

              <h1 className="text-[22px] font-bold text-[#101116] mb-2">
                مرحبًا بك مجددًا
              </h1>

              <p className="text-[12px] text-slate-500">
                سجّل دخولك إلى حسابك للاستمرار
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Student Number */}
              <div className="mb-4">

                <label
                  htmlFor="studentId"
                  className="
                    block
                    text-[11px]
                    font-semibold
                    text-[#252b35]
                    mb-2
                  "
                >
                  رقم الطالب
                </label>

                <div className="relative">

                  <input
                    id="studentId"
                    type="text"
                    placeholder="أدخل رقم الطالب"
                    className="
                      w-full
                      h-[35px]
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      pr-9
                      text-[11px]
                      text-slate-700
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <UserIcon />
                  </div>

                </div>

              </div>

              {/* Password */}
              <div className="mb-3">

                <label
                  htmlFor="password"
                  className="
                    block
                    text-[11px]
                    font-semibold
                    text-[#252b35]
                    mb-2
                  "
                >
                  كلمة المرور
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    className="
                      w-full
                      h-[35px]
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      pr-9
                      text-[11px]
                      text-slate-700
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon />
                  </div>

                </div>

              </div>

              {/* Remember / Forgot */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                  text-[10px]
                "
              >

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="
                      w-[13px]
                      h-[13px]
                      rounded
                      border-slate-300
                      accent-blue-600
                    "
                  />

                  <span className="text-slate-600">
                    تذكرني
                  </span>

                </label>

                <button
                  type="button"
                  className="
                    text-slate-700
                    underline
                    underline-offset-2
                    hover:text-blue-600
                  "
                >
                  نسيت كلمة المرور؟
                </button>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-[35px]
                  rounded-[6px]
                  bg-[#505b70]
                  text-white
                  text-[11px]
                  font-bold
                  transition
                  hover:bg-[#414b5f]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <span>تسجيل الدخول</span>
                <span className="text-[13px]">←</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">

                <div className="h-px bg-slate-300 flex-1"></div>

                <span className="text-[10px] text-slate-500">
                  أو
                </span>

                <div className="h-px bg-slate-300 flex-1"></div>

              </div>

              {/* University Login */}
              <button
                type="button"
                className="
                  w-full
                  h-[35px]
                  rounded-[6px]
                  border
                  border-slate-300
                  bg-white
                  text-[#343b48]
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-slate-50
                  transition
                "
              >
                <UniversityIcon />

                تسجيل الدخول عبر حساب الجامعة
              </button>

            </form>

          </div>
        </section>


        {/* =====================================================
            ILLUSTRATION - RIGHT
        ====================================================== */}
        <section
          className="
            hidden
            lg:flex
            min-h-screen
            bg-[#f1f3f7]
            border-r
            border-slate-200
            flex-col
            items-center
            justify-between
            px-10
            py-10
          "
        >

          {/* Title */}
          <div className="flex flex-col items-center text-center">

            <div className="mb-5">
              <GraduationIcon />
            </div>

            <h2 className="text-[21px] font-bold text-[#303a4b]">
              نظام إدارة التدريب الميداني للطلبة
            </h2>

            <p className="mt-2 text-[11px] text-slate-500">
              معًا نحو مستقبل مهني أفضل
            </p>

          </div>

          {/* Illustration */}
          <div
            className="
              w-full
              max-w-[315px]
              h-[202px]
              rounded-md
              bg-[#e1e5ed]
              flex
              items-center
              justify-center
            "
          >
            <span className="text-[12px] text-slate-400">
              مكان الـ Illustration
            </span>
          </div>

          {/* Features */}
          <div className="w-full max-w-[370px] grid grid-cols-3 gap-5">

            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">

              <div className="mb-3">
                <UserFeatureIcon />
              </div>

              <p className="text-[10px] leading-5 text-slate-600">
                تجربة تدريبية متميزة
              </p>

            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">

              <div className="mb-3">
                <FolderIcon />
              </div>

              <p className="text-[10px] leading-5 text-slate-600">
                فرص تدريبية متنوعة
              </p>

            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">

              <div className="mb-3">
                <CheckIcon />
              </div>

              <p className="text-[10px] leading-5 text-slate-600">
                متابعة مستمرة لحالة طلبك
              </p>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}