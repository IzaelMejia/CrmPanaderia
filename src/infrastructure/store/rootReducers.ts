import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { productsSlice } from "./products/productsSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products: productsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
