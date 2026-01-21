/**
 * NextAuth.js API Route Handler
 *
 * This handles all authentication-related API requests:
 * - POST /api/auth/signin - Sign in
 * - POST /api/auth/signout - Sign out
 * - GET /api/auth/session - Get current session
 * - GET /api/auth/csrf - Get CSRF token
 * - GET /api/auth/providers - Get available providers
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
