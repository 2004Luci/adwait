/**
 * Individual Post API Route
 *
 * Handles:
 * - GET /api/admin/posts/[id] - Get a single post
 * - PATCH /api/admin/posts/[id] - Update a post
 * - DELETE /api/admin/posts/[id] - Delete a post
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getPostById,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost,
} from "@/lib/db/posts";
import type { PostUpdate } from "@/lib/db/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/posts/[id]
 * Get a single post by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Fetch post
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("[API] Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/posts/[id]
 * Update a post
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if post exists
    const existingPost = await getPostById(id);
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    const { title, slug, content, excerpt, featured_image, status, action } =
      body;

    // Handle publish/unpublish actions
    if (action === "publish") {
      const post = await publishPost(id);
      return NextResponse.json({ post });
    }

    if (action === "unpublish") {
      const post = await unpublishPost(id);
      return NextResponse.json({ post });
    }

    // Prepare update data
    const updateData: PostUpdate = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { error: "Title cannot be empty" },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }

    if (slug !== undefined) {
      updateData.slug = slug.trim();
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (excerpt !== undefined) {
      updateData.excerpt = excerpt?.trim() || null;
    }

    if (featured_image !== undefined) {
      updateData.featured_image = featured_image?.trim() || null;
    }

    if (status !== undefined) {
      updateData.status = status;
      if (status === "published" && existingPost.status !== "published") {
        updateData.published_at = new Date().toISOString();
      }
    }

    // Update post
    const post = await updatePost(id, updateData);

    return NextResponse.json({ post });
  } catch (error) {
    console.error("[API] Error updating post:", error);

    // Handle duplicate slug error
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Delete a post
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if post exists
    const existingPost = await getPostById(id);
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete post
    await deletePost(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
