/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART,
  FETCH_CART_SUCCESS,
} from "../ActionTypes";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CART_SUCCESS:
      return { ...state, cartItems: Array.isArray(payload) ? payload : [] };
    case ADD_TO_CART: {
      const items = Array.isArray(state.cartItems) ? state.cartItems : [];
      const exists = items.find(
        (item) =>
          item.productId === payload.productId || item.$id === payload.productId
      );

      if (exists) {
        // If already in cart, increase quantity by the amount added
        return {
          ...state,
          cartItems: items.map((item) =>
            item.productId === payload.productId ||
            item.$id === payload.productId
              ? { ...item, quantity: item.quantity + (payload.quantity || 1) }
              : item
          ),
        };
      }

      // Add new item with specified quantity or 1
      return {
        ...state,
        cartItems: [...items, { ...payload, quantity: payload.quantity || 1 }],
      };
    }
    case REMOVE_FROM_CART: {
      const items = Array.isArray(state.cartItems) ? state.cartItems : [];

      return {
        ...state,
        cartItems: items.filter(
          (item) =>
            item.productId !== payload &&
            item.$id !== payload &&
            item.productId !== payload.productId
        ),
      };
    }
    case UPDATE_CART_ITEM_QUANTITY: {
      const items = Array.isArray(state.cartItems) ? state.cartItems : [];

      return {
        ...state,
        cartItems: items.map((item) =>
          item.productId === payload.productId || item.$id === payload.productId
            ? { ...item, quantity: payload.quantity }
            : item
        ),
      };
    }
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
