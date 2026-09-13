/**
 * Best-effort per-IP limiting, in memory.
 *
 * These endpoints have no login in front of them, which is right — a patient
 * booking a hearing test should not have to make an account. It does mean one
 * bored visitor could otherwise fill tomorrow's book with rubbish, so the
 * writing side is kept deliberately tight.
 *
 * In memory means it resets when the process recycles and is not shared across
 * instances. That is fine for one clinic on one box, and is the first thing to
 * replace if this ever serves several.
 */

type Bucket = { window: number[]; day: number[] };

const buckets = new Map<string, Bucket>();

export function rateLimited(
  key: string,
  { perMinute, perDay }: { perMinute: number; perDay: number }
): boolean {
  const now = Date.now();
  const rec = buckets.get(key) ?? { window: [], day: [] };

  rec.window = rec.window.filter((t) => now - t < 60_000);
  rec.day = rec.day.filter((t) => now - t < 86_400_000);

  if (rec.window.length >= perMinute || rec.day.length >= perDay) {
    buckets.set(key, rec);
    return true;
  }

  rec.window.push(now);
  rec.day.push(now);
  buckets.set(key, rec);

  if (buckets.size > 5000) buckets.clear();
  return false;
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
