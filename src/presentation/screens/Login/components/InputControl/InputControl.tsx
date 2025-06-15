import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { InputControlProps } from "./InputControl.types";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/globals/global-styles";
import { InputAlert } from "../../../../components/Alert/InputAlert";
import { errorMessages } from "../../../../ErrorMessages/errorMessages";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

export const InputControl = ({
  name,
  label,
  placeholder,
  secureTextEntry = false,
  rules,
  control,
  error,
  isActive,
  setActiveInput,
  clearErrors,
}: InputControlProps) => {
   // Solo para el password
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = name === "password";

  return (
    <View>
      <View style={[styles.contentInput, { flexDirection: "row", alignItems: "center" }]}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Colors.gray_1}
                style={[
                  globalStyles.inputText,
                  isActive
                    ? globalStyles.inputTextActive
                    : globalStyles.inputTextInactive,
                  { flex: 1, paddingRight: isPassword ? 40 : 10 }, // espacio para el ícono
                ]}
                secureTextEntry={isPassword ? !showPassword : secureTextEntry}
                onChangeText={(text) => {
                  if (isPassword) {
                    text = text.slice(0, 8);
                  }
                  onChange(text);
                  if (error) clearErrors(name);
                }}
                onFocus={() => setActiveInput(name)}
                onBlur={() => setActiveInput(null)}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={isPassword ? 8 : undefined}
              />
              {isPassword && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 12,
                  }}
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={10}
                  activeOpacity={0.6}
                >
                  {showPassword ? (
                    <EyeOff size={22} color={Colors.black} />
                  ) : (
                    <Eye size={22} color={Colors.black} />
                  )}
                </TouchableOpacity>
              )}
            </>
          )}
        />
        <Text
          style={[
            globalStyles.txtInput,
            isActive ? globalStyles.txtActive : globalStyles.txtInactive,
          ]}
        >
          {label}
        </Text>
      </View>
      {error && <InputAlert variant="error">{errorMessages[name]}</InputAlert>}
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
