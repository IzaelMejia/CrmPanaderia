import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";
import { ProductApiRepository } from "@src/infrastructure/api/product-api.repository";
import { MockProductRepository } from "@src/infrastructure/mock/mock-product.repository";
import { CreateProductDto } from "../dtos/products/CreateProductDto";

export class GetProductsUseCase {
  // Inyectamos los metodos
  // constructor(private repo: ProductRepository = new MockProductRepository()) {}
  constructor(private repo: ProductRepository = new ProductApiRepository()) {}

  execute(): Promise<Product[]> {
    return this.repo.getProducts();
  }

  createProduct(payload: CreateProductDto): Promise<Product> {
    return this.repo.createProduct(payload);
  }

  deleteProduct(productId: number): Promise<void> {
    return this.repo.deleteProduct(productId);
  }
}
