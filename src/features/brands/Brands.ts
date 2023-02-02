import * as ActionTypes from "../ActionTypes";
import interfaceBrand from  "../brands/interfaceBrand";

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

    case ActionTypes.BRAND_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        brandsFilter: [] 
      };

    case ActionTypes.BRAND_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        brandsFilter: [],
      };

    case ActionTypes.BRAND_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allBrands: state.allBrands.map((brand:interfaceBrand) => {
          if(brand._id === action.payload._id)
            return action.payload;
          return brand;
        }),
      };
      
    default:
      return state;
  }
};
