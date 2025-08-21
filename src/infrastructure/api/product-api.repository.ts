import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";
import { ApiClient } from "./api-client";

const apiUrl = process.env.EXPO_PUBLIC_HOST;
const localApiClient = new ApiClient(apiUrl || "http://localhost:5097");

export class ProductApiRepository implements ProductRepository {
  // Inyectar datos MOCK
  //   async getProducts(): Promise<Product[]> {
  //     return localApiClient.get<Product[]>("/api/Pan");
  //   }
  async getProducts(): Promise<Product[]> {
  try {
    const data = await localApiClient.get<Product[]>("/api/Pan");
    // console.log("getProducts API:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error getProducts:", error.message);
    throw error;
  }
}

}
