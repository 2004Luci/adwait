/**
 * Database queries for Posts (Blog/Dynamic Pages)
 *
 * These functions handle all CRUD operations for posts.
 * They use the Supabase admin client to bypass RLS for admin operations.
 */

import { getSupabaseAdminOrThrow } from "../supabase";
import type { Post, PostInsert, PostUpdate, PostWithAuthor } from "./types";

/**
 * Get all posts with author information
 * @param status - Filter by status (optional)
 * @param limit - Maximum number of posts to return
 * @param offset - Number of posts to skip (for pagination)
 */
export async function getPosts(options?: {
  status?: "draft" | "published";
  limit?: number;
  offset?: number;
}): Promise<{ posts: PostWithAuthor[]; total: number }> {
  const supabase = getSupabaseAdminOrThrow();
  const { status, limit = 50, offset = 0 } = options || {};

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      author:admin_users!posts_author_id_fkey (
        id,
        name,
        email
      )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Posts] Error fetching posts:", error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return {
    posts: (data as PostWithAuthor[]) || [],
    total: count || 0,
  };
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:admin_users!posts_author_id_fkey (
        id,
        name,
        email
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("[Posts] Error fetching post by ID:", error);
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  return data as PostWithAuthor;
}

/**
 * Get a single post by slug (for public pages)
 */
export async function getPostBySlug(
  slug: string
): Promise<PostWithAuthor | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:admin_users!posts_author_id_fkey (
        id,
        name,
        email
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("[Posts] Error fetching post by slug:", error);
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  return data as PostWithAuthor;
}

/**
 * Get a published post by slug (for public pages)
 */
export async function getPublishedPostBySlug(
  slug: string
): Promise<PostWithAuthor | null> {
  const supabase = getSupabaseAdminOrThrow();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:admin_users!posts_author_id_fkey (
        id,
        name,
        email
      )
    `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("[Posts] Error fetching published post:", error);
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  return data as PostWithAuthor;
}

/**
 * Create a new post
 */
export async function createPost(post: PostInsert): Promise<Post> {
  const supabase = getSupabaseAdminOrThrow();

  // Generate slug from title if not provided
  const slug = post.slug || generateSlug(post.title);

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    throw new Error(`A post with the slug "${slug}" already exists`);
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...post,
      slug,
    })
    .select()
    .single();

  if (error) {
    console.error("[Posts] Error creating post:", error);
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return data as Post;
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, update: PostUpdate): Promise<Post> {
  const supabase = getSupabaseAdminOrThrow();

  // If slug is being updated, check it doesn't conflict
  if (update.slug) {
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", update.slug)
      .neq("id", id)
      .single();

    if (existing) {
      throw new Error(`A post with the slug "${update.slug}" already exists`);
    }
  }

  const { data, error } = await supabase
    .from("posts")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[Posts] Error updating post:", error);
    throw new Error(`Failed to update post: ${error.message}`);
  }

  return data as Post;
}

/**
 * Publish a post
 */
export async function publishPost(id: string): Promise<Post> {
  return updatePost(id, {
    status: "published",
    published_at: new Date().toISOString(),
  });
}

/**
 * Unpublish a post (set to draft)
 */
export async function unpublishPost(id: string): Promise<Post> {
  return updatePost(id, {
    status: "draft",
    published_at: null,
  });
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<void> {
  const supabase = getSupabaseAdminOrThrow();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("[Posts] Error deleting post:", error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }
}

/**
 * Check if a slug is available
 */
export async function isSlugAvailable(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const supabase = getSupabaseAdminOrThrow();

  let query = supabase.from("posts").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query.single();

  return !data;
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
