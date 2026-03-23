import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Adwait Artha CMS",
  },
  description: "Content Management System for Adwait Artha LLP",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Layout
 *
 * This layout wraps all admin pages. Authentication is handled by
 * the middleware, so any page under /admin (except /admin/login)
 * is guaranteed to have an authenticated user.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {children}
    </div>
  );
}
