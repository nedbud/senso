'use client'

import { A11y, Virtual, EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/virtual';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';

interface CarouselProps {
  effect: string,
  spaceBetween: number,
  slidesPerView: number
}

export default function Carousel({
  children,
  effect,
  spaceBetween,
  slidesPerView
}: {
  children: React.ReactNode
} & CarouselProps) {
  return (
    <section>
      <Swiper
        modules={[A11y, Virtual, EffectCoverflow, Autoplay]}
        effect={effect}
        autoplay={true}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
      >
        {children}
      </Swiper>
    </section>
  );
};
