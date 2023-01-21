import { configureStore, ThunkAction, AnyAction  } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice';
import { Products } from "../features/products/Products";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    counter: cartReducer,
    products: Products,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk).concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
