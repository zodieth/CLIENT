import * as ActionTypes from "../ActionTypes";

export const Cart = (
  state = {
    cart: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      };

    default:
      return state;
  }
};
