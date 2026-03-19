/**
 * Database queries for Site Settings
 *
 * These functions handle all CRUD operations for site settings,
 * which replace the hardcoded constants in constants.ts for editable content.
 */

import { getSupabaseAdminOrThrow } from "../supabase";
import type { SiteSetting, SiteSettingUpdate, SettingsCategory } from "./types";

/**
 * Get all site settings
 */
export async function getAllSettings(): Promise<SiteSetting[]> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("category", { ascending: true });

  if (error) {
    console.error("[Settings] Error fetching all settings:", error);
    throw new Error(`Failed to fetch settings: ${error.message}`);
  }

  return data as SiteSetting[];
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(
  category: SettingsCategory
): Promise<SiteSetting[]> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("category", category)
    .order("key", { ascending: true });

  if (error) {
    console.error("[Settings] Error fetching settings by category:", error);
    throw new Error(`Failed to fetch settings: ${error.message}`);
  }

  return data as SiteSetting[];
}

/**
 * Get a single setting by key
 */
export async function getSettingByKey(key: string): Promise<SiteSetting | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("[Settings] Error fetching setting by key:", error);
    throw new Error(`Failed to fetch setting: ${error.message}`);
  }

  return data as SiteSetting;
}

/**
 * Get setting value by key with a default fallback
 */
export async function getSettingValue<T>(
  key: string,
  defaultValue: T
): Promise<T> {
  try {
    const setting = await getSettingByKey(key);
    if (setting && setting.value !== null) {
      return setting.value as T;
    }
    return defaultValue;
  } catch {
    console.warn(`[Settings] Failed to get setting "${key}", using default`);
    return defaultValue;
  }
}

/**
 * Create or update a setting (upsert)
 */
export async function upsertSetting(
  key: string,
  value: Record<string, unknown> | unknown[],
  category: SettingsCategory,
  description?: string,
  updatedBy?: string
): Promise<SiteSetting> {
  const supabase = getSupabaseAdminOrThrow();

  // Check if setting exists
  const existing = await getSettingByKey(key);

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from("site_settings")
      .update({
        value,
        category,
        description: description ?? existing.description,
        updated_by: updatedBy || null,
      })
      .eq("key", key)
      .select()
      .single();

    if (error) {
      console.error("[Settings] Error updating setting:", error);
      throw new Error(`Failed to update setting: ${error.message}`);
    }

    return data as SiteSetting;
  } else {
    // Create new
    const { data, error } = await supabase
      .from("site_settings")
      .insert({
        key,
        value,
        category,
        description: description || null,
        updated_by: updatedBy || null,
      })
      .select()
      .single();

    if (error) {
      console.error("[Settings] Error creating setting:", error);
      throw new Error(`Failed to create setting: ${error.message}`);
    }

    return data as SiteSetting;
  }
}

/**
 * Update a setting by key
 */
export async function updateSetting(
  key: string,
  update: SiteSettingUpdate
): Promise<SiteSetting> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("site_settings")
    .update(update)
    .eq("key", key)
    .select()
    .single();

  if (error) {
    console.error("[Settings] Error updating setting:", error);
    throw new Error(`Failed to update setting: ${error.message}`);
  }

  return data as SiteSetting;
}

/**
 * Delete a setting by key
 */
export async function deleteSetting(key: string): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  const { error } = await supabase.from("site_settings").delete().eq("key", key);

  if (error) {
    console.error("[Settings] Error deleting setting:", error);
    throw new Error(`Failed to delete setting: ${error.message}`);
  }
}

/**
 * Seed initial settings from constants.ts defaults
 * This should be run once to populate the database with initial values
 */
export async function seedDefaultSettings(
  defaults: { key: string; value: unknown; category: SettingsCategory; description: string }[]
): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  for (const setting of defaults) {
    const existing = await getSettingByKey(setting.key);
    if (!existing) {
      const { error } = await supabase.from("site_settings").insert({
        key: setting.key,
        value: setting.value as Record<string, unknown>,
        category: setting.category,
        description: setting.description,
      });

      if (error) {
        console.error(`[Settings] Error seeding setting "${setting.key}":`, error);
      }
    }
  }
}

// ==================== SETTING KEYS ====================
// These constants define the keys used for each setting

export const SETTING_KEYS = {
  // Hero Section
  HERO_STATS: "hero_stats",
  HERO_TYPEWRITER_PHRASES: "hero_typewriter_phrases",

  // Services
  SERVICES: "services",
  SERVICE_LIST: "service_list",

  // About Section
  PARTNERS: "partners",
  ACHIEVEMENTS: "achievements",
  CLIENT_LOGOS: "client_logos",

  // Testimonials
  TESTIMONIALS: "testimonials",
  CASE_STUDIES: "case_studies",

  // Contact
  CONTACT_INFO: "contact_info",
  CONTACT_EMAIL: "contact_email",
  CONTACT_PHONE: "contact_phone",
  CONTACT_ADDRESS: "contact_address",
  BUSINESS_HOURS: "business_hours",
  COMPANY_EMAILS: "company_emails",
  OFFICE_MAPS_URL: "office_maps_url",

  // Expertise
  EXPERTISE_AREAS: "expertise_areas",
  EXPERTISE_PROCESS_STEPS: "expertise_process_steps",
  PROCESS_STEPS: "process_steps",

  // Footer
  FOOTER_LINKS: "footer_links",

  // Miscellaneous
  SITE_URL: "site_url",
  NAV_ITEMS: "nav_items",
  OPEN_POSITIONS: "open_positions",
  BENEFITS: "benefits",
  TIME_SLOTS: "time_slots",
  CORPORATE_LAW_SERVICES: "corporate_law_services",
  CORPORATE_LAW_MEETING_SERVICES: "corporate_law_meeting_services",
  CORPORATE_LAW_COMPLIANCE_AREAS: "corporate_law_compliance_areas",
  IPO_FEATURES: "ipo_features",
  IPO_PROCESS_STEPS: "ipo_process_steps",
  IPO_BENEFITS: "ipo_benefits",
  LEGAL_DRAFTING_SERVICES: "legal_drafting_services",
  LEGAL_DRAFTING_DOCUMENT_TYPES: "legal_drafting_document_types",
  LEGAL_DRAFTING_AUDIT_SERVICES: "legal_drafting_audit_services",
  LAW_TRIBUNALS_SERVICES: "law_tribunals_services",
  LAW_TRIBUNALS: "law_tribunals",
  LAW_TRIBUNALS_EXPERTISE: "law_tribunals_expertise",
  LOAN_SYNDICATION_SERVICES: "loan_syndication_services",
  LOAN_SYNDICATION_FINANCE_TYPES: "loan_syndication_finance_types",
  LOAN_SYNDICATION_PROJECT_TYPES: "loan_syndication_project_types",
  FINANCIAL_ADVISORY_SERVICES: "financial_advisory_services",
  FINANCIAL_ADVISORY_AREAS: "financial_advisory_areas",
  FINANCIAL_ADVISORY_BENEFITS: "financial_advisory_benefits",

  // Carousel
  CAROUSEL_WIDTH: "carousel_width",
  CAROUSEL_HEIGHT: "carousel_height",
  CAROUSEL_ROTATION_INTERVAL: "carousel_rotation_interval",
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];
