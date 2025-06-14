/* eslint-disable prettier/prettier */
import { SingleItemCarousel } from "../../../components/SingleItemCarousel";
import {
  getSingleTemuProduct,
  getTemuCategoriesById,
} from "../../../libs/dataAction";
import { ProductActions } from "../../../components/ProductActions";

import { ItemDetails } from "@/components/ItemDetails";
import { ItemCarousel } from "@/components/ItemCarousel";

export async function generateMetadata({ params }) {
  const { shopId } = await Promise.resolve(params);
  const temuProduct = await getSingleTemuProduct(shopId);

  return { title: temuProduct };
}
const defaultImageUrl = "/404 Error-rafiki.svg";

export default async function Page({ params }) {
  const { shopId } = await Promise.resolve(params);
  const temuProduct = await getSingleTemuProduct(shopId);
  const setOfCategories = await getTemuCategoriesById(temuProduct.categoryId);

  return (
    <div className="h-fit space-y-4">
      <section className="flex max-lg:flex-wrap items-center gap-5">
        <div className="w-full flex items-center justify-center">
          <SingleItemCarousel
            image={[temuProduct.productImageUrl || defaultImageUrl]}
          />
        </div>
        <div className="max-md: w-full space-y-4 flex-wrap">
          <ProductActions temuProduct={temuProduct} />
        </div>
      </section>
      <ItemDetails
        descriptions={temuProduct.productDescription}
        productId={temuProduct.productId}
      />
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Other Related Product</h2>
        <ItemCarousel sampleProducts={setOfCategories.data} />
      </div>
    </div>
  );
}
