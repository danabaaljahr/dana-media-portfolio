# CampaignCraft + Supabase

تم ربط الموقع بالمشروع:

- Project URL: `https://smiwlknedwrcxykohqsj.supabase.co`
- المفتاح المستخدم: Publishable key فقط

> ملاحظة: الرابط الصحيح في كود Supabase هو رابط المشروع بدون `/rest/v1/`.

## الجداول المطلوبة

```sql
create table if not exists public.surveys (
  id uuid primary key,
  title text not null,
  description text default '',
  campaign_id text,
  questions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  answers jsonb not null,
  submitted_at timestamptz not null default now()
);
```

## RLS والسياسات

```sql
alter table public.surveys enable row level security;
alter table public.survey_responses enable row level security;

-- إنشاء الاستبيان من لوحة CampaignCraft
create policy "public can insert surveys"
on public.surveys
for insert
to anon
with check (true);

-- تعديل الاستبيان عند إعادة الحفظ
create policy "public can update surveys"
on public.surveys
for update
to anon
using (true)
with check (true);

-- السماح بقراءة بيانات الاستبيان عند الحاجة
create policy "public can read surveys"
on public.surveys
for select
to anon
using (true);

-- استقبال إجابات المشاركين
create policy "public can submit responses"
on public.survey_responses
for insert
to anon
with check (true);
```

## قراءة الإجابات داخل الموقع

قراءة الإجابات العامة بدون تسجيل دخول قد تكشف بيانات المشاركين؛ لذلك الأفضل استخدام Supabase Auth لاحقًا. حاليًا تُحفظ الإجابات مركزيًا ويمكن لصاحبة المشروع رؤيتها من Table Editor.

للاختبار المؤقت فقط يمكن إضافة سياسة قراءة عامة، ثم حذفها بعد الاختبار:

```sql
create policy "temporary public response read"
on public.survey_responses
for select
to anon
using (true);
```

وحذفها بعد الاختبار:

```sql
drop policy if exists "temporary public response read" on public.survey_responses;
```
