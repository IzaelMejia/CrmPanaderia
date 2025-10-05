import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
import { GenerateOrderUseCase } from "@src/application/use-cases/generate-order-use-case";
import {
  showError,
  showToastSucces,
} from "@src/presentation/components/Toast/Toast";
import { ModalConfirm } from "../modal/ModalConfirm";

export const DetailOrden = () => {
  const useCase = new GenerateOrderUseCase();
  const dispatch = useAppDispatch();
  const { currentItems, total } = useAppSelector((state) => state.orders);
  const [openConfirm, setOpenConfirm] = useState(false);
  const totalProductosPiezas = currentItems
    .filter((item) => item.product.unidad?.iD_Unidad === 1)
    .reduce((acc, item) => acc + item.quantity, 0);
  const totalProductosBolsas = currentItems
    .filter((item) => item.product.unidad?.iD_Unidad === 2)
    .reduce((acc, item) => acc + item.quantity, 0);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<{ product: Product; quantity?: number }>) => (
    <DetailCardOrden item={item} />
  );

  const CleanOrder = () => {
    dispatch(cleanOrder());
  };

  type DetalleDTO = {
    iD_Pan: number;
    cantidad: number;
    precioUnitario: number;
  };

  type CrearVentaDTO = {
    iD_Usuario: number;
    formaPago: "contado" | "credito";
    detalles: DetalleDTO[];
  };

  const buildOrderPayload = (
    userId: number,
    formaPago: "contado" | "credito",
    currentItems: { product: Product; quantity: number }[]
  ): CrearVentaDTO => {
    const detalles: DetalleDTO[] = currentItems.map(
      ({ product, quantity }) => ({
        iD_Pan: product.iD_Pan,
        cantidad: quantity,
        precioUnitario: product.precio,
      })
    );

    return {
      iD_Usuario: userId,
      formaPago,
      detalles,
    };
  };

  const sendOrder = async (method: "contado" | "credito") => {
    if (!currentItems.length) {
      Alert.alert("Tu carrito está vacío");
      return;
    }

    const payload = buildOrderPayload(
      1, // iD_Usuario (pon aquí el real del auth)
      method, // o "credito", según selección del UI
      currentItems
    );
    console.log("payload", payload);

    const res = await useCase.execute(payload);
    if (res.statusCode === 201) {
      console.log("sendOrder payload", res);
      CleanOrder();
      showToastSucces(`Se ha generado la venta con éxito.`);
    } else {
      showError(`Error al generar la venta.`);
    }
  };

  return (
    <GestureHandlerRootView>
      <View className="border-b-hairline border-b-gray-500 flex flex-row justify-between items-center">
        <Text className="text-lg font-medium">Detalles de la Orden</Text>

        <View className="d-flex flex-row items-center gap-1 border-2 border-red-500 px-2 py-1 rounded-md">
          <TouchableOpacity onPress={CleanOrder}>
            <BrushCleaning width={22} height={22} color={Colors.rojo} />
          </TouchableOpacity>
          <Text>Limpiar</Text>
        </View>
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
          keyExtractor={(item) => item.product.iD_Pan.toString()}
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

          <TouchableOpacity
            className="bg-primary h-11 items-center justify-center mt-6 rounded-md"
            // onPress={sendOrder}
            onPress={() => setOpenConfirm(true)}
            disabled={!currentItems.length}
            style={{ opacity: !currentItems.length ? 0.5 : 1 }}
          >
            <Text className="text-base font-semibold color-white ">
              Finalizar orden
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalConfirm
        open={openConfirm}
        close={() => setOpenConfirm(false)}
        message="¿Deseas finalizar la orden?"
        onConfirm={(method) => {
          sendOrder(method);
        }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  listContent: { paddingBottom: 16, gap: 16 },
});
