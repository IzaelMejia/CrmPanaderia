import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";
import { ApiClient } from "./api-client";

const localApiClient = new ApiClient("http://localhost:5097");

export class ProductApiRepository implements ProductRepository {
  //   async getProducts(): Promise<Product[]> {
  //     return localApiClient.get<Product[]>("/api/Pan");
  //   }
  async getProducts(): Promise<Product[]> {
    const data = await localApiClient.get<Product[]>("/api/Pan");
    console.log("Productos desde API:", data);
    return data;
  }
}
