// ProductCards.tsx
import React, { FC, useCallback, useMemo, useState } from "react";
import { FlatList, LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";
import { addProductToOrder } from "@src/infrastructure/store/Order/OrderSlice";
import { SkeletonPlaceholder } from "@src/presentation/components/SkeletonPlaceholder/SkeletonPlaceholder";
import { ProductCard } from "./ProductCard"; // Importa el nuevo componente
import { Product } from "@src/domain/entities/product.entity";
import { Colors } from "@constants/Colors";

interface ProductCardsProps {
  data: Product[];
  loading: boolean;
  unit: "Pieza" | "Bolsa";
}

export const ProductCards: FC<ProductCardsProps> = ({
  data,
  loading = false,
  unit,
}) => {
  const dispatch = useAppDispatch();
  const currentItems = useAppSelector((state) => state.orders.currentItems);
  const [containerWidth, setContainerWidth] = useState(0);

  const CARD_WIDTH = 192; // 176 + 16
  const numColumns = useMemo(
    () => Math.max(1, Math.floor(containerWidth / CARD_WIDTH)),
    [containerWidth]
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const skeletonData = useMemo(
    () => Array.from({ length: 6 }, (_, i) => i.toString()),
    []
  );

  const getQuantity = (id: number) =>
    currentItems.find((item) => item.product.id === id)?.quantity || 0;

  const addProduct = (product: Product, qty = 1) => {
    dispatch(addProductToOrder({ product, quantity: qty }));
  };
  const handleSubtract = (product: Product) => {
    const currentQty = getQuantity(product.id);
    if (currentQty > 0) {
      dispatch(addProductToOrder({ product, quantity: -1 }));
    }
  };

  return (
    <View onLayout={handleLayout}>
      {containerWidth > 0 &&
        (loading ? (
          <FlatList
            data={skeletonData}
            renderItem={() => (
              <SkeletonPlaceholder
                style={[styles.cardContainer, { height: 235 }]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ padding: 8, paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                quantity={getQuantity(item.id)}
                unit={unit}
                onAdd={(qty) => addProduct(item, qty)}
                onSubtract={() => handleSubtract(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 176,
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
    boxShadow: "4px 2px 4px 1px #00000020",
    backgroundColor: "#e8e5e5",
    justifyContent: "space-between",
  },
  borderActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  borderActiveRed: {
    borderColor: Colors.rojo,
    borderWidth: 1,
  },
  imgContainer: {
    width: "100%",
    height: 104,
    backgroundColor: "green",
    borderRadius: 6,
  },
  row: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  priceCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.primary,
  },
  category: {
    fontSize: 12,
    color: Colors.gray_1,
    fontWeight: "700",
  },
  btnAgregar: {
    height: 36,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  contentIncrement: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIncremet: {
    fontSize: 16,
    fontWeight: "800",
  },
  textAgregar: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black_1,
  },
  btnIncremet: {
    height: 26,
    width: 26,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonBg: {
    backgroundColor: Colors.white_1,
  },
  skeletonLine: {
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.white_1,
    marginTop: 8,
  },
});
