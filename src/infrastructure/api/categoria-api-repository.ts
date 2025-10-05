import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";
import { ApiClient } from "./api-client";
import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";

const apiUrl = process.env.EXPO_PUBLIC_HOST;
const localApiClient = new ApiClient(apiUrl || "http://localhost:5097");

export class CategoryApiRepository implements CategoriesProductsRepository {
  async getCategoriesProducts(): Promise<CategoriesProducts[]> {
    try {
      const data =
        await localApiClient.get<CategoriesProducts[]>("/api/categorias");
      // console.log("getCategoriesProducts API:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Error getCategoriesProducts:", error.message);
      throw error;
    }
  }
}
