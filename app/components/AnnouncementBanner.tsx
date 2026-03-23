"use client";

import { useState, useEffect, useRef } from "react";
import { X, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "./ui/utils";
import type { Announcement, AnnouncementType } from "@/lib/db/types";

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

const typeStyles: Record<AnnouncementType, { bg: string; icon: React.ReactNode }> = {
  info: {
    bg: "bg-blue-600",
    icon: <Info className="h-4 w-4" />,
  },
  warning: {
    bg: "bg-amber-500",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  success: {
    bg: "bg-green-600",
    icon: <CheckCircle className="h-4 w-4" />,
  },
};

/**
 * Announcement Banner Component
 *
 * Displays active announcements at the top of the page.
 * Shows one announcement at a time with option to dismiss.
 */
export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const bannerRef = useRef<HTMLDivElement>(null);

  // Filter out dismissed announcements
  const visibleAnnouncements = announcements.filter(
    (a) => !dismissed.has(a.id)
  );

  // Update CSS variable with banner height when visible
  useEffect(() => {
    if (visibleAnnouncements.length === 0) {
      document.documentElement.style.setProperty("--announcement-banner-height", "0px");
      return;
    }

    const updateHeight = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--announcement-banner-height", `${height}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.setProperty("--announcement-banner-height", "0px");
    };
  }, [visibleAnnouncements.length]);

  // Auto-rotate through announcements
  useEffect(() => {
    if (visibleAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [visibleAnnouncements.length]);

  // Don't render if no visible announcements
  if (visibleAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = visibleAnnouncements[currentIndex % visibleAnnouncements.length];
  const style = typeStyles[currentAnnouncement.type];

  const handleDismiss = () => {
    setDismissed((prev) => new Set([...prev, currentAnnouncement.id]));
    // Reset index if needed
    if (currentIndex >= visibleAnnouncements.length - 1) {
      setCurrentIndex(0);
    }
  };

  return (
    <div
      ref={bannerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 text-white py-2 px-4 transition-all duration-300",
        style.bg
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        {/* Icon */}
        <span className="flex-shrink-0">{style.icon}</span>

        {/* Content */}
        <div className="flex-1 text-center">
          <span className="font-medium">{currentAnnouncement.title}</span>
          {currentAnnouncement.content && (
            <span className="ml-2 opacity-90">{currentAnnouncement.content}</span>
          )}
        </div>

        {/* Indicators (if multiple) */}
        {visibleAnnouncements.length > 1 && (
          <div className="flex gap-1">
            {visibleAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex % visibleAnnouncements.length
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        )}

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
