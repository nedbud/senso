"use client";

import { useGetProductsQuery } from "@/redux/features/products/products.api";
import { useGetSeriesQuery } from "@/redux/features/series/series.api";
import React from "react";
import ProductList from "@/components/HearingAids/List";
import Collections from "@/components/HearingAids/Collections";
import Sorts from "@/components/HearingAids/Sorts";
import MobileMenu from "@/components/HearingAids/MobileMenu";

const sorts = [
  {
    name: "Best Selling",
    slug: "all",
  },
  {
    name: "Trending",
    slug: "resound-one",
  },
  {
    name: "Latest Arrivals",
    slug: "all",
  },
  {
    name: "Price: Low to High",
    slug: "all",
  },
  {
    name: "Price: High to Low",
    slug: "all",
  },
];

export default function HearingAids() {
  const { data: products, isLoading: productsLoading } =
    useGetProductsQuery("");
  const { data: series, isLoading: seriesLoading } = useGetSeriesQuery("");

  return (
    <div>
      <div className="mt-24 mx-auto max-w-7xl px-4 py-2 lg:py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* <MobileMenu series={series} sorts={sorts} /> */}
          <aside className="hidden lg:block col-span-2">
            <div className="sticky top-24">
              {/* <Collections series={series} loading={seriesLoading} /> */}
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-8">
            <ProductList products={products} loading={productsLoading} />
          </div>
          <aside className="hidden lg:block col-span-2 ">
            {/* <Sorts sorts={sorts} /> */}
          </aside>
        </div>
      </div>
    </div>
  );
}
