/**
 * Database queries for Announcements
 *
 * These functions handle all CRUD operations for homepage announcements.
 */

import { getSupabaseAdminOrThrow } from "../supabase";
import type { Announcement, AnnouncementInsert, AnnouncementUpdate } from "./types";

/**
 * Get all announcements
 * @param activeOnly - Only return active announcements within date range
 */
export async function getAnnouncements(options?: {
  activeOnly?: boolean;
}): Promise<Announcement[]> {
  const supabase = getSupabaseAdminOrThrow();
  const { activeOnly = false } = options || {};

  let query = supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeOnly) {
    const now = new Date().toISOString();
    query = query
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Announcements] Error fetching announcements:", error);
    throw new Error(`Failed to fetch announcements: ${error.message}`);
  }

  return data as Announcement[];
}

/**
 * Get active announcements for public display
 */
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseAdminOrThrow();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Announcements] Error fetching active announcements:", error);
    throw new Error(`Failed to fetch announcements: ${error.message}`);
  }

  return data as Announcement[];
}

/**
 * Get a single announcement by ID
 */
export async function getAnnouncementById(id: string): Promise<Announcement | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("[Announcements] Error fetching announcement:", error);
    throw new Error(`Failed to fetch announcement: ${error.message}`);
  }

  return data as Announcement;
}

/**
 * Create a new announcement
 */
export async function createAnnouncement(
  announcement: AnnouncementInsert
): Promise<Announcement> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("announcements")
    .insert(announcement)
    .select()
    .single();

  if (error) {
    console.error("[Announcements] Error creating announcement:", error);
    throw new Error(`Failed to create announcement: ${error.message}`);
  }

  return data as Announcement;
}

/**
 * Update an existing announcement
 */
export async function updateAnnouncement(
  id: string,
  update: AnnouncementUpdate
): Promise<Announcement> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("announcements")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[Announcements] Error updating announcement:", error);
    throw new Error(`Failed to update announcement: ${error.message}`);
  }

  return data as Announcement;
}

/**
 * Toggle announcement active status
 */
export async function toggleAnnouncementActive(
  id: string,
  isActive: boolean
): Promise<Announcement> {
  return updateAnnouncement(id, { is_active: isActive });
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(id: string): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) {
    console.error("[Announcements] Error deleting announcement:", error);
    throw new Error(`Failed to delete announcement: ${error.message}`);
  }
}
