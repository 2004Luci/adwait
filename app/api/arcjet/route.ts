import { NextResponse } from "next/server";
import { getClientIP } from "@/lib/utils";
import { arcjetConfig } from "@/lib/arcjet";

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
