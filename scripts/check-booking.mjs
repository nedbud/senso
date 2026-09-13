#!/usr/bin/env node
/**
 * End-to-end check of the booking chain.
 *
 *   browser  →  this site's /api/booking/*  →  clinic admin API  →  MySQL
 *
 * Run it with both halves up:
 *
 *   (admin)    docker compose up -d
 *   (landing)  npm run dev
 *   (here)     node scripts/check-booking.mjs
 *
 * It books real rows in the local database. Point it at anything other than a
 * local Docker stack and it will put test patients in a real appointment book.
 */

const BASE = process.env.CHECK_BASE_URL ?? "http://localhost:3000";
const SECRET = process.env.SENSO_ADMIN_API_KEY ?? "local-dev-key-do-not-use-anywhere-real";

let passed = 0;
let failed = 0;
const failures = [];

function ok(label, detail = "") {
  passed++;
  console.log(`  \x1b[32m✓\x1b[0m ${label}${detail ? `  \x1b[2m${detail}\x1b[0m` : ""}`);
}

function bad(label, detail = "") {
  failed++;
  failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
  console.log(`  \x1b[31m✗\x1b[0m ${label}${detail ? `  \x1b[31m${detail}\x1b[0m` : ""}`);
}

function check(condition, label, detail = "") {
  condition ? ok(label, detail) : bad(label, detail);
  return condition;
}

function section(title) {
  console.log(`\n\x1b[1m${title}\x1b[0m`);
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { accept: "application/json" } });
  const text = await res.text();
  let body = null;
  try { body = JSON.parse(text); } catch { /* left null on purpose */ }
  return { status: res.status, body, text };
}

async function post(path, payload) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body = null;
  try { body = JSON.parse(text); } catch { /* left null on purpose */ }
  return { status: res.status, body, text };
}

const dayFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const stamp = Date.now().toString().slice(-7);

async function main() {
  console.log(`\x1b[1mBooking chain\x1b[0m  ${BASE}\n${"─".repeat(60)}`);

  // 1 ───────────────────────────────────────────────────────────── services
  section("1. What can be booked");

  const services = await get("/api/booking/services");

  if (!check(services.status === 200, "services responds 200", `got ${services.status}`)) {
    if (services.status === 503) {
      console.log("\n    SENSO_ADMIN_API_URL / SENSO_ADMIN_API_KEY are not set in .env.local,");
      console.log("    or the dev server was started before they were added. Restart npm run dev.");
    } else if (services.status === 504) {
      console.log("\n    The clinic API did not answer. Is `docker compose up -d` running,");
      console.log("    and is SENSO_ADMIN_API_URL pointing at the right port?");
    }
    return report();
  }

  const list = services.body?.services ?? [];
  check(Array.isArray(list) && list.length > 0, "at least one bookable test", `${list.length} found`);
  check(
    list.every((s) => Number.isInteger(s.id) && s.duration > 0),
    "every test has an id and a length"
  );

  // The key must never reach a browser. This route is what a browser calls.
  check(!services.text.includes(SECRET), "the admin key is not in the response");

  const service = list.find((s) => s.duration > 0);
  if (!service) return report();
  console.log(`    using: ${service.name} (${service.duration} min, ৳${service.fee})`);

  // 2 ─────────────────────────────────────────────────────────── availability
  section("2. What is free");

  const date = dayFromNow(2);
  const avail = await get(`/api/booking/availability?service_id=${service.id}&date=${date}`);

  check(avail.status === 200, "availability responds 200", `got ${avail.status}`);
  const day = avail.body ?? {};

  if (!check(day.available === true, `${date} has room`, day.reason ?? "")) {
    console.log(`    the clinic said: ${day.message ?? "(no message)"}`);
    return report();
  }

  const slots = day.slots ?? [];
  check(slots.length > 0, "slots offered", `${slots.length}`);

  const starts = slots.map((s) => s.start);
  check(new Set(starts).size === starts.length, "no start time offered twice");
  check(
    starts.every((s, i) => i === 0 || s > starts[i - 1]),
    "slots come back in time order"
  );

  const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  check(
    slots.every((s) => toMin(s.end) - toMin(s.start) === service.duration),
    "every slot is exactly as long as the test"
  );
  check(
    slots.every((s) => s.employee_id > 0 && typeof s.employee_name === "string"),
    "every slot names who will do it"
  );

  const wanted = slots[0];
  console.log(`    first free: ${wanted.label} with ${wanted.employee_name}`);

  // 3 ──────────────────────────────────────────────────────────── next open
  section("3. \"When can I come?\"");

  const next = await get(`/api/booking/next-open?service_id=${service.id}`);
  check(next.status === 200, "next-open responds 200", `got ${next.status}`);
  check((next.body?.days ?? []).length > 0, "it names at least one open day",
    (next.body?.days ?? []).map((d) => `${d.date} ${d.first}`).join(", "));

  // 4 ─────────────────────────────────────────────────────────────── booking
  section("4. Booking it");

  const made = await post("/api/booking", {
    name: `Check Patient ${stamp}`,
    phone: `019${stamp}`,
    service_id: service.id,
    test_date: date,
    start_time: wanted.start,
    note: "Automated end-to-end check",
    source: "naati",
  });

  if (!check(made.status === 201, "booking accepted", `got ${made.status} ${made.text.slice(0, 120)}`)) {
    return report();
  }

  const booking = made.body?.booking ?? {};
  check(booking.id > 0, "it came back with an id", `#${booking.id}`);
  check(booking.status === "pending", "it is pending, not confirmed", booking.status);
  check(booking.date === date, "on the day that was asked for");
  check(booking.start === wanted.start, "at the time that was asked for", booking.time);
  check(booking.with === wanted.employee_name, "with the person who was free");

  // 5 ───────────────────────────────────────────────────── the book changed
  section("5. The book actually changed");

  const after = await get(`/api/booking/availability?service_id=${service.id}&date=${date}`);
  const afterStarts = (after.body?.slots ?? []).filter(
    (s) => s.employee_id === wanted.employee_id
  ).map((s) => s.start);

  check(
    !afterStarts.includes(wanted.start),
    "the booked time is no longer offered for that person",
    wanted.start
  );

  // 6 ────────────────────────────────────────────────── the same minute twice
  section("6. The same minute cannot go twice");

  const clash = await post("/api/booking", {
    name: `Clash Patient ${stamp}`,
    phone: `018${stamp}`,
    service_id: service.id,
    test_date: date,
    start_time: wanted.start,
    employee_id: wanted.employee_id,
  });

  check(clash.status === 409, "second attempt is refused", `got ${clash.status}`);
  check(
    typeof clash.body?.message === "string" && clash.body.message.length > 0,
    "and it says why, in a sentence a patient could read",
    clash.body?.message ?? ""
  );

  // 7 ──────────────────────────────────────────────────────── rubbish input
  section("7. Rubbish is turned away");

  const junk = await post("/api/booking", { name: "X", phone: "ring me", service_id: 0 });
  check(junk.status === 422, "incomplete form refused", `got ${junk.status}`);
  check(
    !!junk.body?.problems?.name && !!junk.body?.problems?.phone,
    "and it says which fields"
  );

  const past = await get(`/api/booking/availability?service_id=${service.id}&date=${dayFromNow(-1)}`);
  check(past.body?.available === false, "yesterday is not bookable");
  check(past.body?.reason === "past_date", "and the reason says so", past.body?.reason ?? "");

  report();
}

function report() {
  console.log(`\n${"─".repeat(60)}`);
  if (failed === 0) {
    console.log(`\x1b[32m\x1b[1m  ${passed} checks passed.\x1b[0m The chain works end to end.\n`);
    process.exit(0);
  }
  console.log(`\x1b[31m\x1b[1m  ${failed} failed\x1b[0m, ${passed} passed\n`);
  failures.forEach((f) => console.log(`   · ${f}`));
  console.log();
  process.exit(1);
}

main().catch((e) => {
  console.error(`\n\x1b[31mCould not run:\x1b[0m ${e.message}`);
  console.error(`Is the site running at ${BASE}?  (npm run dev)\n`);
  process.exit(1);
});
