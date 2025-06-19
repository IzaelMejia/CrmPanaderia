import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { StyleSheet, Text, View } from "react-native";

import { CircleCheckBig } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Colors.primary }}
      text1Style={{ fontSize: 16, fontWeight: "600" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.rojo_1 }}
      text1Style={{ fontSize: 16, fontWeight: "600" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  toastSucces: ({ text1, text2 }: any) => {
    return (
      <View style={[styles.toast, styles.toastSuccesContainer]}>
        <CircleCheckBig color="#fff" size={20} />
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    );
  },
};


export const AppToast = () => <Toast config={toastConfig} position="bottom" />;
export const showSuccess = (message: string, description?: string) => {
  Toast.show({ type: "success", text1: message, text2: description });
};

export const showError = (message: string, description?: string) => {
  Toast.show({ type: "error", text1: message, text2: description });
};

export const showToastSucces = (message: string, description?: string) => {
  Toast.show({ type: "toastSucces", text1: message, text2: description });
};

const styles = StyleSheet.create({
  toast: {
    height: 60,
    width: 340,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
  toastSuccesContainer: {
    backgroundColor: Colors.aletSucces,
  },
  txtToast: {
    fontSize: 18,
    fontWeight: "500",
  },
});
