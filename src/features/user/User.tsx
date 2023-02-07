import * as ActionTypes from "../ActionTypes";

export const User = (
  state = {
    user: {},
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
