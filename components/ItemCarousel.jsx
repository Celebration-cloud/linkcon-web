/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { useRouter } from "next/navigation";

import {CardItem} from "@/components/CardItem";

export const ItemCarousel = ({ sampleProducts }) => {
  const router = useRouter()
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
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
      breakpoint: "767px",
      numVisible: 3,
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
    setProducts(sampleProducts.slice(0, 9)); // Simulating fetching 9 products
  }, []);

  const handleCard = (product) => {
    router.push(`/item/${product.productId}`);
    console.log(product);
  };

  const productTemplate = (product) => {
    const handleClick = () => { 
      handleCard(product);
     };

    return (
      <CardItem getSeverity={getSeverity} product={product} width="w-full gap-5" onClick={handleClick} />
    );
  };

  return (
    <div className="card ">
      <Carousel
        circular
        autoplayInterval={3000}
        containerClassName="h-96 p-2 items-center"
        itemTemplate={productTemplate}
        numScroll={3}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        value={products}
      />
    </div>
  );
};
