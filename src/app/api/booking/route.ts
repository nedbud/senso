import { NextResponse, type NextRequest } from "next/server";
import { book, type BookingInput } from "@/lib/booking/admin";
import { clientIp, rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;
/** Digits, plus, spaces and dashes. Deliberately loose — people write numbers many ways. */
const PHONE = /^[0-9+\-\s()]{6,20}$/;

/**
 * Takes a booking and passes it to the clinic.
 *
 * Two things this route is careful about.
 *
 * First, it only ever forwards fields it recognises. The clinic endpoint is the
 * one with a database behind it, and letting an unvetted object through to it
 * is how a field nobody meant to expose ends up being writable.
 *
 * Second, the reply keeps the clinic's own words for the two cases a patient
 * actually meets — the slot was taken while they were typing (409), and the
 * form was wrong (422). Anything else is answered with a sentence of ours,
 * because an internal error message is not something to show a patient.
 */
/**
 * Tight in production — four attempts a minute is far more than a real person
 * needs and far less than a script wants. Loose in development, so running the
 * end-to-end check a few times in a row does not lock you out of your own site.
 */
const LIMITS =
  process.env.NODE_ENV === "production"
    ? { perMinute: 4, perDay: 20 }
    : { perMinute: 60, perDay: 500 };

export async function POST(request: NextRequest) {
  if (rateLimited(clientIp(request), LIMITS)) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message:
          "একটু বেশি হয়ে যাচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন, অথবা সরাসরি ফোন করুন।",
      },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const serviceId = Number(body?.service_id);
  const testDate = typeof body?.test_date === "string" ? body.test_date : "";

  const problems: Record<string, string> = {};
  if (name.length < 2) problems.name = "আপনার নামটা লিখুন।";
  if (!PHONE.test(phone)) problems.phone = "একটা ফোন নম্বর দিন।";
  if (!Number.isInteger(serviceId) || serviceId <= 0) problems.service_id = "কোন পরীক্ষাটি, বেছে নিন।";
  if (!DATE.test(testDate)) problems.test_date = "কোন দিন, বেছে নিন।";

  if (Object.keys(problems).length) {
    return NextResponse.json({ error: "invalid", problems }, { status: 422 });
  }

  const payload: BookingInput = {
    name: name.slice(0, 120),
    phone: phone.slice(0, 20),
    service_id: serviceId,
    test_date: testDate,
    source: body?.source === "naati" ? "naati" : "web",
  };

  if (typeof body?.start_time === "string" && TIME.test(body.start_time)) {
    payload.start_time = body.start_time;
  }
  if (Number.isInteger(Number(body?.employee_id)) && Number(body.employee_id) > 0) {
    payload.employee_id = Number(body.employee_id);
  }
  // Evidence, not identity: a random string the visitor's browser made up.
  if (typeof body?.consent_ref === "string" && /^[A-Za-z0-9_-]{12,64}$/.test(body.consent_ref)) {
    payload.consent_ref = body.consent_ref;
  }
  if (typeof body?.note === "string" && body.note.trim()) {
    payload.note = body.note.trim().slice(0, 1000);
  }
  if (["male", "female", "other"].includes(body?.gender)) {
    payload.gender = body.gender;
  }

  // A child's appointment is consented to by their guardian, so the guardian's
  // name travels with it. The clinic endpoint refuses a minor booking without
  // one; this only forwards what was given.
  if (body?.patient_is_minor === true) {
    payload.patient_is_minor = true;
    if (typeof body?.guardian_name === "string" && body.guardian_name.trim().length >= 2) {
      payload.guardian_name = body.guardian_name.trim().slice(0, 120);
    } else {
      return NextResponse.json(
        {
          error: "invalid",
          problems: { guardian_name: "১৮ বছরের নিচে হলে অভিভাবকের নাম লাগবে।" },
        },
        { status: 422 }
      );
    }
  }

  const result = await book(payload);

  if (!result.ok) {
    // 409 and 422 carry a sentence written for a patient; keep it.
    const passThrough = result.status === 409 || result.status === 422;

    return NextResponse.json(
      {
        error: result.reason,
        message: passThrough
          ? result.message
          : "এই মুহূর্তে অ্যাপয়েন্টমেন্টটি নেওয়া গেল না। একটু পরে আবার চেষ্টা করুন, অথবা ফোন করুন।",
      },
      { status: result.status }
    );
  }

  const b = result.data;

  return NextResponse.json(
    {
      booking: {
        id: b.id,
        status: b.status,
        date: b.test_date,
        time: b.label,
        start: b.start_time,
        end: b.end_time,
        service: b.service,
        fee: b.fee,
        with: b.employee_name,
        patient: b.patient,
      },
    },
    { status: 201 }
  );
}
