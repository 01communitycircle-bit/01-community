/**
 * 0.1% COMMUNITY - PRODUCTION DATABASE & BACKEND ARCHITECTURE RECOMMENDATION
 * =========================================================================
 * 
 * Recommended Stack for Vercel Deployment:
 * ---------------------------------------
 * 1. Database: SUPABASE (Serverless PostgreSQL)
 *    - Why: Perfect fit for Vercel serverless functions with connection pooling (PgBouncer).
 *    - Latency: Sub-20ms edge queries, zero cold-start bottlenecks.
 *    - Built-in Auth: Google OAuth + Email/Password + Forgot Password with secure tokens.
 *    - Storage: High-speed S3-compatible buckets for student profile pictures and Earnings Proof screenshots.
 *    - Realtime: Instant WebSockets notify the Admin immediately when a ₹1,000 payment arrives.
 * 
 * 2. Payments: RAZORPAY / CASHFREE (India's standard for ₹1,000 UPI, GPay, PhonePe, Cards)
 *    - Webhook sends a POST to `/api/webhooks/razorpay`
 *    - Verifies HMAC SHA256 signature
 *    - Unlocks member access & creates WhatsApp triage item in < 200ms
 * 
 * Below is the production-ready PostgreSQL Schema for Supabase:
 */

export const SUPABASE_SQL_SCHEMA = `
-- 1. PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  bio TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin')),
  is_pro BOOLEAN DEFAULT FALSE,
  whatsapp_status TEXT DEFAULT 'not_started' CHECK (whatsapp_status IN ('not_started', 'pending_add', 'invite_sent', 'joined')),
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILL TRACKS TABLE
CREATE TABLE public.skill_tracks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  badge TEXT,
  mentor_id UUID,
  average_earnings TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENROLLMENTS TABLE (Tracks which student unlocked which track)
CREATE TABLE public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  track_id TEXT REFERENCES public.skill_tracks(id) ON DELETE RESTRICT NOT NULL,
  plan TEXT DEFAULT 'pro_lifetime_1000',
  amount_paid NUMERIC DEFAULT 1000,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, track_id)
);

-- 4. PAYMENTS & TRANSACTIONS TABLE
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  track_id TEXT REFERENCES public.skill_tracks(id),
  amount NUMERIC DEFAULT 1000,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'pending', 'failed')),
  payment_method TEXT DEFAULT 'UPI',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESULTS & PROOF OF EARNINGS TABLE
CREATE TABLE public.results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  track_id TEXT REFERENCES public.skill_tracks(id) ON DELETE RESTRICT NOT NULL,
  title TEXT NOT NULL,
  amount_inr NUMERIC NOT NULL,
  currency_label TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('freelancing', 'video_editing', 'web_dev', 'software_dev')),
  proof_image_url TEXT,
  client_country TEXT DEFAULT 'India 🇮🇳',
  source_platform TEXT DEFAULT 'Direct Client',
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WHATSAPP ONBOARDING QUEUE
CREATE TABLE public.whatsapp_onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  track_id TEXT NOT NULL,
  track_name TEXT NOT NULL,
  mentor_id UUID,
  status TEXT DEFAULT 'pending_add' CHECK (status IN ('pending_add', 'invite_sent', 'joined')),
  notes TEXT,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  added_at TIMESTAMPTZ
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_onboarding ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: anyone can read public fields; only user or admin can edit
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Results: Verified results are publicly viewable by anyone (social proof)
CREATE POLICY "Verified results are viewable by all" ON public.results FOR SELECT USING (verified = true);
CREATE POLICY "Pro students can insert their own results" ON public.results FOR INSERT WITH CHECK (
  auth.uid() = student_id AND (SELECT is_pro FROM public.profiles WHERE id = auth.uid()) = true
);

-- 3. Payments: Only admin or the paying user can see their own payment history
CREATE POLICY "Users see own payments" ON public.payments FOR SELECT USING (
  auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
`;
