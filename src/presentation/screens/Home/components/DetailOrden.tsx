import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DetailCardOrden } from "./DetailCardOrden";
import { Product } from "@src/domain/entities/product.entity";
import { BrushCleaning } from "lucide-react-native";
import { Colors } from "@constants/Colors";
import { cleanOrder } from "@src/infrastructure/store/Order/OrderSlice";

export const DetailOrden = () => {
  const dispatch = useAppDispatch();
  const { currentItems, total } = useAppSelector((state) => state.orders);
  const totalProductosPiezas = currentItems
    .filter((item) => item.product.unidad?.id === 1)
    .reduce((acc, item) => acc + item.quantity, 0);
  const totalProductosBolsas = currentItems
    .filter((item) => item.product.unidad?.id === 2)
    .reduce((acc, item) => acc + item.quantity, 0);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<{ product: Product; quantity?: number }>) => (
    <DetailCardOrden item={item} />
  );

  const CleanOrder = () => {
    dispatch(cleanOrder());
  };

  return (
    <GestureHandlerRootView>
      <View className="border-b-hairline border-b-gray-500 flex flex-row justify-between items-center">
        <Text className="text-lg font-medium">Detalles de la Orden</Text>
        <TouchableOpacity onPress={CleanOrder}>
          <BrushCleaning width={22} height={22} color={Colors.rojo} />
        </TouchableOpacity>
      </View>
      <View className="d-flex gap-1 mt-3 flex-row justify-between">
        <Text className="text-base">
          Piezas{" "}
          <Text className="color-gray_1 font-semibold">
            ({totalProductosPiezas ?? 0})
          </Text>
        </Text>
        <Text className="text-base">
          Bolsas{" "}
          <Text className="color-gray_1 font-semibold">
            ({totalProductosBolsas ?? 0})
          </Text>
        </Text>
      </View>
      <View className="d-flex flex-col justify-between flex-1 mt-4">
        <FlatList
          data={currentItems}
          keyExtractor={(item) => item.product.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        <View className="w-full ">
          <Text className="text-base font-bold">Resumen del pedido</Text>
          <View className="h-12 w-full bg-neutral-300 rounded-md items-center d-flex flex-row justify-between px-3 mt-2">
            <Text className="text-black_1 text-base font-medium">Total:</Text>
            <Text className="text-rojo font-extrabold text-xl">
              ${total}.00
            </Text>
          </View>

          <TouchableOpacity className="bg-primary h-11 items-center justify-center mt-6 rounded-md">
            <Text className="text-base font-semibold color-white ">
              Finalizar orden
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  listContent: { paddingBottom: 16, gap: 16 },
});
