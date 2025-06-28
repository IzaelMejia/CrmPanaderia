// ProductCard.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { Colors } from "@constants/Colors";
import { Product } from "@src/domain/entities/product.entity";

interface ProductCardProps {
  product: Product;
  quantity: number;
  unit: "Pieza" | "Bolsa";
  onAdd: (qty: number) => void;
  onSubtract: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  unit,
  onAdd,
  onSubtract,
}) => (
  <View
    style={[
      styles.cardContainer,
      quantity
        ? unit === "Pieza"
          ? styles.borderActive
          : styles.borderActiveRed
        : undefined,
    ]}
  >
    <View>
      <View style={styles.imgContainer}></View>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {product.name}
      </Text>
      <View style={styles.priceCategory}>
        <Text style={styles.price}>
          ${Number(product.price).toLocaleString("en-US")}
        </Text>
        <Text style={styles.category}>{product.tipo.name}</Text>
      </View>
    </View>
    {quantity === 0 ? (
      <TouchableOpacity
        style={[
          styles.btnAgregar,
          {
            backgroundColor: unit === "Pieza" ? Colors.green_2 : Colors.rojo_2,
          },
        ]}
        onPress={() => onAdd(1)}
      >
        <Text style={styles.textAgregar}>Agregar</Text>
      </TouchableOpacity>
    ) : (
      <View
        style={[
          styles.btnAgregar,
          {
            backgroundColor: unit === "Pieza" ? Colors.green_2 : Colors.rojo_2,
          },
        ]}
      >
        <View style={styles.contentIncrement}>
          <TouchableOpacity
            style={[
              styles.btnIncremet,
              {
                backgroundColor:
                  unit === "Pieza" ? Colors.primary : Colors.rojo,
              },
            ]}
            onPress={onSubtract}
          >
            <Minus size={14} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.textIncremet}>{quantity}</Text>
          <TouchableOpacity
            style={[
              styles.btnIncremet,
              {
                backgroundColor:
                  unit === "Pieza" ? Colors.primary : Colors.rojo,
              },
            ]}
            onPress={() => onAdd(1)}
          >
            <Plus size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: 176,
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
    boxShadow: "4px 2px 4px 1px #00000020",
    backgroundColor: "#e8e5e5",
    justifyContent: "space-between",
  },
  borderActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  borderActiveRed: {
    borderColor: Colors.rojo,
    borderWidth: 1,
  },
  imgContainer: {
    width: "100%",
    height: 104,
    backgroundColor: "green",
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  priceCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.primary,
  },
  category: {
    fontSize: 12,
    color: Colors.gray_1,
    fontWeight: "700",
  },
  btnAgregar: {
    height: 36,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  contentIncrement: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIncremet: {
    fontSize: 16,
    fontWeight: "800",
  },
  textAgregar: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black_1,
  },
  btnIncremet: {
    height: 26,
    width: 26,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
