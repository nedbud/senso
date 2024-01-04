import React from "react";
import { getSeries } from "@/routes/product";
import ProductList from "@/components/HearingAids/List";
import Sorts from "@/components/HearingAids/Sorts";
import Collections from "@/components/HearingAids/Collections";
import MobileMenu from "@/components/HearingAids/MobileMenu";
import { Providers } from "@/redux/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
  keywords: [
    "hearing",
    "aids aid",
    "aids hearing",
    "hearing aid",
    "hearing aids",
    "hearing aid in bangladesh",
    "hearing aid in bd",
    "hearing aid price in bangladesh",
    "hearing aid price in bd",
    "hearing aid price",
    "hearing care in dhaka",
    "hearing centre in near me",
    "medical equipment price",
    "medical equipment price in bangladesh",
    "which hearing aids",
    "about hearing aids",
    "aids for hearing",
    "where to get hearing aids what is hearing aids",
    "what is a hearing aids hearing aids hearing aids",
    "for hearing aids",
    "hearing aids",
    "what are hearing aids",
    "aid hearing",
    "which hearing aid",
    "the hearing aid",
    "what is hearing aid",
    "hearing aid in",
    "hearing aid",
    "what is an hearing aid",
    "what is a hearing aid",
    "a hearing aid",
    "compare prices",
    "hearing loss",
    "hearing impaired",
    "hearing devices",
    "hearingaids",
    "hearing aid devices hearingaid",
    "resound",
    "hearing device",
    "re sound",
    "hearing aid device",
    "test hearing",
    "where can i get a hearing test how to test hearing",
  ],
  verification: {
    google: "D7V9ovCzKzcomUagIaPLjeDIrdnGWmw01YTBshq8gYY",
  },
  openGraph: {
    title: "Products || Senso Hearing Centre",
    description:
      "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
    url: "https://sensohearingdhaka.com/hearing-aids",
    siteName:
      "Senso Hearing Centre || Best Hearing centre in Dhaka, Bangladesh",
    images: [
      {
        url: "https://sensohearingdhaka.com/assets/Images/Common/bg.jpg",
        width: 800,
        height: 600,
        alt: "Senso hearing centre is the best hearing centre in Bangladesh. Senso Hearing Centre, Dhaka is one of the largest and reputed Hearing centre in Bangladesh. We pride our self at this side for 15 years. We assure your best hearing healthcare. We offer good price range of hearing aids in Bangladesh.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  manifest: "./manifest.webmanifest",
  category: "Hearing Aids Shop",
};

const sorts = [
  {
    name: "Best Selling",
    slug: "best",
  },
  {
    name: "Trending",
    slug: "trending",
  },
  {
    name: "Latest Arrivals",
    slug: "leatest",
  },
  {
    name: "Price: Low to High",
    slug: "asc",
  },
  {
    name: "Price: High to Low",
    slug: "desc",
  },
];

export default async function HearingAids() {
  const seriesData = getSeries();
  const series = await Promise.resolve(seriesData);

  return (
    <Providers>
      <div className="mt-24 mx-auto max-w-7xl px-4 py-2 lg:py-8">
        <div className="grid grid-cols-12 gap-4">
          <MobileMenu series={series.data} sorts={sorts} />
          <aside className="hidden lg:block col-span-2">
            <div className="sticky top-24">
              <Collections series={series.data} />
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-8">
            <ProductList />
          </div>
          <aside className="hidden lg:block col-span-2 ">
            <Sorts sorts={sorts} />
          </aside>
        </div>
      </div>
    </Providers>
  );
}
