import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { persistor, store } from "@src/infrastructure/store/store";
import "../global.css";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { AppToast } from "@src/presentation/components/Toast/Toast";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "@constants/Colors";

export default function _layout() {
  // useEffect(() => {
  //   ScreenOrientation.lockAsync(
  //     ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  //   );
  // }, []);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView
          style={{
            backgroundColor: Colors.primary,
          }}
        >
          <StatusBar style="light"  />
        </SafeAreaView>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <AppToast />
      </PersistGate>
    </Provider>
  );
}
