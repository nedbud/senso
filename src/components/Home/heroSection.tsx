"use client";

import React from "react";
import Image from "next/image";

interface Props {
  cover: string;
}

const Hero: React.FC<Props> = ({ cover }) => {
  return (
    <div className="relative">
      <a
        href="tel:+8801731008075"
        className="hidden lg:block absolute bottom-[60px] right-[270px] 2xl:bottom-[80px] 2xl:right-[380px] z-10 text-gray-900 bg-white hover:border hover:border-white hover:bg-red-600 hover:text-white text-base font-bold rounded-full py-2 px-6"
      >
        Contact Us
      </a>
      <Image
        priority
        className="h-[65vh] w-full object-cover"
        src={cover}
        width={500}
        height={500}
        alt="Senso Hero Image"
      />
    </div>
  );
};

export default Hero;
