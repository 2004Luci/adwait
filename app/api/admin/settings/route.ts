/**
 * Site Settings API Route
 *
 * Handles:
 * - GET /api/admin/settings - Get all settings or by category
 * - POST /api/admin/settings - Create or update a setting
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAllSettings,
  getSettingsByCategory,
  getSettingByKey,
  upsertSetting,
} from "@/lib/db/settings";
import type { SettingsCategory } from "@/lib/db/types";

/**
 * GET /api/admin/settings
 * Get all settings or filter by category/key
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as SettingsCategory | null;
    const key = searchParams.get("key");

    // Get single setting by key
    if (key) {
      const setting = await getSettingByKey(key);
      return NextResponse.json({ setting });
    }

    // Get settings by category
    if (category) {
      const settings = await getSettingsByCategory(category);
      return NextResponse.json({ settings });
    }

    // Get all settings
    const settings = await getAllSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("[API] Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/settings
 * Create or update a setting
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, value, category, description } = body;

    // Validate required fields
    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { error: "Setting key is required" },
        { status: 400 }
      );
    }

    if (value === undefined) {
      return NextResponse.json(
        { error: "Setting value is required" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Setting category is required" },
        { status: 400 }
      );
    }

    // Upsert the setting
    const setting = await upsertSetting(
      key,
      value,
      category as SettingsCategory,
      description,
      session.user.id
    );

    return NextResponse.json({ setting });
  } catch (error) {
    console.error("[API] Error saving setting:", error);
    return NextResponse.json(
      { error: "Failed to save setting" },
      { status: 500 }
    );
  }
}
