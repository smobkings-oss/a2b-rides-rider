# A2B Rides / HopRide - Rider App

Premium ride-hailing app for NW Ohio. Riders can place **instant** or **scheduled** ride orders.

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (Auth, Database, Realtime)
- Stripe (Payments - to be integrated)
- Capacitor (for native mobile later)
- Hosting: Vercel

## Features (MVP)
- Instant ride requests
- Scheduled rides (date/time picker)
- Price estimates
- Black/Gold/Holographic branding
- Ready for map integration (Google Maps / Mapbox)
- Supabase schema for rides, users, drivers

## Quick Start

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Supabase Setup**
   - Create a project at [supabase.com](https://supabase.com)
   - Copy URL and anon key to `.env.local`
   - Run the SQL schema below in the SQL Editor

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Supabase Schema (SQL)

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text check (role in ('rider', 'driver', 'admin')) default 'rider',
  avatar_url text,
  created_at timestamptz default now()
);

-- Rides
create table public.rides (
  id uuid default uuid_generate_v4() primary key,
  rider_id uuid references public.profiles(id) not null,
  driver_id uuid references public.profiles(id),
  pickup_address text not null,
  pickup_lat double precision,
  pickup_lng double precision,
  dropoff_address text not null,
  dropoff_lat double precision,
  dropoff_lng double precision,
  ride_type text check (ride_type in ('instant', 'scheduled')) default 'instant',
  scheduled_at timestamptz,
  status text check (status in ('requested', 'accepted', 'arrived', 'in_progress', 'completed', 'cancelled')) default 'requested',
  estimated_fare numeric(10,2),
  actual_fare numeric(10,2),
  distance_miles numeric(6,2),
  duration_minutes integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.rides enable row level security;

-- Basic policies (expand for production)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Riders can create rides" on public.rides for insert with check (auth.uid() = rider_id);
create policy "Users can view own rides" on public.rides for select using (auth.uid() = rider_id or auth.uid() = driver_id);
```

## Next Steps
- [ ] Add Google Maps / Mapbox for location autocomplete & live tracking
- [ ] Supabase Auth (email/phone OTP)
- [ ] Realtime subscriptions for ride status
- [ ] Stripe Checkout for payments
- [ ] Driver matching logic
- [ ] Capacitor for iOS/Android apps
- [ ] Admin dashboard

## Branding
- Primary: Black
- Accents: Gold (#D4AF37) + Holographic cyan
- Local focus: Toledo, Perrysburg, Findlay, Fremont, Tiffin, Michigan border

Built for fast launch in NW Ohio. Driver-first values. Tesla fleet ready.