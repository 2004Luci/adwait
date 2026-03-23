/**
 * Banners API Route
 *
 * Handles:
 * - GET /api/admin/banners - List all banners
 * - POST /api/admin/banners - Create a new banner
 * - PATCH /api/admin/banners - Update a banner (with id in body)
 * - DELETE /api/admin/banners - Delete a banner (with id in body)
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerActive,
  updateBannerPositions,
} from "@/lib/db/banners";
import type { BannerInsert, BannerUpdate } from "@/lib/db/types";

/**
 * GET /api/admin/banners
 * List all banners
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const banners = await getBanners();

    return NextResponse.json({ banners });
  } catch (error) {
    console.error("[API] Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/banners
 * Create a new banner
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, image_url, link_url, is_active } = body;

    const bannerData: BannerInsert = {
      title: title?.trim() || null,
      image_url: image_url?.trim() || null,
      link_url: link_url?.trim() || null,
      is_active: is_active ?? true,
    };

    const banner = await createBanner(bannerData);

    return NextResponse.json({ banner }, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/banners
 * Update a banner or reorder banners
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, image_url, link_url, is_active, action, positions } = body;

    // Handle reorder action
    if (action === "reorder" && positions) {
      await updateBannerPositions(positions);
      const banners = await getBanners();
      return NextResponse.json({ banners });
    }

    // Handle toggle action
    if (action === "toggle" && id) {
      const banner = await toggleBannerActive(id, is_active);
      return NextResponse.json({ banner });
    }

    // Regular update
    if (!id) {
      return NextResponse.json(
        { error: "Banner ID is required" },
        { status: 400 }
      );
    }

    const updateData: BannerUpdate = {};

    if (title !== undefined) updateData.title = title?.trim() || null;
    if (image_url !== undefined) updateData.image_url = image_url?.trim() || null;
    if (link_url !== undefined) updateData.link_url = link_url?.trim() || null;
    if (is_active !== undefined) updateData.is_active = is_active;

    const banner = await updateBanner(id, updateData);

    return NextResponse.json({ banner });
  } catch (error) {
    console.error("[API] Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/banners
 * Delete a banner
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Banner ID is required" },
        { status: 400 }
      );
    }

    await deleteBanner(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error deleting banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
