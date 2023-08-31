"use client";

import React from "react";
import Carousel from "../utils/Carousel";
import ImageContainer from "./ImageContainer__hero";
import { SwiperSlide } from "swiper/react";
import { useGetAboutQuery } from "@/redux/features/company/company.api";
import Loader from "../utils/Loader";

export default function Hero() {
  // const gallery = [
  //   {
  //     image: "/assets/Images/temp/asd.jpeg",
  //     title: "New Product launch & Dealer meet program-2022",
  //     mark: "Product launch",
  //     description:
  //       "A great prize-giving ceremony of the dealers, filled with excitement and anticipation, was held at the elegant venue, adorned with dazzling decorations and an atmosphere of celebration.",
  //   },
  //   {
  //     image: "/assets/Images/temp/Senso_Hearing_dhaka_About_us_photo_2.jpg",
  //     title: "World Hearing Day Celebration",
  //     mark: "Hearing Day",
  //     description:
  //       "On World Hearing Day, we come together to celebrate the beauty of sound and reaffirm our commitment to promoting hearing health and awareness. Let us unite in fostering a world where everyone can cherish the gift of hearing and embrace life's precious moments with joy and clarity.",
  //   },
  // ];

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
