import { Category } from "./categories.entity";
import { CategoriesProducts } from "./categoriesProducts.entity";
import { UnidadProduct } from "./unidadProduct.entity";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unidad?: UnidadProduct;
  subCategory?: CategoriesProducts;
}
