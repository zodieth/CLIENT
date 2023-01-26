import * as ActionTypes from "../ActionTypes";

type Product = {
  name: String;
  price: Number;
  images: [String];
  count: number;
};

const initialState = {
  cart: []
}

export const Cart = (
  state: { cart: Product[]; } = initialState,
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
      case ActionTypes.ADD_COUNT: 
      return {
        ...state,
        cart: state.cart.map((product: Product) => {
          if (product.name === action.payload.productName) {
            return {...product, count: product.count + 1}
          }
          return product;
        })
      }

    case ActionTypes.REMOVE_COUNT:
      return {
        ...state,
        cart: state.cart.map((product: Product) => {
          if (product.name === action.payload.productName) {
            return {...product, count: product.count - action.payload.count }
          }
          return product;
        })
      }

    default:
      return state;
  }
};
