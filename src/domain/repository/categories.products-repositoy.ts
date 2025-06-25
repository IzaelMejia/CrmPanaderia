import { CategoriesProducts} from "../entities/categoriesProducts.entity";

export interface CategoriesProductsRepository {
    getCategoriesProducts():Promise<CategoriesProducts[]>;
}