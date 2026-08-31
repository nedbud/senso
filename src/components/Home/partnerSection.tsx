import Image from "next/image";
import { SITE } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";

/**
 * The distributor listing is the one claim no competitor in this market can
 * make or copy, and it is verifiable on ReSound's own site rather than on
 * ours. It is stated with the link rather than asserted with a logo.
 */
export default function Partners({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const bn = lang === "bn";

  return (
    <section className="bg-paper-2 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 lg:px-8">
        <h2 className="text-[clamp(24px,4.6vw,31px)] text-ink">
          {bn ? "ReSound-এর বাংলাদেশ পরিবেশক" : "ReSound's distributor for Bangladesh"}
        </h2>
        <p className="max-w-prose text-xl text-ink-2">
          {bn ? (
            <>
              ডেনমার্কের ReSound (GN) তাদের নিজেদের ওয়েবসাইটে বাংলাদেশের পরিবেশক
              হিসেবে যে প্রতিষ্ঠানের নাম দিয়েছে সেটি —{" "}
              <strong className="text-ink">{SITE.distributor.entity}</strong>।
              আমাদের কথা আমাদের কাছ থেকে না শুনে ReSound-এর কাছ থেকেই যাচাই করে নিন।
            </>
          ) : (
            <>
              On ReSound&apos;s own website, the company listed as their
              Bangladesh distributor is{" "}
              <strong className="text-ink">{SITE.distributor.entity}</strong>.
              Do not take our word for it — check it with ReSound.
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-6">
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
            href={SITE.distributor.proofUrl}
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
