/* eslint-disable prettier/prettier */
"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center">
        <Spinner />
        <p>loading Items...</p>
      </div>
    </div>
  );
}
