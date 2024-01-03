/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

interface CardItem {
  index: number;
  item: {
    id: number;
    slug: string;
    image: string;
    name: string;
    description: string;
    brand: string;
    series: string;
  };
}

export default function Card({ item, index }: CardItem) {
  return (
    <div className="flex flex-col items-center bg-white h-[260px] lg:h-[480px] 2xl:h-[560px] rounded-md relative">
      <div className="absolute bg-gray-400/40 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/5 w-4/5 z-10 m-2 items-center">
        <div className="relative h-full w-full">
          <div
            className={`w-2 lg:w-3 h-2 lg:h-3 absolute rounded-full 
            ${
              index % 2 === 0
                ? "bg-yellow-600"
                : index % 3 === 0
                ? "bg-green-600"
                : "bg-red-600"
            }
            top-0 left-0 m-1 lg:m-3`}
          ></div>
          {/* <div className="w-10 h-6 absolute border-4 border-red-900/50 bg-transparent rounded-lg bottom-0 m-3 animate-spin"></div> */}
        </div>
      </div>

      {item.image.length > 50 ? <img
        className="w-full h-4/6 !w-4/6 object-fill rounded-md z-20 mx-auto lg:mt-10 -rotate-6 hover:rotate-0 ease-in-out duration-300 scale-110 relative"
        src={item.image}
        alt={item.name}
      /> 
      : 
      <img
        className="w-full h-4/6 !w-4/6 object-fill rounded-md z-20 mx-auto lg:mt-10 -rotate-6 hover:rotate-0 ease-in-out duration-300 scale-110 relative"
          // src={item.image}
          src="/assets/Images/Common/senso_404_not_found.png"
          alt={item.name}
        />
      }


      <div className="!mt-4 mb-2 lg:mt-5 flex flex-col space-y-2 items-center px-2 lg:px-10 h-full text-center">
        <h3
          className={`font-bold capitalize
          ${
            index % 2 === 0
              ? "text-yellow-700"
              : index % 3 === 0
              ? "text-green-700"
              : "text-[#CA0508]"
          }
          text-[8px] lg:text-lg`}
        >
          {item.name}
        </h3>
        <p className="text-[7px] lg:text-xs font-normal">{item.description}</p>
        <div className="flex flex-row justify-between text-[7px] lg:text-sm w-full mt-10">
          <h5>
            <span className="text-stone-800 font-medium">Brand: </span>
            <span
              className={`font-bold ${
                index % 2 === 0
                  ? "text-yellow-700"
                  : index % 3 === 0
                  ? "text-green-700"
                  : "text-[#CA0508]"
              }`}
            >
              {item.brand}
            </span>
          </h5>
          <h5>
            <span className="text-stone-800 font-medium">Series: </span>
            <span
              className={`font-bold ${
                index % 2 === 0
                  ? "text-yellow-700"
                  : index % 3 === 0
                  ? "text-green-700"
                  : "text-[#CA0508]"
              }`}
            >
              {item.series}
            </span>
          </h5>
        </div>
      </div>
      <Link
        href={`/hearing-aids/${item.slug}`}
        type="button"
        className={`w-full py-2 lg:py-4 
        ${
          index % 2 === 0
            ? "bg-yellow-700"
            : index % 3 === 0
            ? "bg-green-700"
            : "bg-red-700"
        } 
        ${
          index % 2 === 0
            ? "hover:bg-yellow-600"
            : index % 3 === 0
            ? "hover:bg-green-600"
            : "hover:bg-red-600"
        } 
        text-white capitalize text-xs lg:text-base text-center`}
      >
        Show More
      </Link>
    </div>
  );
}
