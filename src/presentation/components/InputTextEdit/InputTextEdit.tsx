import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";

interface InputTextEditProps {
  label: string;
  placeholder?: string;
}

export const InputTextEdit: FC<InputTextEditProps> = ({
  label,
  placeholder,
}) => {
  const [activeInput, setActiveInput] = useState(false);

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
        value=""
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
    height: "100%"
  },
});
