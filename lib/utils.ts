import { clsx, type ClassValue } from "clsx";
import { parsePhoneNumber } from "react-phone-number-input";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts seconds to a human-readable time format
 * @param seconds - The number of seconds to convert
 * @returns A human-readable string (e.g., "1 day", "2 hours", "5 minutes", "30 seconds")
 */
export function formatRemainingTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  const days = Math.floor(seconds / 86400);
  return `${days} day${days !== 1 ? "s" : ""}`;
}

/**
 * Extracts the client IP address from a request
 * @param request - The request object
 * @returns The client IP address or "unknown" if not found
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return "unknown";
}

export function getCountryCode(phoneNumber: string): number {
  const phone = parsePhoneNumber(phoneNumber);
  return Number(phone?.countryCallingCode) ?? 91;
}
