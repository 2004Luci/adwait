"use client";

import { AdminSidebar } from "./AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import {
  FileText,
  Megaphone,
  Image as ImageIcon,
  Settings,
  Plus,
  ArrowRight,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AdminDashboardProps {
  user: AdminUser;
}

const quickActions = [
  {
    title: "Create Post",
    description: "Write a new blog post or article",
    href: "/admin/posts/new",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "Add Announcement",
    description: "Create a new homepage announcement",
    href: "/admin/announcements",
    icon: Megaphone,
    color: "bg-amber-500",
  },
  {
    title: "Manage Banners",
    description: "Update homepage banners",
    href: "/admin/banners",
    icon: ImageIcon,
    color: "bg-purple-500",
  },
  {
    title: "Site Settings",
    description: "Edit site content and configuration",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-sage-600",
  },
];

export function AdminDashboard({ user }: AdminDashboardProps) {
  const greeting = getGreeting();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
            {greeting}, {user.name?.split(" ")[0] || "Admin"}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome to the Adwait Artha CMS Dashboard
          </p>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-base group-hover:text-sage-600 dark:group-hover:text-sage-400 transition-colors">
                        {action.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription>{action.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-8">
          <Card className="bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/50 dark:to-sage-800/50 border-sage-200 dark:border-sage-700">
            <CardHeader>
              <CardTitle className="text-sage-900 dark:text-sage-100">
                Getting Started with the CMS
              </CardTitle>
              <CardDescription className="text-sage-700 dark:text-sage-300">
                Here&apos;s how to manage your website content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-sage-700 dark:text-sage-200">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sage-900 dark:text-sage-100">
                      Create Blog Posts
                    </h4>
                    <p className="text-sm text-sage-600 dark:text-sage-400">
                      Write articles that appear at /blog/your-post-title
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-sage-700 dark:text-sage-200">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sage-900 dark:text-sage-100">
                      Manage Announcements
                    </h4>
                    <p className="text-sm text-sage-600 dark:text-sage-400">
                      Create alerts that appear on the homepage
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-sage-700 dark:text-sage-200">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sage-900 dark:text-sage-100">
                      Update Site Settings
                    </h4>
                    <p className="text-sm text-sage-600 dark:text-sage-400">
                      Edit hero stats, services, testimonials, and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-sage-700 dark:text-sage-200">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sage-900 dark:text-sage-100">
                      Publish Changes
                    </h4>
                    <p className="text-sm text-sage-600 dark:text-sage-400">
                      Changes go live instantly when you hit publish
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity Placeholder */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Posts
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/posts">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  No posts yet
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Create your first blog post to get started
                </p>
                <Button asChild>
                  <Link href="/admin/posts/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
