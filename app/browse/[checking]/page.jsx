/* eslint-disable prettier/prettier */
import { Suspense } from "react";

import { SpinnerLoading } from "../../../components/SpinnerLoading";
// Import the client component you just created:
import { PaginatedSearchResults } from "../../../components/PaginatedSearchResults";

export default async function Page() {
  return (
    <div className="h-fit">
      <section className="flex items-center gap-5">
      {/* Pass the full product list to the PaginatedSearchResults client component */}
      <PaginatedSearchResults />
      </section>
    </div>
  );
}
