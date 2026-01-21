import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

/**
 * Supabase client for client-side operations.
 * Uses the anon key which respects Row Level Security (RLS) policies.
 * Safe to use in browser/client components.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase admin client for server-side operations.
 * Uses the service role key which bypasses RLS.
 * ONLY use in server-side code (API routes, Server Components, Server Actions).
 *
 * Returns null if the service role key is not configured.
 */
export function getSupabaseAdmin() {
  if (!supabaseServiceKey) {
    console.warn(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Admin operations will not work."
    );
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Type-safe Supabase admin client getter.
 * Throws an error if the service role key is not configured.
 * Use this when you need guaranteed admin access.
 */
export function getSupabaseAdminOrThrow() {
  const admin = getSupabaseAdmin();
  if (!admin) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for this operation but is not configured"
    );
  }
  return admin;
}
