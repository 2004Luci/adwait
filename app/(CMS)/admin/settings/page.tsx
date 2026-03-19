import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { AdminSidebar } from "@/app/(CMS)/admin/components/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Sparkles,
  Briefcase,
  Users,
  MessageSquare,
  Phone,
  Award,
  ArrowRight,
  Settings,
} from "lucide-react";

/**
 * Site Settings Overview Page
 */
export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const settingsCategories = [
    {
      title: "Hero Section",
      description: "Edit hero stats, typewriter phrases, and main content",
      href: "/admin/settings/hero",
      icon: Sparkles,
      color: "bg-blue-500",
    },
    {
      title: "Services",
      description: "Manage service cards and descriptions",
      href: "/admin/settings/services",
      icon: Briefcase,
      color: "bg-purple-500",
    },
    {
      title: "About & Team",
      description: "Edit partner profiles, achievements, and client logos",
      href: "/admin/settings/about",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Testimonials",
      description: "Manage customer testimonials and case studies",
      href: "/admin/settings/testimonials",
      icon: MessageSquare,
      color: "bg-amber-500",
    },
    {
      title: "Contact Info",
      description: "Update contact details and business hours",
      href: "/admin/settings/contact",
      icon: Phone,
      color: "bg-red-500",
    },
    {
      title: "Expertise",
      description: "Edit expertise areas and process steps",
      href: "/admin/settings/expertise",
      icon: Award,
      color: "bg-sage-600",
    },
    {
      title: "Miscellaneous",
      description: "Site configuration, navigation, footer, careers, and service page data",
      href: "/admin/settings/miscellaneous",
      icon: Settings,
      color: "bg-slate-600",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={session.user} />

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
            Site Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Edit website content without code changes. Changes take effect immediately.
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/50 dark:to-sage-800/50 border-sage-200 dark:border-sage-700">
          <CardContent className="py-4">
            <p className="text-sm text-sage-700 dark:text-sage-300">
              <strong>How it works:</strong> These settings replace the hardcoded content on your website.
              When you update a setting here, it will immediately appear on the live site.
              If a setting is not configured, the website will use the default values from the code.
            </p>
          </CardContent>
        </Card>

        {/* Settings Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsCategories.map((category) => {
            const Icon = category.icon as React.ComponentType<{ className?: string }>;
            return (
              <Link key={category.href} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                  <CardHeader>
                    <div
                      className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-2`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-sage-600 dark:group-hover:text-sage-400 transition-colors flex items-center justify-between">
                      {category.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
