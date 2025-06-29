import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Image } from "expo-image";
import { Minus, Plus, Trash } from "lucide-react-native";
import { Colors } from "@constants/Colors";
import {
  addProductToOrder,
  removeProductFromOrder,
} from "@src/infrastructure/store/Order/OrderSlice";
import { useAppDispatch } from "@src/infrastructure/store/hooks/reduxActions";
import { Product } from "@src/domain/entities/product.entity";

interface DetailCardOrdenProps {
  item: { product: Product; quantity?: number };
}

export const DetailCardOrden: FC<DetailCardOrdenProps> = React.memo(
  ({ item }) => {
    const dispatch = useAppDispatch();
    const { product, quantity } = item;
    const isPieza = product.unidad?.name === "Pieza";
    const addProduct = (product: Product, qty = 1) => {
      dispatch(addProductToOrder({ product, quantity: qty }));
    };

    return (
      <ReanimatedSwipeable
        onSwipeableOpen={() => dispatch(removeProductFromOrder(product.id))}
        renderRightActions={() => (
          <View style={styles.trashContainer}>
            <Trash size={24} color={Colors.white} />
          </View>
        )}
        overshootRight={false}
        friction={1}
        containerStyle={{ width: "100%" }}
        rightThreshold={0}
      >
        <View
          className="p-2 rounded-lg"
          style={{
            borderColor: isPieza ? Colors.primary : Colors.rojo,
            borderWidth: 1.5,
            backgroundColor: Colors.backgroundWhite,
          }}
        >
          <View className="d-flex flex-row items-center ">
            <View
              className="h-16 bg-slate-900 rounded-md "
              style={{ width: "24%" }}
            >
              <Image
                source={product.image}
                style={styles.img}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            </View>
            <View className="pl-2 gap-2" style={{ width: "76%" }}>
              <Text className="text-lg font-semibold">
                {product.unidad?.name} {product.name}
              </Text>
              <View className="d-flex flex-row justify-between ">
                <View className=" w-full d-flex flex-row justify-between items-center">
                  <Text className="text-lg text-black_1 font-bold">
                    ${product.price}.00
                  </Text>
                  <Text className="color-rojo text-lg font-bold">
                    ${product.price * quantity!}.00
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-6 d-flex flex-row justify-between items-center">
            <TouchableOpacity
              className=" h-7 items-center justify-center bg-neutral-300 rounded-md"
              style={{ width: 50 }}
              onPress={() => addProduct(product, -10)}
              disabled={quantity! < 10}
            >
              <Text className="font-semibold">-10</Text>
            </TouchableOpacity>
            <View className="d-flex flex-row gap-4 items-center justify-center">
              <TouchableOpacity
                className="rounded-full  bg-neutral-300 items-center justify-center"
                style={styles.touchableIncrement}
                onPress={() => addProduct(product, -1)}
              >
                <Minus size={14} />
              </TouchableOpacity>
              <Text className="font-semibold text-xl">{quantity}</Text>
              <TouchableOpacity
                className="rounded-full  bg-primary items-center justify-center"
                style={styles.touchableIncrement}
                onPress={() => addProduct(product, 1)}
              >
                <Plus size={14} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className=" h-7 items-center justify-center bg-primary rounded-md"
              style={{ width: 50 }}
              onPress={() => addProduct(product, 10)}
            >
              <Text className="text-white font-semibold">+10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReanimatedSwipeable>
    );
  }
);

const styles = StyleSheet.create({
  trashContainer: {
    backgroundColor: "red",
    width: "100%",
    borderRadius: 8,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingEnd: 25,
    opacity: 0.8,
  },
  touchableIncrement: {
    width: 26,
    height: 26,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
});
