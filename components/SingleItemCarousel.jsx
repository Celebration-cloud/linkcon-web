/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Image } from "@heroui/image";

const defaultImageUrl = "/404 Error-rafiki.svg";

export const SingleItemCarousel = ({ image = [defaultImageUrl] }) => {
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    setProducts(image);
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidth);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [setWidth, image, setProducts]);

  const productTemplate = (img) => {
    return (
      <Image
        alt="helllo"
        className="w-full object-cover h-[500px]"
        radius="lg"
        shadow="sm"
        src={img}
        width="100%"
      />
    );
  };

  return (
    <div className="card ">
      <Carousel
        circular
        autoplayInterval={3000}
        className="custom-carousel w-fit h-full justify-between"
        containerClassName="h-full p-2 items-center"
        itemTemplate={productTemplate}
        responsiveOptions={responsiveOptions}
        showNavigators={width < 575 ? false : true}
        value={products}
      />
    </div>
  );
};
