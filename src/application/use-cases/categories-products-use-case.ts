import { CategoriesProducts} from "@src/domain/entities/categoriesProducts.entity";
import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";
import { MockCategoriesProductsRepository } from "@src/infrastructure/mock/mock-categories.repositoy";

export class GetCategoriesProducts {
  constructor(
    private repo: CategoriesProductsRepository = new MockCategoriesProductsRepository()
  ) {}

  execute(): Promise<CategoriesProducts[]> {
    return this.repo.getCategoriesProducts();
  }
}
