import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Colors } from "@constants/Colors";
import ModalOpacity from "@src/presentation/components/ModalOpacity/ModalOpacity";

type MetodoPago = "contado" | "credito";

interface ModalConfirmProps {
  open: boolean;
  close: () => void;
  message: string;
  initialMethod?: MetodoPago;                         // valor inicial (desde el padre)
  onConfirm: (method: MetodoPago) => void;            // devuelve el método elegido
}

export const ModalConfirm: FC<ModalConfirmProps> = ({
  open,
  close,
  message,
  initialMethod = "contado",
  onConfirm,
}) => {
  const [formaPago, setFormaPago] = useState<MetodoPago>(initialMethod);
  // si el padre cambia el initialMethod mientras el modal está abierto
  useEffect(() => {
    setFormaPago(initialMethod);
  }, [initialMethod, open]);

  const handleConfirm = () => {
    close();
    onConfirm(formaPago);
  };

  return (
    <ModalOpacity open={open} close={close}>
      <View className="max-w-sm w-full bg-white pt-9 pb-5 px-6 justify-center items-center rounded-md">
        <Text className="text-xl text-center font-bold">{message}</Text>

        {/* ⬇️ Sección clara para forma de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona la forma de pago: </Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                formaPago === "credito" && styles.toggleBtnActive,
              ]}
              onPress={() => setFormaPago("credito")}
            >
              <Text style={[
                styles.toggleText,
                formaPago === "credito" && styles.toggleTextActive,
              ]}>
                Crédito
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleBtn,
                formaPago === "contado" && styles.toggleBtnActive,
              ]}
              onPress={() => setFormaPago("contado")}
            >
              <Text style={[
                styles.toggleText,
                formaPago === "contado" && styles.toggleTextActive,
              ]}>
                Contado
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View className="d-flex flex-col gap-4 mt-2">
          <TouchableOpacity
            style={[styles.btns, styles.btnConfirm]}
            onPress={handleConfirm}
          >
            <Text className="color-white">Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btns, styles.btnCancel]}
            onPress={close}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalOpacity>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#1F2937", 
    fontWeight: "600",
    textAlign: "left",
  },
  toggleRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  toggleBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  toggleBtnActive: {
    backgroundColor: Colors.rojo,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 16,
    marginBottom: 8,
  },

  btns: {
    width: 226,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnConfirm: {
    backgroundColor: Colors.primary,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: Colors.gray,
  },
});
