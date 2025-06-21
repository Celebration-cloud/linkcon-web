/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";

const defaultImageUrl = "/404 Error-rafiki.svg";

export const CardComponent = ({ categories }) => {
  const router = useRouter();

  const handleCardPress = (categoryName) => {
    router.push(`/browse/${categoryName}`);
  };

  return (
    <>
      {categories.data.map((category, idx) => (
        <div
          key={idx}
          className="flex justify-center items-center"
          role="button"
          tabIndex={0}
          onClick={() => handleCardPress(category.categoryName)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCardPress(category.categoryName);
            }
          }}
        >
          <Card
            key={idx}
            className="py-4 w-96 h-96 max-sm:w-auto max-sm:h-80 max-md:w-72 max-md:h-72 max-lg:w-64 max-lg:h-64 cursor-pointer transition-transform transform hover:scale-105"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-2xl">{category.categoryName}</h4>
            </CardHeader>
            <CardBody className="w-full h-fit py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-fit w-full max-sm:rounded-lg max-md:rounded-md max-lg:rounded-sm"
                height="100%"
                src={
                  siteConfig.categoryImages[category.categoryName] ||
                  defaultImageUrl
                }
                width="auto"
              />
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};
