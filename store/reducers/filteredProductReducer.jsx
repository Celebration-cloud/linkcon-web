/* eslint-disable prettier/prettier */

// store/reducers/filtersReducer.js

import { APPLY_FILTERS, RESET_FILTERS } from "../ActionTypes";

const initialState = {
  filteredProducts: [],
  isLoading: true,
  isFiltersOpen: false,
  searchQuery: "",
};

export const filteredProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_FILTERS:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
        isLoading: false,
        isFiltersOpen: false,
        searchQuery: action.payload.searchQuery,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filteredProducts: action.payload.products,
        isLoading: false,
        isFiltersOpen: false,
        searchQuery: "",
      };
    default:
      return state;
  }
};
