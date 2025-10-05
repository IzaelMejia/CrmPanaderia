import { CreateProductDto } from "@src/application/dtos/products/CreateProductDto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "@src/application/dtos/products/UpdateProductDto";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  createProduct(product: CreateProductDto): Promise<Product>;
  updateProduct(product: UpdateProductDto): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
}
