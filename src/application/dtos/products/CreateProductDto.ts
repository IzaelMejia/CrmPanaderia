// src/domain/repository/product.repository.ts

import { Product } from "@src/domain/entities/product.entity";

// export type CreateProductDto = Omit<
//   Product,
//   "iD_Pan" | "createdAt" | "updatedAt"
// > & {
//   activo?: boolean; // opcional si lo define el servidor
// };

export interface CreateProductDto {
  nombre: string;
  precio: number | string;
  descripcion?: string;
  iD_TipoPan: number | null | undefined;
  iD_Categoria: number | null | undefined;
  iD_Unidad: number | null | undefined;
}
