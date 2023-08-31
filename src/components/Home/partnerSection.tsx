/* eslint-disable @next/next/no-img-element */
import React from "react";

const partners = [
  {
    imgSource: "/assets/Images/Partner/p1.png",
  },
];

export default function Partners() {
  return (
    <div className="bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="py-6 px-4 lg:pt-20 lg:px-48">
        <h1 className="text-[20px] text-center text-gray-900 font-semibold lg:text-[40px] lg:font-semibold">
          We are an authorized partner of the world’s leading hearing aid
          brands.
        </h1>
        <p className="text-center text-[#CA0508] font-medium text-medium lg:text-xl pt-4 ">
          Feel the difference! Take a free trial today
        </p>
      </div>
      <div className="flex flex-row justify-center mt-2 lg:mt-10">
        {partners &&
          partners.map((partner, index) => (
            <a
              title="index"
              key={index}
              href="#"
              className="px-8 py-2 lg:w-1/4 h-[60px] lg:h-[120px] border rounded-md hover:border-red-700"
            >
              <img
                className="h-full w-full"
                src={partner.imgSource}
                alt="Resoud Gn Senso Partner"
                // width={100}
                // height={100}
                // priority
              />
            </a>
          ))}
      </div>
    </div>
  );
}
