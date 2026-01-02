import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
import { env, isDevelopment } from "@/lib/env";

// Use DRY_RUN mode in development to avoid blocking during testing
const ruleMode = isDevelopment() ? "DRY_RUN" : "LIVE";

export const arcjetConfig = arcjet({
  key: env.ARCJET_KEY!,
  rules: [
    // Bot detection - Block automated clients (DRY_RUN in dev for easier testing)
    detectBot({
      mode: ruleMode,
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, Yahoo, etc.
        "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
        "CATEGORY:MONITOR", // Uptime monitors
      ],
    }),
    // Rate limiting for contact form submissions (4 emails per submission)
    tokenBucket({
      mode: ruleMode,
      characteristics: ["ip"],
      refillRate: 12, // Refill 12 tokens per interval (3 submissions × 4 emails)
      interval: 60,
      capacity: 12,
    }),
    // Rate limiting for scheduling consultation (4 emails per submission)
    tokenBucket({
      mode: ruleMode,
      characteristics: ["ip"],
      refillRate: 8, // Refill 8 tokens per interval (2 submissions × 4 emails)
      interval: 300,
      capacity: 8,
    }),
  ],
});
