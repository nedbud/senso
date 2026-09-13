import Hero from "@/components/Home/heroSection";
import BestProducts from "@/components/Home/bestProductsSection";
import Service from "@/components/Home/serviceSection";
import TestsSection from "@/components/Home/testsSection";
import TeamSection from "@/components/Home/teamSection";
import Partners from "@/components/Home/partnerSection";
import FaqSection from "@/components/Home/faqSection";
import Contact from "@/components/Home/contactSection";
import { FaqJsonLd, ProductRangeJsonLd } from "@/components/ui/JsonLd";
import { getBestProducts, getProducts, priceStats } from "@/routes/product";
import { FAQ } from "@/lib/faq";
import { ACCESSORY_SERIES } from "@/routes/product";
import type { Lang } from "@/lib/i18n";

export default async function HomeView({ lang }: { lang: Lang }) {
  const [best, all] = await Promise.all([getBestProducts(), getProducts()]);

  // Fall back to the cheapest real devices if the CMS has nothing flagged
  // "best", so the homepage is never empty.
  const devices = all.filter((p) => !ACCESSORY_SERIES.includes(p.series));
  const shown = (best.length ? best : devices).slice(0, 12);
  const stats = priceStats(all);

  return (
    <>
      <FaqJsonLd
        items={FAQ[lang].map((f) => ({ question: f.question, answer: f.answer }))}
      />
      {stats && (
        <ProductRangeJsonLd low={stats.low} high={stats.high} count={stats.count} />
      )}

      <Hero lang={lang} />
      <BestProducts products={shown} lang={lang} />
      <TestsSection lang={lang} />
      <Service lang={lang} />
      <TeamSection lang={lang} />
      <Partners lang={lang} />
      <FaqSection lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
