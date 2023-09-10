import React from "react";
import { getSeries } from "@/routes/product";
import ProductList from "@/components/HearingAids/List";
import Sorts from "@/components/HearingAids/Sorts";
import Collections from "@/components/HearingAids/Collections";
import MobileMenu from "@/components/HearingAids/MobileMenu";
import { Providers } from "@/redux/provider";

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
