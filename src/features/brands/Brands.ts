import * as ActionTypes from "../ActionTypes";

export const Brands = (
  state = {
    isLoading: true,
    errMess: null,
    brandsFilter: [],
    allBrands: []
  },
  action:any
) => {
  switch (action.type) {
    case ActionTypes.BRAND_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        brandsFilter: action.payload,
        allBrands: action.payload
      };

    case ActionTypes.PRODUCT_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        brandsFilter: [] 
      };

    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        brandsFilter: [],
      };

    default:
      return state;
  }
};
