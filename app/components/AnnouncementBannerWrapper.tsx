import { getActiveAnnouncements } from "@/lib/db/announcements";
import { AnnouncementBanner } from "./AnnouncementBanner";

/**
 * Server Component wrapper that fetches announcements
 */
export async function AnnouncementBannerWrapper() {
  let announcements;
  try {
    announcements = await getActiveAnnouncements();
  } catch (error) {
    // Silently fail: Don't break the page if announcements can't be fetched
    console.error("[Announcements] Failed to fetch:", error);
    return null;
  }

  if (announcements.length === 0) {
    return null;
  }

  return <AnnouncementBanner announcements={announcements} />;
}
