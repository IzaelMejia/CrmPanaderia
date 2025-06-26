import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

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
  const [categories, setCategories] = useState<CategoriesProducts[]>([]);
  const [unit, setUnit] = useState<"Pieza" | "Bolsa">("Pieza");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesProducts | null>(null);

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
      setCategories(data);
      setLoadingCategories(false);
    });
  }, []);

  const handleSubmit = (text: string) => {
    console.log("🔍 Buscar:", text);
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== null) {
      result = result.filter((p) => p.Category?.id === selectedCategory.id);
    }
    if (unit) {
      result = result.filter((p) => p.unidad?.some((u) => u.name === unit));
    }
    return result;
  }, [products, selectedCategory, unit]);

  const totalProducts = useMemo(() => {
    return filteredProducts?.length;
  }, [filteredProducts]);

  const nameCategory = useMemo(() => {
    if (selectedCategory === null) return "Todos";
    return selectedCategory?.name;
  }, [filteredProducts]);

  return (
    <View
      className="flex-1 flex flex-row"
      style={styles.container}
    >
      <View
        style={styles.containerLeft}
        className=" p-4"
      >
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
          <CategoriesCards
            data={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>
        <View className="mt-3 d-flex flex-row justify-between">
          <InfoSwitch
            totalProducts={totalProducts}
            nameCategory={nameCategory}
            unitSelected={unit}
            onChangeUnit={setUnit}
          />
        </View>
        <View className="mt-4 ">
          <ProductCards
            data={filteredProducts}
            loading={loading}
            unit={unit}
          />
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
