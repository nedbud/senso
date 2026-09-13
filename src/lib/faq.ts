import type { Lang } from "./i18n";

/**
 * Answers are Senso's own, from the information form returned 31 Aug 2026.
 * Where the form contradicts what the site used to imply, the form wins —
 * several answers here correct earlier drafts:
 *
 *   - Senso services ReSound only, not Signia/Phonak/Oticon.
 *   - There is no instalment/EMI facility.
 *   - Sold devices are not taken back; the trial happens in the centre.
 *   - Only PTA, tympanometry and SRT are offered — not OAE or BERA.
 *
 * These replace four questions copied from another company's website, which
 * still named HearStore and promised a price match that was never Senso's.
 *
 * Each carries the romanised phrasing too, because Google does not reliably
 * map Banglish queries ("kaner mesin er dam") onto Bangla-script content.
 */

export type FaqItem = { question: string; answer: string; roman?: string };

export const FAQ: Record<Lang, FaqItem[]> = {
  bn: [
    {
      question: "কানের মেশিনের দাম কত?",
      answer:
        "৳ 30,000 থেকে শুরু। সাধারণ রেঞ্জ ৳ 30,000 – ৳ 300,000; রিচার্জেবল ৳ 110,000 থেকে, কানের ভেতরে বসে এমন (CIC) ৳ 45,000 থেকে। প্রতিটি মডেলের আলাদা দাম ওয়েবসাইটে লেখা আছে। কোনটা আপনার লাগবে তা ঠিক হয় কান পরীক্ষার পর।",
      roman: "Kaner mesin er dam koto — hearing aid price in Bangladesh",
    },
    {
      question: "কান পরীক্ষার খরচ কত? কত সময় লাগে?",
      answer:
        "PTA ৳ 800 (২৫ মিনিট), Tympanometry ৳ 400 (৫ মিনিট), Speech/SRT ৳ 400 (৫ মিনিট)। তিনটি একসাথে করালে ৳ 1,600, মোট ৩৫ মিনিট। রিপোর্ট কিছুক্ষণের মধ্যেই হাতে পাবেন। টেস্টগুলো ৫ বছরের বেশি বয়সীদের জন্য; শিশুদের জন্য আলাদা ব্যবস্থা আছে।",
      roman: "Kan porikkhar khoroch — hearing test price dhaka",
    },
    {
      question: "আজকে কি খোলা আছে? সিরিয়াল লাগবে?",
      answer:
        "শনি থেকে বৃহস্পতিবার, সকাল ১০টা – রাত ৮টা। শুক্রবার ও সরকারি ছুটিতে বন্ধ। সিরিয়াল আগে নিয়ে আসাই ভালো — সিরিয়াল ছাড়া এলে গড়ে ২ ঘণ্টা পর্যন্ত অপেক্ষা করতে হতে পারে। ফোনে বা হোয়াটসঅ্যাপে সিরিয়াল নেওয়া যায়।",
      roman: "Ajke ki khola ache, serial dite hobe",
    },
    {
      question: "ডাক্তারের প্রেসক্রিপশন ছাড়া টেস্ট করা যায়?",
      answer:
        "যায়। আমাদের অডিওলজিস্ট আপনার সমস্যা ও লক্ষণ দেখে চেকআপ করে বলে দেবেন কোন টেস্টটা লাগবে। প্রেসক্রিপশন থাকলে ছবি তুলে হোয়াটসঅ্যাপে পাঠিয়ে দিতে পারেন।",
    },
    {
      question: "কেনার আগে মেশিন পরে দেখা যায়?",
      answer:
        "যায়। সেন্টারে এসে সাথে সাথেই মেশিন কানে দিয়ে শুনে দেখতে পারবেন — অডিওগ্রাম অনুযায়ী সেট করে দেওয়া হয়। তবে খেয়াল রাখবেন, একবার কিনে নেওয়ার পর মেশিন ফেরত নেওয়া হয় না। তাই কেনার আগেই ভালো করে শুনে, প্রশ্ন করে নিশ্চিত হয়ে নিন।",
    },
    {
      question: "ওয়ারেন্টি কত দিনের? কী কী কভার হয়?",
      answer:
        "মেশিনে ২ বছর, যন্ত্রাংশে ১ বছর। ভেঙে গেলে, আগুনে পুড়লে, ছিঁড়ে গেলে বা পানিতে ভিজে নষ্ট হলে ওয়ারেন্টির আওতায় পড়বে না। কেনার পর প্রতি ৪ মাসে একবার বিনামূল্যে ফলো-আপ ও টিউনিং করা হয়।",
    },
    {
      question: "কিস্তিতে নেওয়া যায়?",
      answer:
        "এখন কিস্তির ব্যবস্থা নেই। তবে সব ধরনের কার্ড, বিকাশ এবং বাংলা QR-এ পেমেন্ট নেওয়া হয়।",
      roman: "Kisti te neya jay, EMI ache",
    },
    {
      question: "বিদেশ থেকে কেনা মেশিন সার্ভিস করেন?",
      answer:
        "ReSound মেশিন হলে করি — বিদেশ থেকে কেনা হলেও। আমাদের নিজস্ব ল্যাবে সাধারণত ১ দিনেই হয়ে যায়; ওভারসিজ পাঠাতে হলে ৬–৮ সপ্তাহ লাগে। ব্যাটারি ও যন্ত্রাংশ কুরিয়ারে পাঠানো যায়। আমরা শুধু ReSound-এর ডিলার, তাই Signia, Phonak বা Oticon মেশিন আমরা দেখি না।",
      roman: "Bidesh theke kena mesin service koren",
    },
    {
      question: "ঢাকার বাইরে থেকে এলে এক দিনে সব হবে?",
      answer:
        "হবে, তবে সকাল ১০টার মধ্যে অফিসে পৌঁছাতে হবে এবং আগের দিন সিরিয়াল নিশ্চিত করে আসতে হবে। টেস্ট থেকে ফিটিং পর্যন্ত ৩–৪ ঘণ্টা লাগে। ঢাকার বাইরে আমাদের নিজস্ব শাখা নেই, তবে ডিলার পয়েন্ট আছে।",
      roman: "Dhakar baire theke ashle ek dine hobe",
    },
    {
      question: "কানে মেশিন লাগালে কি মানুষ বুঝতে পারবে?",
      answer:
        "এখনকার মেশিন অনেক ছোট। কানের ভেতরে বসে যায় এমন মডেল (CIC) আছে ৳ 45,000 থেকে, যা বাইরে থেকে দেখা যায় না। তবে সবচেয়ে ছোট মেশিন সবার জন্য উপযুক্ত নয় — কম শোনার মাত্রা বেশি হলে বা হাতে কাঁপুনি থাকলে একটু বড় মডেলই ভালো চলে।",
    },
    {
      question: "ভিড়ের মধ্যে বা বিয়েবাড়িতে কি ভালো শোনা যাবে?",
      answer:
        "সত্যি কথাটা বলি — কোনো মেশিনই ভিড়ের মধ্যে একদম স্বাভাবিক কানের মতো কাজ করে না, এটা এখনো সব ব্র্যান্ডেরই দুর্বল জায়গা। তবে ভালো মেশিন আর ঠিকভাবে সেট করা থাকলে পার্থক্যটা অনেক বড়। সেন্টারে এসে শুনে দেখলেই বুঝবেন।",
    },
  ],

  en: [
    {
      question: "How much does a hearing aid cost?",
      answer:
        "From ৳ 30,000. The usual range is ৳ 30,000 – ৳ 300,000; rechargeable models start around ৳ 110,000 and in-the-canal (CIC) models around ৳ 45,000. Every model's own price is listed on this site. Which one you need is decided after the hearing test.",
      roman: "Kaner mesin er dam koto — কানের মেশিনের দাম",
    },
    {
      question: "What does a hearing test cost, and how long does it take?",
      answer:
        "PTA ৳ 800 (25 minutes), tympanometry ৳ 400 (5 minutes), speech/SRT ৳ 400 (5 minutes). All three together cost ৳ 1,600 and take 35 minutes. You get the report within minutes. These tests are for ages 5 and up; there is a separate arrangement for younger children.",
      roman: "Kan porikkhar khoroch — hearing test price dhaka",
    },
    {
      question: "Are you open today? Do I need an appointment?",
      answer:
        "Saturday to Thursday, 10 AM – 8 PM. Closed on Friday and on government holidays. Booking ahead is better — without an appointment the wait averages up to two hours. You can book by phone or on WhatsApp.",
      roman: "Ajke ki khola ache — আজকে কি খোলা আছে",
    },
    {
      question: "Can I be tested without a doctor's prescription?",
      answer:
        "Yes. Our audiologist examines you and, based on your symptoms, decides which tests you need. If you do have a prescription, photograph it and send it on WhatsApp.",
    },
    {
      question: "Can I try a device before buying?",
      answer:
        "Yes. You can wear one in the centre straight away, programmed to your audiogram. Do note that once a device is sold it cannot be returned, so take your time, ask questions and be sure before you buy.",
    },
    {
      question: "What warranty is there, and what does it cover?",
      answer:
        "Two years on the device, one year on accessories. Physical damage, fire, tearing and water damage are not covered. After purchase you get a free follow-up and re-tuning every four months.",
    },
    {
      question: "Can I pay in instalments?",
      answer:
        "There is no instalment facility at present. All cards, bKash and Bangla QR payments are accepted.",
      roman: "Kisti te neya jay, EMI ache",
    },
    {
      question: "Do you service devices bought abroad?",
      answer:
        "ReSound devices, yes — including ones bought abroad. Most repairs are done in our own lab within a day; anything that has to go overseas takes six to eight weeks. Batteries and parts can be couriered. We are a ReSound dealer only, so we do not service Signia, Phonak or Oticon.",
      roman: "Bidesh theke kena mesin service koren",
    },
    {
      question: "Coming from outside Dhaka — can it all be done in one day?",
      answer:
        "Yes, if you reach the centre by 10 AM and confirm your appointment the day before. Testing through to fitting takes three to four hours. We have no branches outside Dhaka, but there are dealer points.",
      roman: "Dhakar baire theke ashle ek dine hobe",
    },
    {
      question: "Will people be able to see it?",
      answer:
        "Modern devices are small. In-the-canal models start around ৳ 45,000 and cannot be seen from outside. But the smallest device does not suit everyone — with more severe loss, or with unsteady hands, a slightly larger model works far better.",
    },
    {
      question: "Will I hear properly in a crowd, or at a wedding?",
      answer:
        "Honestly — no device performs like a normal ear in a crowd. That remains the weak spot across every brand. But a good device that has been properly programmed makes a very large difference. Come in and hear it for yourself.",
    },
  ],
};
