import arcjet, { tokenBucket, detectBot } from "@arcjet/next";
import { env, isLocal } from "@/lib/env";

// Use DRY_RUN mode locally to avoid blocking during testing
const ruleMode = isLocal() ? "DRY_RUN" : "LIVE";

if (!env.ARCJET_KEY) {
  throw new Error("Missing ARCJET_KEY environment variable");
}

export const arcjetConfig = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    // Bot detection - Block automated clients (DRY_RUN locally for easier testing)
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
      characteristics: ["ip.src"],
      refillRate: 12, // Refill 12 tokens per interval (3 submissions × 4 emails)
      interval: 60,
      capacity: 12,
    }),
    // Rate limiting for scheduling consultation (4 emails per submission)
    tokenBucket({
      mode: ruleMode,
      characteristics: ["ip.src"],
      refillRate: 8, // Refill 8 tokens per interval (2 submissions × 4 emails)
      interval: 300,
      capacity: 8,
    }),
  ],
});
