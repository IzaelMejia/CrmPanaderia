import { Order } from "../entities/order.entity";

export interface OrderRepository {
  createOrder(order: Order): Promise<Order>;
}
