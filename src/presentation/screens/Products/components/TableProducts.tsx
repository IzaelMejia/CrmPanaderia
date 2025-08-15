import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { DataTable } from "react-native-paper";
import { Colors } from "@constants/Colors";
import { Image } from "expo-image";
import { SquarePen, Trash } from "lucide-react-native";
import { Product } from "@src/domain/entities/product.entity";

interface TableProductsProps {
  filteredProducts: Product[];
  from: number;
  to: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const TableProducts: FC<TableProductsProps> = ({
  filteredProducts,
  from,
  to,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable>
      <DataTable.Header style={styles.headerTwoContent}>
        <DataTable.Title style={col.name}>
          <Text style={styles.txtColumnsSubtitle}>Nombre</Text>
        </DataTable.Title>

        <DataTable.Title numeric style={col.price}>
          <Text style={styles.txtColumnsSubtitle}>Precio</Text>
        </DataTable.Title>

        <DataTable.Title style={col.type}>
          <Text style={styles.txtColumnsSubtitle}>Tipo</Text>
        </DataTable.Title>

        <DataTable.Title style={col.cat}>
          <Text style={styles.txtColumnsSubtitle}>Categoría</Text>
        </DataTable.Title>

        <DataTable.Title style={col.desc}>
          <Text style={styles.txtColumnsSubtitle}>Descripción</Text>
        </DataTable.Title>

        <DataTable.Title style={col.img}>
          <Text style={styles.txtColumnsSubtitle}>Imagen</Text>
        </DataTable.Title>

        <DataTable.Title style={col.action}>
          <Text style={styles.txtColumnsSubtitle}>Acciones</Text>
        </DataTable.Title>
      </DataTable.Header>

      {filteredProducts.slice(from, to).map((item) => (
        <DataTable.Row key={item.iD_Pan} style={styles.withRightBorder}>
          <DataTable.Cell style={[col.name]}>
            <Text>{item.nombre}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={col.price}>
            <Text>${item.precio}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={col.type}>
            <Text>{item.tipo.nombre}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={col.cat}>
            <Text>{item.Category?.nombre}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={col.desc}>
            <Text>{item.descripcion}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={col.img}>
            <Image
              source={item.imagen}
              style={styles.img}
              cachePolicy={"memory-disk"}
            />
          </DataTable.Cell>
          <DataTable.Cell style={col.action}>
            <View style={styles.cellActions}>
              <TouchableOpacity
                style={[styles.btnAction, styles.btnEdit]}
                onPress={() => onEdit(item)}
              >
                <SquarePen width={"80%"} height={"80%"} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnAction, styles.btnDelete]}
                onPress={() => onDelete(item)}
              >
                <Trash width={"80%"} height={"80%"} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  headerTwoContent: {
    backgroundColor: Colors.green_2,
  },
  img: {
    width: 24,
    height: 24,
    borderRadius: 3,
  },
  cellActions: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  btnAction: {
    height: 24,
    width: 24,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnEdit: {
    backgroundColor: "#035FF5",
  },
  btnDelete: {
    backgroundColor: Colors.rojo,
  },
  withRightBorder: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 2,
  },
  txtColumnsSubtitle: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});

const col = StyleSheet.create({
  name: { flex: 2 },
  price: { flex: 1, paddingRight: 12, justifyContent: "center" },
  type: { flex: 1, paddingLeft: 12 },
  cat: { flex: 2 },
  desc: { flex: 2 },
  img: { width: 60, justifyContent: "center" },
  action: { width: 80, flexDirection: "row", justifyContent: "center" },
});
