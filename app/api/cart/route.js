/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { Query, Permission, Role, ID } from "appwrite";

import { databases } from "@/libs/appwriteClient";

// Appwrite database and collection IDs
const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = "68489bd3001acef42c94"; // Cart collection

/**
 * GET /api/cart?userId=...
 * Fetch all cart items for a given userId
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    // Query all cart items for the user
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("userId", userId),
    ]);

    return NextResponse.json(res.documents);
  } catch (error) {
    console.error("API /api/cart GET error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/cart
 * Add a product to the user's cart or update quantity if it already exists
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Only allow these fields to be stored
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

    // Filter body to allowed fields
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowed.includes(key))
    );

    const userId = filteredBody.userId;
    const productId = filteredBody.productId;
    const quantityToAdd = filteredBody.quantity || 1;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "userId and productId are required" },
        { status: 400 }
      );
    }

    // Check if the product already exists in the user's cart
    const existing = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("userId", userId),
      Query.equal("productId", productId),
    ]);

    if (existing.documents.length > 0) {
      // If exists, merge quantity
      const existingDoc = existing.documents[0];
      const newQuantity = (existingDoc.quantity || 1) + quantityToAdd;

      const updatedDoc = await databases.updateDocument(
        databaseId,
        collectionId,
        existingDoc.$id,
        { quantity: newQuantity }
      );

      return NextResponse.json(updatedDoc);
    } else {
      // If not, create new cart item
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
    console.error("API /api/cart POST error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/cart?id=...&userId=...
 * Remove a cart item by document ID and userId
 */
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
    // Fetch the document first to verify ownership
    const doc = await databases.getDocument(databaseId, collectionId, docId);

    // Check if the userId matches
    if (doc.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Proceed to delete
    await databases.deleteDocument(databaseId, collectionId, docId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API /api/cart DELETE error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PATCH /api/cart
 * Update the quantity of a cart item
 * Body: { id, quantity }
 */
export async function PATCH(request) {
  try {
    const { id, quantity } = await request.json();

    if (!id || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "id and quantity are required" },
        { status: 400 }
      );
    }

    // Update document in Appwrite
    const updatedDoc = await databases.updateDocument(
      databaseId,
      collectionId,
      id,
      { quantity }
    );

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    console.error("API /api/cart PATCH error:", error);

    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
