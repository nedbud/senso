import Image from "next/image";
import { SITE } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";

/**
 * Senso answered "authorised dealer" on the information form, not the
 * "exclusive distributor" their Messenger replies have sometimes claimed.
 * The accurate word is used, because the thing that actually carries weight
 * here is that it can be checked on ReSound's own site — which is exactly
 * what the competitors claiming brand partnerships cannot offer.
 */
export default function Partners({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const bn = lang === "bn";

  return (
    <section className="bg-paper-2 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 lg:px-8">
        <h2 className="text-[clamp(24px,4.6vw,31px)] text-ink">
          {bn ? "ReSound-এর অনুমোদিত ডিলার" : "An authorised ReSound dealer"}
        </h2>

        <p className="max-w-prose text-xl text-ink-2">
          {bn ? (
            <>
              আমরা ডেনমার্কের ReSound (GN)-এর অনুমোদিত ডিলার। ReSound তাদের
              নিজেদের ওয়েবসাইটে বাংলাদেশের তালিকায়{" "}
              <strong className="text-ink">{SITE.dealer.entity}</strong> রেখেছে —
              আমাদের কথা আমাদের কাছ থেকে না শুনে ওখানেই যাচাই করে নিন।
            </>
          ) : (
            <>
              We are an authorised dealer for ReSound (GN, Denmark). ReSound
              lists{" "}
              <strong className="text-ink">{SITE.dealer.entity}</strong> for
              Bangladesh on their own website — check it there rather than
              taking our word for it.
            </>
          )}
        </p>

        <ul className="flex flex-col gap-1.5 text-[17px] text-ink-2">
          <li>
            {bn
              ? `ট্রেড লাইসেন্স: ${SITE.tradeLicence}`
              : `Trade licence: ${SITE.tradeLicence}`}
          </li>
          <li>
            {bn
              ? `যেসব হাসপাতালের সাথে কাজ: ${SITE.hospitals.join(", ")}`
              : `We work with: ${SITE.hospitals.join(", ")}`}
          </li>
          <li>
            {bn
              ? "আমরা শুধু ReSound-এর ডিলার — অন্য ব্র্যান্ড বিক্রি বা সার্ভিস করি না।"
              : "We deal in ReSound only — we do not sell or service other brands."}
          </li>
        </ul>

        <div className="flex flex-wrap items-center gap-6 pt-1">
          <div className="rounded-lg border border-line bg-paper-surface p-4">
            <Image
              src="/assets/Images/Partner/p1.png"
              alt="ReSound GN"
              width={200}
              height={80}
              className="h-12 w-auto object-contain"
            />
          </div>
          <a
            href={SITE.dealer.proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-brand underline"
          >
            {d.common.verify}
          </a>
        </div>
      </div>
    </section>
  );
}
