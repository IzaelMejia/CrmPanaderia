import { Product, ProductForOrder } from "./product.entity";


export interface OrderItem {
  product: ProductForOrder;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
}

// {
//   "userId": 1,
//   "items": [
//     { "productId": 1, "quantity": 2 },
//     { "productId": 2, "quantity": 3 }
//   ]
// }


// {
//   "userId": 1,
//   "items": [
//     {
//       "product": {
//         "id": 1,
//         "name": "Concha",
//         "tipo": { "id": 1, "name": "Dulce" },
//         "price": 14
//       },
//       "quantity": 2
//     },
//     {
//       "product": {
//         "id": 2,
//         "name": "Bolillo",
//         "tipo": { "id": 2, "name": "Salados" },
//         "price": 3
//       },
//       "quantity": 3
//     }
//   ],
//   "total": 37
// }
