import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../../models/Product";
import axios from "axios";



export const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: []
  },
  reducers: {
    setProducts: (state, action) => {
      state = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;

export const getAllProducts = () => (dispatch: any) => {
  axios.get("http://localhost:3001/products").then((res) => {
    dispatch(setProducts(res.data));
  }).catch((error) => console.log(error))
}