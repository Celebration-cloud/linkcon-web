/* eslint-disable prettier/prettier */
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
} from "../ActionTypes";

// Fetch wishlist for a user
export const fetchWishlist = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_WISHLIST_REQUEST });
  try {
    const res = await fetch(`/api/wishlist?userId=${userId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_WISHLIST_FAILURE, payload: error.message });
  }
};

// Add to wishlist for a user (optimistic)
export const addToWishlist = (product, userId) => async (dispatch) => {
  // Optimistically update Redux
  dispatch({ type: ADD_TO_WISHLIST, payload: { ...product, userId } });

  try {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({ ...product, userId }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    dispatch(fetchWishlist(userId));
  } catch (error) {
    dispatch(fetchWishlist(userId));
  }
};

// Remove from wishlist for a user (optimistic)
export const removeFromWishlist = (docId, userId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: docId });

  try {
    await fetch(`/api/wishlist?id=${docId}&userId=${userId}`, {
      method: "DELETE",
      cache: "no-store",
    });
    dispatch(fetchWishlist(userId));
  } catch (error) {
    dispatch(fetchWishlist(userId));
  }
};

