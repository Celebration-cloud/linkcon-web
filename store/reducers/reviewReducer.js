/* eslint-disable prettier/prettier */
import {
  ADD_PRODUCT_REVIEW_REQUEST,
  ADD_PRODUCT_REVIEW_SUCCESS,
  ADD_PRODUCT_REVIEW_FAILURE,
  FETCH_PRODUCT_REVIEWS_REQUEST,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE,
} from "../ActionTypes";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REVIEWS_REQUEST:
    case ADD_PRODUCT_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };
    case ADD_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [action.payload, ...state.reviews],
      };
    case FETCH_PRODUCT_REVIEWS_FAILURE:
    case ADD_PRODUCT_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
