"use client";

import React from "react";
import Carousel from "../utils/Carousel";
import ImageContainer from "./ImageContainer__hero";
import { SwiperSlide } from "swiper/react";
import { useGetAboutQuery } from "@/redux/features/company/company.api";
import Loader from "../utils/Loader";

export default function Hero() {
  const { data: companyAbout, isLoading: loading } = useGetAboutQuery("");
  const about = companyAbout?.data;

  return (
    <section className="bg-gray-100">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Carousel effect={""} spaceBetween={0} slidesPerView={1}>
          {about.map((gallery: any, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <ImageContainer gallery={gallery} />
            </SwiperSlide>
          ))}
        </Carousel>
      )}
    </section>
  );
}
