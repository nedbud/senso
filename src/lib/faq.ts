import type { Lang } from "./i18n";

/**
 * These replace the four questions that were previously on the site. Those
 * were copied from another company's website and still contained their name:
 * "Why do hearing aids at HearStore cost less?" — including a claim to be
 * "the most affordable in the Bangladesh" with a price-match guarantee that
 * was never Senso's offer.
 *
 * The replacements are the questions that actually arrive in the Facebook and
 * WhatsApp inbox, in the words people use. Each carries the romanised
 * phrasing too, because Google does not reliably map Banglish queries
 * ("kaner mesin er dam") onto Bangla-script content.
 */

export type FaqItem = {
  question: string;
  answer: string;
  /** romanised phrasing people type; rendered small under the answer */
  roman?: string;
};

export const FAQ: Record<Lang, FaqItem[]> = {
  bn: [
    {
      question: "কানের মেশিনের দাম কত?",
      answer:
        "মেশিনের ক্ষমতা ও ধরনের উপর দাম নির্ভর করে। প্রতিটি মডেলের দাম আমাদের ওয়েবসাইটে লেখা আছে — লুকানো নেই। কোনটা আপনার লাগবে তা ঠিক হবে কান পরীক্ষার পর, কারণ কম শোনার মাত্রা যত বেশি তত বেশি ক্ষমতার মেশিন লাগে।",
      roman: "Kaner mesin er dam koto — hearing aid price in Bangladesh",
    },
    {
      question: "আজকে কি খোলা আছে? সিরিয়াল লাগবে?",
      answer:
        "শনি থেকে বৃহস্পতিবার, সকাল ১০টা – রাত ৮টা। শুক্রবার বন্ধ। সিরিয়াল ছাড়াও আসতে পারেন, তবে দূর থেকে এলে আগে হোয়াটসঅ্যাপে জানিয়ে রাখলে অপেক্ষা করতে হবে না।",
      roman: "Ajke ki khola ache, serial dite hobe",
    },
    {
      question: "পরীক্ষা করাতে কত সময় লাগে? রিপোর্ট কবে পাব?",
      answer:
        "বড়দের পূর্ণাঙ্গ পরীক্ষা — PTA, Tympanometry ও Speech — করতে এবং রিপোর্ট দিতে মোট ৩৫ মিনিট। রিপোর্ট হাতে নিয়েই ডাক্তার দেখাতে পারবেন।",
      roman: "Report dite kotokkhon lage",
    },
    {
      question: "মেশিন ছাড়া কি সমাধান হয় না?",
      answer:
        "অনেক সময় হয়। বাংলাদেশে সবচেয়ে বেশি যে সমস্যা পাওয়া যায় তা কানে ময়লা জমা — সেটা পরিষ্কার করলেই শোনা ফিরে আসে। কানের পর্দায় ছিদ্র বা মধ্যকর্ণে পানি জমা থাকলে ENT ডাক্তারের চিকিৎসা লাগে, মেশিন নয়। পরীক্ষা না করে বলা যায় না — সেজন্যই আগে পরীক্ষা।",
    },
    {
      question: "ইন্ডিয়া বা বিদেশ থেকে কেনা মেশিন সার্ভিস করেন?",
      answer:
        "করি। ReSound হলে তো বটেই, অন্য ব্র্যান্ডের মেশিনও দেখি। মেশিনের ছবি পাঠিয়ে দিলে আগেই বলে দিতে পারব যন্ত্রাংশ আছে কি না।",
      roman: "India theke kena mesin service koren",
    },
    {
      question: "কানে মেশিন লাগালে কি মানুষ বুঝতে পারবে?",
      answer:
        "এখনকার মেশিন অনেক ছোট। কানের ভেতরে বসে যায় এমন মডেল আছে, যা বাইরে থেকে দেখা যায় না। তবে খেয়াল রাখবেন — সবচেয়ে ছোট মেশিন সবার জন্য উপযুক্ত নয়। কম শোনার মাত্রা বেশি হলে বা হাতে কাঁপুনি থাকলে একটু বড় মডেলই ভালো চলে।",
    },
    {
      question: "দুই কানেই লাগবে, নাকি একটাতে হবে?",
      answer:
        "দুই কানেই কম শুনলে দুইটাই লাগানো ভালো — শব্দ কোন দিক থেকে আসছে বোঝা যায়, আর ভিড়ের মধ্যে কথা বুঝতে অনেক সুবিধা হয়। তবে খরচের কারণে অনেকে একটা দিয়ে শুরু করেন, সেটাও চলে। অডিওগ্রাম দেখে আমরা পরামর্শ দেব।",
    },
    {
      question: "ভিড়ের মধ্যে বা বিয়েবাড়িতে কি ভালো শোনা যাবে?",
      answer:
        "সত্যি কথাটা বলি — কোনো মেশিনই ভিড়ের মধ্যে একদম স্বাভাবিক কানের মতো কাজ করে না, এটা এখনো সব ব্র্যান্ডেরই দুর্বল জায়গা। তবে ভালো মেশিন আর ঠিকভাবে সেট করা থাকলে পার্থক্যটা অনেক বড়।",
    },
  ],

  en: [
    {
      question: "How much does a hearing aid cost?",
      answer:
        "It depends on the power and the style. Every model's price is published on this site — nothing is hidden. Which one you need is decided after the hearing test, because the greater the loss, the more powerful the device has to be.",
      roman: "Kaner mesin er dam koto — কানের মেশিনের দাম",
    },
    {
      question: "Are you open today? Do I need an appointment?",
      answer:
        "Saturday to Thursday, 10 AM – 8 PM. Closed on Friday. You can walk in, but if you are coming from far away, message us on WhatsApp first and we will hold a slot so you are not left waiting.",
      roman: "Ajke ki khola ache — আজকে কি খোলা আছে",
    },
    {
      question: "How long does the test take? When do I get the report?",
      answer:
        "A full adult assessment — PTA, tympanometry and speech — takes 35 minutes including the report. You can walk straight on to the doctor with it in hand.",
      roman: "Report dite kotokkhon lage",
    },
    {
      question: "Is a hearing aid the only answer?",
      answer:
        "Often not. The most common finding in Bangladesh is simply impacted earwax, and clearing it brings the hearing back. A perforated eardrum or fluid in the middle ear needs an ENT doctor, not a device. None of this can be known without testing, which is why the test comes first.",
    },
    {
      question: "Do you service devices bought in India or abroad?",
      answer:
        "Yes. ReSound of course, but other brands as well. Send a photo of the device and we can tell you in advance whether we have the part.",
      roman: "India theke kena mesin service koren",
    },
    {
      question: "Will people be able to see it?",
      answer:
        "Modern devices are small, and some sit inside the ear canal where they cannot be seen at all. But be careful what you wish for — the smallest devices do not suit everyone. With more severe loss, or with unsteady hands, a slightly larger model works far better.",
    },
    {
      question: "Do I need one for both ears, or will one do?",
      answer:
        "If both ears have lost hearing, two is better — you can tell where sound is coming from, and following conversation in a crowd becomes much easier. Many people start with one because of the cost, and that is a reasonable place to begin. We will advise once we have seen the audiogram.",
    },
    {
      question: "Will I hear properly in a crowd, or at a wedding?",
      answer:
        "Honestly — no device performs like a normal ear in a crowd. That remains the weak spot across every brand. But a good device that has been properly programmed makes a very large difference.",
    },
  ],
};
