/* eslint-disable prettier/prettier */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Rating } from "primereact/rating";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { addToast } from "@heroui/toast";

import { addToCart } from "../store/actions/cartActions";

import { IncrementButton } from "./IncrementButton";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import { ProductSignInPrompt } from "./ProductSignInPrompt";

import { fetchProductReviews } from "@/store/actions/reviewActions";

export const ProductActions = ({ temuProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const reviewsRaw = useSelector((state) => state.review.reviews);
  const reviews = Array.isArray(reviewsRaw) ? reviewsRaw : [];
  const { user } = useUser();
  const userId = user?.id;

   useEffect(() => {
     if (temuProduct.productId) {
       dispatch(fetchProductReviews(temuProduct.productId));
     }
   }, [dispatch, temuProduct.productId]);

  // Filter reviews for this product
  const productReviews = reviews.filter(
    (review) => review.productId === temuProduct.productId
  );

  console.log("Product Reviews:", productReviews);
  // If no reviews, return empty array

  // Sum ratings
  const totalRating = productReviews.reduce(
    (sum, r) => sum + (r.rating || 0),
    0
  );

  // Optionally, calculate average rating
  const averageRating =
    productReviews.length > 0 ? totalRating / productReviews.length : 0;

  const handleBuyNow = () => {
    if (!userId) {
      // Show sign-in required toast or modal
      addToast({
        title: "Sign in required",
        description: "Please sign in to buy now.",
        status: "warning",
        color: "warning",
        duration: 3000,
      });

      return;
    }
    dispatch(addToCart({ ...temuProduct, quantity }, userId));
    addToast({
      title: "Added to Cart",
      description: `"${temuProduct.productName}" has been added to your cart. Proceeding to checkout...`,
      status: "success",
      color: "success",
      duration: 3000,
    });
    router.push("/checkout");
  };

  return (
    <>
      <h2 className="text-7xl font-extrabold max-md:text-3xl max-sm:text-2xl">
        {temuProduct.productName}
      </h2>
      <h5 className="text-3xl max-md:text-xl max-sm:text-md">
        Category: {temuProduct.categoryName}
      </h5>
      <p className="text-red-500 text-xl">${temuProduct.productPrice}</p>
      {/* Show total and average rating */}
      <div className="mb-2">
        <span className="text-sm text-gray-500">
          Total Rating: {productReviews.length} | Average: {averageRating.toFixed(1)}
        </span>
      </div>
      <Rating cancel={false} value={averageRating} />
      <SignedIn>
        <div className="flex items-center gap-5">
          <IncrementButton setValue={setQuantity} value={quantity} />
          <WishlistButton product={temuProduct} />
        </div>
        <div className="flex items-center gap-5">
          <AddToCartButton product={{ ...temuProduct, quantity }} />
          <Button color="danger" onPress={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        <ProductSignInPrompt />
      </SignedOut>
    </>
  );
};
