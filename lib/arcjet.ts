import arcjet, { tokenBucket, detectBot } from "@arcjet/next";

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
