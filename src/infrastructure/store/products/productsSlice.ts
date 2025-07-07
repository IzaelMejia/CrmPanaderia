import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@src/domain/entities/product.entity";
import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { TypeBread } from "@src/domain/entities/types-bread.entity";
import { UnidadProduct } from "@src/domain/entities/unidadProduct.entity";

interface ProductState {
  product: Product | null | object;
  products: Product[];
  isLoading: boolean;
  errorMessage: string;
  categoryProduct: CategoriesProducts[];
  tipoPan: TypeBread | null | object;
}

const initialState: ProductState = {
  product: {},
  products: [],
  tipoPan: {},
  isLoading: false,
  errorMessage: "",
  categoryProduct: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    setCategories: (state, action) => {
      state.categoryProduct = action.payload;
    },
    onSetProduct: (state, { payload }) => {
      state.product = { ...payload };
    },
  },
});

export const { setLoading, setProducts, setCategories, onSetProduct } = productsSlice.actions;
