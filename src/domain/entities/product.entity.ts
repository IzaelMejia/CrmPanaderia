import { TypeBread } from "./types-bread.entity";
import { CategoriesProducts } from "./categoriesProducts.entity";
import { UnidadProduct } from "./unidadProduct.entity";

export interface Product {
  id: number;
  name: string;
  tipo: TypeBread;
  price: number;
  unidad?: UnidadProduct;
  Category?: CategoriesProducts;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
  image: string;
}

