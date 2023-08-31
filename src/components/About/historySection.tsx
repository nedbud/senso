"use client";

import React from "react";
import Heading from "../utils/Heading";
import Carousel from "../utils/Carousel";
import { SwiperSlide } from "swiper/react";
import SingleHistory from "./SingleHistory__history";

const historyData = [
  { year: "2007", description: "Started our journey" },
  { year: "2019", description: "Introduced innovative hearing technologies" },
];

export default function History() {
  return (
    <section className="bg-[#CA0508] pt-2 mb-32 lg:pt-8 px-2 lg:px-0 lg:py-28 lg:mb-40 flex flex-col space-y-2 lg:space-y-10 py-10">
      <Heading
        red={true}
        heading="Our Renowned History"
        description="Through decades of expertise, we've transformed lives, as a beacon of sound, our legacy thrives."
      />
      <div className="w-full lg:w-5/6 mx-auto p-4 cursor-pointer hidden lg:block">
        <Carousel effect={""} spaceBetween={2} slidesPerView={4}>
          {historyData.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <SingleHistory history={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
      <div className="w-full lg:w-5/6 mx-auto p-4 cursor-pointer block lg:hidden">
        <Carousel effect={""} spaceBetween={2} slidesPerView={3}>
          {historyData.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <SingleHistory history={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
