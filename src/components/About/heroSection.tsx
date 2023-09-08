"use client";

import React from "react";
import Carousel from "../utils/Carousel";
import ImageContainer from "./ImageContainer__hero";
import { SwiperSlide } from "swiper/react";
import { getCompanyAboutInterface } from "@/routes/company";

export default function Hero({ about }: getCompanyAboutInterface) {
  return (
    <section className="bg-gray-100">
      <Carousel effect={""} spaceBetween={0} slidesPerView={1}>
        {about.map((gallery: any, index: number) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <ImageContainer gallery={gallery} />
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
}
