"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Banner } from "@/lib/db/types";

interface BannerCarouselProps {
  banners: Banner[];
  width?: string | number;
  height?: string | number;
  rotationInterval?: number; // in milliseconds
}

/**
 * Banner Carousel Component
 *
 * Displays banners in a carousel with auto-rotation, navigation arrows, and indicators.
 * Banners are clickable if they have a link_url.
 */
export function BannerCarousel({
  banners,
  width = "100%",
  height = "auto",
  rotationInterval = 5000,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate through banners
  useEffect(() => {
    if (banners.length <= 1 || isPaused || rotationInterval <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [banners.length, isPaused, rotationInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  // Don't render if no banners
  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <section
      className="relative bg-slate-100 dark:bg-slate-800 mx-auto"
      style={{ width: widthStyle, height: heightStyle }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {currentBanner.link_url ? (
              <a
                href={currentBanner.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <BannerImage banner={currentBanner} height={height} />
              </a>
            ) : (
              <BannerImage banner={currentBanner} height={height} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous banner"
            >
              <ChevronLeft className="h-6 w-6 text-slate-900 dark:text-slate-100" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next banner"
            >
              <ChevronRight className="h-6 w-6 text-slate-900 dark:text-slate-100" />
            </button>
          </>
        )}

        {/* Title Overlay (if banner has title) */}
        {currentBanner.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-white text-xl lg:text-2xl font-semibold">
              {currentBanner.title}
            </h3>
          </div>
        )}
      </div>

      {/* Indicator Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Banner Image Component
 */
function BannerImage({
  banner,
  height,
}: {
  banner: Banner;
  height?: string | number;
}) {
  const heightStyle =
    height && typeof height === "number" ? `${height}px` : height || "auto";

  if (!banner.image_url) {
    return (
      <div
        className="bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-800 dark:to-sage-900 flex items-center justify-center w-full"
        style={{ height: heightStyle }}
      >
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          {banner.title || "Banner"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full" style={{ height: heightStyle }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.image_url}
        alt={banner.title || "Banner"}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="w-full h-full bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-800 dark:to-sage-900 flex items-center justify-center">
                <p class="text-slate-600 dark:text-slate-400 text-lg">${banner.title || "Banner"}</p>
              </div>
            `;
          }
        }}
      />
    </div>
  );
}
