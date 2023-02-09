import * as ActionTypes from "../ActionTypes";

export const Claims = (
  state = {
    isLoading: true,
    errMess: null, 
    allClaims: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.CLAIMS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allClaims: action.payload,
      };

    case ActionTypes.CLAIM_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allClaims: state.allClaims.concat(action.payload),
      };

    case ActionTypes.CLAIM_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        allClaims: [],
      };

    case ActionTypes.CLAIM_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        allClaims: [],
      };

    case ActionTypes.CLAIM_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allClaims: state.allClaims.map((claim: any) => {
          if(claim._id === action.payload._id)
            return action.payload;
          return claim;
        }),
      };

    default:
      return state;
  }
};
