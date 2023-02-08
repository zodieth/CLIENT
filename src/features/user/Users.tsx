import * as ActionTypes from "../ActionTypes";

export const Users = (
  state = {
    isLoading: true,
    errMess: null, 
    allUsers: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.USERS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allUsers: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case ActionTypes.USER_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allUsers: state.allUsers.map((user:any) => {
          if(user._id === action.payload._id)
            return action.payload;
          return user;
        }),
      };

    default:
      return state;
  }
};
