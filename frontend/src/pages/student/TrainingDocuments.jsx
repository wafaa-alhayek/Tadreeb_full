import { useNavigate } from "react-router-dom";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingDocuments() {
  const navigate = useNavigate();

  const documents = [
    {
      title: "كشف علامات",
      format: "(PDF)",
      required: true,
    },
    {
      title: "صورة عن الهوية",
      format: "(PDF, JPG, PNG)",
      required: true,
    },
    {
      title: "صورة شخصية",
      format: "(JPG, PNG)",
      required: true,
    },
    {
      title: "سيرة ذاتية",
      format: "(PDF, DOC)",
      optional: true,
    },
    {
      title: "رسالة تحفيز",
      format: "(PDF, DOC)",
      optional: true,
    },
    {
      title: "أي مستندات إضافية",
      format: "(PDF, DOC)",
      optional: true,
    },
  ];

  const handleFileChange = (e, documentTitle) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log(documentTitle, file);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE BODY ================= */}
      <div className="flex">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN ================= */}
        <main className="flex-1 px-[28px] pt-[15px] pb-8">

          {/* ================= BREADCRUMB ================= */}
          <div className="text-[8px] text-[#9aa3ae] mb-[11px]">
            الرئيسية
            <span className="mx-[5px]">‹</span>
            فرص التدريب
            <span className="mx-[5px]">‹</span>
            رفع المستندات
          </div>

          {/* ================= TITLE ================= */}
          <div className="mb-[16px]">
            <h1 className="text-[20px] font-bold text-[#293444] mb-[5px]">
              استمارة التقديم على التدريب
            </h1>

            <p className="text-[9px] text-[#8b95a2]">
              يرجى رفع المستندات التالية بصيغة PDF أو صورة واضحة
            </p>
          </div>

          {/* ================= STEPS ================= */}
          <div className="flex items-start justify-center mb-[20px]">
            <div className="flex items-start w-[470px]">

              {/* Step 1 */}
              <div className="flex flex-col items-center min-w-[90px]">
                <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>

                <span className="text-[8px] text-[#6f7a88] mt-[5px]">
                  البيانات الأساسية
                </span>
              </div>

              <div className="h-px bg-[#505b70] flex-1 mt-[12px]" />

              {/* Step 2 */}
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-[25px] h-[25px] rounded-full bg-[#505b70] text-white flex items-center justify-center text-[9px] font-bold">
                  2
                </div>

                <span className="text-[8px] text-[#293444] font-bold mt-[5px]">
                  المستندات
                </span>
              </div>

              <div className="h-px bg-[#cdd3db] flex-1 mt-[12px]" />

              {/* Step 3 */}
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-[25px] h-[25px] rounded-full border border-[#b8c0ca] bg-white text-[#7b8795] flex items-center justify-center text-[9px]">
                  3
                </div>

                <span className="text-[8px] text-[#8b95a2] mt-[5px]">
                  تأكيد الطلب
                </span>
              </div>

            </div>
          </div>

          {/* ================= DOCUMENTS CARD ================= */}
          <section className="border border-[#e0e3e7] rounded-[8px] bg-white px-[16px] py-[15px]">

            <h2 className="text-[12px] font-bold text-[#293444] mb-[14px]">
              المستندات المطلوبة
            </h2>

            {/* Documents Grid */}
            <div className="grid grid-cols-3 gap-[12px]">

              {documents.map((document) => (
                <div
                  key={document.title}
                  className="
                    min-h-[128px]
                    border
                    border-[#e0e3e7]
                    rounded-[7px]
                    bg-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-[12px]
                    py-[12px]
                  "
                >
                  {/* File Icon */}
                  <div className="text-[21px] text-[#8a96a6] mb-[8px]">
                    ▤
                  </div>

                  {/* Document Name */}
                  <h3 className="text-[9px] font-bold text-[#303846] mb-[4px]">
                    {document.title}

                    {document.optional && (
                      <span className="font-normal text-[#8b95a2]">
                        {" "}
                        (اختياري)
                      </span>
                    )}
                  </h3>

                  {/* Format */}
                  <p className="text-[7px] text-[#9aa3ae] mb-[9px]">
                    {document.format}
                  </p>

                  {/* Upload */}
                  <label
                    className="
                      h-[26px]
                      px-[10px]
                      border
                      border-[#d7dce3]
                      rounded-[5px]
                      bg-white
                      flex
                      items-center
                      justify-center
                      gap-[5px]
                      text-[8px]
                      text-[#4e5968]
                      cursor-pointer
                      hover:bg-[#f7f8fa]
                      transition
                    "
                  >
                    <span>رفع الملف</span>
                    <span>↥</span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, document.title)
                      }
                    />
                  </label>
                </div>
              ))}

            </div>

          </section>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center justify-between mt-[14px]">

            {/* Next */}
            <button
              type="button"
              onClick={() => navigate("/applications/status")}
              className="
                h-[33px]
                px-[17px]
                rounded-[5px]
                bg-[#505b70]
                text-white
                text-[9px]
                font-bold
                hover:bg-[#414b5f]
                transition
              "
            >
              التالي
              <span className="mr-[6px]">←</span>
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/apply-training")}
              className="
                text-[9px]
                text-[#566273]
                underline
                underline-offset-2
                hover:text-[#293444]
                transition
              "
            >
              العودة إلى البيانات الأساسية
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}