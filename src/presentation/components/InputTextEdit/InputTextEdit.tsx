import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";

type InputMask = "none" | "letters" | "numbers" | "alphanumeric";
interface InputTextEditProps {
  label: string;
  placeholder?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  /** NUEVO: bandera para filtrar entrada */
  inputMask?: InputMask;
  /** Opcionales para letras */
  allowSpaces?: boolean; // default true
  allowAccents?: boolean; // default true
  /** Passthrough para limitar longitud */
  maxLength?: number;
  /** Por si quieres controlar multiline (antes estaba fijo en true) */
  multiline?: boolean;
  numberOfLines?: number;
}

export const InputTextEdit: FC<InputTextEditProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",

  inputMask = "none",
  allowSpaces = true,
  allowAccents = true,
  maxLength,
  multiline = true,
  numberOfLines = 4,
}) => {
  const [activeInput, setActiveInput] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setActiveInput(true);
    }
  }, [value]);

  const sanitizer = useMemo(() => {
    // Construimos regex según la máscara
    if (inputMask === "letters") {
      // Letras con o sin acentos; opcionalmente espacios
      const baseLetters = allowAccents ? "a-zA-ZñÑáéíóúÁÉÍÓÚ" : "a-zA-Z";
      const space = allowSpaces ? "\\s" : "";
      // Todo lo que NO sea permitido será eliminado
      return new RegExp(`[^${baseLetters}${space}]`, "g");
    }

    if (inputMask === "numbers") {
      // Solo dígitos (teléfono). Si quieres permitir + o -, ajusta aquí.
      return /[^0-9]/g;
    }

    if (inputMask === "alphanumeric") {
      const letters = allowAccents ? "a-zA-ZñÑáéíóúÁÉÍÓÚ" : "a-zA-Z";
      const space = allowSpaces ? "\\s" : "";
      return new RegExp(`[^${letters}0-9${space}]`, "g");
    }

    // Sin filtro
    return null;
  }, [inputMask, allowSpaces, allowAccents]);

  const handleChange = (raw: string) => {
    const cleaned = sanitizer ? raw.replace(sanitizer, "") : raw;
    onChangeText?.(cleaned);
  };

  return (
    <View
      style={[
        styles.contentInput,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
      <TextInput
        style={[
          globalStyles.inputText,
          activeInput
            ? globalStyles.inputTextActive
            : globalStyles.inputTextInactive,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray_1}
        onFocus={() => setActiveInput(true)}
        value={value}
        onChangeText={handleChange}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        multiline={multiline}
        maxLength={maxLength}
      />

      <Text
        style={[
          globalStyles.txtInput,
          activeInput ? globalStyles.txtActive : globalStyles.txtInactive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    width: "100%",
    position: "relative",
    height: "100%",
  },
});
