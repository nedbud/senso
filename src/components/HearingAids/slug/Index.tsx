"use client";

import Cover from "./Cover";
import Images from "./ImagesSection";
import Features from "./Features";
import { ProductInterface } from "@/routes/product";
import Image from "next/image";

export default function Index({ product }: ProductInterface) {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <Cover
          cover_image={product.cover_image}
          avatar={product.avatar}
          name={product.name}
          series_name={product.series}
          brand_name={product.brand}
        />
        <section>
          <div className="grid grid-cols-12 gap-4">
            <Images images={product.images} name={product.name} />

            <article className="col-span-12 lg:col-span-7 mb-4">
              <Features
                warranty={product.warranty}
                name={product.name}
                price={product.price}
                description={product.description}
                features={product.features}
              />
              {product?.contents.map((content: any, index: number) => (
                <section
                  key={index}
                  className="my-4 p-4 border shadow-lg rounded-md"
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{content.title}</p>
                      <p className="text-xs text-gray-500">
                        {content.created_at}
                      </p>
                    </div>
                  </div>

                  <div className="my-2">
                    <p>{content.content}</p>
                    <div className="my-4">
                      <img
                        src={content.image}
                        className="h-[200px] lg:h-[400px] w-full rounded-md"
                        alt={content.content}
                      />
                    </div>
                  </div>
                </section>
              ))}
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
