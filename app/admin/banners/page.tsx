import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBanners } from "@/lib/db/banners";
import { BannersClient } from "./BannersClient";

/**
 * Banners Management Page
 */
export default async function BannersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const banners = await getBanners();

  return <BannersClient initialBanners={banners} user={session.user} />;
}
