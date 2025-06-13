/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART,
  FETCH_CART_SUCCESS,
} from "../ActionTypes";

// Fetch cart for a user
export const fetchCart = (userId) => async (dispatch) => {
  const res = await fetch(`/api/cart?userId=${userId}`, {
    cache: "no-store", // Always get fresh data
  });
  const data = await res.json();

  dispatch({ type: FETCH_CART_SUCCESS, payload: data });
};

const revalidateCart = async (path = "/cart") => {
  await fetch(`/api/revalidate?path=${encodeURIComponent(path)}`, {
    method: "POST",
  });
};

// Add to cart for a user (optimistic)
export const addToCart = (item, userId) => async (dispatch) => {
  // Optimistically update Redux
  dispatch({ type: ADD_TO_CART, payload: { ...item, userId } });

  // Then update the database
  try {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ ...item, userId }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensure no cache
    });
    dispatch(fetchCart(userId));
    await revalidateCart(location.pathname); // revalidates current page
  } catch (error) {
    dispatch(fetchCart(userId));
    console.error("Failed to add item to cart:", error);
  }
};

// Remove from cart (optimistic)
export const removeFromCart = (itemId, userId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: itemId });

  try {
    await fetch(`/api/cart?id=${itemId}&userId=${userId}`, {
      method: "DELETE",
      cache: "no-store", // Ensure no cache
    });
    dispatch(fetchCart(userId));
    await revalidateCart(location.pathname); // revalidates current page
  } catch (error) {
    dispatch(fetchCart(userId));
    console.error("Failed to remove item from cart:", error);
  }
};

// Update cart item quantity (optimistic)
export const updateCartItemQuantity =
  (docId, quantity, userId) => async (dispatch) => {
    // Optimistically update Redux
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: { productId: docId, quantity },
    });

    try {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, quantity }),
        cache: "no-store",
      });
      // No need to fetchCart here for speed!
      // Optionally, revalidate static page if needed
      await revalidateCart(location.pathname);
    } catch (error) {
      // If error, you may want to sync state with server
      dispatch(fetchCart(userId));
      console.error("Failed to update cart item quantity:", error);
    }
  };

export const clearCart = () => ({
  type: CLEAR_CART,
});

/*
 * OPTIONAL: If you use Next.js 13+ and want to revalidate a static cart page after mutation,
 * you can create a /api/revalidate endpoint and call it here after each mutation:
 *
 * await fetch("/api/revalidate?path=/cart", { method: "POST" });
 *
 * This will trigger on-demand revalidation for the /cart page.
 */
