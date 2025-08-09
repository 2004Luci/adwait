import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

// Arcjet configuration for rate limiting
export const arcjetConfig = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
        // Rate limiting for contact form submissions (4 emails per submission)
        tokenBucket({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            characteristics: ["ip"], // track requests by IP address
            refillRate: 12, // refill 12 tokens per interval (3 submissions × 4 emails)
            interval: 60, // refill every 60 seconds (1 minute)
            capacity: 12, // bucket maximum capacity of 12 tokens
        }),
        // Rate limiting for scheduling consultation (4 emails per submission)
        tokenBucket({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            characteristics: ["ip"], // track requests by IP address
            refillRate: 8, // refill 8 tokens per interval (2 submissions × 4 emails)
            interval: 300, // refill every 300 seconds (5 minutes)
            capacity: 8, // bucket maximum capacity of 8 tokens
        }),
    ],
});

// Helper function to get client IP from request
export function getClientIP(request: Request): string {
    // Try to get IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIP) {
        return realIP;
    }

    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    // Fallback to a default identifier
    return 'unknown';
}

export async function GET(req: Request) {
    const clientIP = getClientIP(req);
    const decision = await arcjetConfig.protect(req, { ip: clientIP, requested: 1 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
        return NextResponse.json(
            { error: "Too Many Requests", reason: decision.reason },
            { status: 429 },
        );
    }

    return NextResponse.json({ message: "Hello world" });
}