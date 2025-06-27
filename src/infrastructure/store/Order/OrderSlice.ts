import { createSlice } from "@reduxjs/toolkit";
import { Order, OrderItem } from "@src/domain/entities/order.entity";

interface OrderState {
  orders: Order[];
  currentItems: OrderItem[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: OrderState = {
  orders: [],
  currentItems: [],
  isLoading: false,
  errorMessage: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setLoadingOrder: (state) => {
      state.isLoading = true;
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
});

export const { setLoadingOrder, addOrder } = orderSlice.actions;
