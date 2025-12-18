import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

export const arcjetConfig = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Rate limiting for contact form submissions (4 emails per submission)
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip"],
      refillRate: 12, // Refill 12 tokens per interval (3 submissions × 4 emails)
      interval: 60,
      capacity: 12,
    }),
    // Rate limiting for scheduling consultation (4 emails per submission)
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip"],
      refillRate: 8, // Refill 8 tokens per interval (2 submissions × 4 emails)
      interval: 300,
      capacity: 8,
    }),
  ],
});

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

export async function GET(req: Request) {
  // Block direct browser access - require custom header
  if (req.headers.get("x-requested-with") !== "XMLHttpRequest") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientIP = getClientIP(req);
  const decision = await arcjetConfig.protect(req, { ip: clientIP, requested: 1 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Arcjet API | Status: OK" });
}
