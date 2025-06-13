/* eslint-disable prettier/prettier */
import {
  ADD_PRODUCT_REVIEW_SUCCESS,
  ADD_PRODUCT_REVIEW_FAILURE,
  FETCH_PRODUCT_REVIEWS_REQUEST,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE,
} from "../ActionTypes";

// Fetch reviews for a product
export const fetchProductReviews = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REVIEWS_REQUEST });
  try {
    const res = await fetch(`/api/review?productId=${productId}`, {
      cache: "no-store",
    });
    const data = await res.json();

    dispatch({ type: FETCH_PRODUCT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_REVIEWS_FAILURE, payload: error.message });
  }
};

// Add a review for a product
export const addProductReview = (productId, review) => async (dispatch) => {
  // Optimistically update Redux
  const optimisticReview = {
    ...review,
    productId,
    $id: `temp-${Date.now()}`, // Temporary ID for React key
  };
  
  dispatch({ type: ADD_PRODUCT_REVIEW_SUCCESS, payload: optimisticReview });

  try {
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...review, productId }),
      cache: "no-store",
    });
    const data = await res.json();

    // Optionally, replace the optimistic review with the real one from Appwrite
    dispatch(fetchProductReviews(productId));
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_REVIEW_FAILURE, payload: error.message });
  }
};
