import Image from "next/image";
import { type Lang } from "@/lib/i18n";

/** Service copy was six paragraphs of marketing English ("state-of-the-art",
 *  "cutting-edge"). Rewritten short, in both languages, saying what actually
 *  happens and who it is for. */
const SERVICES: {
  image: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}[] = [
  {
    image: "/assets/Images/Services/ear.gif",
    title: { bn: "কান পরীক্ষা", en: "Hearing test" },
    body: {
      bn: "PTA, Tympanometry ও Speech — তিনটি টেস্ট ও রিপোর্ট মিলিয়ে ৩৫ মিনিট, ফি ৳ 1,600। রিপোর্ট হাতে নিয়েই ডাক্তার দেখাতে পারবেন।",
      en: "PTA, tympanometry and speech — three tests and the report in 35 minutes, ৳ 1,600. You leave with it in hand.",
    },
  },
  {
    image: "/assets/Images/Services/options.gif",
    title: { bn: "কানে ভোঁ ভোঁ শব্দ (টিনিটাস)", en: "Tinnitus" },
    body: {
      bn: "কানে শোঁ শোঁ বা ভোঁ ভোঁ শব্দ হলে কারণ খুঁজে বের করা হয়, তারপর সাউন্ড থেরাপি ও পরামর্শ।",
      en: "We find the cause of the ringing first, then treat it with sound therapy and counselling.",
    },
  },
  {
    image: "/assets/Images/Services/otoplasty.gif",
    title: { bn: "ইয়ার মোল্ড তৈরি", en: "Ear moulds" },
    body: {
      bn: "আপনার কানের ছাঁচ নিয়ে নিজস্ব ল্যাবে তৈরি। ঠিকমতো না বসলে ভালো মেশিনও কাজ করে না।",
      en: "Cast from your own ear in our lab. Even a good device will not work if it does not seat properly.",
    },
  },
  {
    image: "/assets/Images/Services/gear.gif",
    title: { bn: "মেরামত ও সার্ভিসিং", en: "Repair and servicing" },
    body: {
      bn: "ReSound মেশিন, বিদেশ থেকে কেনা হলেও। নিজস্ব ল্যাবে সাধারণত ১ দিনে। ছবি পাঠালে আগেই বলে দিতে পারব যন্ত্রাংশ আছে কি না।",
      en: "ReSound devices, including ones bought abroad. Usually one day in our own lab. Send a photo and we can tell you in advance if we have the part.",
    },
  },
  {
    image: "/assets/Images/Services/shopping.gif",
    title: { bn: "ব্যাটারি ও যন্ত্রাংশ", en: "Batteries and parts" },
    body: {
      bn: "ব্যাটারি, ইয়ার হুক, টিউব, রিসিভার, ইয়ার প্লাগ। ঢাকার বাইরে কুরিয়ারে পাঠানো যায়।",
      en: "Batteries, ear hooks, tubing, receivers, ear plugs. We courier outside Dhaka.",
    },
  },
  {
    image: "/assets/Images/Services/supplies.gif",
    title: { bn: "মেশিন ফিটিং", en: "Fitting and verification" },
    body: {
      bn: "কানের ভেতরে আসলে কতটুকু শব্দ পৌঁছাচ্ছে সেটা মেপে দেখে সেট করা হয় — বাক্সের গায়ে কী লেখা তা দিয়ে নয়।",
      en: "We measure how much sound actually reaches the eardrum and set the device from that — not from what the box claims.",
    },
  },
];

export default function Service({ lang }: { lang: Lang }) {
  const heading = lang === "bn" ? "আমরা যা করি" : "What we do";

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-12 lg:px-8"
    >
      <h2 className="mb-6 text-[clamp(24px,4.6vw,31px)] text-ink">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.title.en}
            className="flex flex-col gap-2 rounded-xl border border-line bg-paper-surface p-5"
          >
            <Image
              src={s.image}
              alt=""
              width={56}
              height={56}
              unoptimized
              className="h-12 w-12"
            />
            <h3 className="font-display text-xl font-semibold text-ink">
              {s.title[lang]}
            </h3>
            <p className="text-[17px] text-ink-2">{s.body[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
