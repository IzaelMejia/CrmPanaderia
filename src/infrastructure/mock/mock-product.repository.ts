import { Product } from "@src/domain/entities/product.entity";
import { ProductRepository } from "@src/domain/repository/product.repository";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Concha",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 14,
    unidad: { id: 1, name: "Pieza" },
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Concha_%28pan_dulce_mexicano%29_02.JPG",
    descripcion: "Concha artesanal echa en horno de los años 1960. "
  },
  {
    id: 2,
    name: "Bolillo",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 3,
    unidad: { id: 1, name: "Pieza" },
    image: "https://kokomexico.com/wp-content/uploads/2021/05/BOLILLOS-770x541.jpg",
    descripcion: "Bolillo artesanal echa en horno de los años 1960. "
  },
  {
    id: 3,
    name: "Roles de canela",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 18,
    unidad: { id: 1, name: "Pieza" },
    image: "https://www.midiariodecocina.com/wp-content/uploads/2015/08/Rollos-de-canela01.jpg",
  },
  {
    id: 4,
    name: "Telera",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 4,
    unidad: { id: 1, name: "Pieza" },
    image: "https://www.mamalatinatips.com/wp-content/uploads/2020/06/telera-h-mlt.jpg.webp",
  },
  {
    id: 5,
    name: "Donas",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 12,
    unidad: { id: 1, name: "Pieza" },
    image: "https://mandolina.co/wp-content/uploads/2023/07/donas-glaseadas-1200x900.png",
  },
  {
    id: 6,
    name: "Cocol",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 3, name: "Cocoles" },
    price: 10,
    unidad: { id: 1, name: "Pieza" },
    image: "https://media.glamour.mx/photos/66233c4834f4ed685a13f390/4:3/w_2664,h_1998,c_limit/cocol-el-pan-dulce-mas-saludable.jpg",
  },
  {
    id: 7,
    name: "Baguette",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 20,
    unidad: { id: 1, name: "Pieza" },
    image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/B10F0941-3518-440D-A69F-72EFF5F7826B/Derivates/D5691ACE-1B10-42D8-8364-11402524A36D.jpg",
  },
  {
    id: 8,
    name: "Polvorón",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 8,
    unidad: { id: 1, name: "Pieza" },
    image: "https://laroussecocina.mx/wp-content/uploads/2018/01/Polvoron-001-Larousse-Cocina.jpg.webp",
  },
  {
    id: 9,
    name: "Bolsa de bolillo",
    tipo: { id: 2, name: "Salados" },
    Category: { id: 2, name: "Pan salado" },
    price: 25,
    unidad: { id: 1, name: "Pieza" },
    image: "https://amnoticias.com.mx/images/WhatsApp_Image_2022-02-23_at_12.32.04_PM.jpeg",
  },
  {
    id: 10,
    name: "Orejas",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 1, name: "Pan dulce" },
    price: 40,
    unidad: { id: 2, name: "Bolsa" },
    image: "https://patadegatotv.wordpress.com/wp-content/uploads/2020/11/799e2-orejas20tmb02.jpg",
  },
  {
    id: 11,
    name: "Cocol",
    tipo: { id: 1, name: "Dulce" },
    Category: { id: 3, name: "Cocoles" },
    price: 70,
    unidad: { id: 2, name: "Bolsa" },
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/larazondemexico/RPZJBTMJTNDRTLNNGVBLE7HE7Q.jpeg",
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
