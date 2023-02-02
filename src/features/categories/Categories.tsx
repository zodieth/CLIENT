import * as ActionTypes from "../ActionTypes";
import interfaceCategory from  "../categories/interfaceCategory";

export const Categories = (
  state = {
    isLoading: true,
    errMess: null,
    categoriesFilter: [],
    allCategories: [],
    selectedCategory: null
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

    case ActionTypes.CATEGORY_DELETE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categoriesFilter: action.payload,
        allCategories: state.allCategories.filter((category:interfaceCategory) => category._id !== action.payload),
      };

    case ActionTypes.CATEGORY_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allCategories: state.allCategories.map((category:interfaceCategory) => {
          if(category._id === action.payload._id)
            return action.payload;
          return category;
        }),
      };
      
    default:
      return state;
  }
};
