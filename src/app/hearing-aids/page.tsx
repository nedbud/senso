import React from "react";
import { getProducts } from "@/routes/product";
import ProductList from "@/components/HearingAids/List";

// const sorts = [
//   {
//     name: "Best Selling",
//     slug: "all",
//   },
//   {
//     name: "Trending",
//     slug: "resound-one",
//   },
//   {
//     name: "Latest Arrivals",
//     slug: "all",
//   },
//   {
//     name: "Price: Low to High",
//     slug: "all",
//   },
//   {
//     name: "Price: High to Low",
//     slug: "all",
//   },
// ];

export default async function HearingAids() {
  const productsData = getProducts();
  const products = await Promise.resolve(productsData);

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
            <ProductList products={products.data} />
          </div>
          <aside className="hidden lg:block col-span-2 ">
            {/* <Sorts sorts={sorts} /> */}
          </aside>
        </div>
      </div>
    </div>
  );
}
