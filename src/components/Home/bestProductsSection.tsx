"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import Heading from "../utils/Heading";
import { SwiperSlide } from "swiper/react";
import Card from "./Card__bestProducts";
import { getBestProductsInterface } from "@/routes/product";
import Loader from "../utils/Loader";

const BestProducts: React.FC<getBestProductsInterface> = ({ products }) => {
  const Slider = React.lazy(() => import("../utils/Carousel"));

  return (
    <div className="flex flex-col space-y-5 lg:space-y-10">
      <Heading
        red={true}
        heading="Best Selling Products"
        description="Bestselling products excel with innovation, quality, and consumer love. They captivate, inspire, and enhance lives. The epitome of excellence, they leave a lasting impression, making our lives better in every way."
      />
      <Suspense fallback={<Loader />}>
        <div className="hidden lg:block">
          <Slider effect={"coverflow"} spaceBetween={20} slidesPerView={4}>
            {products.map((product: any, index: number) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <Card index={index} item={product} />
              </SwiperSlide>
            ))}
          </Slider>
        </div>
        <div className="block lg:hidden">
          <Slider effect={""} spaceBetween={20} slidesPerView={2}>
            {products.map((product: any, index: number) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <Card index={index} item={product} />
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      </Suspense>
      <div className="justify-center items-center text-center w-full">
        <Link
          href="/hearing-aids"
          className="py-2 px-8 border rounded-md bg-red-200 hover:text-white hover:border-white hover:bg-[#CA0508] w-1/2 text-center font-bold text-xs lg:text-lg duration-700"
        >
          All Products
        </Link>
      </div>
    </div>
  );
};

export default BestProducts;
