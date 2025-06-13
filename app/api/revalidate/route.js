/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
