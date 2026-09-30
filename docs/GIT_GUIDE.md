# دليل GitHub للفريق — خطوة بخطوة

## الفكرة بجملة

`main` هو النسخة الرسمية النظيفة. ما حدا بيكتب عليها مباشرة. كل مهمة بتنعمل على **فرع (branch)** خاص، وبعد المراجعة بتندمج بـ `main`.

## أول مرة بس

```bash
git clone https://github.com/wafaa-alhayek/Tadreeb_full.git
cd Tadreeb_full
git config --global user.name "اسمك"
git config --global user.email "ايميلك@example.com"
```

## كل مهمة جديدة (الروتين اليومي)

```bash
# 1) جيب آخر نسخة من main
git checkout main
git pull

# 2) افتح فرع جديد باسم المهمة
git checkout -b student-login

# 3) اشتغل... وبعدين احفظ شغلك
git add .
git commit -m "Build student login page"

# 4) ارفع الفرع على GitHub
git push -u origin student-login
```

5) افتح صفحة المستودع على GitHub، بيطلعلك زر **Compare & pull request** — اضغطه.
6) عبّي القالب، واختار زميلك كـ **Reviewer**.
7) بعد الموافقة، اضغط **Merge**. خلصت المهمة 🎉

## أسماء الفروع

`<الشغل>` بالإنجليزي وبشرطات: `student-login`، `admin-students-table`، `api-applications`.

## رسائل الـ Commit

جملة قصيرة بالإنجليزي بتبدأ بفعل: `Add StatusBadge component`، `Fix login error message`.

## مشاكل شائعة

| المشكلة | الحل |
|---|---|
| `rejected ... fetch first` عند الـ push | `git pull` وبعدين `git push` مرة ثانية |
| Merge conflict (تعارض) | افتح الملف بـ VS Code، بيعلّم الجزئين، اختار الصح (Accept Current / Incoming)، احفظ، `git add .` و`git commit` |
| نسيت أفتح فرع واشتغلت على main | `git checkout -b اسم-الفرع` — شغلك بينتقل معك للفرع الجديد |
