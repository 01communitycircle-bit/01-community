-- 0.1% Community Production Database Schema

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'student_unpaid',
  is_pro BOOLEAN DEFAULT FALSE,
  avatar TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ENROLLMENTS & PAYMENT TRIAGE TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  track_id TEXT NOT NULL,
  track_name TEXT NOT NULL,
  amount NUMERIC DEFAULT 999,
  utr_number TEXT UNIQUE,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending_add',
  notes TEXT,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WALL OF FAME / RESULTS TABLE (WITH GMAIL DISPLAY)
CREATE TABLE IF NOT EXISTS public.results (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_avatar TEXT,
  student_handle TEXT,
  track_id TEXT,
  track_title TEXT,
  title TEXT NOT NULL,
  amount_inr NUMERIC NOT NULL,
  currency_label TEXT,
  description TEXT,
  category TEXT,
  proof_image_url TEXT,
  client_country TEXT,
  source_platform TEXT,
  verified BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COURSES & BATCHES TABLE
CREATE TABLE IF NOT EXISTS public.tracks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_desc TEXT,
  full_desc TEXT,
  badge TEXT,
  price NUMERIC DEFAULT 999,
  average_earnings TEXT,
  modules_count INTEGER DEFAULT 4,
  students_count INTEGER DEFAULT 0,
  modules JSONB,
  deliverables JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Allow public reads for results and tracks (Wall of Fame and Catalog)
DROP POLICY IF EXISTS "Public can view results" ON public.results;
CREATE POLICY "Public can view results" ON public.results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view tracks" ON public.tracks;
CREATE POLICY "Public can view tracks" ON public.tracks FOR SELECT USING (true);

-- Allow authenticated/anon to insert enrollments and results
DROP POLICY IF EXISTS "Allow insert enrollments" ON public.enrollments;
CREATE POLICY "Allow insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow insert results" ON public.results;
CREATE POLICY "Allow insert results" ON public.results FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select profiles" ON public.profiles;
CREATE POLICY "Allow select profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow upsert profiles" ON public.profiles;
CREATE POLICY "Allow upsert profiles" ON public.profiles FOR ALL USING (true);
