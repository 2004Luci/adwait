"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "../../components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Loader2,
  Monitor,
  Clock,
} from "lucide-react";
import { SETTING_KEYS } from "@/lib/db/settings";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface CarouselSettingsClientProps {
  user: AdminUser;
  initialWidth: string | number;
  initialHeight: string | number;
  initialRotationInterval: number;
  defaultWidth: string | number;
  defaultHeight: string | number;
  defaultRotationInterval: number;
}

export function CarouselSettingsClient({
  user,
  initialWidth,
  initialHeight,
  initialRotationInterval,
  defaultWidth,
  defaultHeight,
  defaultRotationInterval,
}: CarouselSettingsClientProps) {
  const router = useRouter();
  const [width, setWidth] = useState<string | number>(initialWidth);
  const [height, setHeight] = useState<string | number>(initialHeight);
  const [rotationInterval, setRotationInterval] = useState<number>(
    initialRotationInterval
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset to defaults
  const resetToDefaults = () => {
    setWidth(defaultWidth);
    setHeight(defaultHeight);
    setRotationInterval(defaultRotationInterval);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate rotation interval
      if (rotationInterval < 0) {
        setError("Rotation interval must be a positive number (0 to disable)");
        setIsSaving(false);
        return;
      }

      // Save width
      const widthResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.CAROUSEL_WIDTH,
          value: width,
          category: "general",
          description: "Carousel width (e.g., '100%', '1200px', or number in pixels)",
        }),
      });

      if (!widthResponse.ok) {
        throw new Error("Failed to save width");
      }

      // Save height
      const heightResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.CAROUSEL_HEIGHT,
          value: height,
          category: "general",
          description: "Carousel height (e.g., 'auto', '400px', or number in pixels)",
        }),
      });

      if (!heightResponse.ok) {
        throw new Error("Failed to save height");
      }

      // Save rotation interval
      const intervalResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.CAROUSEL_ROTATION_INTERVAL,
          value: rotationInterval,
          category: "general",
          description: "Carousel auto-rotation interval in milliseconds (0 to disable)",
        }),
      });

      if (!intervalResponse.ok) {
        throw new Error("Failed to save rotation interval");
      }

      setSuccess(true);
      router.refresh();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  // Parse width/height input - allow both numbers and strings
  const handleWidthChange = (value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && value.trim() !== "") {
      setWidth(numValue);
    } else {
      setWidth(value);
    }
  };

  const handleHeightChange = (value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && value.trim() !== "") {
      setHeight(numValue);
    } else {
      setHeight(value);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/banners">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white">
                  Carousel Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Configure banner carousel dimensions and rotation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
              Settings saved successfully!
            </div>
          )}

          {/* Dimensions Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-sage-600" />
                <CardTitle>Carousel Dimensions</CardTitle>
              </div>
              <CardDescription>
                Set the width and height of the banner carousel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Width */}
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    placeholder="100% or 1200px or 1200"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter a percentage (e.g., &quot;100%&quot;), pixel value with unit
                    (e.g., &quot;1200px&quot;), or just a number for pixels
                  </p>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    placeholder="auto or 400px or 400"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter &quot;auto&quot; for aspect ratio, pixel value (e.g.,
                    &quot;400px&quot;), or just a number for pixels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rotation Settings Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-sage-600" />
                <CardTitle>Auto-Rotation</CardTitle>
              </div>
              <CardDescription>
                Control how often the carousel automatically changes banners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rotationInterval">
                  Rotation Interval (milliseconds)
                </Label>
                <Input
                  id="rotationInterval"
                  type="number"
                  min="0"
                  step="100"
                  value={rotationInterval}
                  onChange={(e) =>
                    setRotationInterval(Number(e.target.value) || 0)
                  }
                  placeholder="5000"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Time in milliseconds between automatic banner changes. Set to 0 to
                  disable auto-rotation. Default: 5000ms (5 seconds)
                </p>
                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Current:</strong> {rotationInterval}ms (
                    {rotationInterval > 0
                      ? `${(rotationInterval / 1000).toFixed(1)} seconds`
                      : "Disabled"}
                    )
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Info */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="py-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Preview:</strong> After saving, visit the{" "}
                <Link href="/" target="_blank" className="text-sage-600 hover:underline">
                  homepage
                </Link>{" "}
                to see your changes in action.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
