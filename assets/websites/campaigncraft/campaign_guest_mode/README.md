# CampaignCraft — Smart Digital Campaign Planner

مشروع ويب تفاعلي يحوّل مدخلات المستخدم إلى خطة حملة رقمية متكاملة وقابلة للتنفيذ، وليس مجرد مولّد أفكار عام.

## ماذا ينشئ المشروع؟

- هدف ذكي للحملة ورسالة رئيسية وقيمة مقدمة.
- تحليل للفئة المستهدفة حسب العمر والموقع والاهتمامات ومرحلة الشراء.
- استراتيجية مخصصة للمنصة المختارة.
- أعمدة محتوى وخطة نشر أسبوعية.
- أفكار منشورات مع الصيغة والوقت والكابشن وCTA.
- هاشتاقات وتوجه بصري.
- مؤشرات أداء KPIs وخطة تحسين.
- استراتيجية إعلانات مدفوعة حسب الميزانية.
- قائمة تنفيذ قابلة للتأشير.
- نسخ الخطة أو طباعتها وحفظها PDF.

## الميزة الأساسية

تتغير المخرجات بحسب هدف الحملة. حملات المبيعات تركز على التحويل والعرض وCTA، حملات الوعي تركز على الوصول والتذكر، وحملات التفاعل تركز على المشاركة ومحتوى الجمهور.

## التقنيات

- HTML5
- CSS3
- JavaScript
- Responsive Design
- Dynamic Content Generation
- Print / PDF Layout
- GitHub Pages

## التشغيل

افتح `index.html` في المتصفح مباشرة.

## النشر على GitHub Pages

1. ارفع الملفات إلى مستودع GitHub.
2. افتح Settings ثم Pages.
3. اختر الفرع `main` والمجلد `/root`.
4. اضغط Save.

## اسم مقترح للمستودع

`campaigncraft-digital-planner`

## Custom campaign inputs
The planner supports commercial, educational, behavioral, public-awareness, social-impact, government, and non-product campaigns. Most strategic fields include an **Other** option with a custom text input, and the entered value is used directly in the generated plan.

## حفظ الحملات وإدارة العمل

- حفظ تلقائي للمدخلات والخطة داخل المتصفح باستخدام LocalStorage.
- مكتبة حملات مقسمة إلى: مسودات، قيد التنفيذ، ومكتملة.
- استعادة آخر حملة تلقائيًا بعد تحديث الصفحة أو إغلاقها وفتحها لاحقًا على الجهاز نفسه.
- فتح الحملات وتعديلها، إنشاء نسخة، أو حذفها.
- تتبع إنجاز قائمة التنفيذ وتحديث حالة الحملة.
- تصدير واستيراد نسخة احتياطية بصيغة JSON لنقل الحملات بين الأجهزة أو المتصفحات.

## Campaign analytics

The project now includes a campaign performance workspace where users can enter actual results such as impressions, reach, views, likes, comments, shares, saves, clicks, conversions, and ad spend. The application calculates engagement, view, click-through, conversion, and cost metrics, produces visual charts, estimates a campaign success score, and generates data-driven optimization recommendations. A portfolio dashboard also visualizes draft, active, completed, and archived campaigns.


## Audience Research & Survey Hub

The project now includes a multi-page survey workspace:

- `surveys.html`: create, manage, publish, analyze, and apply survey insights to saved campaigns.
- `survey.html`: distraction-free public respondent view generated from a shareable URL.
- Ready-made templates for audience, behavior, messaging, and platform research.
- Question types: single choice, multiple choice, 1–5 scale, and open text.
- Response analysis, segment insights, sample confidence, and strategy synchronization.
- JSON survey/response export and import for portability.

### Static hosting note

GitHub Pages is static and does not provide a central response database. Responses submitted on the same browser are collected automatically. For respondents on other devices, response JSON files can be imported into the Research Hub. A production deployment can connect the same interface to Firebase, Supabase, or another backend without redesigning the UI.


## تحديث سهولة الاستخدام وتعدد المنصات

- اختيار أكثر من منصة للحملة في الوقت نفسه.
- دعم Instagram وTikTok وX وYouTube وLinkedIn وSnapchat وFacebook وThreads وWhatsApp وTelegram وPinterest وReddit وTwitch وDiscord والبودكاست والبريد والموقع وإعلانات البحث والعرض وSMS.
- شرح مبسط أسفل كل مدخل لتسهيل الاستخدام على غير المتخصصين.
- مؤشر فوري لاكتمال بيانات الحملة.
- توسيع خيارات الأهداف والجمهور والسلوك والاهتمامات والمجالات مع خيار «غير ذلك».
- حذف خيار الجنس المخصص والإبقاء على: الجميع، النساء، الرجال.
- توزيع جدول النشر واستراتيجية المحتوى بين المنصات المختارة بدل افتراض منصة واحدة.


## Complete agency brief update
- Beginner onboarding and a five-step usage guide.
- Extended campaign brief inspired by marketing agency discovery forms.
- Numeric success targets for reach, views, engagement, clicks, leads, conversions, downloads, followers and revenue.
- Audience motivations, objections and decision-maker analysis.
- Competition, positioning, tracking, approval, compliance, team, assets and deliverables fields.
- Performance analytics compare actual results against both rates and numeric targets.

## Accounts and data ownership

This version uses Supabase Auth with email/password accounts.

- Each signed-in user sees only their own campaigns and surveys.
- Campaigns sync to the `campaigns` table and retain a local per-account cache.
- Survey responses remain public to submit, but only the survey owner can read them in the dashboard.
- Public survey participants do not need an account.

Run `SUPABASE_AUTH_MIGRATION.sql` once in the Supabase SQL Editor before testing accounts.
Also add the GitHub Pages site URL under Supabase Authentication URL Configuration.
