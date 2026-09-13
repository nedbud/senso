import Image from "next/image";
import { notFound } from "next/navigation";
import { formatTaka, SITE } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import { ProductJsonLd } from "@/components/ui/JsonLd";
import { WhatsAppButton, CallButton } from "@/components/ui/Buttons";
import { CheckIcon } from "@/components/ui/Icons";
import type { ProductInterface } from "@/routes/product";

type Product = ProductInterface["product"];

export default function ProductView({
  product,
  lang,
  slug,
}: {
  product: Product | null;
  lang: Lang;
  slug: string;
}) {
  if (!product) notFound();
  const d = dict(lang);
  const bn = lang === "bn";

  const display = product.name
    .replace(/\s*hearing aid price in bangladesh\s*$/i, "")
    .trim();

  const url = `${SITE.url}${lang === "en" ? "/en" : ""}/hearing-aids/${slug}`;
  const gallery = [product.avatar, ...(product.images ?? []).map((i) => i.path)]
    .filter((src) => typeof src === "string" && src.length > 20)
    .slice(0, 5);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <ProductJsonLd
        name={display}
        image={product.avatar}
        description={product.description}
        price={product.price}
        brand={product.brand}
        url={url}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-paper-surface">
            <Image
              src={gallery[0] || "/assets/Images/Common/senso_404_not_found.png"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-contain p-6"
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {gallery.slice(1).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg border border-line bg-paper-surface"
                >
                  <Image
                    src={src}
                    alt={`${product.name} — ${i + 2}`}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-display font-semibold text-[15px] text-brand">
            {product.brand} · {product.series}
          </p>
          <h1 className="text-[clamp(26px,5vw,36px)] text-ink">{display}</h1>

          <p className="num font-display text-4xl font-bold text-brand">
            {formatTaka(product.price)}
          </p>
          <p className="max-w-prose text-[17px] text-ink-2">
            {bn
              ? "দামের সাথে অডিওলজিস্টের সময়, মেশিন সেট করা ও যাচাই, ইয়ার মোল্ড, ফলো-আপে টিউনিং এবং ওয়ারেন্টি অন্তর্ভুক্ত। এই মডেলটি আপনার জন্য উপযুক্ত কি না তা অডিওগ্রামের পর নিশ্চিত হওয়া যাবে।"
              : "The price covers the audiologist's time, programming and verification, the ear mould, follow-up tuning and the warranty. Whether this model suits you is confirmed after the audiogram."}
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <WhatsAppButton
              message={d.wa.product(display)}
              label={d.products.askPrice}
              variant="brand"
            />
            <CallButton variant="outline" />
          </div>

          {product.warranty && (
            <dl className="mt-2 divide-y divide-line rounded-xl border border-line bg-paper-surface">
              <div className="flex gap-4 px-4 py-3">
                <dt className="w-32 shrink-0 font-display font-semibold text-ink">
                  {bn ? "ওয়ারেন্টি" : "Warranty"}
                </dt>
                <dd className="text-ink-2">{product.warranty}</dd>
              </div>
              {product.coverage && (
                <div className="flex gap-4 px-4 py-3">
                  <dt className="w-32 shrink-0 font-display font-semibold text-ink">
                    {bn ? "কভারেজ" : "Coverage"}
                  </dt>
                  <dd className="text-ink-2">{product.coverage}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>

      {product.description && (
        <section className="mt-10 max-w-prose">
          <h2 className="mb-3 text-2xl text-ink">
            {bn ? "এই মেশিনটি সম্পর্কে" : "About this device"}
          </h2>
          <p className="text-[17px] text-ink-2">{product.description}</p>
        </section>
      )}

      {product.features?.length > 0 && (
        <section className="mt-10 max-w-prose">
          <h2 className="mb-3 text-2xl text-ink">
            {bn ? "যা যা আছে" : "Features"}
          </h2>
          <ul className="flex flex-col gap-2">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon className="mt-1.5 h-[19px] w-[19px] shrink-0 text-brand" />
                <span className="text-[17px] text-ink-2">{f.value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
