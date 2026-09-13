import type { ProductMapInterface } from "@/routes/product";
import type { Lang } from "./i18n";

/**
 * The product knowledge model.
 *
 * The CMS stores a name, a price, a series and an image. Everything a buyer
 * actually decides on — how much hearing loss it covers, whether it charges
 * or takes a battery, whether it sits behind the ear or inside the canal —
 * is locked inside the model name as trade shorthand: "Resound Nexia 461
 * DRWC RIE". This module turns that shorthand into structured attributes.
 *
 * It exists for three reasons, in order of importance:
 *
 * 1. It is what a hearing-aid consultation actually reasons over. A person
 *    asking "which one for my father, he can't follow conversation at the
 *    dinner table, and he can't handle tiny batteries" is describing loss
 *    level, listening environment and dexterity. Those have to be fields
 *    before anything — a filter, a quiz, or a model — can answer with them.
 *    Everything downstream is a query against this shape.
 *
 * 2. It is what makes 109 product pages worth indexing. Pages generated from
 *    a name and a price are thin and near-duplicate. Pages that explain who
 *    this device suits, what the form factor means, and what changes at this
 *    price are genuinely different from one another because the underlying
 *    attributes differ.
 *
 * 3. It lets the catalogue be filtered on the axes people care about rather
 *    than on the series names the manufacturer happens to use.
 *
 * Derivations are conservative: anything the name does not clearly state is
 * left undefined rather than guessed, because a wrong confident answer about
 * a medical device is worse than no answer.
 */

export type FormFactor = "rie" | "bte" | "cic" | "itc" | "ite" | "iic";
export type LossLevel = "mild" | "moderate" | "severe" | "profound";
export type PowerClass = "standard" | "power" | "superpower";
export type Tier = "entry" | "mid" | "premium";

export interface Device extends ProductMapInterface {
  priceValue: number;
  /** trimmed of the "... hearing aid price in Bangladesh" SEO suffix */
  title: string;
  formFactor?: FormFactor;
  power: PowerClass;
  rechargeable?: boolean;
  /** lowest and highest degree of loss the device is generally fitted for */
  lossFrom: LossLevel;
  lossTo: LossLevel;
  /** the manufacturer's fitting range in dB HL, when the CMS carries it */
  fittingRange?: { from: number; to: number };
  /**
   * Where the fitting range came from. "spec" means ReSound's own number —
   * now either a real column on the product or the coverage/features text.
   * "derived" means nothing in the CMS said, so it was inferred from the form
   * factor and power class: good enough to guide, not good enough to quote.
   */
  rangeSource: "spec" | "derived";
  /** number of processing channels, when the CMS states it */
  channels?: number;
  /** "cros" | "bicros" — a relay system, not an ordinary hearing aid */
  systemType?: string;
  tier: Tier;
  isAccessory: boolean;
}

const LOSS_ORDER: LossLevel[] = ["mild", "moderate", "severe", "profound"];

/** Series that are consumables, not hearing aids. The battery series name is
 *  misspelled in the CMS; matching the misspelling is deliberate. */
export const ACCESSORY_SERIES = ["Hearign Aid Battery", "No Series"];

/** ReSound platform generations, cheapest to most capable. Tier decides how
 *  a device is described, not just how it is sorted. */
const TIER_BY_SERIES: Record<string, Tier> = {
  "Resound Key": "entry",
  "Resound One": "mid",
  "ReSound LiNX Quattro": "mid",
  "ENZO Q": "mid",
  Savi: "mid",
  OMNIA: "premium",
  Nexia: "premium",
  Vivia: "premium",
  "Enzo IA": "premium",
};

function detectFormFactor(name: string): FormFactor | undefined {
  const n = name.toUpperCase();
  if (/\bRIE\b|\bRIC\b|RECEIVER[- ]IN/.test(n)) return "rie";
  if (/\bBTE\b/.test(n)) return "bte";
  if (/\bCIC\b/.test(n)) return "cic";
  if (/\bITC\b/.test(n)) return "itc";
  if (/\bITE\b/.test(n)) return "ite";
  return undefined;
}

function detectPower(name: string): PowerClass {
  const n = name.toUpperCase();
  if (/SUPER\s*POWER|\bSP\b|\bUP\b/.test(n)) return "superpower";
  if (/\bHP\b|\bPOWER\b|\bNP\b/.test(n)) return "power";
  return "standard";
}

/** ReSound's own suffix convention: a trailing C means it ships with a
 *  charger. DRWC is rechargeable, DRW takes a size 312 or 13 cell. */
function detectRechargeable(name: string): boolean | undefined {
  const n = name.toUpperCase();
  if (/\bDRWC\b|\bRECHARGEABLE\b|\bRT\b/.test(n)) return true;
  if (/\bDRW\b|\bW\b(?!C)/.test(n)) return false;
  return undefined;
}

/**
 * Fitting range. Receiver and behind-the-ear devices with extra power reach
 * further; in-the-canal devices are limited by how much gain a small shell
 * can deliver without feedback.
 */
function detectLossRange(
  form: FormFactor | undefined,
  power: PowerClass
): { from: LossLevel; to: LossLevel } {
  if (power === "superpower") return { from: "severe", to: "profound" };
  if (power === "power") return { from: "moderate", to: "severe" };
  if (form === "cic" || form === "itc") return { from: "mild", to: "moderate" };
  if (form === "bte") return { from: "moderate", to: "severe" };
  return { from: "mild", to: "severe" };
}

/**
 * The manufacturer's fitting range, as the CMS actually stores it.
 *
 * 54 of the 109 products carry a feature line reading "Fitting Range: 20-110",
 * and the detail endpoint repeats it in `coverage` as "20-110dB". That is the
 * real number, from ReSound, and it beats anything inferable from a model
 * name — so it is used whenever it is there. The remaining products fall back
 * to the heuristic below, and filling in the rest is the single highest-value
 * thing the CMS can do for these pages.
 */
export function parseFittingRange(
  features?: { value: string }[],
  coverage?: string
): { from: number; to: number } | undefined {
  const haystack = [
    coverage ?? "",
    ...(features ?? []).map((f) => f.value ?? ""),
  ].join(" | ");
  const m = haystack.match(/(?:fitting range[:\s]*)?(\d{1,3})\s*(?:-|–|to)\s*(\d{1,3})\s*(?:dB)?/i);
  if (!m) return undefined;
  const from = Number(m[1]);
  const to = Number(m[2]);
  // Hearing thresholds live between roughly 0 and 130 dB HL. Anything outside
  // that is a channel count or a model number that happened to match.
  if (!(from >= 0 && to <= 130 && to > from)) return undefined;
  return { from, to };
}

/**
 * dB HL to the four degrees people are actually told they have. The
 * boundaries are the common clinical ones: up to 40 mild, to 55 moderate,
 * to 90 severe, beyond that profound.
 */
export function dbToLoss(db: number): LossLevel {
  if (db <= 40) return "mild";
  if (db <= 55) return "moderate";
  if (db <= 90) return "severe";
  return "profound";
}

/**
 * Accept a value from the API only if it is one this site knows how to render.
 * The columns are free-form strings in MySQL, so a typo entered in the admin
 * would otherwise reach `FORM_FACTOR[value]` and blow up a product page.
 */
function oneOf<T extends string>(allowed: readonly T[], value: unknown): T | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined;
}

const FORM_FACTOR_VALUES: FormFactor[] = ["rie", "bte", "cic", "itc", "ite", "iic"];
const POWER_VALUES: PowerClass[] = ["standard", "power", "superpower"];
const TIER_VALUES: Tier[] = ["entry", "mid", "premium"];

/**
 * Turn an API row into the device the site reasons about.
 *
 * Every attribute resolves the same way, in the same order:
 *
 *   1. the column, if the CMS has a value for it
 *   2. the model name, parsed
 *   3. nothing
 *
 * That order is the whole design. A product with every field filled in is
 * described from real data; a product with none behaves exactly as it did
 * before those columns existed. There is no state in between that breaks.
 */
export function toDevice(p: ProductMapInterface, coverage?: string): Device {
  const title = p.name
    .replace(/\s*hearing aid price in bangladesh\s*$/i, "")
    .replace(/\s*price in bangladesh\s*$/i, "")
    .trim();

  const formFactor =
    oneOf(FORM_FACTOR_VALUES, p.form_factor) ?? detectFormFactor(p.name);

  const power =
    oneOf(POWER_VALUES, p.power_class) ?? detectPower(p.name);

  const rechargeable =
    typeof p.battery_type === "string" && p.battery_type
      ? p.battery_type === "rechargeable"
      : detectRechargeable(p.name);

  // The stated range, in order of authority: the column, then the coverage
  // string on the detail payload, then the "Fitting Range: 20-110" line the
  // features list has carried all along.
  const spec =
    p.fitting_range ?? parseFittingRange(p.features, coverage ?? p.coverage ?? undefined);

  const range = spec
    ? { from: dbToLoss(spec.from), to: dbToLoss(spec.to) }
    : detectLossRange(formFactor, power);

  return {
    ...p,
    title,
    priceValue: parseFloat(p.price) || 0,
    formFactor,
    power,
    rechargeable,
    lossFrom: range.from,
    lossTo: range.to,
    fittingRange: spec ?? undefined,
    rangeSource: spec ? "spec" : "derived",
    channels: typeof p.channels === "number" ? p.channels : undefined,
    systemType: typeof p.system_type === "string" && p.system_type ? p.system_type : undefined,
    tier: oneOf(TIER_VALUES, p.tier) ?? TIER_BY_SERIES[p.series] ?? "mid",
    isAccessory:
      typeof p.is_accessory === "boolean"
        ? p.is_accessory
        : ACCESSORY_SERIES.includes(p.series),
  };
}

export function toDevices(rows: ProductMapInterface[]): Device[] {
  return rows.map((r) => toDevice(r));
}

export function devicesOnly(rows: ProductMapInterface[]): Device[] {
  return toDevices(rows).filter((d) => !d.isAccessory && d.priceValue > 0);
}

/* ── Human-readable labels ─────────────────────────────────────────────
   Written as explanations rather than jargon. "RIE" means nothing to the
   person buying; "the part that makes sound sits inside the ear canal,
   with a thin wire over the top" does. */

export const FORM_FACTOR: Record<
  FormFactor,
  { short: Record<Lang, string>; long: Record<Lang, string> }
> = {
  rie: {
    short: { bn: "কানের পেছনে, ভেতরে স্পিকার", en: "Behind the ear, speaker inside" },
    long: {
      bn: "মূল অংশটা কানের পেছনে থাকে, আর যেটা শব্দ তৈরি করে সেটা সরু তার দিয়ে কানের ভেতরে বসে। সবচেয়ে বেশি মানুষ এটাই নেন — বাইরে থেকে প্রায় দেখা যায় না, আর শব্দ স্বাভাবিক লাগে।",
      en: "The body sits behind the ear and the speaker sits inside the canal on a thin wire. This is what most people end up with — it is barely visible and it sounds the most natural.",
    },
  },
  bte: {
    short: { bn: "কানের পেছনে, টিউব দিয়ে", en: "Behind the ear, with tubing" },
    long: {
      bn: "পুরোটাই কানের পেছনে বসে, আর ইয়ার মোল্ডের সাথে টিউব দিয়ে যুক্ত থাকে। বেশি ক্ষমতা দিতে পারে, তাই কম শোনার মাত্রা বেশি হলে এটাই লাগে। হাতে ধরতেও সুবিধা।",
      en: "The whole device sits behind the ear and connects to an ear mould through tubing. It delivers the most power, so it is what more severe loss needs — and it is the easiest to handle.",
    },
  },
  cic: {
    short: { bn: "কানের ভেতরে, দেখা যায় না", en: "In the canal, hidden" },
    long: {
      bn: "পুরো মেশিনটা কানের ভেতরে বসে যায়, বাইরে থেকে দেখা যায় না। তবে ছোট বলে ক্ষমতা কম, আর হাতে কাঁপুনি থাকলে খুলতে-পরতে অসুবিধা হতে পারে।",
      en: "The device sits entirely inside the canal and cannot be seen. Being small it has less power, and it can be fiddly if your hands are unsteady.",
    },
  },
  itc: {
    short: { bn: "কানের ভেতরে", en: "In the canal" },
    long: {
      bn: "কানের ভেতরে বসে, CIC-এর চেয়ে একটু বড় — তাই ব্যাটারি বেশি চলে আর ধরতে সুবিধা।",
      en: "Sits in the canal, a little larger than a CIC — so the battery lasts longer and it is easier to handle.",
    },
  },
  iic: {
    short: { bn: "কানের গভীরে, একেবারেই দেখা যায় না", en: "Deep in the canal, invisible" },
    long: {
      bn: "CIC-এর চেয়েও ভেতরে বসে — বাইরে থেকে একেবারেই চোখে পড়ে না। সবচেয়ে ছোট বলে ক্ষমতাও সবচেয়ে কম, আর প্রতিটি কানের ছাঁচ অনুযায়ী আলাদা করে বানাতে হয়।",
      en: "Sits deeper than a CIC and cannot be seen at all. Being the smallest it also has the least power, and each one is built to a mould of your own ear.",
    },
  },
  ite: {
    short: { bn: "কানের ভেতরে, পূর্ণ", en: "In the ear, full shell" },
    long: {
      bn: "কানের বাইরের অংশ জুড়ে বসে। ধরতে সবচেয়ে সুবিধা, আর ব্যাটারিও বেশি চলে।",
      en: "Fills the outer bowl of the ear. The easiest of the in-ear styles to handle, with the longest battery life.",
    },
  },
};

export const LOSS_LABEL: Record<LossLevel, Record<Lang, string>> = {
  mild: { bn: "সামান্য", en: "mild" },
  moderate: { bn: "মাঝারি", en: "moderate" },
  severe: { bn: "বেশি", en: "severe" },
  profound: { bn: "খুব বেশি", en: "profound" },
};

/** What each degree of loss feels like day to day — the way a person would
 *  actually describe it, so they can place themselves without an audiogram. */
export const LOSS_FEELS: Record<LossLevel, Record<Lang, string>> = {
  mild: {
    bn: "শান্ত ঘরে কথা বুঝতে অসুবিধা হয় না, কিন্তু ভিড়ে বা দূর থেকে কথা ধরতে কষ্ট হয়।",
    en: "Conversation is fine in a quiet room, but hard in a crowd or from across it.",
  },
  moderate: {
    bn: "টিভির শব্দ বাড়াতে হয়, আর বারবার “কী বললেন” জিজ্ঞেস করতে হয়।",
    en: "The television goes up, and you find yourself asking people to repeat themselves.",
  },
  severe: {
    bn: "মুখোমুখি কথাও ঠিকমতো বোঝা যায় না, ফোনে কথা বলা কঠিন।",
    en: "Even face-to-face talk is hard to follow, and the phone is difficult.",
  },
  profound: {
    bn: "জোরে বলা কথাও ধরা যায় না — বেশি ক্ষমতার মেশিন লাগে।",
    en: "Even raised voices do not come through — this needs the most powerful devices.",
  },
};

export const TIER_LABEL: Record<Tier, Record<Lang, string>> = {
  entry: { bn: "শুরুর সারি", en: "Entry" },
  mid: { bn: "মাঝারি সারি", en: "Mid range" },
  premium: { bn: "উপরের সারি", en: "Premium" },
};

/** What actually improves as you move up the range. Kept honest: the thing
 *  that changes is performance in noise, which is also the thing no device
 *  fully solves. */
export const TIER_MEANS: Record<Tier, Record<Lang, string>> = {
  entry: {
    bn: "শান্ত জায়গায় ও এক-দুইজনের সাথে কথা বলার জন্য যথেষ্ট। ভিড়ের মধ্যে সীমাবদ্ধতা বেশি।",
    en: "Enough for quiet rooms and one or two people. More limited once there is background noise.",
  },
  mid: {
    bn: "ভিড়ের মধ্যে কথা আলাদা করে ধরার ক্ষমতা ভালো। বেশিরভাগ মানুষের জন্য এটাই যথেষ্ট।",
    en: "Noticeably better at separating a voice from background noise. Enough for most people.",
  },
  premium: {
    bn: "বাজার, বিয়েবাড়ি বা রেস্টুরেন্টের মতো কঠিন জায়গায় সবচেয়ে ভালো কাজ করে — যদিও কোনো মেশিনই সেখানে স্বাভাবিক কানের সমান নয়।",
    en: "Handles the hardest rooms best — markets, weddings, restaurants — though no device matches a normal ear there.",
  },
};

export function lossRangeLabel(d: Device, lang: Lang) {
  const a = LOSS_LABEL[d.lossFrom][lang];
  const b = LOSS_LABEL[d.lossTo][lang];
  if (d.lossFrom === d.lossTo) return a;
  return lang === "bn" ? `${a} থেকে ${b}` : `${a} to ${b}`;
}

export function coversLoss(d: Device, level: LossLevel) {
  return (
    LOSS_ORDER.indexOf(level) >= LOSS_ORDER.indexOf(d.lossFrom) &&
    LOSS_ORDER.indexOf(level) <= LOSS_ORDER.indexOf(d.lossTo)
  );
}

/**
 * The query an AI consultation will run. Kept as a plain function over the
 * structured attributes so the reasoning layer can change without the
 * catalogue changing.
 */
export type Need = {
  loss?: LossLevel;
  rechargeable?: boolean;
  discreet?: boolean;
  maxPrice?: number;
};

export function filterByNeed<T extends Device>(devices: T[], need: Need): T[] {
  return devices
    // A CROS relays sound from a deaf ear to the good one. It answers a
    // different question from "how much hearing have I lost", so it is never
    // offered as an answer to that one.
    .filter((d) => (need.loss ? !d.systemType : true))
    .filter((d) => (need.loss ? coversLoss(d, need.loss) : true))
    .filter((d) =>
      need.rechargeable === undefined ? true : d.rechargeable === need.rechargeable
    )
    .filter((d) =>
      need.discreet
        ? d.formFactor === "cic" || d.formFactor === "itc" || d.formFactor === "iic"
        : true
    )
    .filter((d) => (need.maxPrice ? d.priceValue <= need.maxPrice : true));
}

/** Filtering plus the cheapest-first order, for callers that want a ranked
 *  shortlist rather than a list the visitor is sorting themselves. */
export function match(devices: Device[], need: Need): Device[] {
  return filterByNeed(devices, need).sort((a, b) => a.priceValue - b.priceValue);
}

export function needIsEmpty(need: Need) {
  return (
    need.loss === undefined &&
    need.rechargeable === undefined &&
    !need.discreet &&
    need.maxPrice === undefined
  );
}
