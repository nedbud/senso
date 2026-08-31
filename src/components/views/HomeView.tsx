import Hero from "@/components/Home/heroSection";
import BestProducts from "@/components/Home/bestProductsSection";
import Service from "@/components/Home/serviceSection";
import Partners from "@/components/Home/partnerSection";
import FaqSection from "@/components/Home/faqSection";
import Contact from "@/components/Home/contactSection";
import { FaqJsonLd, ProductRangeJsonLd } from "@/components/ui/JsonLd";
import { getBestProducts, getProducts } from "@/routes/product";
import { FAQ } from "@/lib/faq";
import type { Lang } from "@/lib/i18n";

export default async function HomeView({ lang }: { lang: Lang }) {
  const [best, all] = await Promise.all([getBestProducts(), getProducts()]);

  const shown = best.length ? best : all.slice(0, 8);
  const prices = all
    .map((p) => parseFloat(p.price))
    .filter((n) => isFinite(n) && n > 0);

  return (
    <>
      <FaqJsonLd
        items={FAQ[lang].map((f) => ({ question: f.question, answer: f.answer }))}
      />
      {prices.length > 0 && (
        <ProductRangeJsonLd
          low={Math.round(Math.min(...prices))}
          high={Math.round(Math.max(...prices))}
          count={prices.length}
        />
      )}

      <Hero lang={lang} />
      <BestProducts products={shown} lang={lang} />
      <Service lang={lang} />
      <Partners lang={lang} />
      <FaqSection lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
