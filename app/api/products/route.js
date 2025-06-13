/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";

import { databases } from "@/libs/appwriteClient";

const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = "products"; // Your collection ID

export async function GET() {
  try {
    const res = await databases.listDocuments(databaseId, collectionId);

    return NextResponse.json(res.documents);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const doc = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()", // or use a custom ID
      body,
    );

    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
