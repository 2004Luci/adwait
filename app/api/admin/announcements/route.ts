/**
 * Announcements API Route
 *
 * Handles:
 * - GET /api/admin/announcements - List all announcements
 * - POST /api/admin/announcements - Create a new announcement
 * - PATCH /api/admin/announcements - Update an announcement (with id in body)
 * - DELETE /api/admin/announcements - Delete an announcement (with id in body)
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementActive,
} from "@/lib/db/announcements";
import type { AnnouncementInsert, AnnouncementUpdate } from "@/lib/db/types";

/**
 * GET /api/admin/announcements
 * List all announcements
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const announcements = await getAnnouncements();

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("[API] Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/announcements
 * Create a new announcement
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, type, is_active, start_date, end_date } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const announcementData: AnnouncementInsert = {
      title: title.trim(),
      content: content?.trim() || null,
      type: type || "info",
      is_active: is_active ?? true,
      start_date: start_date || null,
      end_date: end_date || null,
    };

    const announcement = await createAnnouncement(announcementData);

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    console.error("[API] Error creating announcement:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/announcements
 * Update an announcement
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, content, type, is_active, start_date, end_date, action } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required" },
        { status: 400 }
      );
    }

    // Handle toggle action
    if (action === "toggle") {
      const announcement = await toggleAnnouncementActive(id, is_active);
      return NextResponse.json({ announcement });
    }

    // Regular update
    const updateData: AnnouncementUpdate = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { error: "Title cannot be empty" },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }

    if (content !== undefined) updateData.content = content?.trim() || null;
    if (type !== undefined) updateData.type = type;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (start_date !== undefined) updateData.start_date = start_date;
    if (end_date !== undefined) updateData.end_date = end_date;

    const announcement = await updateAnnouncement(id, updateData);

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error("[API] Error updating announcement:", error);
    return NextResponse.json(
      { error: "Failed to update announcement" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/announcements
 * Delete an announcement
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
        { error: "Announcement ID is required" },
        { status: 400 }
      );
    }

    await deleteAnnouncement(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}
