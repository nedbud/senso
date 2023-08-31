'use client'

import Link from "next/link";
import React from "react";
import Carousel from "../utils/Carousel";
import Heading from "../utils/Heading";
import { SwiperSlide } from 'swiper/react';
import Card from "./Card__bestProducts";
import { useGetProductsQuery } from "@/redux/features/products/products.api";
import Loader from "../utils/Loader";

let payload = {
  best: true,
  trending: false,
  latest: false,
  sort: 'desc'
}

export default function BestProducts() {
  const { data: response, isLoading:loading } = useGetProductsQuery(payload)
  const products = response?.data
  
  return (
    <div>
      { loading ? (
        <Loader />
      ) : (
        <section className="bg-[#CA0508] pt-8 px-5 lg:px-0 py-5 lg:pt-24 2xl:pt-64  lg:pb-14 flex flex-col space-y-5 lg:space-y-10">
          <Heading 
            red={true}
            heading="Best Selling Products"
            description="Bestselling products excel with innovation, quality, and consumer love. They captivate, inspire, and enhance lives. The epitome of excellence, they leave a lasting impression, making our lives better in every way."
          />
          <div className="hidden lg:block">
            <Carousel
              effect={'coverflow'}
              spaceBetween={20}
              slidesPerView={4}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <Card index={index} item={product} />
                </SwiperSlide>
              ))}
            </Carousel>
          </div>
          <div className="block lg:hidden">
            <Carousel
              effect={''}
              spaceBetween={20}
              slidesPerView={2}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <Card index={index} item={product} />
                </SwiperSlide>
              ))}
            </Carousel>
          </div>
          <div className="justify-center hidden">
            <Link
              href="/hearing-aids"
              className="py-2 px-8 border rounded-md bg-red-200 hover:text-white hover:border-white hover:bg-[#CA0508] w-1/2 text-center font-bold text-xs lg:text-lg"
            >
              All Products
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};