import * as ActionTypes from "../ActionTypes";

type Product = {
  name: String;
  description: String;
  price: Number;
  images: [String];
  category: {
    name: String;
  };
  brand: {
    name: String;
  };
  active: Boolean;
};

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
    case ActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (product: Product) => product.name !== action.payload.name
        ),
      };

    default:
      return state;
  }
};
