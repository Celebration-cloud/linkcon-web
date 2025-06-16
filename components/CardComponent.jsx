/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";

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
            className="py-4 w-96 h-96"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-2xl">{category.categoryName}</h4>
            </CardHeader>
            <CardBody className="w-full h-full py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-full w-full"
                height={260}
                src={
                  siteConfig.categoryImages[category.categoryName] ||
                  "https://example.com/images/default.jpg"
                }
                width={500}
              />
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};
