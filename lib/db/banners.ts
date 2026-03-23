/**
 * Database queries for Banners
 *
 * These functions handle all CRUD operations for homepage banners.
 */

import { getSupabaseAdminOrThrow, supabase } from "../supabase";
import type { Banner, BannerInsert, BannerUpdate } from "./types";

/**
 * Get all banners
 * @param activeOnly - Only return active banners
 */
export async function getBanners(options?: {
  activeOnly?: boolean;
}): Promise<Banner[]> {
  const supabase = getSupabaseAdminOrThrow();
  const { activeOnly = false } = options || {};

  let query = supabase
    .from("banners")
    .select("*")
    .order("position", { ascending: true });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Banners] Error fetching banners:", error);
    throw new Error(`Failed to fetch banners: ${error.message}`);
  }

  return data as Banner[];
}

/**
 * Get active banners for public display
 * Uses public client (respects RLS) - safe for use in Server Components
 */
export async function getActiveBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("[Banners] Error fetching active banners:", error);
    throw new Error(`Failed to fetch banners: ${error.message}`);
  }

  return data as Banner[];
}

/**
 * Get a single banner by ID
 */
export async function getBannerById(id: string): Promise<Banner | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("[Banners] Error fetching banner:", error);
    throw new Error(`Failed to fetch banner: ${error.message}`);
  }

  return data as Banner;
}

/**
 * Create a new banner
 */
export async function createBanner(banner: BannerInsert): Promise<Banner> {
  const supabase = getSupabaseAdminOrThrow();

  // Get the highest position to add new banner at the end
  const { data: existing } = await supabase
    .from("banners")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const position = existing ? existing.position + 1 : 0;

  const { data, error } = await supabase
    .from("banners")
    .insert({ ...banner, position })
    .select()
    .single();

  if (error) {
    console.error("[Banners] Error creating banner:", error);
    throw new Error(`Failed to create banner: ${error.message}`);
  }

  return data as Banner;
}

/**
 * Update an existing banner
 */
export async function updateBanner(
  id: string,
  update: BannerUpdate
): Promise<Banner> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("banners")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[Banners] Error updating banner:", error);
    throw new Error(`Failed to update banner: ${error.message}`);
  }

  return data as Banner;
}

/**
 * Toggle banner active status
 */
export async function toggleBannerActive(
  id: string,
  isActive: boolean
): Promise<Banner> {
  return updateBanner(id, { is_active: isActive });
}

/**
 * Update banner positions (for reordering)
 */
export async function updateBannerPositions(
  positions: { id: string; position: number }[]
): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  // Update each banner's position
  const updates = positions.map(({ id, position }) =>
    supabase.from("banners").update({ position }).eq("id", id)
  );

  const results = await Promise.all(updates);

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    console.error("[Banners] Error updating positions:", errors);
    throw new Error("Failed to update banner positions");
  }
}

/**
 * Delete a banner
 */
export async function deleteBanner(id: string): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  const { error } = await supabase.from("banners").delete().eq("id", id);

  if (error) {
    console.error("[Banners] Error deleting banner:", error);
    throw new Error(`Failed to delete banner: ${error.message}`);
  }
}
