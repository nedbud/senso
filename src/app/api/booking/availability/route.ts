import { NextResponse, type NextRequest } from "next/server";
import { availability } from "@/lib/booking/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * What is free on one day, for one test.
 *
 * The answer is passed through almost unchanged, including `reason` and
 * `message` when there is nothing free. That pair is the point: `reason` is
 * what the interface branches on, `message` is a finished sentence a patient
 * can be shown, so neither this route nor the assistant has to invent an
 * explanation for a day it cannot see.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const serviceId = Number(params.get("service_id"));
  const date = params.get("date") ?? "";

  if (!Number.isInteger(serviceId) || serviceId <= 0) {
    return NextResponse.json(
      { error: "invalid", message: "Pick a test first." },
      { status: 400 }
    );
  }

  if (!DATE.test(date)) {
    return NextResponse.json(
      { error: "invalid", message: "The date must be written as YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const result = await availability(serviceId, date);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.reason, message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data);
}
