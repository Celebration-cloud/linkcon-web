/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { addProductReview } from "@/store/actions/reviewActions";

export default function ProductReviews({ productId }) {
  const dispatch = useDispatch();
  const { reviews: reviewsRaw = [], loading } = useSelector(
    (state) => state.review
  );
  // Ensure reviews is always an array
  const reviews = Array.isArray(reviewsRaw) ? reviewsRaw : [];
  const { user } = useUser();

  // Form state
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || !rating) return;
    dispatch(
      addProductReview(productId, {
        productId,
        rating,
        comment,
        date: new Date().toISOString(),
        user:
          user?.fullName ||
          user?.username ||
          user?.emailAddresses?.[0]?.emailAddress ||
          "Anonymous",
        avatar: user?.imageUrl || null,
        userId: user?.id || "anonymous",
      })
    );
    setComment("");
    setRating(0);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>
      <SignedIn>
        <form
          className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">Your Rating:</span>
            <Rating
              cancel={false}
              value={rating}
              onChange={(e) => setRating(e.value)}
            />
          </div>
          <textarea
            required
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="Write your review..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            color="primary"
            disabled={loading || !comment || !rating}
            type="submit"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </SignedIn>
      <SignedOut>
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
          <span className="text-gray-500">Sign in to write a review.</span>
        </div>
      </SignedOut>
      <div className="flex flex-col gap-4">
        {reviews.length === 0 && (
          <div className="text-gray-400 text-center">No reviews yet.</div>
        )}
        {reviews.map((review) => (
          <div
            key={review.$id || review.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 mb-1">
              <Rating readOnly cancel={false} value={review.rating} />
              <span className="text-xs text-gray-400 ml-2">
                {review.date
                  ? formatDistanceToNow(new Date(review.date), {
                      addSuffix: true,
                    })
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {review.avatar && (
                <Image
                  alt={review.user}
                  className="w-6 h-6 rounded-full"
                  height={24}
                  src={review.avatar}
                  width={24}
                />
              )}
              <span className="text-xs text-gray-500">{review.user}</span>
            </div>
            <p className="text-sm mt-1">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
