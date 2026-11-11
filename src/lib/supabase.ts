import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://isuuiivblrjlvwuoewzh.supabase.co";
const DEFAULT_ANON_KEY = "sb_publishable_5_pzVRFgxSBCz-e08ZO2Gg_t11ocGHK";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

// Client-side Supabase instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin Supabase instance (uses service role key from env, falls back to anon key)
export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
