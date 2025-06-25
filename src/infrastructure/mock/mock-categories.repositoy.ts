import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";

export const mockSubCagories: CategoriesProducts[] = [
  {
    id: 1,
    name: "Pan de dulce",
  },
  {
    id: 2,
    name: "Pan salado",
  },
  {
    id: 3,
    name: "Cocoles",
  },
];

export class MockCategoriesProductsRepository
  implements CategoriesProductsRepository
{
  async getCategoriesProducts(
    delay = 500
  ): Promise<CategoriesProducts[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSubCagories);
      }, delay);
    });
  }
}
