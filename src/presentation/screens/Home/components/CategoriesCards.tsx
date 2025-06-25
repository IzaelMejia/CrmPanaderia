import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { Image } from "expo-image";

import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { globalStyles } from "@globals/global-styles";
import panEjemplo from "@assets/images/fondoPantalla.jpg";

interface CategoriesCardsProps {
  data: CategoriesProducts[];
}

export const CategoriesCards: FC<CategoriesCardsProps> = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={styles.containerScroll} horizontal>
      <TouchableOpacity style={styles.cardContainer}>
        <Image style={styles.imgs} source={panEjemplo} />
        <View
          style={globalStyles.containerAbsoluteOpacity}
          className="rounded-md items-center justify-center"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Todos</Text>
        </View>
      </TouchableOpacity>
      {data.map((item, index) => (
        <TouchableOpacity style={styles.cardContainer} key={index}>
          <Image style={styles.imgs} source={panEjemplo} />
          <View
            style={globalStyles.containerAbsoluteOpacity}
            className="rounded-md items-center justify-center"
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flexDirection: "row",
    gap: 10,
  },
  cardContainer: {
    width: 128,
    height: 74,
    borderRadius: 6,
    position: "relative",
    zIndex: 1,
  },
  imgs: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
