/* eslint-disable prettier/prettier */

import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "./reducers/cartReducer";
import { filteredProductReducer } from "./reducers/filteredProductReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { reviewReducer } from "./reducers/reviewReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filteredProductReducer,
    wishlist: wishlistReducer,
    review: reviewReducer, // Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
