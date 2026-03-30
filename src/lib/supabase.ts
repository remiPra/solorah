import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

/** Client-side Supabase client (anon key) — used for auth + RLS queries */
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/** Server-side Supabase client (service role) — used in API routes only, bypasses RLS */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env var');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}
