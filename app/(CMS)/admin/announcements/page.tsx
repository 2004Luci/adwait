import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAnnouncements } from "@/lib/db/announcements";
import { AnnouncementsClient } from "./AnnouncementsClient";

/**
 * Announcements Management Page
 */
export default async function AnnouncementsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const announcements = await getAnnouncements();

  return <AnnouncementsClient initialAnnouncements={announcements} user={session.user} />;
}
