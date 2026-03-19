import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminDashboard } from "@/app/(CMS)/admin/components/AdminDashboard";

/**
 * Admin Dashboard Page
 *
 * The main entry point for the CMS admin panel.
 * Protected by middleware - only authenticated users can access.
 */
export default async function AdminPage() {
  const session = await auth();

  // Double-check authentication (middleware should have already handled this)
  if (!session?.user) {
    redirect("/admin/login");
  }

  return <AdminDashboard user={session.user} />;
}
