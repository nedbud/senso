/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { productsInterface, ProductMapInterface } from "@/routes/product";

const ProductList: React.FC<productsInterface> = ({ products }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        {products.map((item: ProductMapInterface, index: number) => (
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
            <p className="text-[#CA0508] text-lg pt-2 font-bold">{item.name}</p>
            <p>{item.price.split(".")[0]} BDT</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
