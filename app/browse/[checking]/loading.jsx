/* eslint-disable prettier/prettier */
"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-screen">
      <Spinner />
      <p>loading data...</p>
    </div>
  );
}
