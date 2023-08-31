/* eslint-disable @next/next/no-img-element */
'use client'

import React from "react"
import Loader from "../utils/Loader"

interface Props {
  cover: string
  loading: boolean
}

const Hero: React.FC<Props> = ({ cover, loading }) => {
  return (
    <div className="mt-20 lg:mt-16 h-full lg:h-[500px]">
      { loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <a href="tel:+8801731008075" className="hidden lg:block absolute bottom-[60px] right-[270px] 2xl:bottom-[80px] 2xl:right-[380px] z-10 text-gray-900 bg-white hover:border hover:border-white hover:bg-red-600 hover:text-white text-base font-bold rounded-full py-2 px-6">
            Contact Us
          </a>
          <img
            className="h-[65vh] w-full object-cover"
            src={cover}
            alt="Senso Hero Image"
          />
        </div>
      )}
    </div>
  );
}

export default Hero