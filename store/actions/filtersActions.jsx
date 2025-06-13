/* eslint-disable prettier/prettier */
import { APPLY_FILTERS, RESET_FILTERS } from "../ActionTypes";

export const applyFilters =
  (filteredProducts, searchQuery) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLY_FILTERS,
        payload: { filteredProducts, searchQuery },
      });
    } catch (error) {
      console.error("Unable to filter", error);
    }
  };
export const resetFilters = (products) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_FILTERS,
      payload: { products },
    });
  } catch (error) {
    console.error("Unable to reset filter", error);
  }
};

