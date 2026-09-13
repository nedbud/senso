/**
 * Everything factual about the business, as supplied by Senso on the
 * information form (returned 31 Aug 2026). Nothing here is guessed.
 *
 * The CMS company-settings endpoint still returns seeder placeholder data
 * (phone "01234567", address "Recusandae Et dolor"), which is why none of
 * this reads from the API.
 *
 * STILL MISSING from the form — ask before launch:
 *   - email address (left blank; the old site used info@sensohearingdhaka.com)
 *   - whether the trial requires a deposit
 *   - staff qualifications (names and roles given, no degrees)
 *   - patient testimonials, referring ENT doctors, Google review count
 *   - domain / hosting / Google Business Profile / Search Console access
 */

export const SITE = {
  name: "Senso Hearing Centre",
  nameBn: "সেনসো হিয়ারিং সেন্টার",
  url: "https://www.sensohearingdhaka.com",

  address: {
    line: "57/9, Artisan Center (4th floor), Panthapath Signal",
    lineBn: "৫৭/৯, আর্টিসান সেন্টার (৪র্থ তলা), পান্থপথ সিগনাল",
    city: "Dhaka",
    cityBn: "ঢাকা",
    // ⚠️ Senso wrote 1215 on the form, in both Bangla and English. Every
    // other source — the current site, resoundbd.com and ReSound's own
    // distributor listing — says 1205, which is the postcode Panthapath
    // normally falls under. Confirm before launch: a wrong postcode is
    // exactly the kind of NAP inconsistency that costs local ranking.
    postcode: "1215",
    country: "BD",
    landmark: "Panthapath / Green Road signal, the building next to Ajwa food shop",
    landmarkBn: "পান্থপথ / গ্রীনরোড সিগনাল, আজোয়া খাবারের দোকানের পাশের বিল্ডিং",
    floorNote: "Lift to the 4th floor. Parking available.",
    floorNoteBn: "লিফটে ৪ তলা। পার্কিং ব্যবস্থা আছে।",
    mapsUrl:
      "https://www.google.com/maps/place/Senso+Hearing+Centre+Dhaka/@23.7515683,90.3865646,157m/data=!3m1!1e3!4m6!3m5!1s0x3755b9a126444b51:0xd5ea0863ae6b7f8c!8m2!3d23.7515441!4d90.3863803",
    geo: { lat: 23.7515441, lng: 90.3863803 },
  },

  phones: ["+8801322926297", "+8801805051278", "+88029128045"],
  phoneDisplay: "01322-926297",
  phoneDisplay2: "01805-051278",
  // Senso gave two WhatsApp numbers; the first is the primary.
  whatsapp: "8801322926297",
  whatsappAlt: "8801805051278",
  email: "info@sensohearingdhaka.com", // not given on the form — verify
  /**
   * Not for display. Senso asked for the trade licence number to be taken
   * off the site, so nothing renders it — not the footer, not the trust
   * band, not the structured data. It stays here because it is a real fact
   * about the business that may be needed for a form or a submission one
   * day, and because leaving it recorded with this note is what stops it
   * quietly reappearing on a page later.
   */
  tradeLicence: "TRAD/DSCC/242022/2019",

  facebookPageId: "212954412245615",

  /**
   * Where Senso already exists online.
   *
   * These are not decoration. Google uses `sameAs` to tie a website to the
   * profiles of the same business elsewhere, which is how a search for
   * "senso hearing" resolves to one entity instead of three unrelated
   * results — and the Facebook page is the one with the history on it:
   * thousands of followers and years of posts and replies. Linking the two
   * in both directions is what makes the site part of that entity rather
   * than a fourth stranger claiming the name.
   *
   * The YouTube channel is real but has nothing on it yet. It is declared
   * here for the entity link and listed in the footer, and deliberately not
   * promoted anywhere as something to go and watch.
   */
  social: {
    facebook: "https://www.facebook.com/sensohearingcenter/",
    youtube: "https://www.youtube.com/@sensohearingcenter",
  },

  // 0 = Sunday ... 6 = Saturday. Friday and government holidays closed.
  hours: {
    0: [10, 20], 1: [10, 20], 2: [10, 20], 3: [10, 20],
    4: [10, 20], 5: null, 6: [10, 20],
  } as Record<number, [number, number] | null>,

  /**
   * Senso answered "অথোরাইজড ডিলার" — authorised dealer, not the exclusive
   * distributor their Messenger replies have claimed. The weaker, accurate
   * word is used everywhere on the site. ReSound's own distributor page
   * still lists the entity, which is what makes it verifiable.
   */
  dealer: {
    status: "authorised" as const,
    entity: "Tabassum International C/O Senso Hearing Centre, Dhaka",
    brand: "ReSound",
    proofUrl: "https://www.resound.com/en/worldwide-distributors",
    certificateOnFile: true,
  },

  payments: {
    cards: true,
    bkash: true,
    banglaQr: true,
    emi: false, // explicitly "নেই" on the form — do not advertise instalments
    tradeIn: false,
  },

  warranty: {
    years: 2,
    accessoryYears: 1,
    followUpMonths: 4,
    excluded: "physical damage, fire, tearing, and water damage",
    excludedBn: "ভেঙে গেলে, আগুনে পুড়লে, ছিঁড়ে গেলে বা পানিতে ভিজে নষ্ট হলে",
    replacementDiscount: 60, // BRX policy: buy a replacement at 60% of price
  },

  service: {
    /** Senso services ReSound only — not Signia, Phonak or Oticon. */
    brands: ["ReSound"] as const,
    otherBrands: false,
    boughtAbroad: true,
    inHouseDays: 1,
    overseasWeeks: "6–8",
    courier: true,
  },

  outsideDhaka: {
    branches: false,
    dealerPoints: true,
    sameDayPossible: true,
    arriveBy: 10,
    totalHours: "3–4",
    videoFollowUp: true,
    followUpFrom: 10,
    followUpTo: 19,
  },

  hospitals: ["CMH", "BMU", "DMCH", "MMCH", "SOMCH", "SSMCMH"],
} as const;

/** Test fees, times and age limits, as given by Senso. */
export const TESTS = [
  { id: "pta", fee: 800, minutes: 25, minAge: 5 },
  { id: "tympanometry", fee: 400, minutes: 5, minAge: 5 },
  { id: "srt", fee: 400, minutes: 5, minAge: 5 },
] as const;

/** All three together — the usual adult assessment. */
export const TEST_PACKAGE = { fee: 1600, minutes: 35 } as const;

/** Parts and service. "এক পাতায় ৬ পিস" — six cells to a strip. */
export const PARTS = [
  { id: "battery", price: 250, unit: "strip", note: "6 per strip" },
  { id: "earmould", price: 1200, unit: "each" },
  { id: "earhook", price: 1500, unit: "each" },
  { id: "receiver", price: 6000, priceHigh: 8000, unit: "each" },
  { id: "servicing", price: 500, unit: "visit" },
  { id: "repair", price: 8500, unit: "average" },
] as const;

/** Team, as given. No qualifications were supplied — ask for them. */
export const TEAM = [
  { name: "আব্দুস সালাম রবিন", nameEn: "Abdus Salam Robin", role: "in-charge", days: "sat-thu", from: 13, to: 19 },
  { name: "রুবাইয়া", nameEn: "Rubaiya", role: "audiologist", days: "sat-thu", from: 10, to: 20 },
  { name: "শরিফুল", nameEn: "Shariful", role: "audiometrician", days: "sat-thu", from: 10, to: 20 },
  { name: "শিমু", nameEn: "Shimu", role: "counsellor", days: "sat-thu", from: 10, to: 20 },
  { name: "অভি", nameEn: "Ovi", role: "pro", days: "sun-thu", from: 10, to: 19 },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string = SITE.phones[0]) {
  return `tel:${phone}`;
}

/** Western digits — Bangladeshi commerce convention, and what people type
 *  into bKash. Bengali digits are for prose and times, not money. */
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
  closesAt?: number;
  nextDay?: number;
  nextOpensAt?: number;
};

export function getOpenState(now: Date = new Date()): OpenState {
  const dhaka = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
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
 * hreflang map. Cast because Next's `Languages` type enumerates a fixed set
 * of locale keys and does not include "en-BD" — which is nonetheless correct
 * here: one country, two languages. Bangla is x-default.
 */
export function altLanguages(bnPath: string, enPath: string) {
  return { "bn-BD": bnPath, "en-BD": enPath, "x-default": bnPath } as any;
}
