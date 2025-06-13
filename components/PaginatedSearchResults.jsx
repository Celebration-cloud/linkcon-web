/* eslint-disable prettier/prettier */
"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Pagination } from "@heroui/pagination";

import { SearchResult } from "./SearchResult";

export const PaginatedSearchResults = () => {
  const { checking: title } = useParams();
  const products = useSelector((state) => state.filter.filteredProducts);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get page from URL, default to 1
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  // Keep state in sync with URL
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  // Update URL when page changes
  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
    // setCurrentPage(page); // Not needed, will update via useEffect
  };

  const slicedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-fit flex flex-col justify-between gap-10">
      {/* Display the current products */}
      <div className="w-full flex flex-wrap justify-around">
        {slicedProducts.length === 0 && (
          <div>No products found in {decodeURIComponent(title)}.</div>
        )}
        {slicedProducts.map((item, idx) => (
          <SearchResult key={idx} product={item} />
        ))}
      </div>
      {/* Render Pagination */}
      <div className="flex justify-center w-full">
        <Pagination
          page={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
