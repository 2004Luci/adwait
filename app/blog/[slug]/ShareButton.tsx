"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 hover:text-sage-700 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </button>
  );
}
