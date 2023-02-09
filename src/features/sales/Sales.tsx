import * as ActionTypes from "../ActionTypes";

export const Sales = (
  state = {
    sales: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.GET_SALES:
      return {
        ...state,
        sales: action.payload,
      };

    default:
      return state;
  }
};
