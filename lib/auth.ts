import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdminOrThrow } from "./supabase";
import type { AdminUser, AdminUserRole } from "./db/types";

/**
 * NextAuth.js v5 Configuration
 *
 * This configures authentication for the CMS admin panel using
 * email/password credentials stored in Supabase.
 */

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: AdminUserRole;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    role: AdminUserRole;
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    role: AdminUserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use JWT strategy for sessions (stateless, works well with serverless)
  session: {
    strategy: "jwt",
    // Session expires after 24 hours of inactivity
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom pages
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  // Authentication providers
  providers: [
    Credentials({
      id: "credentials",
      name: "Email & Password",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@adwaitartha.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Validate that credentials were provided
        if (!credentials?.email || !credentials?.password) {
          console.log("[Auth] Missing email or password");
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Get Supabase admin client
          const supabase = getSupabaseAdminOrThrow();

          // Look up the user by email
          const { data: user, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("email", email.toLowerCase().trim())
            .single();

          if (error || !user) {
            console.log("[Auth] User not found:", email);
            return null;
          }

          // Verify the password
          const isValidPassword = await bcrypt.compare(
            password,
            user.password_hash
          );

          if (!isValidPassword) {
            console.log("[Auth] Invalid password for:", email);
            return null;
          }

          console.log("[Auth] Successful login:", email);

          // Return user data (excluding password hash)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as AdminUserRole,
          };
        } catch (error) {
          console.error("[Auth] Error during authentication:", error);
          return null;
        }
      },
    }),
  ],

  // Callbacks for customizing the auth flow
  callbacks: {
    // Add user info to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    // Add user info to the session
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: (token.name as string) || null,
          role: token.role as AdminUserRole,
        };
      }
      return session;
    },

    // Control which routes are accessible
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      // If on admin pages (except login), require authentication
      if (isOnAdmin && !isOnLoginPage) {
        if (!isLoggedIn) {
          // Redirect to login page
          return Response.redirect(new URL("/admin/login", nextUrl));
        }
        return true;
      }

      // If logged in and on login page, redirect to dashboard
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      // Allow all other requests
      return true;
    },
  },

  // Enable debug logs in development
  debug: process.env.NODE_ENV === "development",
});

/**
 * Helper function to get the current session in Server Components.
 * Returns null if not authenticated.
 */
export async function getSession() {
  return await auth();
}

/**
 * Helper function to require authentication.
 * Throws an error if not authenticated.
 * Use this in API routes and Server Actions.
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized: Authentication required");
  }

  return session;
}

/**
 * Helper function to require admin role.
 * Throws an error if not authenticated or not an admin.
 */
export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }

  return session;
}
