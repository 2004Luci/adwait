/**
 * Next.js Middleware
 *
 * This middleware runs before every request and handles:
 * - Authentication checks for admin routes
 * - Redirects for unauthenticated users
 */

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;

  // Check if the request is for admin routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  // Allow API auth routes to pass through
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle admin routes
  if (isAdminRoute) {
    // If not logged in and trying to access admin (except login page)
    if (!isLoggedIn && !isLoginPage) {
      const loginUrl = new URL("/admin/login", nextUrl);
      // Add the original URL as a callback parameter
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If logged in and on login page, redirect to dashboard
    if (isLoggedIn && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
  }

  return NextResponse.next();
});

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - API routes that don't need protection
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
