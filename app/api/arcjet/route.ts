import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
import { NextResponse } from "next/server";
import { getClientIP } from "@/lib/utils";

export const arcjetConfig = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Bot detection - Block automated clients
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, Yahoo, etc.
        "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
        "CATEGORY:MONITOR", // Uptime monitors
      ],
    }),
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

export async function GET(req: Request) {
  const clientIP = getClientIP(req);
  const decision = await arcjetConfig.protect(req, { ip: clientIP, requested: 1 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    // Handle bot detection or rate limiting
    if (decision.reason.isBot()) {
      return NextResponse.json({ error: "Bot detected" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Arcjet API | Status: OK" });
}
