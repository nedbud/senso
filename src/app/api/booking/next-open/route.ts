import { NextResponse, type NextRequest } from "next/server";
import { nextOpen } from "@/lib/booking/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The next few days that have room.
 *
 * Most people do not arrive with a date in mind — they ask when they can come.
 * Answering that from a real book, rather than "call us and ask", is the whole
 * difference between a website and a leaflet.
 */
export async function GET(request: NextRequest) {
  const serviceId = Number(request.nextUrl.searchParams.get("service_id"));

  if (!Number.isInteger(serviceId) || serviceId <= 0) {
    return NextResponse.json(
      { error: "invalid", message: "Pick a test first." },
      { status: 400 }
    );
  }

  const result = await nextOpen(serviceId);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.reason, message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data);
}
