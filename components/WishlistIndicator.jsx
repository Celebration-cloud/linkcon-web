/* eslint-disable prettier/prettier */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { fetchWishlist } from "@/store/actions/wishlistActions";

export default function WishlistIndicator() {
  const { user } = useUser();
  const userId = user?.id;
  const wishlistCount = useSelector(
    (state) => state.wishlist.wishlistItems.length
  );
  const router = useRouter();
  const dispatch = useDispatch();

    useEffect(() => {
      // Fetch wishlist items for the user
      dispatch(fetchWishlist(userId));
    }, [userId, dispatch]);

  return wishlistCount > 0 ? (
    <Badge
      color="danger"
      content={wishlistCount}
      shape="rectangle"
      showOutline={false}
      size="sm"
    >
      <Button
        isIconOnly
        aria-label="Wishlist"
        className="bg-foreground-300 relative -ml-1.5"
        size="sm"
        variant="bordered"
        onPress={() => router.push("/wishlist")}
      >
        <ion-icon suppressHydrationWarning name="heart-outline" size="small" />
      </Button>
    </Badge>
  ) : (
    <Button
      isIconOnly
      aria-label="Wishlist"
      className="bg-foreground-300 relative"
      size="sm"
      variant="bordered"
      onPress={() => router.push("/wishlist")}
    >
      <ion-icon suppressHydrationWarning name="heart-outline" size="small" />
    </Button>
  );
}
