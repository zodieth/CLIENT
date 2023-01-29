import * as ActionTypes from "../ActionTypes";

export const Categories = (
  state = {
    isLoading: true,
    errMess: null,
    categoriesFilter: [],
    allCategories: []
  },
  action:any
) => {
  switch (action.type) {
    case ActionTypes.CATEGORIES_ADD:
      return {...state, isLoading: false, errMess: null, categoriesFilter: action.payload,
        allCategories: action.payload,};

    case ActionTypes.CATEGORY_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categoriesFilter: action.payload,
        allCategories: state.allCategories.concat(action.payload),
      };

    case ActionTypes.CATEGORY_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        categoriesFilter: [] 
      };

    case ActionTypes.CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        categoriesFilter: [],
      };

    default:
      return state;
  }
};
