import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { useForm } from "react-hook-form";

import { ModalRecuperarPassword } from "./components/Modales/ModalRecuperarPassword";
import { showToastSucces } from "../../components/Toast/Toast";
import { InputControl } from "./components/InputControl/InputControl";
import { LoginFormData } from "./Login.types";
import { Colors } from "@/constants/Colors";

import imgInicio from "@/assets/images/fondoPantalla.jpg";
import { LoginUseCase } from "@/src/application/use-cases/login.use-case";

export const LoginScreen = () => {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const login = new LoginUseCase();
    await login.execute(data.user, data.password);
    showToastSucces("Bienvenido");
  };


  return (
    <View className="bg-white flex flex-row flex-1">
      <View className="w-2/4">
        <Image
          source={imgInicio}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          transition={500}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "50%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="w-full flex flex-1 justify-center align-middle ">
          <View className="flex justify-center items-center">
            <Text className="text-primary font-bold text-4xl">
              Panadería el Chino
            </Text>

            <View className="mt-10 flex justify-center align-middle ">
              <View className="flex flex-col gap-7">
                <View>
                  <InputControl
                    name="user"
                    label="Usuario"
                    placeholder="Ingresa tu usuario"
                    control={control}
                    rules={{ required: true }}
                    error={errors.user}
                    isActive={activeInput === "user"}
                    setActiveInput={setActiveInput}
                    clearErrors={clearErrors}
                  />
                </View>
                <View>
                  <InputControl
                    name="password"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    control={control}
                    rules={{ required: true, maxLength: 8 }}
                    secureTextEntry
                    error={errors.password}
                    isActive={activeInput === "password"}
                    setActiveInput={setActiveInput}
                    clearErrors={clearErrors}
                  />
                </View>
              </View>
              <View className="mt-4">
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.txtOlvidar}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-10 items-center b">
                <TouchableOpacity
                  className="bg-primary p-4 rounded-lg max-w-56 w-full"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-center color-white font-semibold">
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <ModalRecuperarPassword
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSend={(email) => {
          setModalVisible(false);
        }}
        isActive={activeInput === "email"}
        setActiveInput={setActiveInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  txtOlvidar: {
    color: Colors.gray_1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: 600,
  },
});
