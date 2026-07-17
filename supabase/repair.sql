-- Guliyev Photo Supabase repair script
-- Safe to run more than once. Run the entire file in Supabase SQL Editor.

-- PART 1: DATABASE, AUTHORIZATION, AND CONTACT FORM
-- This section commits before Storage is configured, so the website tables
-- remain available even if your Supabase project reports a Storage-specific error.
begin;

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  label text,
  category text,
  type text not null default 'text',
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id text primary key,
  title text not null,
  category text not null default 'portraits',
  image_url text not null,
  gear text not null default '',
  location text not null default '',
  settings jsonb not null default '{"lens":"","aperture":"","shutter":"","iso":""}'::jsonb,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id text not null unique,
  source text not null default 'contact',
  name text not null,
  email text not null,
  phone text,
  company text,
  session_type text,
  preferred_date date,
  alternate_date date,
  location text,
  subject_count text,
  intended_use text,
  budget text,
  heard_about text,
  details text,
  consent boolean not null default false,
  attachment_path text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Public reads site content" on public.site_content;
create policy "Public reads site content" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "Admins manage site content" on public.site_content;
create policy "Admins manage site content" on public.site_content
  for all to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Public reads visible portfolio" on public.portfolio_items;
create policy "Public reads visible portfolio" on public.portfolio_items
  for select to anon, authenticated using (is_visible = true);

drop policy if exists "Admins manage portfolio" on public.portfolio_items;
create policy "Admins manage portfolio" on public.portfolio_items
  for all to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Visitors create inquiries" on public.contact_messages;
create policy "Visitors create inquiries" on public.contact_messages
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and consent = true
  );

drop policy if exists "Admins read inquiries" on public.contact_messages;
create policy "Admins read inquiries" on public.contact_messages
  for select to authenticated using (public.is_site_admin());

drop policy if exists "Admins update inquiries" on public.contact_messages;
create policy "Admins update inquiries" on public.contact_messages
  for update to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Admins delete inquiries" on public.contact_messages;
create policy "Admins delete inquiries" on public.contact_messages
  for delete to authenticated using (public.is_site_admin());

drop policy if exists "Visitors subscribe" on public.newsletter_subscribers;
create policy "Visitors subscribe" on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (char_length(email) between 3 and 320);

drop policy if exists "Admins read subscribers" on public.newsletter_subscribers;
create policy "Admins read subscribers" on public.newsletter_subscribers
  for select to authenticated using (public.is_site_admin());

drop policy if exists "Admins delete subscribers" on public.newsletter_subscribers;
create policy "Admins delete subscribers" on public.newsletter_subscribers
  for delete to authenticated using (public.is_site_admin());

grant usage on schema public to anon, authenticated;
grant select on public.site_content, public.portfolio_items to anon;
grant insert on public.contact_messages, public.newsletter_subscribers to anon;
grant select on public.admin_users to authenticated;
grant all on public.site_content, public.portfolio_items, public.contact_messages, public.newsletter_subscribers to authenticated;

commit;

-- Ask PostgREST to refresh immediately after the new tables are committed.
notify pgrst, 'reload schema';

-- PART 2: IMAGE AND ATTACHMENT STORAGE
begin;

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('contact-attachments', 'contact-attachments', false)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public views site images" on storage.objects;
create policy "Public views site images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-images');

drop policy if exists "Admins upload site images" on storage.objects;
create policy "Admins upload site images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins update site images" on storage.objects;
create policy "Admins update site images" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin())
  with check (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins delete site images" on storage.objects;
create policy "Admins delete site images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Visitors upload inquiry attachments" on storage.objects;
create policy "Visitors upload inquiry attachments" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'contact-attachments'
    and (storage.foldername(name))[1] = 'inquiries'
  );

drop policy if exists "Admins view inquiry attachments" on storage.objects;
create policy "Admins view inquiry attachments" on storage.objects
  for select to authenticated
  using (bucket_id = 'contact-attachments' and public.is_site_admin());

drop policy if exists "Admins delete inquiry attachments" on storage.objects;
create policy "Admins delete inquiry attachments" on storage.objects
  for delete to authenticated
  using (bucket_id = 'contact-attachments' and public.is_site_admin());

commit;

-- Verification. The result should show four tables and two buckets.
select 'table' as object_type, table_name as object_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('site_content', 'portfolio_items', 'contact_messages', 'newsletter_subscribers')
union all
select 'bucket' as object_type, id as object_name
from storage.buckets
where id in ('site-images', 'contact-attachments')
order by object_type, object_name;
