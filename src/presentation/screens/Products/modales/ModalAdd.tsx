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
import React, { FC, useEffect, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";
import { InputSelector } from "../../../components/InputSelector/InputSelector";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";
import { BREAD_TYPES } from "@constants/TypeBread";
import { InputTextEdit } from "../../../components/InputTextEdit/InputTextEdit";
import { InputImage } from "../../../components/InputImage/InputImage";
import ModalOpacity from "../../../components/ModalOpacity/ModalOpacity";
import { editProduct } from "@src/infrastructure/store/products/productsSlice";
import { Product } from "@src/domain/entities/product.entity";
import { BREAD_Unidades } from "@constants/TypeUnidades";
import { GetProductsUseCase } from "@src/application/use-cases/get-products.use-case";
import { showToastSucces } from "@src/presentation/components/Toast/Toast";
import { CreateProductDto } from "@src/application/dtos/products/CreateProductDto";
import { Controller, useForm } from "react-hook-form";

interface ModalAddProps {
  open: boolean;
  close: () => void;
}

const parsePrecio = (v: string | number | null | undefined) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") return Number(v.replace(",", "."));
  return NaN;
};

export const ModalAdd: FC<ModalAddProps> = ({ open, close }) => {
  const dispatch = useAppDispatch();
  const { categoryProduct, product } = useAppSelector(
    (state) => state.products
  );
  const productId = product?.iD_Pan ? true : false;
  const useCaseProduct = new GetProductsUseCase();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductDto>({
    defaultValues: {
      nombre: product?.nombre ?? "",
      precio: product?.precio != null ? String(product.precio) : "",
      descripcion: product?.descripcion ?? "",
      iD_TipoPan: product?.tipo?.iD_TipoPan ?? undefined,
      iD_Categoria: product?.categoria?.iD_Categoria ?? undefined,
      iD_Unidad: product?.unidad?.iD_Unidad ?? undefined,
    },
  });

  useEffect(() => {
    reset({
      nombre: product?.nombre ?? "",
      precio: product?.precio != null ? String(product.precio) : "",
      descripcion: product?.descripcion ?? "",
      iD_TipoPan: product?.tipo?.iD_TipoPan ?? undefined,
      iD_Categoria: product?.categoria?.iD_Categoria ?? undefined,
      iD_Unidad: product?.unidad?.iD_Unidad ?? undefined,
    });
  }, [open, product?.iD_Pan, reset]);

  const onSubmit = async (data: CreateProductDto) => {
    const precioNum = parsePrecio(data.precio);
    try {
      const payload = {
        nombre: data.nombre.trim(),
        precio: precioNum,
        descripcion: (data.descripcion ?? "").trim(),
        iD_TipoPan: data.iD_TipoPan,
        iD_Categoria: data.iD_Categoria,
        iD_Unidad: data.iD_Unidad,
        Imagen: "string",
      };

      const created = await useCaseProduct.createProduct(payload as any);
      dispatch(editProduct(created));
      showToastSucces(
        `Se ${productId ? "actualizó" : "creó"} ${created?.nombre} con éxito`
      );
      close();
    } catch (e: any) {
      setError("root.server", {
        type: "server",
        message:
          e?.status === 400
            ? "Revisa los datos del formulario."
            : e?.status === 409
              ? "Ya existe un producto con ese nombre."
              : e?.status === 500
                ? "Error del servidor. Intenta más tarde."
                : e?.message || "No se pudo guardar el producto.",
      });

      // Errores por campo del backend (Record<string, string[]>)
      const fErrs = e?.fieldErrors as Record<string, string[]> | undefined;
      if (fErrs) {
        const map: Record<string, keyof CreateProductDto> = {
          nombre: "nombre",
          precio: "precio",
          iD_TipoPan: "iD_TipoPan",
          iD_Unidad: "iD_Unidad",
          iD_Categoria: "iD_Categoria",
          descripcion: "descripcion",
        };
        Object.entries(fErrs).forEach(([k, msgs]) => {
          const field = map[k];
          if (field)
            setError(field, {
              type: "server",
              message: msgs?.[0] ?? "Dato inválido",
            });
        });
      }
    }
  };

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
            <View className="w-full flex flex-col gap-1">
              <View style={styles.inputNormal}>
                <Controller
                  control={control}
                  name="nombre"
                  rules={{
                    required: "El nombre es requerido",
                    validate: (v) =>
                      !!v?.trim() ? true : "El nombre es requerido",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <InputTextEdit
                      label="Nombre"
                      placeholder="Agrega el nombre del pan"
                      value={value}
                      onChangeText={onChange}
                      inputMask="letters"
                      allowAccents={true}
                      allowSpaces={true}
                      keyboardType="default"
                      maxLength={60}
                      multiline={false}
                      numberOfLines={1}
                    />
                  )}
                />
              </View>
              {!!errors.nombre?.message && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.nombre.message}
                </Text>
              )}
            </View>

            <View className="w-full flex flex-col gap-1">
              <View style={styles.inputNormal}>
                <Controller
                  control={control}
                  name="precio"
                  rules={{
                    required: "El precio es requerido",
                    // validate: validatePrecio,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <InputTextEdit
                      label="Precio"
                      placeholder="Agrega el precio del pan"
                      value={value != null ? String(value) : ""}
                      onChangeText={onChange}
                      inputMask="numbers"
                      keyboardType="phone-pad"
                      maxLength={10}
                      multiline={false}
                      numberOfLines={1}
                    />
                  )}
                />
              </View>
              {!!errors.precio?.message && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.precio.message}
                </Text>
              )}
            </View>

            <View className="w-full flex flex-col gap-1">
              <View style={styles.contentInput}>
                <Controller
                  control={control}
                  name="iD_TipoPan"
                  rules={{ required: "Selecciona el tipo de pan" }}
                  render={({ field: { value, onChange } }) => (
                    <InputSelector
                      placeholder="Selecciona el tipo de pan"
                      label="Dulce/Salado"
                      options={BREAD_TYPES}
                      valueId={value ?? undefined}
                      idKey="iD_TipoPan"
                      labelKey="nombre"
                      onValueChange={onChange}
                      // error={errors.iD_TipoPan?.message}
                    />
                  )}
                />
              </View>
              {!!errors.iD_TipoPan?.message && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.iD_TipoPan.message}
                </Text>
              )}
            </View>

            <View className="w-full flex flex-col gap-1">
              <View style={styles.contentInput}>
                <Controller
                  control={control}
                  name="iD_Categoria"
                  rules={{ required: "Selecciona la categoría" }}
                  render={({ field: { value, onChange } }) => (
                    <InputSelector
                      placeholder="Selecciona la categoría"
                      label="Categoría"
                      options={categoryProduct}
                      valueId={value ?? undefined}
                      idKey="iD_Categoria"
                      labelKey="nombre"
                      onValueChange={onChange}
                      // error={errors.iD_Categoria?.message}
                    />
                  )}
                />
              </View>
              {!!errors.iD_Categoria?.message && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.iD_Categoria.message}
                </Text>
              )}
            </View>

            <View className="w-full flex flex-col gap-1">
              <View style={styles.contentInput}>
                <Controller
                  control={control}
                  name="iD_Unidad"
                  rules={{ required: "Selecciona unidad/bolsa" }}
                  render={({ field: { value, onChange } }) => (
                    <InputSelector
                      placeholder="Selecciona si es unidad o bolsa"
                      label="Unidad/Bolsa"
                      options={BREAD_Unidades}
                      valueId={value ?? undefined}
                      idKey="iD_Unidad"
                      labelKey="nombre"
                      onValueChange={onChange}
                      // error={errors.iD_Unidad?.message}
                    />
                  )}
                />
              </View>
              {!!errors.iD_Unidad?.message && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.iD_Unidad.message}
                </Text>
              )}
            </View>

            <View className="w-full flex flex-col gap-1">
              <View style={styles.inputDecription}>
                <View style={styles.inputDecription}>
                  <Controller
                    control={control}
                    name="descripcion"
                    render={({ field: { value, onChange } }) => (
                      <InputTextEdit
                        label="Descripción"
                        placeholder="Agrega descripción del pan"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
              </View>
            </View>

            <View className="w-full justify-center items-center">
              <TouchableOpacity
                className="bg-primary h-14 w-60 justify-center items-center rounded-full"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Text className="color-white text-base font-bold">
                  {" "}
                  {isSubmitting
                    ? "Enviando..."
                    : productId
                      ? "Actualizar"
                      : "Agregar"}
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
