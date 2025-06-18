import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { store } from "@/src/infrastructure/store/store";
import "../global.css";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function _layout() {
  
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

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
