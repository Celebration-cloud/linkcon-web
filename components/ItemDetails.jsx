/* eslint-disable prettier/prettier */
"use client";
import { Tab, Tabs } from "@heroui/tabs";

import ProductReviews from "./ProductReviews";

export const ItemDetails = ({ descriptions, productId }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" size="lg" variant="underlined">
        <Tab key="description" title="Description">
          <div className="contain-content">{descriptions}</div>
        </Tab>
        <Tab key="reviews" title="Reviews">
          <ProductReviews productId={productId} />
        </Tab>
      </Tabs>
    </div>
  );
};
