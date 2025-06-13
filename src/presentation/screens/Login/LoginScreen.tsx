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

import imgInicio from "@/assets/images/fondoPantalla.jpg";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/globals/global-styles";
import { InputAlert } from "../../components/InputAlert";

export const LoginScreen = () => {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  console.log("activeInput", activeInput);

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
                <View style={styles.contentInput}>
                  <TextInput
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor={Colors.gray_1}
                    style={[
                      globalStyles.inputText,
                      activeInput === "usuario"
                        ? globalStyles.inputTextActive
                        : globalStyles.inputTextInactive,
                    ]}
                    onFocus={() => setActiveInput("usuario")}
                    onBlur={() => setActiveInput(null)}
                    // Si esta activo el input, se le agrega el estilo de input activo
                  />
                  <Text
                    style={[
                      globalStyles.txtInput,
                      activeInput === "usuario"
                        ? globalStyles.txtActive
                        : globalStyles.txtInactive,
                    ]}
                  >
                    Usuario
                  </Text>
                </View>
                <View style={styles.contentInput}>
                  <TextInput
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor={Colors.gray_1}
                    style={[
                      globalStyles.inputText,
                      activeInput === "password"
                        ? globalStyles.inputTextActive
                        : globalStyles.inputTextInactive,
                    ]}
                    onFocus={() => setActiveInput("password")}
                    onBlur={() => setActiveInput(null)}
                  />
                  <Text
                    style={[
                      globalStyles.txtInput,
                      activeInput === "password"
                        ? globalStyles.txtActive
                        : globalStyles.txtInactive,
                    ]}
                  >
                    Contraseña
                  </Text>
                </View>
                <InputAlert variant="error">Contraseña incorrecta.</InputAlert>
              </View>
              <View className="mt-4">
                <TouchableOpacity>
                  <Text style={styles.txtOlvidar}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-10 items-center b">
                <TouchableOpacity className="bg-primary p-4 rounded-lg max-w-56 w-full">
                  <Text className="text-center color-white font-semibold">
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    width: 336,
    position: "relative",
    maxHeight: 46,
  },
  inputsWrapper: {
    width: 336,
  },
  txtOlvidar: {
    color: Colors.gray_1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: 600,
  },
});
