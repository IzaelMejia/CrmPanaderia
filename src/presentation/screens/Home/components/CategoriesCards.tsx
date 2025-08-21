import React, { FC, memo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";

import { CategoriesProducts } from "@src/domain/entities/categoriesProducts.entity";
import { globalStyles } from "@globals/global-styles";
import panEjemplo from "@assets/images/fondoPantalla.jpg";

interface CategoriesCardsProps {
  data: CategoriesProducts[];
  selectedCategory: CategoriesProducts | null;
  onSelect: (item: CategoriesProducts | null) => void;
}

interface CategoryCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  image?: any;
}

const CategoryCard: FC<CategoryCardProps> = memo(
  ({ label, isSelected, onPress, image = panEjemplo }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image style={styles.imgs} source={image} />
      <View
        style={[
          globalStyles.containerAbsoluteOpacity,
          isSelected && styles.cardSelected,
        ]}
        className="rounded-md items-center justify-center"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
);

export const CategoriesCards: FC<CategoriesCardsProps> = ({
  data,
  selectedCategory,
  onSelect,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.containerScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Opción "Todos" */}
      <CategoryCard
        label="Todos"
        isSelected={selectedCategory === null}
        onPress={() => onSelect(null)}
      />

      {/* Categorías dinámicas */}
      {data?.map((item) => (
        <CategoryCard
          key={item.iD_Categoria}
          label={item.nombre}
          isSelected={selectedCategory?.iD_Categoria === item.iD_Categoria}
          onPress={() => onSelect(item)}
        />
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
    overflow: "hidden", // evita que la imagen se salga de bordes redondeados
  },
  cardSelected: {
    backgroundColor: "red",
    opacity: 0.4,
  },
  imgs: {
    width: "100%",
    height: "100%",
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
