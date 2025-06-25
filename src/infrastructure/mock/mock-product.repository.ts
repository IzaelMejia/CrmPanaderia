import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Concha",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 14,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 2,
    name: "Bolillo",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 3,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 3,
    name: "Roles de canela",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 18,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 4,
    name: "Telera",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 4,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 5,
    name: "Donas",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 12,
    unidad: [
      { id: 1, name: "Pieza" },
      { id: 2, name: "Bolsa" },
    ],
  },
  {
    id: 6,
    name: "Cocol",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 3, name: "Cocoles" },
    price: 10,
    unidad: [
      { id: 1, name: "Pieza" },
      { id: 2, name: "Bolsa" },
    ],
  },
  {
    id: 7,
    name: "Baguette",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 20,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 8,
    name: "Galleta de mantequilla",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 8,
    unidad: [{ id: 1, name: "Pieza" }],
  },
  {
    id: 9,
    name: "Bolsa de bolillo",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 25,
    unidad: [
      { id: 1, name: "Pieza" },
      { id: 2, name: "Bolsa" },
    ],
  },
  {
    id: 10,
    name: "Orejas",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 15,
    unidad: [
      { id: 1, name: "Pieza" },
      { id: 2, name: "Bolsa" },
    ],
  },
];

// Implementamos los metods
export class MockProductRepository implements ProductRepository {
  async getProducts(delay = 2000): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, delay);
    });
  }
}
