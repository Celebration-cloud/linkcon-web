/* eslint-disable prettier/prettier */
"use client";

// import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
// import { Tag } from "primereact/tag";
import { useState } from "react";

const defaultImageUrl = "/404 Error-rafiki.svg";

export function CardItem({ onClick, product, width }) {
  const [imgSrc, setImgSrc] = useState(
    product.productImageUrl && product.productImageUrl.trim() !== ""
      ? product.productImageUrl
      : defaultImageUrl
  );

  return (
    <Card
      isPressable
      className={` p-1 h-80 ${width} mx-2 my-2`}
      shadow="sm"
      onPress={onClick.bind(this, product.productId)}
    >
      <CardBody className="overflow-visible p-0 min-w-10 ">
        <Image
          alt={product.productName}
          className="w-full object-cover h-[200px]"
          radius="lg"
          shadow="sm"
          src={imgSrc}
          width="100%"
          onError={() => setImgSrc(defaultImageUrl)}
        />
      </CardBody>
      <CardFooter className="text-small w-full ">
        <div className="justify-start flex-col text-left pt-1 w-full">
          <b>{product.productName}</b>
          <p>{product.categoryName}</p>
          <div className="flex justify-between items-center">
            <p className="text-default-500 ">${product.productPrice}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
