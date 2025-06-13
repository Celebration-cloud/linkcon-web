/* eslint-disable prettier/prettier */
"use client";

import { useSelector } from "react-redux";
import { useState } from "react";

import { PaginatedSearchResults } from "./PaginatedSearchResults";

export const PaginatedSearchResultsClient = ({ title }) => {
  const products = useSelector((state) => state.filter.filteredProducts);
  const [currentPage] = useState(1);

  return (
    <PaginatedSearchResults
      currentPage={currentPage}
      itemsPerPage={6}
      products={products}
      title={title}
    />
  );
};
