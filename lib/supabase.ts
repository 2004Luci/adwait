import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKeyRaw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrlRaw) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKeyRaw) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

// Type-safe validated values
const supabaseUrl: string = supabaseUrlRaw;
const supabaseAnonKey: string = supabaseAnonKeyRaw;

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

  // TypeScript now knows supabaseServiceKey is string after the check above
  return createClient(supabaseUrl, supabaseServiceKey as string, {
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
