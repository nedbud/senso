"use server";

import Index from "@/components/HearingAids/slug/Index";
import { getProduct } from "@/routes/product";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const productData = getProduct(params.slug);
  const product = await Promise.resolve(productData);

  return {
    title: product.data.name,
    description: product.data.description,
    keywords:
      product.data.description.split(" ") +
      product.data.description.split(".") +
      product.data.description,
    openGraph: {
      title: product.data.name,
      description: product.data.description,
      url: "https://sensohearingdhaka.com/hearing-aids/" + params.slug,
      siteName:
        "Senso Hearing Centre || Best Hearing centre in Dhaka, Bangladesh",
      images: [
        {
          url: product.data.avatar,
          width: 800,
          height: 600,
          alt: "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function HearingAids({ params }: Props) {
  const productData = getProduct(params.slug);
  const product = await Promise.resolve(productData);

  return (
    <div>
      <Index product={product.data} />
    </div>
  );
}
