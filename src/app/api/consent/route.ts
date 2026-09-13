import { NextResponse, type NextRequest } from "next/server";
import { recordConsent } from "@/lib/booking/admin";
import { clientIp, rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Passes a consent record to the clinic's system.
 *
 * Only the four fields are forwarded. Notably absent: the visitor's IP address,
 * which this route can see and deliberately does not send on. It is used here
 * for rate limiting and then dropped, because a consent record is supposed to
 * prove that we asked — not to become another place we quietly keep a person.
 */
export async function POST(request: NextRequest) {
  if (rateLimited(clientIp(request), { perMinute: 20, perDay: 200 })) {
    return NextResponse.json({ status: "ignored" }, { status: 429 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const ref = typeof body?.ref === "string" ? body.ref : "";
  const kind = body?.kind === "booking" ? "booking" : "chat_image";

  if (!/^[A-Za-z0-9_-]{12,64}$/.test(ref)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const result = await recordConsent({
    ref,
    kind,
    notice_version:
      typeof body?.notice_version === "string" ? body.notice_version.slice(0, 32) : "unknown",
    lang: body?.lang === "en" ? "en" : "bn",
    source: "naati",
  });

  // Answered the same way whether it landed or not. The visitor has no stake in
  // the clinic's record-keeping and nothing useful to do with a failure.
  return NextResponse.json({ status: result.ok ? "recorded" : "not_recorded" }, { status: 202 });
}
