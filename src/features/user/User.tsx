import * as ActionTypes from "../ActionTypes";

// interface usuario {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   phoneNumber: string;
//   location: string;
//   favorites: [];
//   isAdmin: boolean;
//   active: boolean;
//   shoppingCart: [];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

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
