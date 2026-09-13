import Link from "next/link";
import { SITE, telLink } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * The privacy notice.
 *
 * Written to be read, not to be survived. Bangladesh's data protection law
 * asks a controller to tell people six things — what is collected, why, who
 * else sees it, how long it is kept, how to say stop, and who to ask — and a
 * notice that buries those under two pages of "we value your privacy" fails
 * the point of the rule even where it satisfies the letter. Consent nobody
 * read is not consent.
 *
 * So: short sentences, the actual answers, and no promise this clinic cannot
 * keep. Every claim below is true of the code as it stands. If the code
 * changes — a new analytics tag, a transcript store switched on, images kept
 * on disk — this page changes in the same commit or it becomes a lie.
 */

type Block = { h: string; p: string[] };

const BN: { title: string; intro: string; blocks: Block[]; updated: string } = {
  title: "গোপনীয়তা ও তথ্য",
  intro:
    "এই পাতায় লেখা আছে আমরা আপনার কী কী তথ্য নিই, কেন নিই, কোথায় রাখি, কতদিন রাখি, আর আপনি না চাইলে কী করবেন। সোজা কথায় লেখার চেষ্টা করেছি।",
  updated: "সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬",
  blocks: [
    {
      h: "কী কী নিই",
      p: [
        "আপনি চ্যাটে যা লেখেন — প্রশ্ন, সমস্যার বর্ণনা, যা কিছু।",
        "প্রেসক্রিপশন, রিপোর্ট বা মেশিনের ছবি, যদি আপনি পাঠান।",
        "সিরিয়াল নিতে চাইলে: আপনার নাম আর ফোন নম্বর। রোগীর বয়স ১৮-র নিচে হলে অভিভাবকের নাম।",
        "এর বাইরে কিছু চাই না। ইমেইল, ঠিকানা, জাতীয় পরিচয়পত্র — কোনোটাই না।",
      ],
    },
    {
      h: "কেন নিই",
      p: [
        "আপনার প্রশ্নের উত্তর দিতে, আর সিরিয়াল বসাতে। এই দুটোই।",
        "বিজ্ঞাপনের জন্য নয়। কারো কাছে বিক্রি করি না, কারো সাথে ভাগ করি না।",
      ],
    },
    {
      h: "কোথায় যায়",
      p: [
        "নাম, ফোন আর সিরিয়াল যায় সেনসোর নিজের সিস্টেমে। শুধু আমাদের লোকজন দেখেন।",
        "চ্যাটের লেখা আর ছবি পড়ার জন্য আমরা Google-এর একটি সেবা ব্যবহার করি, যার সার্ভার বাংলাদেশের বাইরে। ছবি পড়া হয়, উত্তর দেওয়া হয়, তারপর আমরা সেটা কোথাও জমা রাখি না।",
        "প্রেসক্রিপশনে সাধারণত নাম, বয়স আর রোগের কথা লেখা থাকে। তাই ছবি পাঠানোর আগে এটুকু জেনে রাখা দরকার — আর না পাঠাতে চাইলে লিখে বললেও আমরা একইভাবে সাহায্য করব।",
      ],
    },
    {
      h: "কতদিন থাকে",
      p: [
        "ছবি কোথাও জমা রাখা হয় না — পড়া হয়, উত্তর দেওয়া হয়, ব্যস।",
        "চ্যাটের কথা শুধু আপনার নিজের ব্রাউজারে থাকে, যতক্ষণ ট্যাবটা খোলা। আমাদের সার্ভারে চ্যাট জমা হয় না।",
        "সিরিয়ালের সাথে আপনি যে সমস্যার কথা লিখেছিলেন, সেটা ১৮০ দিন পরে মুছে ফেলা হয়। সিরিয়ালের হিসাবটা থাকে, কারণ সেটা ক্লিনিকের খাতার অংশ।",
        "যে সিরিয়াল কখনো নিশ্চিত হয়নি আর দিনটাও পেরিয়ে গেছে, সেটা ৯০ দিন পরে মুছে যায়।",
        "আপনি যদি সেনসোর রোগী হয়ে থাকেন, আপনার রোগীর রেকর্ড হিসাব-নিকাশের নিয়ম অনুযায়ী রাখতে হয় — সেটা এই ওয়েবসাইটের ব্যাপার নয়।",
      ],
    },
    {
      h: "শিশুদের বেলায়",
      p: [
        "১৮ বছরের নিচে কারো পরীক্ষার সিরিয়াল তার বাবা-মা বা অভিভাবক নেবেন, আর আমরা তাঁর নামটা লিখে রাখি।",
        "শিশুর জন্মতারিখ আমরা চাই না।",
      ],
    },
    {
      h: "আপনি না চাইলে",
      p: [
        "ছবি না পাঠিয়ে শুধু লিখেও সব জানতে পারবেন।",
        "আপনার তথ্য মুছে দিতে বললে মুছে দেব। ফোন করে বা ইমেইল করে বললেই হবে।",
        "কী কী আছে জানতে চাইলে বলুন, দেখিয়ে দেব।",
      ],
    },
    {
      h: "যা আমরা করি না",
      p: [
        "আপনাকে ইন্টারনেটে অনুসরণ করার কোনো ট্র্যাকার এই সাইটে নেই।",
        "আপনার তথ্য দিয়ে কোনো বিজ্ঞাপন দেখানো হয় না।",
        "নাতি ডাক্তার নয় — রোগ নির্ণয় করে না, ওষুধ নিয়ে কথা বলে না।",
      ],
    },
  ],
};

const EN: { title: string; intro: string; blocks: Block[]; updated: string } = {
  title: "Privacy",
  intro:
    "What we collect, why, where it goes, how long we keep it, and what to do if you would rather we did not. Written plainly on purpose.",
  updated: "Last updated: September 2026",
  blocks: [
    {
      h: "What we collect",
      p: [
        "Whatever you write in the chat — your question, your description of the problem.",
        "Photographs of a prescription, a report or a device, if you send one.",
        "To book: your name and phone number. If the patient is under 18, the guardian's name as well.",
        "Nothing else. No email address, no home address, no ID number.",
      ],
    },
    {
      h: "Why",
      p: [
        "To answer you, and to book your appointment. That is all.",
        "Not for advertising. We do not sell it and we do not share it.",
      ],
    },
    {
      h: "Where it goes",
      p: [
        "Your name, number and appointment go into Senso's own system, seen only by our staff.",
        "To read your messages and photographs we use a service from Google, whose servers are outside Bangladesh. The image is read, you get an answer, and we keep no copy of it.",
        "A prescription usually carries a name, an age and a diagnosis, so this is worth knowing before you send one — and if you would rather not, type it out instead and we will help you just the same.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "Photographs are never stored. They are read, answered, and gone.",
        "The conversation stays in your own browser while the tab is open. We do not store chats on our servers.",
        "Whatever you told us about your symptoms when booking is deleted after 180 days. The appointment itself stays, because it is part of the clinic's records.",
        "An appointment that was never confirmed, for a day that has passed, is deleted after 90 days.",
        "If you are a patient here, your clinical and billing records are kept as the accounting rules require. That is separate from this website.",
      ],
    },
    {
      h: "Children",
      p: [
        "An appointment for anyone under 18 is made by their parent or guardian, and we record that person's name.",
        "We do not ask for a child's date of birth.",
      ],
    },
    {
      h: "If you would rather not",
      p: [
        "You can ask everything by typing, without sending a photograph.",
        "Ask us to delete your details and we will. A phone call or an email is enough.",
        "Ask what we hold about you and we will show you.",
      ],
    },
    {
      h: "What we do not do",
      p: [
        "There is no tracker on this site following you around the internet.",
        "Your details are not used to show you advertising.",
        "Naati is not a doctor. It does not diagnose and it does not discuss medication.",
      ],
    },
  ],
};

export default function PrivacyView({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const c = bn ? BN : EN;

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl text-ink">{c.title}</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">{c.intro}</p>

      <div className="mt-10 flex flex-col gap-9">
        {c.blocks.map((block) => (
          <section key={block.h}>
            <h2 className="mb-3 font-ui text-xl font-semibold text-ink">{block.h}</h2>
            <div className="flex flex-col gap-2.5">
              {block.p.map((line) => (
                <p key={line} className="max-w-prose leading-relaxed text-ink-2">
                  {line}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="mb-3 font-ui text-xl font-semibold text-ink">
            {bn ? "কার সাথে কথা বলবেন" : "Who to ask"}
          </h2>
          <div className="flex flex-col gap-2.5 text-ink-2">
            <p className="max-w-prose leading-relaxed">
              {bn
                ? "তথ্য নিয়ে কিছু জানার বা মোছার থাকলে সেনসো হিয়ারিং সেন্টারে বলুন:"
                : "For anything about your data, including deleting it, contact Senso Hearing Centre:"}
            </p>
            <p>
              <a href={telLink(SITE.phones[0])} className="num font-ui text-brand underline">
                {SITE.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="font-ui text-brand underline">
                {SITE.email}
              </a>
            </p>
            <p className="max-w-prose leading-relaxed">
              {bn ? SITE.address.lineBn : SITE.address.line},{" "}
              {bn
                ? `${SITE.address.cityBn}-${SITE.address.postcode}`
                : `${SITE.address.city}-${SITE.address.postcode}`}
            </p>
          </div>
        </section>
      </div>

      <p className="mt-12 border-t border-line pt-5 text-sm text-ink-muted">{c.updated}</p>

      <p className="mt-3 text-sm">
        <Link href={bn ? "/" : "/en"} className="font-ui text-brand underline">
          {bn ? "← সাইটে ফিরে যান" : "← Back to the site"}
        </Link>
      </p>
    </article>
  );
}
