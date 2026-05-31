import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CAREERS_ENABLED } from "@/lib/flags";

export function middleware(request: NextRequest) {
  if (!CAREERS_ENABLED && request.nextUrl.pathname.startsWith("/careers")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/careers", "/careers/:path*"],
};
