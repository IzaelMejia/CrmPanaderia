import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/src/infrastructure/store/store";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css"

export default function _layout() {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          backgroundColor: "red",
        }}
      >
        <StatusBar style="light" backgroundColor="blue" />
      </SafeAreaView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
