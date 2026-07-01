-- Supabase Schema for Akademikosi Bar & Kitchen
-- This script creates the required tables and sets up Row Level Security (RLS)

-- 1. Create Menu Categories Table
create table if exists menu_categories (
    id uuid default gen_random_uuid() primary key,
    name_ka text not null,
    name_en text not null,
    name_uk text not null,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Menu Items Table
create table if exists menu_items (
    id uuid default gen_random_uuid() primary key,
    category_id uuid references menu_categories(id) on delete cascade not null,
    name_ka text not null,
    name_en text not null,
    name_uk text not null,
    description_ka text,
    description_en text,
    description_uk text,
    price text not null,
    is_available boolean default true not null,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Events Table
create table if exists events (
    id uuid default gen_random_uuid() primary key,
    title_ka text not null,
    title_en text not null,
    title_uk text not null,
    description_ka text,
    description_en text,
    description_uk text,
    event_day_ka text not null,
    event_day_en text not null,
    event_day_uk text not null,
    event_time text not null,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Indexes for Ordering
create index if exists menu_categories_order_idx on menu_categories(order_index);
create index if exists menu_items_order_idx on menu_items(order_index);
create index if exists events_order_idx on events(order_index);

-- 5. Enable Row Level Security (RLS)
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table events enable row level security;

-- 6. Create RLS Policies
-- Public Select Policies
create policy "Allow public read access on menu_categories" 
    on menu_categories for select 
    using (true);

create policy "Allow public read access on menu_items" 
    on menu_items for select 
    using (true);

create policy "Allow public read access on events" 
    on events for select 
    using (true);

-- Admin Write Policies (Authenticated users can perform insert, update, and delete)
create policy "Allow admin write access on menu_categories" 
    on menu_categories for all 
    to authenticated 
    using (true);

create policy "Allow admin write access on menu_items" 
    on menu_items for all 
    to authenticated 
    using (true);

create policy "Allow admin write access on events" 
    on events for all 
    to authenticated 
    using (true);
