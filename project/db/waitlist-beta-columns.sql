-- Fince waitlist: add founding-beta columns to the existing `waitlist` table.
-- One row per email. A beta application from an existing waitlist email UPDATES
-- the same row (the API sets these columns) — it never creates a second row.
--
-- Run once in the Supabase SQL editor BEFORE deploying the beta feature.
-- Safe to re-run (IF NOT EXISTS).

alter table public.waitlist
  add column if not exists wants_beta       boolean     not null default false,
  add column if not exists beta_work        text,
  add column if not exists beta_has_iphone  boolean,
  add column if not exists beta_applied_at  timestamptz;

-- The API relies on a UNIQUE constraint on email (it catches 23505 to detect an
-- existing row and update instead of inserting a duplicate). It almost certainly
-- already exists; this adds it only if missing.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'waitlist_email_key'
  ) and not exists (
    select 1 from pg_indexes
    where schemaname = 'public' and tablename = 'waitlist' and indexdef ilike '%(email)%' and indexdef ilike '%unique%'
  ) then
    alter table public.waitlist add constraint waitlist_email_key unique (email);
  end if;
end $$;

-- Quick views for vetting:
--   select email, beta_work, beta_has_iphone, beta_applied_at
--     from public.waitlist where wants_beta order by beta_applied_at desc;
--   select count(*) from public.waitlist where wants_beta;          -- beta applicants
--   select count(*) from public.waitlist;                          -- total on list
