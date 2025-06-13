/* eslint-disable prettier/prettier */

import { APPLY_FILTERS, RESET_FILTERS } from "../ActionTypes";


const initialState = {
  filteredProducts: [],
  isLoading: true,
  isFiltersOpen: false,
  searchQuery: "",
};

export const filteredProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case APPLY_FILTERS:
      return {
        ...state,
        filteredProducts: payload.filteredProducts,
        isLoading: false,
        isFiltersOpen: false,
        searchQuery: payload.searchQuery
      };
    case RESET_FILTERS:
      return {
        ...state,
        filteredProducts: payload.products,
        isLoading: false,
        isFiltersOpen: false,
        searchQuery: "",
      };
    default:
      return state;
  }
};
