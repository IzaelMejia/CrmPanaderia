import React from "react";
import { PedidosScreen } from "@src/presentation/screens/Pedidos/PedidosScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@constants/Colors";
import { ScreenWrapper } from "components/ScreenWrapper";

export default function PedidosRoute() {
  return (
    <ScreenWrapper>
      <PedidosScreen />
    </ScreenWrapper>
  );
}
