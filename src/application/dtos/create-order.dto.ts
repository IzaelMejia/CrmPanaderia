export interface CreateOrderDTO {
  iD_Usuario: number;
  formaPago: string;
  detalles: {
    iD_Pan: number;
    cantidad: number;
    precioUnitario: number;
  }[];
}

export interface CreateOrderResponse {
  statusCode: number;
  message: string;
  iD_Venta: number;
}
