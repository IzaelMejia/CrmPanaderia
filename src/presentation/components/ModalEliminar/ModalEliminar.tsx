import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, use } from "react";
import ModalOpacity from "../ModalOpacity/ModalOpacity";
import { Colors } from "@constants/Colors";
import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";

interface ModalEliminarProps {
  open: boolean;
  close: () => void;
  action: () => void;
  dataNombre?: string;
}

export const ModalEliminar: FC<ModalEliminarProps> = ({ open, close,  action, dataNombre}) => {
  
  const handdleAction = () => {
    close();
    action()
  };

  return (
    <ModalOpacity open={open} close={close}>
      <View className="max-w-sm w-full bg-white py-9 px-6 justify-center items-center rounded-md">
        <Text className="text-base text-center">
          ¿De verdad dease eliminar el producto{" "}
          <Text className="font-semibold">{dataNombre} ?</Text>
        </Text>
        <View className="d-flex flex-col gap-4 mt-6">
          <TouchableOpacity
            style={[styles.btns, styles.btnDelete]}
            onPress={handdleAction}
          >
            <Text className="color-white">Eliminar</Text>
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
  btns: {
    width: 226,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDelete: {
    backgroundColor: Colors.rojo,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: Colors.gray,
  },
});
