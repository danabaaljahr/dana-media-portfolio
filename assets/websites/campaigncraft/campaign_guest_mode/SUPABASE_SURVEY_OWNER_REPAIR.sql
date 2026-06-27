-- CampaignCraft: repair authenticated survey publishing and ownership
-- Run once in Supabase > SQL Editor.

alter table public.surveys
  add column if not exists owner_id uuid references auth.users(id) on delete cascade;

alter table public.surveys
  add column if not exists is_published boolean not null default false;

alter table public.surveys enable row level security;
alter table public.survey_responses enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.surveys to authenticated;
grant select on public.surveys to anon;
grant select on public.survey_responses to authenticated;
grant insert on public.survey_responses to anon, authenticated;

-- Remove all CampaignCraft survey policies that may conflict.
drop policy if exists "public can insert surveys" on public.surveys;
drop policy if exists "public can update surveys" on public.surveys;
drop policy if exists "public can read surveys" on public.surveys;
drop policy if exists "public can delete surveys" on public.surveys;
drop policy if exists "authenticated users can create surveys" on public.surveys;
drop policy if exists "users can read own surveys" on public.surveys;
drop policy if exists "users can update own surveys" on public.surveys;
drop policy if exists "users can delete own surveys" on public.surveys;
drop policy if exists "owners insert surveys" on public.surveys;
drop policy if exists "owners read surveys" on public.surveys;
drop policy if exists "owners update surveys" on public.surveys;
drop policy if exists "owners delete surveys" on public.surveys;
drop policy if exists "claim legacy surveys" on public.surveys;
drop policy if exists "public can read published surveys" on public.surveys;
drop policy if exists "public reads published surveys" on public.surveys;

create policy "owners insert surveys"
on public.surveys for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "owners read surveys"
on public.surveys for select to authenticated
using (owner_id = (select auth.uid()));

create policy "owners update surveys"
on public.surveys for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "owners delete surveys"
on public.surveys for delete to authenticated
using (owner_id = (select auth.uid()));

create policy "public reads published surveys"
on public.surveys for select to anon
using (is_published = true);

-- Response policies.
drop policy if exists "public can submit responses" on public.survey_responses;
drop policy if exists "public submits published survey responses" on public.survey_responses;
drop policy if exists "temporary public response read" on public.survey_responses;
drop policy if exists "owners read survey responses" on public.survey_responses;

create policy "public submits published survey responses"
on public.survey_responses for insert to anon, authenticated
with check (
  exists (
    select 1 from public.surveys s
    where s.id = survey_id and s.is_published = true
  )
);

create policy "owners read survey responses"
on public.survey_responses for select to authenticated
using (
  exists (
    select 1 from public.surveys s
    where s.id = survey_id and s.owner_id = (select auth.uid())
  )
);

create index if not exists surveys_owner_id_idx on public.surveys(owner_id);
create index if not exists survey_responses_survey_id_idx on public.survey_responses(survey_id);
