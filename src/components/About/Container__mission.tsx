/* eslint-disable @next/next/no-img-element */
"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface ContainerItem {
  cover: string;
  missions: {
    description: string;
  }[];
}

export default function Container({ missions, cover }: ContainerItem) {
  return (
    <div className="flex flex-row space-x-4 lg:space-x-20">
      <div className="hidden lg:block lg:w-1/2 h-full shadow-lg hover:scale-110 transition duration-300">
        <img
          src={cover}
          className="rounded-lg"
          alt="asd"
          // height={1000}
          // width={1000}
          // priority={false}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:justify-start space-y-1 lg:space-y-4">
        {missions.map((item, index) => (
          <div
            key={index}
            className="flex flex-row space-x-2 lg:space-x-4 items-center"
          >
            <CheckCircleIcon className="h-5 w-5 lg:h-8 lg:w-8 stroke-red-600 fill-white" />
            <p className="text-gray-600 font-semibold text-[8px] lg:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
