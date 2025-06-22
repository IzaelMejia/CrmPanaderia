import React from "react";
import { PedidosScreen } from "@src/presentation/screens/Pedidos/PedidosScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@constants/Colors";

export default function HomeRoute() {
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <StatusBar style="light" backgroundColor="blue" />
      </SafeAreaView>
      <PedidosScreen />
    </>
  );
}
