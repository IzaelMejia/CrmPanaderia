import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";
import { Colors } from "@constants/Colors";
import { Chip, DataTable } from "react-native-paper";
import { Image } from "expo-image";
import { Plus, SquarePen, Trash } from "lucide-react-native";
import TouchDrawer from "@src/presentation/components/TouchDrawer/TouchDrawer";
import { InputSearch } from "@src/presentation/components/InputSearch/InputSearch";
import { ModalAdd } from "@src/presentation/components/ModalAdd/ModalAdd";
import { ModalEliminar } from "@src/presentation/components/ModalEliminar/ModalEliminar";
import {
  deleteProduct,
  onSetProduct,
} from "@src/infrastructure/store/products/productsSlice";
import { Product } from "@src/domain/entities/product.entity";
import { showToastSucces } from "@src/presentation/components/Toast/Toast";

export const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const { products, product } = useAppSelector((state) => state.products);
  // Modales
  const [openModalAddProduct, setOpenModalAddProduct] =
    useState<boolean>(false);
  const [openModalEliminar, setOpenModalEliminar] = useState<boolean>(false);
  // Busqueda
  const [query, setQuery] = useState("");
  // Product Select.
  const [productSelect, setIdProductSelect] = useState<Product | null>(null);
  // Paginación
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, products?.length);
  
  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let result = products;

    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(lowerQuery));
    }

    return result;
  }, [products, query]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const openModalDelete = (item: Product | null) => {
    setOpenModalEliminar(true);
    setIdProductSelect(item);
  };

  const handleModalAdd = (item: Product | null) => {
    if (item && item != null) {
      setOpenModalAddProduct(true);
      dispatch(onSetProduct(item));
    } else {
      setOpenModalAddProduct(true);
      dispatch(onSetProduct(null));
    }
  };

  const handleDeleteProduct = () => {
    showToastSucces(`${productSelect?.name} se elimino correctamente.`);
    dispatch(deleteProduct(productSelect?.id));
  };

  return (
    <View style={styles.container}>
      <View className="d-flex flex-row gap-5 items-center border-b-2 border-b-slate-600 pb-1">
        <TouchDrawer />
        <View className="d-flex flex-row gap-1">
          <View style={styles.point} />
          <Text style={styles.txtTitle}>Productos</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-5">
        <InputSearch
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar producto..."
        />

        <TouchableOpacity
          className="max-w-52 w-full bg-primary h-11, d-flex flex-row items-center justify-center rounded-md"
          onPress={() => handleModalAdd(null)}
        >
          <View className="d-flex flex-row items-center justify-center gap-2">
            <Plus width={20} height={20} color={Colors.white} />
            <Text className="text-white font-semibold text-base">
              Agregar producto
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="w-100 mt-4">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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
              <DataTable.Row key={item.id} style={styles.withRightBorder}>
                <DataTable.Cell style={[col.name]}>
                  <Text>{item.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={col.price}>
                  <Text>${item.price}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={col.type}>
                  <Text>{item.tipo.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={col.cat}>
                  <Text>{item.Category?.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={col.desc}>
                  <Text>{item.descripcion}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={col.img}>
                  <Image source={item.image} style={styles.img} />
                </DataTable.Cell>
                <DataTable.Cell style={col.action}>
                  <View style={styles.cellActions}>
                    <TouchableOpacity
                      style={[styles.btnAction, styles.btnEdit]}
                      onPress={() => handleModalAdd(item)}
                    >
                      <SquarePen
                        width={"80%"}
                        height={"80%"}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btnAction, styles.btnDelete]}
                      onPress={() => openModalDelete(item)}
                    >
                      <Trash
                        width={"80%"}
                        height={"80%"}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            
          </DataTable>
        </ScrollView>
      </View>

      <ModalAdd
        open={openModalAddProduct}
        close={() => setOpenModalAddProduct(false)}
      />

      <ModalEliminar
        open={openModalEliminar}
        close={() => setOpenModalEliminar(false)}
        action={handleDeleteProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  point: {
    width: 16,
    height: 16,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: 8,
  },
  txtTitle: {
    fontSize: 32,
    color: Colors.black_2,
    fontWeight: "700",
  },
  // Tabla:
  headerTitle: {
    backgroundColor: "#fff",
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
  },
  txtHeaderTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "700",
  },
  txtColumnsSubtitle: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
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
