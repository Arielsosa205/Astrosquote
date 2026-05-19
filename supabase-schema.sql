-- Run this in Supabase SQL Editor.
-- It creates one table for quote history. Product details are stored as JSON
-- so we can evolve the app quickly without migrations for every small field.

create extension if not exists pgcrypto;

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  guest_token text,
  name text not null default 'Quote',
  status text not null default 'Draft',
  supplier_name text not null default '',
  product_count integer not null default 0,
  photo_count integer not null default 0,
  total numeric not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quotes
  add column if not exists owner_id uuid references auth.users(id) on delete cascade;

alter table public.quotes
  add column if not exists guest_token text;

create index if not exists quotes_updated_at_idx
  on public.quotes (updated_at desc);

create index if not exists quotes_owner_updated_at_idx
  on public.quotes (owner_id, updated_at desc);

create unique index if not exists quotes_guest_token_idx
  on public.quotes (guest_token)
  where guest_token is not null;

alter table public.quotes enable row level security;

-- No public row policies are added on purpose.
-- The browser talks to Netlify Functions, and those functions use the
-- Supabase service role key securely on the server side. Netlify Functions
-- filter rows by owner_id for signed-in users and guest_token for guest links.

insert into storage.buckets (id, name, public)
values ('quote-images', 'quote-images', true)
on conflict (id) do nothing;

-- Public read for images in the quote-images bucket.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read quote images'
  ) then
    create policy "Public read quote images"
    on storage.objects
    for select
    using (bucket_id = 'quote-images');
  end if;
end $$;
