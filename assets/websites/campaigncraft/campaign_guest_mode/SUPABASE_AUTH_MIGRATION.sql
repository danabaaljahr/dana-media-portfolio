-- CampaignCraft accounts, ownership, and private dashboard migration
-- Run this once in Supabase > SQL Editor.

create extension if not exists pgcrypto;

-- 1) Campaigns stored per signed-in user.
create table if not exists public.campaigns (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Untitled campaign',
  status text not null default 'draft',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Add ownership and publishing state to existing surveys.
alter table public.surveys add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.surveys add column if not exists is_published boolean not null default true;

-- Existing surveys are intentionally left without an owner.
-- The first authenticated project owner who opens the survey dashboard claims legacy rows once.

-- 3) Enable RLS.
alter table public.campaigns enable row level security;
alter table public.surveys enable row level security;
alter table public.survey_responses enable row level security;

-- 4) Grants.
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.campaigns to authenticated;
grant select, insert, update, delete on public.surveys to authenticated;
grant select on public.surveys to anon;
grant select on public.survey_responses to authenticated;
grant insert on public.survey_responses to anon, authenticated;

-- 5) Remove old public policies.
drop policy if exists "public can insert surveys" on public.surveys;
drop policy if exists "public can update surveys" on public.surveys;
drop policy if exists "public can read surveys" on public.surveys;
drop policy if exists "public can delete surveys" on public.surveys;
drop policy if exists "public can submit responses" on public.survey_responses;
drop policy if exists "temporary public response read" on public.survey_responses;

-- Remove policies from a previous run of this migration.
drop policy if exists "owners manage campaigns" on public.campaigns;
drop policy if exists "owners insert surveys" on public.surveys;
drop policy if exists "owners read surveys" on public.surveys;
drop policy if exists "owners update surveys" on public.surveys;
drop policy if exists "owners delete surveys" on public.surveys;
drop policy if exists "public reads published surveys" on public.surveys;
drop policy if exists "claim legacy surveys" on public.surveys;
drop policy if exists "public submits published survey responses" on public.survey_responses;
drop policy if exists "owners read survey responses" on public.survey_responses;

-- 6) Campaign ownership.
create policy "owners manage campaigns"
on public.campaigns
for all
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

-- 7) Survey ownership.
create policy "owners insert surveys"
on public.surveys
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "owners read surveys"
on public.surveys
for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "owners update surveys"
on public.surveys
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners delete surveys"
on public.surveys
for delete
to authenticated
using ((select auth.uid()) = owner_id);

-- One-time migration path for surveys created before login existed.
create policy "claim legacy surveys"
on public.surveys
for update
to authenticated
using (owner_id is null)
with check ((select auth.uid()) = owner_id);

-- Optional public read for published survey metadata.
create policy "public reads published surveys"
on public.surveys
for select
to anon
using (is_published = true);

-- 8) Public participants can submit answers only to a published survey.
create policy "public submits published survey responses"
on public.survey_responses
for insert
to anon, authenticated
with check (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_id
      and s.is_published = true
  )
);

-- 9) Only the survey owner can read its responses in CampaignCraft.
create policy "owners read survey responses"
on public.survey_responses
for select
to authenticated
using (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_id
      and s.owner_id = (select auth.uid())
  )
);
