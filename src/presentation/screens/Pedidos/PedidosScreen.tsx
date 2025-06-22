import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";

export const PedidosScreen = () => {
  return (
    <View className="bg-slate-700 flex-1">
      <Text className="text-white">Hola estas en el Pedidos</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
