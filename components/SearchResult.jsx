/* eslint-disable prettier/prettier */
"use client";

import { useRouter } from "next/navigation";

import { CardItem } from "./CardItem";

export const SearchResult = ({product}) => {
    const router = useRouter()
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

  const handleCard = (id) => {
    router.push(`/item/${id}`);
    console.log(product);
  };

  return (
    <>
      <CardItem
        getSeverity={getSeverity}
        product={product}
        width="w-72"
        onClick={handleCard}
      />
    </>
  );
};
