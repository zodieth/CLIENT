import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { Cart } from "../features/cart/Cart";
import { Products } from "../features/products/Products";
import { Brands } from "../features/brands/Brands";
import { Questions } from "../features/questions/Questions";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Categories } from "../features/categories/Categories";
import { User } from "../features/user/User";
import { Sales } from "../features/sales/Sales";
import { Users } from "../features/user/Users";
import { Claims } from "../features/claims/Claims";

export const store = configureStore({
  reducer: {
    user: User,
    cart: Cart,
    products: Products,
    brands: Brands,
    categories: Categories,
    questions: Questions,
    sales: Sales,
    users: Users,
    claims: Claims,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
