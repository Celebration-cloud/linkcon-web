/* eslint-disable prettier/prettier */
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
} from "../ActionTypes";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
      return { ...state, loading: true };
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };
    case FETCH_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_WISHLIST: {
      // Prevent duplicates by checking both productId and $id
      if (
        state.wishlistItems.find(
          (item) =>
            item.productId === action.payload.productId ||
            item.$id === action.payload.productId ||
            item.productId === action.payload.$id ||
            item.$id === action.payload.$id
        )
      ) {
        return state;
      }

      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    }
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) =>
            item.$id !== action.payload &&
            item.productId !== action.payload &&
            item.productId !== (action.payload?.productId || "") &&
            item.$id !== (action.payload?.$id || "")
        ),
      };
    case "UPDATE_WISHLIST_ITEM":
      return {
        ...state,
        wishlistItems: state.wishlistItems.map((item) =>
          item.$id === action.payload.docId
            ? { ...item, ...action.payload.updateFields }
            : item
        ),
      };
    default:
      return state;
  }
};
