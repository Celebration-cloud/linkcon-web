/* eslint-disable prettier/prettier */
"use client";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";

import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "@/store/actions/wishlistActions";

export function WishlistButton({ product }) {
  const { user } = useUser();
  const userId = user?.id;
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) =>
    Array.isArray(state.wishlist.wishlistItems)
      ? state.wishlist.wishlistItems
      : []
  );
  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product.productId
  );
  console.log("wishlistitem: ", wishlistItems);

  useEffect(() => {
    if (!userId) return; // Don't fetch if no user is signed in
    // Fetch wishlist items for the user
    dispatch(fetchWishlist(userId));
  }, [userId, dispatch]);

  const handleAdd = () => {
    dispatch(addToWishlist(product, userId));
    addToast({
      title: "Added to Wishlist",
      description: `"${product.productName}" has been added to your wishlist.`,
      status: "success",
      color: "success",
      duration: 3000,
    });
  };

  const wishlistedItem = wishlistItems.find(
    (item) => item.productId === product.productId
  );

  const handleRemove = () => {
    if (!wishlistedItem) return;
    dispatch(removeFromWishlist(wishlistedItem.$id || product.productId, userId));
    addToast({
      title: "Removed from Wishlist",
      description: `"${product.productName}" has been removed from your wishlist.`,
      status: "warning",
      color: "warning",
      duration: 3000,
    });
  };

  return isWishlisted ? (
    <Button
      isIconOnly
      aria-label="Remove from wishlist"
      color="danger"
      onPress={handleRemove}
    >
      <ion-icon name="heart" />
    </Button>
  ) : (
    <Button
      isIconOnly
      aria-label="Add to wishlist"
      color="default"
      onPress={handleAdd}
    >
      <ion-icon name="heart-outline" />
    </Button>
  );
}
