import type { Metadata } from "next";
import ProductView from "@/components/views/ProductView";
import { getProduct, getProducts } from "@/routes/product";
import { formatTaka, altLanguages } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getProduct(params.slug);
  const product = res?.data;
  if (!product) return { title: "Not found" };

  const display = product.name
    .replace(/\s*hearing aid price in bangladesh\s*$/i, "")
    .trim();

  return {
    title: `${display} — ${formatTaka(product.price)}`,
    description:
      product.description?.slice(0, 300) ||
      `${display}. ReSound hearing aid, ${formatTaka(product.price)}. Senso Hearing Centre, Panthapath, Dhaka.`,
    alternates: {
      canonical: `/en/hearing-aids/${params.slug}`,
      languages: altLanguages(
        `/hearing-aids/${params.slug}`,
        `/en/hearing-aids/${params.slug}`
      ),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: display,
      description: product.description?.slice(0, 300),
      images: product.avatar ? [{ url: product.avatar }] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const res = await getProduct(params.slug);
  return <ProductView product={res?.data ?? null} lang="en" slug={params.slug} />;
}
