import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@constants/Colors";
import { ProductsScreen } from "@src/presentation/screens/Products/ProductsScreen";

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
      <ProductsScreen />
    </>
  );
}
