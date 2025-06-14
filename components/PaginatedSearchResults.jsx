/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Pagination } from "@heroui/pagination";

import { SearchResult } from "./SearchResult";

export const PaginatedSearchResults = () => {
  const { checking: title } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fallback if Redux is not yet populated
  const products = useSelector((state) => state.filter?.filteredProducts || []);

  // Get current page from URL or default to 1
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  // Ensure the current page is within bounds
  useEffect(() => {
    if (pageFromUrl < 1 || pageFromUrl > totalPages) {
      router.push("?page=1");
    } else {
      setCurrentPage(pageFromUrl);
    }
  }, [pageFromUrl, totalPages, router]);

  // Slice products for pagination (memoized for performance)
  const slicedProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [products, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="h-fit flex flex-col justify-between gap-10">
      {/* Display Products */}
      <div className="w-full flex flex-wrap justify-around">
        {slicedProducts.length === 0 ? (
          <div className="text-gray-600 text-center w-full">
            No products found in category &quot;
            <span className="font-semibold">{decodeURIComponent(title)}</span>
            &quot;. Try adjusting your filters.
          </div>
        ) : (
          slicedProducts.map((item, idx) => (
            <SearchResult key={idx} product={item} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center w-full mt-6">
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
