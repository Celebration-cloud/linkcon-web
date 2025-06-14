/* eslint-disable prettier/prettier */
import { Suspense } from "react";

import { FilterDropdown } from "../../../components/FilterDropdown";
import { FilterBar } from "../../../components/FilterBar";
import { FilterDrawer } from "../../../components/FilterDrawer";

import { SpinnerLoading } from "@/components/SpinnerLoading";
import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";

export async function generateMetadata({ params }) {
  const {checking} = await Promise.resolve(params) || "";
  const decodedTitle = decodeURIComponent(checking.replace(/%20/g, " "));

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const categoryName = capitalizeWords(decodedTitle);
  const baseTitle = `${categoryName} | Shop Now`;
  const description = `Explore the best products in the ${categoryName} category. Find top deals and exclusive offers.`;

  return {
    title: baseTitle,
    description,
    openGraph: {
      title: baseTitle,
      description,
      url: `/category/${checking}`,
      siteName: "Your Store Name",
      images: [
        {
          url: `https://yourdomain.com/og-images/category-${checking}.jpg`,
          width: 800,
          height: 600,
          alt: categoryName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description,
      images: [`https://yourdomain.com/og-images/category-${checking}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Layout({ children, params }) {
  const { checking } = (await Promise.resolve(params)) || "";
  const categoryId = decodeURIComponent(checking.replace(/%20/g, " "));

  let categories = [];
  let products = [];

  try {
    const [temuCategories, temuProduct] = await Promise.all([
      getTemuCategories(),
      getTemuProduct(),
    ]);

    categories = temuCategories.data || [];
    products = temuProduct.data || [];
  } catch (err) {
    console.error("Error loading data:", err);
  }

  return (
    <section className="space-y-4 sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 px-2">
      {/* Category Header */}
      <div className="flex items-center gap-3 py-2">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
          Category
        </span>
        <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
          {categoryId}
        </h1>
      </div>

      {/* Filter Controls */}
      <header className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FilterDrawer
            categories={categories}
            product={products}
            title={categoryId}
          />
        </div>
        <FilterDropdown categories={categories} title={categoryId} />
      </header>

      {/* Layout Content */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-5 w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-20 h-fit">
          <FilterBar
            categories={categories}
            product={products}
            title={categoryId}
          />
        </aside>

        {/* Main */}
        <main className="col-span-1 sm:col-span-full md:col-span-8 w-full">
          <Suspense fallback={<SpinnerLoading />}>{children}</Suspense>
        </main>
      </div>
    </section>
  );
}

// Optional: Incremental Static Regeneration
export const revalidate = 60;
