import { getActiveAnnouncements } from "@/lib/db/announcements";
import { AnnouncementBanner } from "./AnnouncementBanner";

/**
 * Server Component wrapper that fetches announcements
 */
export async function AnnouncementBannerWrapper() {
  try {
    const announcements = await getActiveAnnouncements();

    if (announcements.length === 0) {
      return null;
    }

    return <AnnouncementBanner announcements={announcements} />;
  } catch (error) {
    // Silently fail - don't break the page if announcements can't be fetched
    console.error("[Announcements] Failed to fetch:", error);
    return null;
  }
}
