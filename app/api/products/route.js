/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";

import { databases } from "@/libs/appwriteClient";

/**
 * Environment configuration
 */
const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = "products"; // The ID of your Appwrite collection

/**
 * GET /api/products
 *
 * Fetches all product documents from the Appwrite database.
 *
 * @returns {NextResponse} JSON response containing list of products or error message
 */
export async function GET() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);

    return NextResponse.json(response.documents);
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 *
 * Creates a new product document in the Appwrite database.
 *
 * @param {Request} request - The incoming HTTP request containing product data in JSON format
 * @returns {NextResponse} JSON response containing created document or error message
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const document = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()", // Generates a unique ID for the document
      body
    );

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error creating product:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
