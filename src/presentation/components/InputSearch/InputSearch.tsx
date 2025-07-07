import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { InputSearchProps } from "./InputSearchProps";
import { Search } from "lucide-react-native";
import { Colors } from "@constants/Colors";

export function InputSearch({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Buscar…",
  ref: externalRef,
}: InputSearchProps) {
  const internalRef = useRef<TextInput>(null);
  useImperativeHandle(externalRef, () => internalRef.current!, []);

  const emitChange = useCallback(
    (text: string) => onChangeText(text),
    [onChangeText]
  );

  return (
    <View style={styles.container}>
      <Search size={24} color={Colors.gray_1} style={{ marginRight: 6 }} />
      <TextInput
        ref={internalRef}
        style={[styles.input]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray_1}
        onChangeText={emitChange}
        returnKeyType="search"
        autoFocus={false}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor="#038C25"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 52,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    maxWidth: 500,
    fontSize: 22,
  },
  input: {
    fontSize: 16,
    color: "#111827",
    width: "100%",
    height: "100%",
  },
});
