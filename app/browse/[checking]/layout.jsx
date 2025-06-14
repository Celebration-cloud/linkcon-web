/* eslint-disable prettier/prettier */
import { Suspense } from "react";

import { FilterDropdown } from "../../../components/FilterDropdown";
import { FilterBar } from "../../../components/FilterBar";
import { FilterDrawer } from "../../../components/FilterDrawer";

import { getTemuCategories, getTemuProduct } from "@/libs/dataAction";
import { SpinnerLoading } from "@/components/SpinnerLoading";

/**
 * Generates dynamic metadata based on the category name in params.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Dynamic route parameters
 * @returns {Promise<{title: string}>} Metadata object with title
 */
/**
 * Generates dynamic metadata based on the category name in params.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Dynamic route parameters
 * @returns {Promise<{metadata: Object}>} Metadata object with title, description, openGraph, twitter
 */
export async function generateMetadata({ params }) {
  const { checking: rawTitle } = await Promise.resolve(params);
  const decodedTitle = decodeURIComponent(rawTitle.replace(/%20/g, " "));

  // Capitalize each word for better readability
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
      url: `/category/${rawTitle}`,
      siteName: "Your Store Name",
      images: [
        {
          url: `https://yourdomain.com/og-images/category-${rawTitle}.jpg`, 
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
      images: [`https://yourdomain.com/og-images/category-${rawTitle}.jpg`], 
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Layout component for product category pages.
 *
 * Renders category header, filters (drawer, dropdown, sidebar), and children content.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Nested page content
 * @param {Object} props.params - Dynamic route parameters containing `checking` as category name
 * @returns {JSX.Element} Rendered layout
 */
export default async function Layout({ children, params }) {
  // Resolve and decode the category name from URL
  const { checking: rawTitle } = await params;
  const categoryId = decodeURIComponent(rawTitle.replace(/%20/g, " "));

  // Fetch data asynchronously
  const [temuCategories, temuProduct] = await Promise.all([
    getTemuCategories(),
    getTemuProduct(),
  ]);

  const categories = temuCategories.data || [];
  const products = temuProduct.data || [];

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

      {/* Filters Header */}
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

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-5 w-full">
        {/* Sidebar Filter (Hidden on small screens) */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-20 h-fit">
          <FilterBar
            categories={categories}
            product={products}
            title={categoryId}
          />
        </aside>

        {/* Main Content Area */}
        <main className="col-span-1 sm:col-span-full md:col-span-8 w-full">
          <Suspense fallback={<SpinnerLoading />}>{children}</Suspense>
        </main>
      </div>
    </section>
  );
}
