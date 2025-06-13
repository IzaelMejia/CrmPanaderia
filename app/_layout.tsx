import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { store } from "@/src/infrastructure/store/store";
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
