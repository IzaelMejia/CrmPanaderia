import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { CategoriesProductsRepository } from "@src/domain/repository/categories.products-repositoy";
import { OrderRepository } from "@src/domain/repository/order.repository";
import { CategoryApiRepository } from "@src/infrastructure/api/categoria-api-repository";
import { OrderApiRepository } from "@src/infrastructure/api/order-api-repository";
import { MockCategoriesProductsRepository } from "@src/infrastructure/mock/mock-categories.repositoy";
import { CreateOrderDTO, CreateOrderResponse } from "../dtos/create-order.dto";

export class GenerateOrderUseCase {
  constructor(private repo: OrderRepository = new OrderApiRepository()) {}

  // Recibe el DTO exacto que pide el backend y regresa la respuesta del backend
  async execute(dto: CreateOrderDTO): Promise<CreateOrderResponse> {
    return this.repo.createOrder(dto);
  }
}
