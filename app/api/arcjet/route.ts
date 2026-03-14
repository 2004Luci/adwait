import { NextRequest, NextResponse } from "next/server";
import { arcjetConfig } from "@/lib/arcjet";

export async function GET(req: NextRequest) {
  const decision = await arcjetConfig.protect(req, { requested: 1 });
  console.log("Arcjet decision", decision);
  console.log("Client IP detected by Arcjet:", decision.ip);

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
