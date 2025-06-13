"use client";

import { Pagination } from "@heroui/pagination";
import { useRouter } from "next/navigation";

export const PaginationClient = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    // Update the URL with the new page number
    router.push(`/browse/[checking]?page=${page}`);
  };

  return (
    <Pagination
      page={currentPage}
      total={totalPages}
      onChange={handlePageChange}
    />
  );
};
