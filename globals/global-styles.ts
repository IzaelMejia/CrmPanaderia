import { Colors } from "@constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  opacityScreen: {
    flex: 1,
    backgroundColor: Colors.opacity,
  },
  containerAbsoluteOpacity: {
    flex: 1,
    backgroundColor: "#0000005e",
    opacity: 1,
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
  },
  inputText: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputTextActive: {
    borderColor: Colors.primary,
  },
  inputTextInactive: {
    borderColor: Colors.gray_1,
  },
  txtInput: {
    position: "absolute",
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    fontWeight: 600,
    fontSize: 14,
    top: -11,
    left: 9,
  },
  txtActive: {
    color: Colors.primary,
  },
  txtInactive: {
    color: Colors.gray_1,
  },
});
