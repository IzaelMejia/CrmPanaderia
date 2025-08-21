import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";

export const mockSubCagories: CategoriesProducts[] = [
  {
    iD_Categoria: 1,
    nombre: "Pan de dulce",
  },
  {
    iD_Categoria: 2,
    nombre: "Pan salado",
  },
  {
    iD_Categoria: 3,
    nombre: "Cocoles",
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
