import { CreateOrderDTO, CreateOrderResponse } from "@src/application/dtos/create-order.dto";
import { Order } from "../entities/order.entity";

export interface OrderRepository {
  createOrder(order: CreateOrderDTO): Promise<CreateOrderResponse>;
}
