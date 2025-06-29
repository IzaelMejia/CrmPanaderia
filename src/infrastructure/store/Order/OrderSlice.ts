import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderItem } from "@src/domain/entities/order.entity";
import { Product } from "@src/domain/entities/product.entity";

interface OrderState {
  orders: Order[];
  currentItems: OrderItem[];
  isLoading: boolean;
  errorMessage: string;
  total: number;
}

const initialState: OrderState = {
  orders: [],
  currentItems: [],
  isLoading: false,
  errorMessage: "",
  total: 0,
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
    addProductToOrder: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.currentItems.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        existing.quantity += quantity;

        if (existing.quantity <= 0) {
          //lo quitamos si llega a 0
          state.currentItems = state.currentItems.filter(
            (item) => item.product.id != product.id
          );
        }
      } else if (quantity > 0) {
        //sino lo agregamos
        state.currentItems.push({ product, quantity });
      }
      state.total = state.currentItems.reduce(
        //calculamos total de todos los productos
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    removeProductFromOrder: (state, action: PayloadAction<number>) => {
      state.currentItems = state.currentItems.filter(
        (item) => item.product.id !== action.payload
      );
      state.total = state.currentItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
  },
});

export const {
  setLoadingOrder,
  addOrder,
  addProductToOrder,
  removeProductFromOrder,
} = orderSlice.actions;
