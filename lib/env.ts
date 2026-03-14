/**
 * Environment configuration utilities
 *
 * Three environments:
 * - local: .env.local, localhost:3000 (development branch uses this when running locally)
 * - staging: staging branch deployments
 * - production: main branch deployments
 */

export type AppEnvironment = "local" | "staging" | "production";

/**
 * Get the current application environment
 * Uses APP_ENV (server-only)
 * Falls back to NODE_ENV (production → production, else → local)
 */
export function getAppEnv(): AppEnvironment {
  const appEnv = process.env.APP_ENV;

  if (appEnv === "production" || appEnv === "staging" || appEnv === "local") {
    return appEnv;
  }

  // Fallback: NODE_ENV=production → production, otherwise local
  return process.env.NODE_ENV === "production" ? "production" : "local";
}

/**
 * Check if running in production environment (main branch)
 */
export function isProduction(): boolean {
  return getAppEnv() === "production";
}

/**
 * Check if running in staging environment (staging branch)
 */
export function isStaging(): boolean {
  return getAppEnv() === "staging";
}

/**
 * Check if running locally (localhost:3000, .env.local)
 */
export function isLocal(): boolean {
  return getAppEnv() === "local";
}

/**
 * Environment configuration object
 * Provides typed access to environment variables with validation
 */
export const env = {
  // App environment
  APP_ENV: getAppEnv(),
  IS_PRODUCTION: isProduction(),
  IS_STAGING: isStaging(),
  IS_LOCAL: isLocal(),

  // API Keys (server-side only)
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ARCJET_KEY: process.env.ARCJET_KEY,

  // Validation helper
  validate: () => {
    const required = ["RESEND_API_KEY", "ARCJET_KEY"] as const;
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      console.warn(
        `⚠️  Missing environment variables: ${missing.join(", ")}\n` +
          `   Current environment: ${getAppEnv()}`
      );
    }

    return missing.length === 0;
  },
} as const;
