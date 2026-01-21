/**
 * Database types for the CMS.
 * These types mirror the Supabase database schema.
 */

// ==================== ADMIN USERS ====================

export type AdminUserRole = "admin" | "editor";

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  role: AdminUserRole;
  created_at: string;
  updated_at: string;
}

export interface AdminUserInsert {
  email: string;
  password_hash: string;
  name?: string | null;
  role?: AdminUserRole;
}

export interface AdminUserUpdate {
  email?: string;
  password_hash?: string;
  name?: string | null;
  role?: AdminUserRole;
  updated_at?: string;
}

// ==================== POSTS (BLOG) ====================

export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: Record<string, unknown> | null; // Tiptap JSON content
  excerpt: string | null;
  featured_image: string | null;
  status: PostStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostInsert {
  title: string;
  slug: string;
  content?: Record<string, unknown> | null;
  excerpt?: string | null;
  featured_image?: string | null;
  status?: PostStatus;
  author_id?: string | null;
  published_at?: string | null;
}

export interface PostUpdate {
  title?: string;
  slug?: string;
  content?: Record<string, unknown> | null;
  excerpt?: string | null;
  featured_image?: string | null;
  status?: PostStatus;
  author_id?: string | null;
  published_at?: string | null;
  updated_at?: string;
}

// Post with author information joined
export interface PostWithAuthor extends Post {
  author: Pick<AdminUser, "id" | "name" | "email"> | null;
}

// ==================== ANNOUNCEMENTS ====================

export type AnnouncementType = "info" | "warning" | "success";

export interface Announcement {
  id: string;
  title: string;
  content: string | null;
  type: AnnouncementType;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface AnnouncementInsert {
  title: string;
  content?: string | null;
  type?: AnnouncementType;
  is_active?: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

export interface AnnouncementUpdate {
  title?: string;
  content?: string | null;
  type?: AnnouncementType;
  is_active?: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

// ==================== BANNERS ====================

export interface Banner {
  id: string;
  title: string | null;
  image_url: string | null;
  link_url: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
}

export interface BannerInsert {
  title?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  position?: number;
  is_active?: boolean;
}

export interface BannerUpdate {
  title?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  position?: number;
  is_active?: boolean;
}

// ==================== SITE SETTINGS ====================

export type SettingsCategory =
  | "hero"
  | "services"
  | "about"
  | "contact"
  | "testimonials"
  | "expertise"
  | "footer"
  | "general";

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown> | unknown[];
  category: SettingsCategory;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface SiteSettingInsert {
  key: string;
  value: Record<string, unknown> | unknown[];
  category: SettingsCategory;
  description?: string | null;
  updated_by?: string | null;
}

export interface SiteSettingUpdate {
  value?: Record<string, unknown> | unknown[];
  category?: SettingsCategory;
  description?: string | null;
  updated_by?: string | null;
  updated_at?: string;
}

// ==================== SUPABASE DATABASE TYPES ====================

/**
 * Main database type definition for Supabase client.
 * This provides type safety when using the Supabase client.
 */
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUser;
        Insert: AdminUserInsert;
        Update: AdminUserUpdate;
      };
      posts: {
        Row: Post;
        Insert: PostInsert;
        Update: PostUpdate;
      };
      announcements: {
        Row: Announcement;
        Insert: AnnouncementInsert;
        Update: AnnouncementUpdate;
      };
      banners: {
        Row: Banner;
        Insert: BannerInsert;
        Update: BannerUpdate;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSettingInsert;
        Update: SiteSettingUpdate;
      };
    };
  };
}
