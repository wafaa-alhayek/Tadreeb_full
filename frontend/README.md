# الواجهة (Front-End)

React + Vite + Tailwind CSS. كل الواجهات من اليمين لليسار (RTL).

## التشغيل أول مرة

```bash
cd frontend
npm install          # بينزّل المكتبات (مرة وحدة، أو لما تتغير package.json)
cp .env.example .env # إعدادات محلية
npm run dev          # بيشغّل الموقع على http://localhost:5173
```

## روابط مفيدة وقت التطوير

| الرابط | شو فيه |
|---|---|
| http://localhost:5173/student/login | دخول الطالب (حسين) |
| http://localhost:5173/student | الصفحة الرئيسية للطالب (حسين) |
| http://localhost:5173/admin | لوحة تحكم الإدارة (عبد الله) |
| http://localhost:5173/admin/students | إدارة الطلبة (عبد الله) |
| http://localhost:5173/gallery | **معرض المكونات المشتركة** — شوفوه قبل ما تبنوا أي شي جديد |

## هيكل `src/`

```
src/
├── api/            ← الاتصال بخادم وفاء (client.js) + بيانات وهمية (mock.js)
├── components/     ← المكونات المشتركة (أزرار، حقول، جداول...)
├── constants/      ← قيم ثابتة متفق عليها (حالات الطلب)
├── layouts/        ← الهيكل المشترك للصفحات (شريط جانبي + علوي)
├── pages/
│   ├── student/    ← صفحات بوابة الطالب (حسين)
│   └── admin/      ← صفحات بوابة الإدارة (عبد الله)
├── styles/         ← الألوان والخطوط (index.css)
├── App.jsx         ← خريطة الروابط (مين بيفتح أي صفحة)
└── main.jsx        ← نقطة البداية
```

## 3 قواعد للمكونات

1. **قبل ما تبني شي، دوّر بـ `/gallery`** — يمكن موجود.
2. **الألوان من `styles/index.css` بس** — `bg-primary` مش `bg-[#003399]`.
3. **استخدم اتجاهات منطقية**: `ms-` و`me-` و`ps-` و`pe-` و`text-start` بدل `ml-` و`mr-` و`text-left`، عشان الـ RTL يضل صح.
