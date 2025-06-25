import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";
import { MockProductRepository } from "@src/infrastructure/mock/mock-product.repository";

export class GetProductsUseCase {
  // Inyectamos los metodos
  constructor(private repo: ProductRepository = new MockProductRepository()) {}

  execute(): Promise<Product[]> {
    return this.repo.getProducts();
  }
}
