import * as ActionTypes from "../ActionTypes";

export const Sales = (
  state = {
    isLoading: true,
    errMess: null,
    allSales: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.SALES_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allSales: action.payload,
      };

    case ActionTypes.SALE_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allSales: state.allSales.concat(action.payload),
      };

    case ActionTypes.SALE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.SALE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case ActionTypes.SALE_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allSales: state.allSales.map((sale: any) => {
          if (sale._id === action.payload._id) return action.payload;
          return sale;
        }),
      };

    default:
      return state;
  }
};
