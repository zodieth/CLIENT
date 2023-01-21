import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../features/ActionTypes";
import { RootState } from "./store";

export const addProducts = (value:any) => {
  return ({
    type: ActionTypes.PRODUCT_ADD,
    payload: value
  })
};

export const productsLoading = () => ({
  type: ActionTypes.PRODUCT_LOADING
});

export const productsFailed = (value:String) => ({
  type: ActionTypes.PRODUCT_FAILED,
  payload: value
});

export const productsFilter = (value:String, type:String, order:String, costMin:Number, costMax:Number, categorySearch:String, brand:String) => {
  return ({
    type: ActionTypes.PRODUCT_FILTER,
    payload: {value, type, order, costMin, costMax, categorySearch, brand}
  })
};

export const fetchProductsApi = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(productsLoading());
  
  return fetch("http://localhost:3001/products")
  .then(response => {
    if(response.ok){
      return response;
    }else{
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      throw error;
    }
  }, error => {
    var errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json())
  .then(products => {
    dispatch(addProducts(products));
  })
  .catch(error => dispatch(productsFailed(error.message)));
}