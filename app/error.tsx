"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-md">
        <svg
          className="w-16 h-16 text-indigo-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {/* {statusCode || 404} */}
          404
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {/* {statusCode
            ? `An error ${statusCode} occurred on server`
            : "Sorry, the page you are looking for does not exist."} */}
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          href="/"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
