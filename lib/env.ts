/**
 * Environment configuration utilities
 *
 * This module provides environment-aware configuration for the application.
 * It distinguishes between development and production environments.
 */

export type AppEnvironment = "development" | "production";

/**
 * Get the current application environment
 * Uses NEXT_PUBLIC_APP_ENV for explicit environment control,
 * falls back to NODE_ENV
 */
export function getAppEnv(): AppEnvironment {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

  if (appEnv === "production" || appEnv === "development") {
    return appEnv;
  }

  // Fallback to NODE_ENV
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

/**
 * Check if running in production environment
 */
export function isProduction(): boolean {
  return getAppEnv() === "production";
}

/**
 * Check if running in development environment
 */
export function isDevelopment(): boolean {
  return getAppEnv() === "development";
}

/**
 * Environment configuration object
 * Provides typed access to environment variables with validation
 */
export const env = {
  // App environment
  APP_ENV: getAppEnv(),
  IS_PRODUCTION: isProduction(),
  IS_DEVELOPMENT: isDevelopment(),

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
