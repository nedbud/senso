import { FORM_FACTOR, LOSS_LABEL, TIER_MEANS, type Device } from "@/lib/catalogue";
import { SITE, TEST_PACKAGE, formatTaka, toBengaliDigits } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * Questions answered per device, generated from its actual attributes.
 *
 * 109 product pages carrying the same boilerplate would be thin and
 * near-duplicate, which is worse than having no pages. Because these answers
 * are built from the device's own form factor, power class, battery type and
 * price, a CIC page and a super-power BTE page genuinely say different
 * things — which is the only honest way to have this many indexable pages.
 */
export function productFaq(d: Device, lang: Lang) {
  const bn = lang === "bn";
  const items: { question: string; answer: string }[] = [];

  items.push({
    question: bn
      ? `${d.title} কাদের জন্য?`
      : `Who is the ${d.title} for?`,
    answer: bn
      ? `${LOSS_LABEL[d.lossFrom].bn} থেকে ${LOSS_LABEL[d.lossTo].bn} মাত্রার শ্রবণক্ষয়ের জন্য। ${TIER_MEANS[d.tier].bn} চূড়ান্ত সিদ্ধান্ত অডিওগ্রামের পর — কানের অবস্থা না দেখে কোনো মেশিন সাজেস্ট করা ঠিক নয়।`
      : `For ${LOSS_LABEL[d.lossFrom].en} to ${LOSS_LABEL[d.lossTo].en} hearing loss. ${TIER_MEANS[d.tier].en} The final choice is settled after the audiogram — recommending a device without seeing the ear is not something we do.`,
  });

  items.push({
    question: bn
      ? `${d.title}-এর দাম কত, আর দামের সাথে কী কী থাকে?`
      : `What does the ${d.title} cost, and what is included?`,
    answer: bn
      ? `${formatTaka(d.priceValue)}। এর সাথে থাকে অডিওলজিস্টের সময়, মেশিন সেট করা ও যাচাই, ইয়ার মোল্ড, ${toBengaliDigits(SITE.warranty.followUpMonths)} মাস পর পর ফলো-আপ ও টিউনিং, এবং ${toBengaliDigits(SITE.warranty.years)} বছরের ওয়ারেন্টি। পূর্ণ কান পরীক্ষার ফি আলাদা — ${formatTaka(TEST_PACKAGE.fee)}।`
      : `${formatTaka(d.priceValue)}. That covers the audiologist's time, programming and verification, the ear mould, follow-up and re-tuning every ${SITE.warranty.followUpMonths} months, and a ${SITE.warranty.years}-year warranty. The full hearing assessment is separate at ${formatTaka(TEST_PACKAGE.fee)}.`,
  });

  if (d.formFactor) {
    items.push({
      question: bn
        ? `এটা কানে কীভাবে বসে? বাইরে থেকে দেখা যাবে?`
        : `How does it sit in the ear, and will people see it?`,
      answer: FORM_FACTOR[d.formFactor].long[lang],
    });
  }

  if (d.rechargeable !== undefined) {
    items.push({
      question: bn ? "ব্যাটারি না রিচার্জ?" : "Battery or rechargeable?",
      answer: d.rechargeable
        ? bn
          ? "এটি রিচার্জেবল — সাথে চার্জার থাকে, রাতে বসিয়ে রাখলে সারাদিন চলে। ছোট ব্যাটারি খোলা-লাগানোর ঝামেলা নেই, যা হাতে কাঁপুনি থাকলে বড় সুবিধা।"
          : "This one is rechargeable — the charger comes with it, and a night on the dock lasts the day. No fiddling with tiny cells, which matters a great deal if your hands are unsteady."
        : bn
          ? `এটি ব্যাটারিতে চলে। ব্যাটারি আমাদের এখানে পাওয়া যায় — এক পাতা ${formatTaka(250)}, তাতে ৬ পিস থাকে।`
          : `This one takes disposable batteries. We stock them — ${formatTaka(250)} a strip of six.`,
    });
  }

  if (d.power === "superpower" || d.power === "power") {
    items.push({
      question: bn
        ? "এটা কি বেশি ক্ষমতার মেশিন?"
        : "Is this one of the more powerful devices?",
      answer: bn
        ? "হ্যাঁ। কম শোনার মাত্রা বেশি হলে সাধারণ মেশিনে যথেষ্ট শব্দ পৌঁছায় না — তখন এই ধরনের মেশিন লাগে। এগুলো একটু বড় হয়, তবে ধরতেও সুবিধা হয়।"
        : "Yes. When the loss is deeper, an ordinary device cannot deliver enough sound without whistling. These are a little larger — which also makes them easier to handle.",
    });
  }

  items.push({
    question: bn
      ? "কিনে ফেলার আগে শুনে দেখা যাবে?"
      : "Can I hear it before buying?",
    answer: bn
      ? "যাবে। সেন্টারে এসে আপনার অডিওগ্রাম অনুযায়ী সেট করে কানে দিয়ে শুনতে পারবেন। তবে একবার বিক্রি হয়ে গেলে মেশিন ফেরত নেওয়া হয় না — তাই ওই বসাতেই ভালো করে শুনে, প্রশ্ন করে নিশ্চিত হয়ে নিন।"
      : "Yes. We programme it to your audiogram and you wear it in the centre. Do note that once sold a device is not taken back, so take your time in that sitting and ask everything you want to ask.",
  });

  return items;
}
