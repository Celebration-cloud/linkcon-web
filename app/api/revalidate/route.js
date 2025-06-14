/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Handles incoming POST requests to trigger path revalidation.
 *
 * This API route is used to programmatically revalidate pages using
 * Incremental Static Regeneration (ISR) in Next.js. The path to revalidate
 * can be passed via a query parameter (`?path=/your-path`), defaulting to "/".
 *
 * @param {Request} request - The incoming HTTP request containing optional `path` query param
 * @returns {NextResponse} JSON response confirming revalidation with timestamp
 */
export async function POST(request) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(request.url);
    const { searchParams } = url;

    // Get the 'path' query parameter or fallback to root path
    const pathToRevalidate = searchParams.get("path") || "/";

    // Trigger revalidation for the specified path
    revalidatePath(pathToRevalidate);

    // Return success response
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: pathToRevalidate,
    });
  } catch (error) {
    console.error("Revalidation failed:", error);

    return NextResponse.json(
      { revalidated: false, error: "Revalidation failed" },
      { status: 500 },
    );
  }
}
