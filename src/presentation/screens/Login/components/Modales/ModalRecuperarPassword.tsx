import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "@/globals/global-styles";
import { RecuperarPasswordProps } from "./RecuperarPassword.types";
import { useForm } from "react-hook-form";
import { InputControl } from "../InputControl/InputControl";

export const ModalRecuperarPassword = ({
  visible,
  onClose,
  onSend,
  isActive,
  setActiveInput,
}: RecuperarPasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  

  const onSubmit = (data: any) => {
    onSend(data.email);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={globalStyles.opacityScreen}
          className="flex justify-center items-center"
        >
          <View
            className="bg-white rounded-lg  w-full  p-8 h-auto "
            style={styles.contentModal}
          >
            <View className="w-11/12 items-center">
              <Text
                className="color-primary font-extrabold"
                style={{ fontSize: 32 }}
              >
                Recuperar contraseña
              </Text>
              <Text className="text-base text-center mt-4">
                Introduce tu correo electrónico para enviarte los pasos para
                recuperar tu contraseña.
              </Text>

              {/* Input Email */}
              <View className="w-full mt-8">
                <InputControl
                  name="email"
                  label="Correo electrónico"
                  placeholder="correo@ejemplo.com"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Correo no válido",
                    },
                  }}
                  error={errors.email}
                  clearErrors={clearErrors}
                  isActive={isActive}
                  setActiveInput={setActiveInput}
                />
              </View>
              <TouchableOpacity
                className="bg-primary py-4 rounded-full max-w-56 w-full mt-10 items-center"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="color-white text-lg">Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentModal: {
    maxWidth: 422,
    alignItems: "center",
  },
});
