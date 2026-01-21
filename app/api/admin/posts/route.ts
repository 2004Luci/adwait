/**
 * Posts API Route
 *
 * Handles:
 * - GET /api/admin/posts - List all posts
 * - POST /api/admin/posts - Create a new post
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPosts, createPost, generateSlug } from "@/lib/db/posts";
import type { PostInsert } from "@/lib/db/types";

/**
 * GET /api/admin/posts
 * List all posts with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "draft" | "published" | null;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Fetch posts
    const { posts, total } = await getPosts({
      status: status || undefined,
      limit,
      offset,
    });

    return NextResponse.json({
      posts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("[API] Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { title, slug, content, excerpt, featured_image, status } = body;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Prepare post data
    const postData: PostInsert = {
      title: title.trim(),
      slug: slug ? slug.trim() : generateSlug(title),
      content: content || null,
      excerpt: excerpt?.trim() || null,
      featured_image: featured_image?.trim() || null,
      status: status || "draft",
      author_id: session.user.id,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    // Create post
    const post = await createPost(postData);

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating post:", error);

    // Handle duplicate slug error
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
