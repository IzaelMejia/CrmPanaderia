import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { GetCategoriesProducts } from "@src/application/use-cases/categories-products-use-case";
import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { GetProductsUseCase } from "@src/application/use-cases/get-products.use-case";
import { InputSearch } from "@src/presentation/components/InputSearch/InputSearch";
import TouchDrawer from "@src/presentation/components/TouchDrawer/TouchDrawer";
import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";
import { CategoriesCards } from "./components/CategoriesCards";
import { Product } from "@src/domain/entities/product.entity";
import { ProductCards } from "./components/ProductCards";
import { DetailOrden } from "./components/DetailOrden";
import { InfoSwitch } from "./components/InfoSwitch";
import { Colors } from "@constants/Colors";

export const HomeScreen = () => {
  const { logged, permission, user } = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<CategoriesProducts[]>(
    []
  );

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const useCase = new GetProductsUseCase();
    useCase.execute().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const useCase = new GetCategoriesProducts();
    useCase.execute().then((data) => {
      setSubCategories(data);
      setLoadingCategories(false);
    });
  }, []);

  const handleSubmit = (text: string) => {
    console.log("🔍 Buscar:", text);
  };

  return (
    <View className="flex-1 flex flex-row" style={styles.container}>
      <View style={styles.containerLeft} className=" p-4">
        <View className="d-flex flex-row items-center gap-5">
          <TouchDrawer />
          <InputSearch
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSubmit}
            placeholder="Buscar productos..."
          />
        </View>
        <View className="mt-8">
          <CategoriesCards data={subCategories} />
        </View>
        <View className="mt-3 d-flex flex-row justify-between">
          <InfoSwitch />
        </View>
        <View className="mt-4 ">
          <ProductCards data={products} loading={loading} />
        </View>
      </View>
      <View style={styles.containerRigth}>
        <DetailOrden />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    flex: 1,
  },
  containerLeft: {
    width: "75%",
  },
  containerRigth: {
    width: "25%",
    height: "100%",
    backgroundColor: Colors.backgroundWhite,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
