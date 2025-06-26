import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Colors } from "@constants/Colors";

interface InfoSwitchProps {
  totalProducts: number | null;
  nameCategory: string | null;
  unitSelected: "Pieza" | "Bolsa";
  onChangeUnit: (unit: "Pieza" | "Bolsa") => void;
}

export const InfoSwitch: FC<InfoSwitchProps> = ({
  totalProducts,
  nameCategory,
  unitSelected,
  onChangeUnit,
}) => {
  return (
    <>
      <View>
        <Text className="text-black_1 text-3xl font-extrabold">
          {nameCategory} <Text className="text-sm">({totalProducts})</Text>
        </Text>
      </View>
      <View className="d-flex flex-row">
        <TouchableOpacity
          onPress={() => onChangeUnit("Pieza")}
          style={[
            styles.switchFilt,
            styles.switchFiltPiza,
            {
              backgroundColor:
                unitSelected === "Pieza" ? Colors.primary : Colors.green_2,
            },
          ]}
        >
          <Text
            className="text-white font-bold text-sm"
            style={{
              color: unitSelected === "Pieza" ? Colors.white : Colors.gray_1,
            }}
          >
            Pieza
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeUnit("Bolsa")}
          style={[
            styles.switchFilt,
            styles.switchFiltBolsa,
            {
              backgroundColor:
                unitSelected === "Bolsa" ? Colors.rojo : Colors.rojo_2,
            },
          ]}
        >
          <Text
            className="text-gray_1 font-bold text-sm"
            style={{
              color: unitSelected === "Bolsa" ? Colors.white : Colors.gray_1,
            }}
          >
            Bolsa
          </Text>
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
