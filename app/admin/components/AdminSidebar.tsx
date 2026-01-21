"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronDown,
  User,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useState } from "react";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AdminSidebarProps {
  user: AdminUser;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Posts",
    href: "/admin/posts",
    icon: FileText,
    description: "Blog & dynamic pages",
  },
  {
    title: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
    description: "Homepage alerts",
  },
  {
    title: "Banners",
    href: "/admin/banners",
    icon: ImageIcon,
    description: "Homepage banners",
  },
  {
    title: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Edit site content",
  },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm">
            <Image
              src="/logo-symbol-nobg.png"
              alt="Adwait Artha"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-white">
              Adwait Artha
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              CMS Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "bg-sage-100 text-sage-900 dark:bg-sage-900/50 dark:text-sage-100"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  active
                    ? "text-sage-600 dark:text-sage-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-800 flex items-center justify-center">
                <User className="w-4 h-4 text-sage-700 dark:text-sage-300" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user.role}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" target="_blank" className="cursor-pointer">
                View Website
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-600 dark:text-red-400 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-slate-800 shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col transform transition-transform duration-200 ease-in-out",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
