/**
 * Single source of truth for everything about the business.
 *
 * The CMS company-settings endpoint still returns seeder placeholder data
 * (phone "01234567", address "Recusandae Et dolor"), so nothing here reads
 * from it. Once that record is filled in properly, swap these values for
 * the API and delete the ones that duplicate it.
 *
 * TODO before launch — confirm with Senso:
 *   - which address is the operating one (see ADDRESS_NOTE below)
 *   - opening hours
 *   - test fees (TESTS)
 *   - parts prices (PARTS)
 *   - trial length and warranty terms
 *   - audiologist names and credentials
 */

export const SITE = {
  name: "Senso Hearing Centre",
  nameBn: "সেনসো হিয়ারিং সেন্টার",
  url: "https://www.sensohearingdhaka.com",

  // ADDRESS_NOTE: three addresses are currently in circulation —
  //   this site + resoundbd.com : Artisan Center (4th floor), 57/9 Panthapath
  //   Messenger auto-reply       : Rowshan Tower (3rd floor), Green Road signal
  //   ReSound distributor page   : Rawshan Tower (2nd floor), Green Road
  // resoundbd.com labels the Artisan Center one "Operation Address", so it is
  // used here. Must be confirmed, and ReSound asked to update their listing.
  address: {
    line: "Artisan Center (4th Floor), 57/9 Panthapath",
    lineBn: "আর্টিজান সেন্টার (৪র্থ তলা), ৫৭/৯ পান্থপথ",
    city: "Dhaka",
    cityBn: "ঢাকা",
    postcode: "1205",
    country: "BD",
    landmark: "Green Road signal",
    landmarkBn: "গ্রীন রোড সিগন্যাল",
    mapsUrl:
      "https://maps.google.com/?q=Senso+Hearing+Centre+Panthapath+Dhaka",
  },

  phones: ["+8801322926207", "+8801731008075", "+88024811483"],
  phoneDisplay: "01322-926207",
  whatsapp: "8801731008075", // country code, no plus
  email: "info@sensohearingdhaka.com",

  facebookPageId: "212954412245615",

  // 0 = Sunday ... 6 = Saturday. null = closed. Friday is the weekly holiday.
  hours: {
    0: [10, 20],
    1: [10, 20],
    2: [10, 20],
    3: [10, 20],
    4: [10, 20],
    5: null,
    6: [10, 20],
  } as Record<number, [number, number] | null>,

  // Verifiable on resound.com/en/worldwide-distributors — the only Bangladesh
  // entry. No competitor can claim this, so it is used as the trust anchor.
  distributor: {
    entity: "Tabassum International C/O Senso Hearing Centre, Dhaka",
    brand: "ReSound",
    proofUrl: "https://www.resound.com/en/worldwide-distributors",
  },
} as const;

/** WhatsApp deep link with the opening message pre-filled, so enquiries
 *  arrive in the inbox already sorted by intent. */
export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string = SITE.phones[0]) {
  return `tel:${phone}`;
}

/** Western digits — Bangladeshi commerce convention, and what people type
 *  into bKash. Bengali digits are used for prose and times, not money. */
export function formatTaka(value: string | number) {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!isFinite(n)) return "";
  return `৳ ${Math.round(n).toLocaleString("en-US")}`;
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function toBengaliDigits(value: string | number) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[+d]);
}

export type OpenState = {
  isOpen: boolean;
  /** hour the shop closes today, if open */
  closesAt?: number;
  /** next day index that has hours, if closed */
  nextDay?: number;
  nextOpensAt?: number;
};

export function getOpenState(now: Date = new Date()): OpenState {
  const dhaka = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const day = dhaka.getDay();
  const hour = dhaka.getHours() + dhaka.getMinutes() / 60;
  const span = SITE.hours[day];

  if (span && hour >= span[0] && hour < span[1]) {
    return { isOpen: true, closesAt: span[1] };
  }

  let d = day;
  for (let step = 0; step < 8; step++) {
    if (step > 0 || !span || hour >= span[1]) d = (d + 1) % 7;
    const next = SITE.hours[d];
    if (next) return { isOpen: false, nextDay: d, nextOpensAt: next[0] };
  }
  return { isOpen: false };
}

/**
 * hreflang map for a page that exists in both languages.
 *
 * Cast because Next's `Languages` type enumerates a fixed set of locale keys
 * and does not include "en-BD" — which is nonetheless the correct value here:
 * one country, two languages. Bangla is x-default because it is the primary
 * audience and lives at the canonical URLs.
 */
export function altLanguages(bnPath: string, enPath: string) {
  return {
    "bn-BD": bnPath,
    "en-BD": enPath,
    "x-default": bnPath,
  } as any;
}
