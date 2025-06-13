/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { Query, Permission, Role, ID } from "appwrite";

import { databases } from "@/libs/appwriteClient";

// Appwrite database and collection IDs
const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = "684aa8b90000a9396fb1"; // Product reviews collection

/**
 * GET /api/review?productId=...
 * Fetch all reviews for a given productId (integer)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  // Convert productId to integer for Appwrite query
  productId = parseInt(productId, 10);
  console.log("Fetching reviews for productId:", productId);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  try {
    // Query reviews by productId
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("productId", productId),
    ]);

    return NextResponse.json(res.documents);
  } catch (error) {
    console.error("Error fetching reviews:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/review
 * Add a new review for a product
 * Required fields: productId (int), rating (int), comment (string), date (string), user (string), userId (string)
 * Optional: avatar (string)
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Only allow these fields
    const allowed = [
      "productId",
      "rating",
      "comment",
      "date",
      "user",
      "avatar",
      "userId",
    ];
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowed.includes(key))
    );

    // Validate required fields
    const { productId, rating, comment, date, user, userId } = filteredBody;

    if (
      productId === undefined ||
      rating === undefined ||
      !comment ||
      !date ||
      !user ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the review document in Appwrite
    const doc = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      filteredBody,
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error adding review:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
