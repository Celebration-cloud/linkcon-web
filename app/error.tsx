"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global Error Boundary Component
 *
 * This component is used as a fallback UI when an unhandled error occurs in the app.
 * It displays a user-friendly message and logs the error to the console.
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The thrown error object
 * @param {Function} props.reset - A function to attempt resetting the error boundary
 */
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Log the error (you could also send it to an external service like Sentry)
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 flex flex-col items-center max-w-md text-center">
        {/* Error Icon */}
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

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>

        {/* Error Description */}
        <p className="text-lg text-gray-600 mb-6">
          Sorry, something went wrong. The page you&apos;re looking for
          isn&apos;t available right now.
        </p>

        {/* Home Link */}
        <Link
          className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition duration-200"
          href="/"
          onClick={() => reset()}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
