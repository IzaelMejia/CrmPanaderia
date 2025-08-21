import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";
import { CategoryApiRepository } from "@src/infrastructure/api/categoria-api-repository";
import { MockCategoriesProductsRepository } from "@src/infrastructure/mock/mock-categories.repositoy";

export class GetCategoriesProducts {
  //Datos MOCK
  // constructor(
  //   private repo: CategoriesProductsRepository = new MockCategoriesProductsRepository()
  // ) {}
  constructor(
    private repo: CategoriesProductsRepository = new CategoryApiRepository()
  ) {}

  execute(): Promise<CategoriesProducts[]> {
    return this.repo.getCategoriesProducts();
  }
}
