import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Colors } from "@constants/Colors";

 interface InfoSwitchProps {
  totalProducts: number | null;
  nameCategory: string | null;
}

export const InfoSwitch: FC<InfoSwitchProps>= ({totalProducts, nameCategory}) => {
  return (
    <>
      <View>
        <Text className="text-black_1 text-3xl font-extrabold">
          {nameCategory} <Text className="text-sm">({totalProducts})</Text>
        </Text>
      </View>
      <View className="d-flex flex-row">
        <TouchableOpacity style={[styles.switchFilt, styles.switchFiltPiza]}>
          <Text className="text-white font-bold text-sm">Pieza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.switchFilt, styles.switchFiltBolsa]}>
          <Text className="text-gray_1 font-bold text-sm">Bolsa</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  switchFilt: {
    width: 64,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  switchFiltPiza: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: Colors.primary,
  },
  switchFiltBolsa: {
    borderTopRightRadius: 6,
    borderBottomEndRadius: 6,
    backgroundColor: "#E9CECE",
  },
});
