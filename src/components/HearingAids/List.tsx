/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { ProductMapInterface } from "@/routes/product";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";

const ProductList = () => {
  let [products, setProducts] = useState([]);

  const series: string | number = useAppSelector(
    (state) => state.productSearchSlice.series
  );

  const best: boolean = useAppSelector(
    (state) => state.productSearchSlice.best
  );

  const trending: boolean = useAppSelector(
    (state) => state.productSearchSlice.trending
  );

  const latest: boolean = useAppSelector(
    (state) => state.productSearchSlice.latest
  );

  const sort: string = useAppSelector((state) => state.productSearchSlice.sort);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/products/series?series=${series}&best=${best}&leatest=${latest}&trending=${trending}&sort=${sort}`
    )
      .then((response) => response.json())
      .then((products) => setProducts(products.data));
  }, [series, latest, best, trending, sort]);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        {products &&
          products.map((item: ProductMapInterface, index: number) => (
            <Link
              href={"/hearing-aids/" + item.slug}
              key={index}
              className="hover:cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 border bg-gray-50 rounded-md shadow-sm p-2"
            >
              <img
                className="h-[230px] lg:h-[180px] w-[500px] rounded-md object-cover"
                src={item.image}
                alt={item.name}
              />
              <p className="text-[#CA0508] text-lg pt-2 font-bold">
                {item.name}
              </p>
              <p>{item.price.split(".")[0]} BDT</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
