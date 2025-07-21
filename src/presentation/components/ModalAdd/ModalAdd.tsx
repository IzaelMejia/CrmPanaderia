import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";
import { InputSelector } from "../InputSelector/InputSelector";
import { useAppDispatch, useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";
import { BREAD_TYPES } from "@constants/TypeBread";
import { InputTextEdit } from "../InputTextEdit/InputTextEdit";
import { InputImage } from "../InputImage/InputImage";
import ModalOpacity from "../ModalOpacity/ModalOpacity";
import { editProduct } from "@src/infrastructure/store/products/productsSlice";
import { Product } from "@src/domain/entities/product.entity";

interface ModalAddProps {
  open: boolean;
  close: () => void;
  updateOrAddProduct:  () => void;
}

export const ModalAdd: FC<ModalAddProps> = ({ open, close, updateOrAddProduct }) => {
  const dispatch = useAppDispatch()
  const { categoryProduct, product } = useAppSelector(
    (state) => state.products
  );
  const productId = product?.id ? true : false;

  


  return (
    <ModalOpacity open={open} close={close}>
      <View>
        <ScrollView
          style={styles.contentData}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl text-primary font-bold text-center">
            {productId ? "Actualizar Producto" : "Agregar Producto"}
          </Text>

          <View style={styles.imgContent}>
            <InputImage />
          </View>
          <View className="mt-7 d-flex flex-col gap-7">
            <View style={styles.inputNormal}>
              <InputTextEdit
                placeholder="Agrega el nombre del pan"
                label="Nombre"
                value={productId ? product?.name : undefined}
                // value={product && 'name' in product ? (product as any).name : ''}
              />
            </View>
            <View style={styles.inputNormal}>
              <InputTextEdit
                placeholder="Agrega el precio del pan"
                label="Precio"
                value={productId ? String(product?.price) : undefined}
              />
            </View>

            <View style={styles.contentInput}>
              <InputSelector
                placeholder="Selecciona el tipo de pan"
                label="Dulce/Salado"
                options={BREAD_TYPES}
                valueId={productId ? product?.tipo.id : undefined}
              />
            </View>
            <View style={styles.contentInput}>
              <InputSelector
                placeholder="Selecciona la categoría"
                label="Categoría"
                options={categoryProduct}
                valueId={productId ? product?.Category?.id : undefined}
              />
            </View>

            <View style={styles.inputDecription}>
              <InputTextEdit
                placeholder="Agrega descripción del pan"
                label="Descripción"
                value={productId ? product?.descripcion : undefined}
              />
            </View>
            <View className="w-full justify-center items-center">
              <TouchableOpacity className="bg-primary h-14 w-60 justify-center items-center rounded-full" onPress={updateOrAddProduct}>
                <Text className="color-white text-base font-bold">
                  {" "}
                  {productId ? "Actualizar" : "Agregar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ModalOpacity>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentData: {
    width: 420,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 100,
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  contentInput: {
    width: "100%",
    position: "relative",
    maxHeight: 46,
  },
  imgContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  inputNormal: {
    height: 46,
  },
  inputDecription: {
    height: 100,
  },
});
