import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { productsSlice } from "./products/productsSlice";
import { orderSlice } from "./Order/OrderSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products: productsSlice.reducer,
  orders: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
