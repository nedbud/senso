import Index from "@/components/HearingAids/slug/Index";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/products/seo/${id}`
  ).then((res) => res.json());

  return {
    title: "demo",
    description: product?.data?.description,
    keywords:
      product?.data?.description.split(" ") +
      product?.data?.description.split("."),
    openGraph: {
      title: product?.data?.name,
      description: product?.data?.description,
      url: "https://sensohearingdhaka.com/hearing-aids/" + id,
      siteName:
        "Senso Hearing Centre || Best Hearing centre in Dhaka, Bangladesh",
      images: [
        {
          url: product?.data?.avatar,
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
  return (
    <div>
      <Index params={params.slug} />
    </div>
  );
}
