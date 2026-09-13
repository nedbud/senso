import { NextResponse } from "next/server";
import { listServices } from "@/lib/booking/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Which tests can be booked online.
 *
 * Read-only and identical for every visitor, so there is nothing to rate limit
 * and nothing to hide. The list comes from the clinic's own service table, so a
 * test that is withdrawn there stops being offered here without a deploy.
 */
export async function GET() {
  const result = await listServices();

  if (!result.ok) {
    return NextResponse.json(
      { error: result.reason, message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json({ services: result.data });
}
