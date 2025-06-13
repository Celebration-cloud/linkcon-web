/* eslint-disable prettier/prettier */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { Image } from "@heroui/image";

export const BagCarousel = () => {
  const carouselItems = [
    {
      image: "/shopping-background-7r8wfg1a08pqpnrb.jpg",
    },
    {
      image: "/shopping-background-w6azn446nu310ksg.jpg",
    },
    {
      image: "/tamanna-rumee-eD1RNYzzUxc-unsplash.jpg",
    },
  ];

  const fallbackImage =
    "https://via.placeholder.com/1500x500?text=Image+Unavailable";

  return (
    <div className="w-full h-fit relative">
      <Swiper
        aria-label="Bag Carousel Slider"
        autoplay={{ delay: 3000 }}
        className="mt-5"
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <Image
                alt={`Carousel item ${index + 1}`}
                className="object-center "
                height={500}
                layout="responsive"
                quality={100}
                src={item.image}
                width={1500}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
