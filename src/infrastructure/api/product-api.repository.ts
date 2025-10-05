import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";
import { ApiClient } from "./api-client";
import { CreateProductDto } from "@src/application/dtos/products/CreateProductDto";
import { UpdateProductDto } from "@src/application/dtos/products/UpdateProductDto";

const apiUrl = process.env.EXPO_PUBLIC_HOST;
const localApiClient = new ApiClient(apiUrl || "http://localhost:5097");

export class ProductApiRepository implements ProductRepository {
  async deleteProduct(productId: number): Promise<any> {
    try {
      const response = await localApiClient.delete(`/api/Pan/${productId}`);
      console.log("📌 Respuesta de deleteProduct:", response);
      return response;
    } catch (error: any) {
      console.error(`❌ Error deleteProduct (${productId}):`, error.message);
      throw error;
    }
  }

  async updateProduct(payload: UpdateProductDto): Promise<Product> {
    try {
      const data = await localApiClient.put<Product>(
        `/api/Pan/${payload.iD_Pan}`,
        payload
      );
      return data;
    } catch (error: any) {
      console.error("❌ Error createProduct:", error.message);
      throw error;
    }
  }

  async createProduct(payload: CreateProductDto): Promise<Product> {
    try {
      const data = await localApiClient.post<Product>("/api/Pan", payload);
      console.log("Response createProduct:", data );
      
      return data;
    } catch (error: any) {
      console.error("❌ Error createProduct:", error.message);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const data = await localApiClient.get<Product[]>("/api/Pan");
      return data;
    } catch (error: any) {
      console.error("❌ Error getProducts:", error.message);
      throw error;
    }
  }
}
