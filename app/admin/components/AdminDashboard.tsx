"use client";

import { useState, useEffect } from "react";
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
  Calendar,
  Edit,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AdminDashboardProps {
  user: AdminUser;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  } | null;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const response = await fetch("/api/admin/posts?limit=3");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentPosts();
  }, []);

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

        {/* Recent Posts */}
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
            <CardContent className={posts.length === 0 ? "py-12" : "p-6"}>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto" />
                  </div>
                </div>
              ) : posts.length === 0 ? (
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
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start justify-between gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-slate-900 dark:text-white truncate">
                            {post.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded ${post.status === "published"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}
                          >
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          {post.published_at && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <time>
                                {format(
                                  new Date(post.published_at),
                                  "MMM d, yyyy"
                                )}
                              </time>
                            </div>
                          )}
                          {post.author && (
                            <span>
                              by {post.author.name || post.author.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/posts/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        {post.status === "published" && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
