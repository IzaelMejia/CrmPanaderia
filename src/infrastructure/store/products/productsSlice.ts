import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@src/domain/entities/product.entity";
import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { TypeBread } from "@src/domain/entities/types-bread.entity";
import { UnidadProduct } from "@src/domain/entities/unidadProduct.entity";

interface ProductState {
  product: Product | undefined;
  products: Product[];
  isLoading: boolean;
  errorMessage: string;
  categoryProduct: CategoriesProducts[];
  tipoPan: TypeBread | null | object;
}

const initialState: ProductState = {
  product: undefined,
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
    deleteProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.iD_Pan !== payload
      );
      if (state.product && state.product.iD_Pan) {
        state.product = undefined;
      }
    },
    editProduct: (state, { payload }) => {
      state.products= state.products.map(product => 
        product.iD_Pan === payload.iD_Pan ? { ... product, payload}: product
      );
      if(state.product && state.product.iD_Pan === payload.iD_Pan){
        state.product = { ...state.product , ...payload};
      }
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCategories,
  onSetProduct,
  deleteProduct,
  editProduct,
} = productsSlice.actions;
