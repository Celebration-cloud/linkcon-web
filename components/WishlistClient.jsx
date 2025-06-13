/* eslint-disable prettier/prettier */
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import Image from "next/image";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import { SignInPrompt } from "./SignInPrompt";

import {
  fetchWishlist,
  removeFromWishlist,
} from "@/store/actions/wishlistActions";

export default function WishlistClient() {
  const { user } = useUser();
  const userId = user?.id;
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <SignedIn>
        {wishlistItems.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.$id || item.productId}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <Image
                  priority
                  alt={item.productName}
                  className="object-cover rounded-md mb-3"
                  height={180}
                  src={item.productImageUrl || "/404 Error-rafiki.svg"}
                  style={{ width: "200px", height: "auto" }}
                  width={180}
                />
                <h2 className="font-semibold text-lg mb-1">
                  {item.productName}
                </h2>
                <p className="text-gray-500 mb-2">{item.categoryName}</p>
                <p className="text-red-500 font-bold mb-4">
                  ${item.productPrice}
                </p>
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => router.push(`/item/${item.productId}`)}
                  >
                    View
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      dispatch(
                        removeFromWishlist(item.$id || item.productId, userId)
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </>
  );
}
