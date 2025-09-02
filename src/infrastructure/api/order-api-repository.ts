import { OrderRepository } from "@src/domain/repository/order.repository";
import { ApiClient } from "./api-client";
import {
  CreateOrderDTO,
  CreateOrderResponse,
} from "@src/application/dtos/create-order.dto";

const apiUrl = process.env.EXPO_PUBLIC_HOST;
const localApiClient = new ApiClient(apiUrl || "http://localhost:5097");

export class OrderApiRepository implements OrderRepository {
  /**
   * Crea una nueva orden en el sistema.
   * @param dto Datos de la orden que se va a crear (DTO)
   * @returns Respuesta del servidor con status y iD_Venta
   */

  async createOrder(dto: CreateOrderDTO): Promise<CreateOrderResponse> {
    try {
      //TIPO de dato que regresa el servidor :  CreateOrderResponse
      const response = await localApiClient.post<CreateOrderResponse>(
        "/api/Ventas",
        dto
      );
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
}
