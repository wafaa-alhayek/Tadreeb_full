# خطة الخادم: الجداول ومين بيبني شو

مبنية على الـ SRS v2.0. الهدف: وفاء ومريم يشتغلوا بنفس الوقت بدون ما حدا يستنى التاني، لأن كل واحدة بتعرف شو الجداول اللي رح تربط فيها.

## الفكرة الأساسية

**الطلب (`Application`) هو ملف الطالب من أول مسودة لحد الشهادة.** دورة حياته بالـ SRS (Section 2.5) بتمشي:
`draft → submitted → under_review → accepted → assigned → in_training → completed → approved → certified`
(وفي `rejected` و `withdrawn`). القواعد مكتوبة بـ `backend/applications/status.py`.

لما الطالب يتوزّع بنعمل **`Placement`** (مكان تدريب فعلي). ليش جدول لحاله؟ لأن FR-30 بيقول لما يغيّر الطالب جهة التدريب، المكان القديم بيتسكّر **وساعاته بتضل محسوبة** (D-12). فالطلب الواحد ممكن يكون إله أكتر من `Placement`، بس واحد بس فعّال (BR-02).

```
accounts.User (student) ── Application ──┬── Preference ×3 ──> providers.Opportunity ──> providers.Provider
                              │          ├── ApplicationDocument
                              │          ├── StatusChange (السجل)
                              │          ├── Placement ──> Opportunity      ← training.DailyLog / Attendance
                              │          ├── ExceptionRequest
                              │          ├── Evaluation ×2 (جهة + مشرف) ──> الدرجة النهائية
                              │          ├── training.Report / Visit / TrainingPlan
                              │          └── certificates.Certificate
                              └── supervisor ──> accounts.User (المشرف الأكاديمي، FR-18)
```

## الجداول

### `providers`: مريم

| الجدول | الحقول | FR |
|---|---|---|
| `Provider` ✅ | موجود. **ناقصه:** `accepted_specializations` (ManyToMany لـ `accounts.Specialization`) | FR-07, 08 |
| `Opportunity` ✅ | `provider`، `specialization` (FK لـ `accounts.Specialization`)، `title`، `description`، `tasks`، `requirements`، `seats`، `start_date`، `end_date`، `location`، `status` (`open` / `closed`) | FR-09, 10 |

**`free_seats()`** ✅ (المقاعد الفاضية = `seats` ناقص عدد الـ `Placement` الفعّالة على الفرصة)، وبتطلع بالـ API كحقل `free_seats`.

### `applications`: وفاء

| الجدول | الحقول | FR / BR |
|---|---|---|
| `Application` ✅ | `student`، `status`، `status_reason` (سبب الرفض / الانسحاب)، `supervisor` (FK لمستخدم دوره supervisor)، `submitted_at`، `created_at`، `updated_at` | FR-11–13, 18 |
| `Preference` ✅ | `application`، `opportunity`، `rank` (1–3) | FR-11، BR-03 (3 رغبات، D-04) |
| `ApplicationDocument` ✅ | `application`، `title`، `file` (PDF/JPG/PNG حتى 5MB) | FR-11، BR-08 |
| `StatusChange` ✅ | `application`، `from_status`، `to_status`، `changed_by`، `reason`، `created_at` | FR-12 (الطالب بيشوف المسار)، FR-40 |
| `Placement` ✅ | `application`، `opportunity`، `start_date`، `end_date`، `provider_confirmed_at`، `closed_at`، `close_reason`، `is_active` | FR-14, 16, 30–32، BR-02 |
| `ExceptionRequest` ✅ | `application`، `kind` (change_provider / withdrawal / extension / issue)، `requested_by`، `reason`، `status` (pending / supervisor_approved / approved / rejected / closed)، `new_opportunity`، `new_end_date`، `decided_by`، `decision_note`، `decided_at` | FR-30–33 |

### `training`: مريم

| الجدول | بيرتبط بـ | FR |
|---|---|---|
| `TrainingPlan` / أهداف أسبوعية | `Application` | FR-19 |
| `DailyLog`: التاريخ، الساعات، المهام، ملاحظات، `provider_confirmed` (هاد هو الحضور، BR-05) | **`Placement`** (عشان الساعات تضل لما تتغير الجهة) | FR-20–22 |
| `Report` + تعليق المشرف + **درجة** (لازمة لـ BR-04) | `Application` | FR-23 |
| `Visit` | `Application` | FR-24 |

### `evaluations`: وفاء

| الجدول | الحقول | FR / BR |
|---|---|---|
| `Evaluation` | `application`، `evaluator`، `kind` (provider / supervisor)، درجات المعايير، `total` | FR-25, 26 |
| الدرجة النهائية | محسوبة: جهة 40% + مشرف 40% + تقارير 20%، النجاح 60% | FR-27، BR-04 (D-05) |
| `ProviderRating` | `application`، `rating`، `comment` | FR-29 (Could) |

### `certificates` وباقي الإدارة: مريم

| | بيرتبط بـ | FR |
|---|---|---|
| كتاب التوجيه PDF | `Placement` (لما يصير الطلب `assigned`) | FR-17 |
| `Certificate`: رقم تسلسلي، QR، `issued_at`، `revoked_at` + صفحة تحقق عامة | `Application` (لما يصير `approved`) | FR-34, 35، BR-07 |
| `AuditLog` | أي عملية | FR-40 |
| لوحات الإحصائيات، التصدير، الأرشيف والبحث | كل الجداول | FR-36, 37, 39 |
| استيراد الطلاب من Excel | `accounts` | FR-03 |

### جاهز ✅

- `accounts`: المستخدمين والأدوار، الأقسام والتخصصات، ملف الطالب، الأهلية (FR-01, 04–06)
- `notifications`: الإشعارات و `notify()` (FR-38)، أي جزء بيستدعيها لما يصير إشي
- Swagger على `/api/docs/` (NFR-16)

## الترتيب

| | وفاء | مريم |
|---|---|---|
| 1 | ✅ `Application` + `Preference` + `ApplicationDocument` + `StatusChange` | ✅ `Opportunity` + `accepted_specializations` |
| 2 | ✅ المراجعة والتوزيع: `Placement` + `free_seats()`، تعيين المشرف، تأكيد الجهة، الانسحاب + الإشعارات وسجل العمليات | ✅ استيراد Excel (FR-03)، ✅ سجل العمليات (FR-40)، ✅ السجل اليومي (FR-20) |
| 3 | ✅ `ExceptionRequest`: تغيير الجهة، الانسحاب، التمديد، المشاكل | كتاب التوجيه (FR-17)، `training` (FR-19–24) |
| 4 | `evaluations` + الدرجة النهائية | الشهادات، Audit Log، لوحات الإحصائيات والتصدير |

## قرارات لسا مفتوحة (Appendix A)

- **D-01:** عدد الساعات المعتمدة للأهلية (حاليًا 90 بالكود)
- **D-08 / BR-06:** كم ساعة وكم أسبوع عشان يكتمل التدريب
- **`needs_changes`:** مش بالـ SRS، بس موجودة باتفاق الفريق (TEAM_AGREEMENT). بنضلها؟

## الاستضافة (تقرر)

- **للعرض:** الخادم بيضل على PythonAnywhere المجاني مع SQLite، و **بيانات تجريبية بس** (`seed_demo`)، ممنوع بيانات طلاب حقيقية. بعد العرض الكلية بتقرر الاستضافة الحقيقية، لأنها المسؤولة عن بيانات الطلاب.
- **ما في مهام مجدولة (scheduled tasks)** على الحساب المجاني، فـ **الانتقالات التلقائية لازم تصير لما يصير حدث، مش بوقت محدد:**
  - **اكتمال التدريب (BR-06):** نفحص لما الجهة تأكد يوم بالسجل اليومي. إذا وصلت الساعات للمطلوب: `application.move_to(Status.COMPLETED)`.
  - **بداية التدريب:** الجهة بتعلّم إنه بلّش، أو نفحص التاريخ لما ينفتح الطلب.
  - **تنبيه الحضور تحت 80% (FR-22):** نفحص لما يتأكد يوم.

## قاعدة لما نشتغل بنفس الوقت

قبل ما تبلشي أي جدول بيرتبط بجدول التانية: اتفقوا على **اسم الجدول وأسماء الحقول** من هالملف، ولو تغيّر إشي عدّلوه هون بنفس الـ PR.
