/* eslint-disable prettier/prettier */
// store/actions/filtersActions.js

import { APPLY_FILTERS, RESET_FILTERS } from "../ActionTypes";

export const applyFilters =
  (filteredProducts, searchQuery) => async (dispatch) => {
    dispatch({
      type: APPLY_FILTERS,
      payload: { filteredProducts, searchQuery },
    });
  };

export const resetFilters = (products) => async (dispatch) => {
  dispatch({
    type: RESET_FILTERS,
    payload: { products },
  });
};
