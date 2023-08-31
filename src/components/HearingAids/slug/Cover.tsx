/* eslint-disable @next/next/no-img-element */
'use client'

import { StarIcon } from "@heroicons/react/24/outline"

interface ProductCoverProps {
    cover_image: string
    avatar: string
    name: string
    series_name: string
    brand_name: string
}

const Cover: React.FC<ProductCoverProps> = ({ cover_image, avatar, name, series_name, brand_name }) => {
    return (
        <section className="relative mb-24 lg:mb-44">
            <div className="">
              <div
                className="w-full h-[200px] lg:h-[400px] bg-cover bg-center bg-no-repeat rounded-md"
                style={{
                  backgroundImage: `url(${cover_image})`,
                }}
              />
            </div>
            <div className="absolute bottom-[-90px] lg:bottom-[-170px] left-[10px] lg:left-[25px]">
              <div className="flex items-center">
                <div className="bg-white rounded-full">
                  <img
                    className="h-32 lg:h-48 w-32 lg:w-48 rounded-full p-1"
                    src={avatar}
                    alt="Profile Image"
                  />
                </div>
                <div className="ml-2 lg:ml-4">
                  <h1 className="text-lg lg:text-3xl text-[#CA0508] font-semibold">
                    {name}
                  </h1>
                  <p className="flex items-center">
                    <span className="text-gray-500 text-xs lg:text-sm">
                      {series_name}
                    </span>
                    <span className="ml-1 lg:ml-3 text-gray-500 text-xs lg:text-sm">
                      {brand_name}
                    </span>
                    <span className="flex items-center ml-1 lg:ml-3">
                      <StarIcon className="h-4 w-4 text-yellow-400 text-sm" />
                      <span className="ml-1 text-gray-500 text-xs lg:text-sm">
                        4.8 reviews
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
    )
}

export default Cover