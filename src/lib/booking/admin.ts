/**
 * The only thing in this codebase that talks to the clinic's admin server.
 *
 * Runs on the server, never in the browser. The admin API is protected by a
 * single shared key, and a shared key in front-end JavaScript is not a key at
 * all — so the browser talks to this site's own /api/booking/* routes, and
 * those routes call this file. The key never crosses the wire to a visitor.
 *
 * Nothing here throws. A clinic server that is down, slow or misconfigured is
 * an ordinary Tuesday, and every caller has to say something useful to a
 * patient either way, so failures come back as values.
 */

const BASE = process.env.SENSO_ADMIN_API_URL ?? "";
const KEY = process.env.SENSO_ADMIN_API_KEY ?? "";
const HEADER = process.env.SENSO_ADMIN_API_HEADER ?? "X-Senso-Key";

/** Long enough for a cold Laravel, short enough that nobody stares at a spinner. */
const TIMEOUT_MS = 8000;

export type BookableService = {
  id: number;
  name: string;
  duration: number;
  fee: number;
};

export type Slot = {
  start: string;        // "14:30", 24-hour
  end: string;
  label: string;        // "2:30 PM"
  duration: number;
  employee_id: number;
  employee_name: string;
};

export type DayAvailability = {
  date: string;
  weekday: string | null;
  service: BookableService | null;
  available: boolean;
  /** Machine reason when unavailable: past_date, fully_booked, closed_weekday … */
  reason: string | null;
  /** One plain sentence, safe to show a patient as-is. */
  message: string | null;
  seats_left: number | null;
  slots: Slot[];
};

export type OpenDay = {
  date: string;
  weekday: string;
  first: string;
  count: number;
};

export type Booking = {
  id: number;
  status: "pending";
  source: string;
  test_date: string;
  service: string;
  service_id: number;
  fee: number;
  start_time: string;
  end_time: string;
  label: string;
  employee_id: number;
  employee_name: string;
  patient: { name: string; phone: string };
  guardian?: string | null;
};

export type BookingInput = {
  name: string;
  phone: string;
  service_id: number;
  test_date: string;
  start_time?: string;
  employee_id?: number;
  email?: string;
  gender?: "male" | "female" | "other";
  note?: string;
  source?: "web" | "naati";

  /** Under 18. A guardian's name is then required by the clinic endpoint. */
  patient_is_minor?: boolean;
  guardian_name?: string;

  /** Ties the booking to the consent record from the same visit. */
  consent_ref?: string;
};

export type AdminResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; reason: string; message: string; errors?: Record<string, string[]> };

/** Set at boot, or the whole feature is off. Checked here so every caller can say so. */
export function bookingConfigured(): boolean {
  return BASE !== "" && KEY !== "";
}

const NOT_CONFIGURED = {
  ok: false as const,
  status: 503,
  reason: "not_configured",
  message: "Online booking is not switched on.",
};

async function call<T>(
  path: string,
  init: RequestInit = {}
): Promise<AdminResult<T>> {
  if (!bookingConfigured()) return NOT_CONFIGURED;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE.replace(/\/$/, "")}${path}`, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        ...(init.headers ?? {}),
        [HEADER]: KEY,
        accept: "application/json",
      },
    });

    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      // An HTML error page from the clinic server. Do not pass it on — it is
      // unreadable to the caller and on a debug build it carries a stack trace.
      return {
        ok: false,
        status: 502,
        reason: "bad_response",
        message: "The clinic system sent something we could not read.",
      };
    }

    if (res.ok) {
      return { ok: true, data: (json?.data ?? json) as T };
    }

    return {
      ok: false,
      status: res.status,
      reason: json?.reason ?? (res.status === 422 ? "invalid" : "error"),
      message: json?.message ?? "The clinic system could not complete that.",
      errors: json?.errors,
    };
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return {
      ok: false,
      status: 504,
      reason: aborted ? "timeout" : "unreachable",
      message: "We could not reach the clinic system just now.",
    };
  } finally {
    clearTimeout(timer);
  }
}

export function listServices() {
  return call<BookableService[]>("/appointments/services");
}

export function availability(serviceId: number, date: string) {
  return call<DayAvailability>(
    `/appointments/availability?service_id=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}`
  );
}

export function nextOpen(serviceId: number, days = 14, limit = 3) {
  return call<{ service_id: number; days: OpenDay[] }>(
    `/appointments/next-open?service_id=${encodeURIComponent(serviceId)}&days=${days}&limit=${limit}`
  );
}

export function book(input: BookingInput) {
  return call<Booking>("/appointments", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
}

export type ConsentRecord = {
  ref: string;
  kind: "chat_image" | "booking";
  notice_version: string;
  lang?: "bn" | "en";
  source?: "web" | "naati";
};

/**
 * Files a consent record with the clinic. Best effort by design — the caller
 * ignores the outcome, because a missing row in the clinic's evidence log is
 * not something to fail a patient's request over.
 */
export function recordConsent(record: ConsentRecord) {
  return call<{ status: string }>("/consents", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
  });
}
