/**
 * All user-facing copy, in Bangla and English.
 *
 * Bangla is the default because the patient and the family member deciding
 * for them read Bangla. English exists for the adult children who search in
 * English, for expatriate relatives, and for doctor referrals.
 *
 * Register: cholito bhasha, আপনি, and the -উন imperative (করুন, আসুন).
 * Sadhu bhasha reads like a government circular and is never used.
 *
 * Terminology: the headline word is কানের মেশিন, not শ্রবণযন্ত্র. The formal
 * word is medically correct and almost nobody searches it.
 */

export type Lang = "bn" | "en";
export const LANGS: Lang[] = ["bn", "en"];
export const DEFAULT_LANG: Lang = "bn";

export const t = {
  bn: {
    nav: {
      home: "হোম",
      products: "কানের মেশিন",
      tests: "কান পরীক্ষা",
      service: "সার্ভিস",
      about: "আমরা কারা",
      visit: "কোথায় আসবেন",
      call: "ফোন করুন",
      whatsapp: "হোয়াটসঅ্যাপ",
    },

    hero: {
      eyebrow: "পান্থপথ, ঢাকা · ReSound-এর অনুমোদিত ডিলার",
      // Opens on the delay, not the product. Average time from noticing
      // hearing loss to seeking help is 4-10 years, and most people who
      // have not acted believe their loss is only mild. Naming the delay
      // turns guilt into permission.
      title: "কানে কম শোনা নিয়ে বেশিরভাগ মানুষ প্রায় দশ বছর অপেক্ষা করেন।",
      lede: "আর অপেক্ষা করার দরকার নেই। পূর্ণ কান পরীক্ষা ৩৫ মিনিটে, ফি ৳ 1,600 — রিপোর্ট একই দিনে হাতে পাবেন। মেশিন নেওয়ার সিদ্ধান্ত পরে, আগে জানুন আসলে কী অবস্থা।",
      ctaWhatsapp: "হোয়াটসঅ্যাপে লিখুন",
      ctaCall: "ফোন করুন",
      // The differentiator. A hearing clinic whose only CTA is "call us"
      // asks its hardest-to-convert visitors to do the thing their
      // condition makes hardest.
      phoneNoteTitle: "ফোনে কথা বলতে কষ্ট হয়?",
      phoneNote:
        "লিখে পাঠান। আমাদের বেশিরভাগ রোগীর জন্যই ফোন কঠিন — সেজন্যই তো তাঁরা আমাদের কাছে আসেন। হোয়াটসঅ্যাপ, মেসেঞ্জার, অথবা সরাসরি চলে আসুন।",
      openNow: "এখন খোলা",
      closedNow: "এখন বন্ধ",
      openUntil: (h: string) => `${h} পর্যন্ত খোলা`,
      opensAt: (day: string, h: string) => `${day} ${h}-এ খুলবে`,
      tomorrow: "আগামীকাল",
      hoursFallback: "শনি – বৃহস্পতি, সকাল ১০টা – রাত ৮টা · শুক্রবার বন্ধ",
    },

    products: {
      heading: "কোন মেশিন, কত দাম",
      lede: "কম শোনার মাত্রা যত বেশি, মেশিনের ক্ষমতা তত বেশি লাগে — দামের পার্থক্যটা এখান থেকেই। কোনটা আপনার লাগবে, ঠিক হয় অডিওগ্রামের পর।",
      all: "সব মেশিন দেখুন",
      from: "থেকে শুরু",
      series: "সিরিজ",
      brand: "ব্র্যান্ড",
      price: "দাম",
      details: "বিস্তারিত",
      askPrice: "এই মেশিনটি নিয়ে জানতে চাই",
      empty: "এই সিরিজে এখন কোনো মেশিন নেই।",
      sortBy: "সাজান",
      filterSeries: "সিরিজ",
      allSeries: "সব",
    },

    faq: { heading: "আরও কিছু প্রশ্ন" },

    footer: {
      hours: "সময়সূচি",
      hoursValue: "শনি – বৃহস্পতি: সকাল ১০টা – রাত ৮টা",
      closedFriday: "শুক্রবার বন্ধ",
      address: "ঠিকানা",
      contact: "যোগাযোগ",
      distributor:
        "ReSound (GN, ডেনমার্ক)-এর অনুমোদিত ডিলার। পান্থপথে ২০০৭ সাল থেকে।",
    },

    common: {
      langLabel: "English",
      map: "ম্যাপে দেখুন",
      verify: "ReSound-এর নিজের তালিকায় দেখুন",
    },

    wa: {
      appointment: "আসসালামু আলাইকুম। কান পরীক্ষার জন্য সিরিয়াল নিতে চাই।",
      prescription:
        "প্রেসক্রিপশনের ছবি পাঠাচ্ছি। কোন টেস্ট লাগবে জানাবেন।",
      parts: "মেশিনের ছবি পাঠাচ্ছি। কোন যন্ত্রাংশ লাগবে জানাবেন।",
      product: (name: string) => `${name} — এই মেশিনটি নিয়ে জানতে চাই।`,
      general: "আসসালামু আলাইকুম।",
    },
  },

  en: {
    nav: {
      home: "Home",
      products: "Hearing aids",
      tests: "Hearing tests",
      service: "Service",
      about: "About us",
      visit: "Find us",
      call: "Call us",
      whatsapp: "WhatsApp",
    },

    hero: {
      eyebrow:
        "Panthapath, Dhaka · Authorised ReSound dealer in Bangladesh",
      title:
        "Most people live with hearing loss for about ten years before doing anything about it.",
      lede: "There is no reason to wait any longer. A full hearing assessment takes 35 minutes and costs ৳ 1,600, and you leave with the report the same day. Whether to buy anything comes later — first find out where you actually stand.",
      ctaWhatsapp: "Message us on WhatsApp",
      ctaCall: "Call us",
      phoneNoteTitle: "Find phone calls difficult?",
      phoneNote:
        "Write to us instead. Most of our patients struggle on the phone — that is usually why they come to us in the first place. WhatsApp, Messenger, or simply walk in.",
      openNow: "Open now",
      closedNow: "Closed now",
      openUntil: (h: string) => `Open until ${h}`,
      opensAt: (day: string, h: string) => `Opens ${day} at ${h}`,
      tomorrow: "tomorrow",
      hoursFallback: "Saturday – Thursday, 10 AM – 8 PM · Closed Friday",
    },

    products: {
      heading: "Which device, what price",
      lede: "The greater the hearing loss, the more powerful the device has to be — which is where the spread in price comes from. Which one you need is settled after the audiogram.",
      all: "See all hearing aids",
      from: "from",
      series: "Series",
      brand: "Brand",
      price: "Price",
      details: "Details",
      askPrice: "Ask about this device",
      empty: "No devices in this series yet.",
      sortBy: "Sort by",
      filterSeries: "Series",
      allSeries: "All",
    },

    faq: { heading: "A few more questions" },

    footer: {
      hours: "Opening hours",
      hoursValue: "Saturday – Thursday: 10 AM – 8 PM",
      closedFriday: "Closed on Friday",
      address: "Address",
      contact: "Contact",
      distributor:
        "Authorised ReSound (GN, Denmark) dealer in Bangladesh. In Panthapath since 2007.",
    },

    common: {
      langLabel: "বাংলা",
      map: "Open in Maps",
      verify: "See us on ReSound's own listing",
    },

    wa: {
      appointment: "Hello. I would like to book a hearing test.",
      prescription:
        "I am sending a photo of my prescription. Please tell me which tests I need.",
      parts:
        "I am sending a photo of my device. Please tell me which part I need.",
      product: (name: string) => `I would like to know more about ${name}.`,
      general: "Hello.",
    },
  },
} as const;

export function dict(lang: Lang) {
  return t[lang] ?? t[DEFAULT_LANG];
}

/** Bangla has no AM/PM — the day-period word carries the meaning. */
export function clockLabel(hour: number, lang: Lang) {
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  if (lang === "en") return `${display} ${hour < 12 ? "AM" : "PM"}`;
  const part =
    hour < 6
      ? "রাত"
      : hour < 12
      ? "সকাল"
      : hour < 16
      ? "দুপুর"
      : hour < 18
      ? "বিকেল"
      : hour < 19
      ? "সন্ধ্যা"
      : "রাত";
  const BN = "০১২৩৪৫৬৭৮৯";
  const bn = String(display).replace(/\d/g, (d) => BN[+d]);
  return `${part} ${bn}টা`;
}

export const DAY_NAMES = {
  bn: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
} as const;
