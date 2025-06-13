/* eslint-disable prettier/prettier */

import { FilterDropdown } from "../../../components/FilterDropdown";
import { FilterBar } from "../../../components/FilterBar";
import { FilterDrawer } from "../../../components/FilterDrawer";

import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { checking: title } = await Promise.resolve(params);
  const category = JSON.stringify(title).replace(/%20/g, " ");
  const categoryId = category.replace(/"/g, "").replace(/'/g, "");

  return { title: categoryId };
}

export default async function Layout(props) {
  const { checking: title } = await props.params;

  // Decode the `title` to handle URL-encoded characters like `%20` and `%26`
  const categoryId = decodeURIComponent(title);

  const temuCategories = await getTemuCategories();
  const categories = temuCategories.data;

  const temuProduct = await getTemuProduct();
  const product = temuProduct.data;


  return (
    <section className="space-y-4 sticky top-0">
      {/* Modern Category Display */}
      <div className="flex items-center gap-3 py-4 px-2">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
          Category
        </span>
        <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
          {categoryId}
        </h1>
      </div>
      <header className="flex justify-between items-center max-sm:flex-col max-sm:items-start gap-2">
        <div className="flex items-center gap-2">
          <FilterDrawer
            categories={categories}
            product={product}
            title={categoryId}
          />
        </div>
        <FilterDropdown categories={categories} title={categoryId} />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-5 w-full">
        <aside className="hidden lg:block lg:col-span-2 sticky top-0">
          <FilterBar
            categories={categories}
            product={product}
            title={categoryId}
          />
        </aside>
        <main className="col-span-1 sm:col-span-full md:col-span-8 w-full">
          <Suspense fallback={<SpinnerLoading />}>
            {/* Render filtered products here if needed */}
            {props.children}
          </Suspense>
        </main>
      </div>
    </section>
  );
}
