import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Concha",
    category: "Dulce",
    subCategory: "Pan dulce",
    price: 14,
    unidad: "Pieza",
  },
  {
    id: "2",
    name: "Bolillo",
    category: "Salados",
    subCategory: "Pan salado",
    price: 3,
    unidad: "Pieza",
  },
  {
    id: "3",
    name: "Roles de canela",
    category: "Dulce",
    subCategory: "Pan dulce",
    price: 18,
    unidad: "Pieza",
  },
  {
    id: "4",
    name: "Telera",
    category: "Salados",
    subCategory: "Pan salado",
    price: 4,
    unidad: "Pieza",
  },
  {
    id: "5",
    name: "Donas",
    category: "Dulce",
    subCategory: "Pan dulce",
    price: 12,
    unidad: "Pieza",
  },
  {
    id: "6",
    name: "Cocol",
    category: "Dulce",
    subCategory: "Cocoles",
    price: 10,
    unidad: "Pieza",
  },
  {
    id: "7",
    name: "Baguette",
    category: "Salados",
    subCategory: "Pan salado",
    price: 20,
    unidad: "Pieza",
  },
  {
    id: "8",
    name: "Galleta de mantequilla",
    category: "Dulce",
    subCategory: "Pan dulce",
    price: 8,
    unidad: "Bolsa",
  },
  {
    id: "9",
    name: "Bolsa de bolillo",
    category: "Salados",
    subCategory: "Pan salado",
    price: 25,
    unidad: "Bolsa",
  },
  {
    id: "10",
    name: "Orejas",
    category: "Dulce",
    subCategory: "Pan dulce",
    price: 15,
    unidad: "Pieza",
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
