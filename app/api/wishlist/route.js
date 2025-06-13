/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { Query, Permission, Role, ID } from "appwrite";

import { databases } from "@/libs/appwriteClient";

const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = "68491eee0026f3609de7"; // Your wishlist collection ID

// GET wishlist items by userId
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("userId", userId),
    ]);

    return NextResponse.json(res.documents);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST add new item to wishlist
export async function POST(request) {
  try {
    const body = await request.json();

    // Filter only allowed fields
    const allowed = [
      "productId",
      "productSku",
      "productName",
      "productPrice",
      "productShortName",
      "productDescription",
      "createdDate",
      "deliveryTimeSpan",
      "categoryId",
      "productImageUrl",
      "categoryName",
      "userId",
      "quantity",
    ];

    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowed.includes(key))
    );

    const userId = filteredBody.userId;
    const productId = filteredBody.productId;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "userId and productId are required" },
        { status: 400 }
      );
    }

    // Prevent duplicate wishlist items for the same user/product
    const existing = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("userId", userId),
      Query.equal("productId", productId),
    ]);

    if (existing.documents.length > 0) {
      // Already wishlisted, return existing doc
      return NextResponse.json(existing.documents[0]);
    } else {
      // Create new wishlist item
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
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE wishlist item by document ID
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const docId = searchParams.get("id");
  const userId = searchParams.get("userId");

  if (!docId || !userId) {
    return NextResponse.json(
      { error: "Missing document ID or userId" },
      { status: 400 }
    );
  }

  try {
    // Fetch the document first
    const doc = await databases.getDocument(databaseId, collectionId, docId);

    // Check if the userId matches
    if (doc.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Proceed to delete
    await databases.deleteDocument(databaseId, collectionId, docId);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
