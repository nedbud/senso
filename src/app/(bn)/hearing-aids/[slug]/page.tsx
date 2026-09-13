import type { Metadata } from "next";
import ProductView from "@/components/views/ProductView";
import { getProduct, getProducts, getProductsOrFail } from "@/routes/product";
import { getCopy } from "@/routes/siteCopy";
import { formatTaka, altLanguages } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const products = await getProductsOrFail();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getProduct(params.slug);
  const product = res?.data;
  if (!product) return { title: "Not found" };

  const display = product.name
    .replace(/\s*hearing aid price in bangladesh\s*$/i, "")
    .trim();

  // The old version built `keywords` by concatenating
  // description.split(" ") + description.split(".") + description, which
  // produced one enormous comma-joined string. Google has ignored the
  // keywords tag since 2009; the description is what matters.
  return {
    title: `${display} — ${formatTaka(product.price)}`,
    description:
      product.description?.slice(0, 300) ||
      `${display}. ReSound কানের মেশিন, দাম ${formatTaka(product.price)}। সেনসো হিয়ারিং সেন্টার, পান্থপথ, ঢাকা।`,
    alternates: {
      canonical: `/hearing-aids/${params.slug}`,
      languages: altLanguages(
        `/hearing-aids/${params.slug}`,
        `/en/hearing-aids/${params.slug}`
      ),
    },
    openGraph: {
      type: "website",
      title: display,
      description: product.description?.slice(0, 300),
      images: product.avatar ? [{ url: product.avatar }] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  // The product page shows nearby devices, so it needs the catalogue as
  // well as the product. Both fetches are revalidated hourly and the list
  // is the same one every other page asks for, so this is one cache read.
  const [res, catalogue, copy] = await Promise.all([
    getProduct(params.slug),
    getProducts(),
    getCopy(),
  ]);
  return (
    <ProductView
      product={res?.data ?? null}
      catalogue={catalogue}
      lang="bn"
      slug={params.slug}
      copy={copy}
    />
  );
}
