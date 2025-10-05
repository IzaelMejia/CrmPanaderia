import { Product } from "@src/domain/entities/product.entity";

export type UpdateProductDto = Omit<Product, "createdAt" | "updatedAt"> & {
  activo?: boolean; // opcional si lo define el servidor
};
