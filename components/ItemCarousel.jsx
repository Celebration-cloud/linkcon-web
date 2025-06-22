/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { useRouter } from "next/navigation";

import { CardItem } from "@/components/CardItem";

export const ItemCarousel = ({ sampleProducts }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const responsiveOptions = [
    {
      breakpoint: "2000px",
      numVisible: 6,
      numScroll: 2,
    },
    {
      breakpoint: "1400px",
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return null;
    }
  };

  useEffect(() => {
    setProducts(sampleProducts.slice(0, 9));
  }, [sampleProducts]);

  const handleCard = (product) => {
    router.push(`/item/${product.productId}`);
    console.log(product);
  };

  const productTemplate = (product) => {
    const handleClick = () => handleCard(product);

    return (
      <div
        className="w-full h-full flex justify-center items-center px-2"
      >
        <div className="w-full max-w-[300px]">
          <CardItem
            getSeverity={getSeverity}
            product={product}
            width="w-full max-w-[300px] h-full max-h-[400px]"
            onClick={handleClick}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-2 md:px-4 py-4">
      <Carousel
        circular
        autoplayInterval={3000}
        className="!h-auto"
        containerClassName="w-full"
        itemTemplate={productTemplate}
        numScroll={3}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        value={products}
      />
    </div>
  );
};
