import { SITE, TESTS, TEST_PACKAGE, PARTS, TEAM, getOpenState } from "@/lib/site";
import { getProducts, isAccessory, type ProductMapInterface } from "@/routes/product";

/**
 * Everything Naati is allowed to state as fact, as plain text.
 *
 * It is built from the same two sources the website itself renders from —
 * `SITE` for the clinic and the CMS for the catalogue — so the assistant
 * can never drift from what the pages say. When Senso corrects a price in
 * the panel, Naati is corrected in the same hour, because `getProducts()`
 * revalidates hourly and this is rebuilt from it.
 *
 * No retrieval, no embeddings, no vector store. The whole of Senso is about
 * ten thousand tokens, which fits in every request with room to spare, and
 * a catalogue that is always fully present cannot return the wrong chunk.
 */

const DAYS_BN = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"];

function line(p: ProductMapInterface): string {
  const bits = [p.name, `৳${p.price || "—"}`];
  if (p.series) bits.push(p.series);
  if (p.form_factor) bits.push(p.form_factor);
  if (p.battery_type) bits.push(p.battery_type);
  if (p.fitting_range) bits.push(`fits ${p.fitting_range.from}–${p.fitting_range.to} dB`);
  if (p.channels) bits.push(`${p.channels} ch`);
  return `- ${bits.join(" | ")}`;
}

function clinic(): string {
  const a = SITE.address;
  const open = getOpenState();
  const now = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
    timeStyle: "short",
  });

  const openNow = open.isOpen
    ? `OPEN right now, until ${open.closesAt}:00.`
    : `CLOSED right now. Next open ${DAYS_BN[open.nextDay ?? 0]}, ${open.nextOpensAt}:00.`;

  return `
## The clinic
${SITE.nameBn} (${SITE.name}).
There is ONE centre. No branches outside it.
Address (bn): ${a.lineBn}, ${a.cityBn}-${a.postcode}
Address (en): ${a.line}, ${a.city}-${a.postcode}
Landmark: ${a.landmarkBn}
Getting in: ${a.floorNoteBn}
Map: ${a.mapsUrl}
Phone: ${SITE.phoneDisplay}, ${SITE.phoneDisplay2}
WhatsApp: ${SITE.phoneDisplay}
Email: ${SITE.email}
Facebook: ${SITE.social.facebook}

## Time
Right now in Dhaka: ${now}
${openNow}
Hours: Saturday to Thursday, 10:00–20:00. Friday closed.

## Who sits when
${TEAM.map((t) => `- ${t.name} (${t.nameEn}), ${t.role}, ${t.days}, ${t.from}:00–${t.to}:00`).join("\n")}

## Tests
${TESTS.map((t) => `- ${t.id.toUpperCase()}: ৳${t.fee}, ${t.minutes} min, age ${t.minAge}+`).join("\n")}
- All three together (the usual adult assessment): ৳${TEST_PACKAGE.fee}, ${TEST_PACKAGE.minutes} minutes, report the same day.
An appointment is not required — anyone can walk in during opening hours.
A serial can also be booked from this chat, and over the phone or on WhatsApp.
A booking for a patient under 18 is made by their parent or guardian, and the
guardian's name is recorded with it.
A booking made here is a request: it goes into the clinic's book straight away,
and the counter confirms it. Nothing is confirmed until they do.

## Parts and servicing
${PARTS.map((raw) => {
  // `PARTS` is `as const`, so its members are a heterogeneous union and only
  // some carry a ceiling price or a note. One widened shape to read them by.
  const p = raw as { id: string; price: number; unit: string; priceHigh?: number; note?: string };
  const price = p.priceHigh ? `৳${p.price}–${p.priceHigh}` : `৳${p.price}`;
  return `- ${p.id}: ${price} per ${p.unit}${p.note ? ` (${p.note})` : ""}`;
}).join("\n")}

## Service policy
Senso services ${SITE.service.brands.join(", ")} only — not Signia, Phonak or Oticon.
A device bought abroad can still be serviced here.
In-house repair: about ${SITE.service.inHouseDays} day. Sent overseas: ${SITE.service.overseasWeeks} weeks.
Courier accepted.

## Warranty
${SITE.warranty.years} years on devices, ${SITE.warranty.accessoryYears} year on accessories.
Free follow-up visits for ${SITE.warranty.followUpMonths} months.
Not covered: ${SITE.warranty.excludedBn}.

## Payment
Cards, bKash and Bangla QR accepted. No instalments (no EMI). No trade-in.

## From outside Dhaka
No branches. Same-day is possible if they arrive by ${SITE.outsideDhaka.arriveBy}:00 — allow ${SITE.outsideDhaka.totalHours} hours in total.
Follow-up afterwards can be done over video, ${SITE.outsideDhaka.followUpFrom}:00–${SITE.outsideDhaka.followUpTo}:00.

## The brand
Senso is an AUTHORISED DEALER for ${SITE.dealer.brand}. Not the exclusive distributor.
`.trim();
}

let cached: { at: number; text: string } | null = null;
const TTL = 15 * 60 * 1000;

export async function sensoKnowledge(): Promise<string> {
  // Held for fifteen minutes so a busy hour does not re-render the
  // catalogue on every turn, and short enough that the open/closed line
  // above is never meaningfully stale.
  if (cached && Date.now() - cached.at < TTL) return cached.text;

  const all = await getProducts();
  const devices = all.filter((p) => !isAccessory(p));
  const bits = all.filter((p) => isAccessory(p));

  const text = [
    clinic(),
    "",
    `## Hearing aids (${devices.length}). Every price is published; never be evasive about one.`,
    devices.map(line).join("\n"),
    "",
    `## Batteries, parts and accessories (${bits.length})`,
    bits.map(line).join("\n"),
    "",
    "Which device a person needs is decided after the hearing test, never from a chat.",
  ].join("\n");

  cached = { at: Date.now(), text };
  return text;
}
