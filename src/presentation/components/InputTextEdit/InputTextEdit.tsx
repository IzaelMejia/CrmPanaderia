import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";

interface InputTextEditProps {
  label: string;
  placeholder?: string;
  value?: string | undefined ;
}

export const InputTextEdit: FC<InputTextEditProps> = ({
  label,
  placeholder,
  value
}) => {
  const [activeInput, setActiveInput] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setActiveInput(true);
    }
  }, [value]);

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
