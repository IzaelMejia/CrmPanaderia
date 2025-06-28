import {
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Colors } from "@constants/Colors";
import { Product, ProductForOrder } from "@src/domain/entities/product.entity";
import { Minus, Plus } from "lucide-react-native";
import { SkeletonPlaceholder } from "@src/presentation/components/SkeletonPlaceholder/SkeletonPlaceholder";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";
import { addProductToOrder } from "@src/infrastructure/store/Order/OrderSlice";

type CardProps = Pick<Product, "name" | "tipo" | "price" | "id">;

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

  const CARD_WIDTH = 176 + 16;

  const numColumns = useMemo(
    () => Math.max(1, Math.floor(containerWidth / CARD_WIDTH)),
    [containerWidth]
  );

  const skeletonData = useMemo(
    () => Array.from({ length: 6 }, (_, i) => i.toString()),
    []
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const addProduct = (product: ProductForOrder, quantity: number) => {
    dispatch(addProductToOrder({ product, quantity }));
  };

  const Card: FC<CardProps> = ({ name, tipo, price, id }) => {
    const quantity =
      currentItems.find((item) => item.product.id === id)?.quantity || 0;
    return (
      <View
        style={[
          styles.cardContainer,
          quantity ? styles.borderActive : undefined,
        ]}
      >
        <View>
          <View style={styles.imgContainer}></View>
          <Text
            style={styles.title}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <View style={styles.priceCategory}>
            <Text style={styles.price}>
              ${Number(price).toLocaleString("en-US")}
            </Text>
            <Text style={styles.category}>{tipo.name}</Text>
          </View>
        </View>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.btnAgregar}
            onPress={() => {
              addProduct(
                {
                  id: id,
                  name: name,
                  price: price,
                },
                1
              );
            }}
          >
            <Text style={styles.textAgregar}>Agregar</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.btnAgregar,
              {
                backgroundColor:
                  unit === "Pieza" ? Colors.green_2 : Colors.rojo_2,
              },
            ]}
          >
            <View style={styles.contentIncrement}>
              <TouchableOpacity
                style={[
                  styles.btnIncremet,
                  {
                    backgroundColor:
                      unit === "Pieza" ? Colors.primary : Colors.rojo,
                  },
                ]}
              >
                <Minus
                  size={14}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <Text style={styles.textIncremet}>{quantity}</Text>
              <TouchableOpacity
                style={[
                  styles.btnIncremet,
                  {
                    backgroundColor:
                      unit === "Pieza" ? Colors.primary : Colors.rojo,
                  },
                ]}
                onPress={() => {
                  addProduct(
                    {
                      id: id,
                      name: name,
                      price: price,
                    },
                    1
                  );
                }}
              >
                <Plus
                  size={14}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/*  */}
      </View>
    );
  };

  return (
    <View
      className="d-flex flex-row"
      onLayout={handleLayout}
    >
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
              <Card
                id={item.id}
                name={item.name}
                price={item.price}
                tipo={item.tipo}
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
    backgroundColor: Colors.green_2,
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
