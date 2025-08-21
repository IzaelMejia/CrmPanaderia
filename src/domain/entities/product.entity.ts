import { TypeBread } from "./types-bread.entity";
import { CategoriesProducts } from "./categoriesProducts.entity";
import { UnidadProduct } from "./unidadProduct.entity";

export interface Product {
  iD_Pan: number;
  nombre: string;
  tipo: TypeBread;
  precio: number;
  unidad?: UnidadProduct;
  categoria?: CategoriesProducts;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
  imagen: string;
  activo: boolean;
}

