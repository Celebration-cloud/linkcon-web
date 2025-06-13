// import Image from "next/image";

import { BagCarousel } from "@/components/BagCarousel";
import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";
import { CardComponent } from "@/components/CardComponent";
import { ItemCarousel } from "@/components/ItemCarousel";

export default async function Home() {
  // const products = await getAllProducts();
  const categories = await getTemuCategories();
  const temuProductResponse = await getTemuProduct();
  const temuProduct = temuProductResponse.data; // Ensure temuProduct is an array

  return (
    <section className="h-fit relative">
      <BagCarousel />
      <section className="my-10">
        <p className="text-xl font-bold">Our Most Popular Products</p>
        {/* <Suspense  fallback={<SpinnerLoading />}> */}
        <ItemCarousel sampleProducts={temuProduct} />
        {/* </Suspense> */}
      </section>
      <section className="flex flex-wrap justify-around gap-5 py-5">
        <CardComponent categories={categories} />
      </section>
    </section>
  );
}

export const revalidate = false;
export const fetchCache = "force-cache";
