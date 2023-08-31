/* eslint-disable @next/next/no-img-element */
"use client";

interface ImageContainerItem {
  gallery: {
    carousel_image: string;
    carousel_heading: string;
    brand: string;
    description: string;
  };
}

export default function ImageContainer({ gallery }: ImageContainerItem) {
  const first_part = gallery.carousel_heading.split(gallery.brand)[0];
  const last_part = gallery.carousel_heading.split(gallery.brand)[1];

  return (
    <div className="relative lg:h-[640px] w-full">
      <img
        className="object-cover w-full"
        src={gallery.carousel_image}
        alt={gallery.carousel_heading}
      />
      <div className="absolute top-0 w-full h-full bg-gray-800 opacity-40"></div>
      <div className="absolute top-0 w-full h-full cursor-default">
        <div className="flex flex-col lg:space-y-5 justify-end h-full mt-auto lg:px-20">
          <h2 className="flex flex-row justify-start items-center text-md lg:text-5xl px-2 lg:px-0 font-bold ">
            <span className="text-white/80">{first_part}</span>
            <span className="bg-[#CA0508] border rounded-md py-1 px-2 mx-2 text-white -rotate-6 hover:scale-125 transition duration-300">
              {gallery.brand}
            </span>
            <span className="text-white/80">{last_part}</span>
          </h2>

          <div className="flex justify-start items-center p-2 lg:p-4 lg:h-1/6 w-full bg-stone-900/50 lg:rounded-md shadow-md">
            <p className="text-white text-[11px] lg:text-base">
              {gallery.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
