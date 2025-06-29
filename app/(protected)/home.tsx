// app/home.tsx
import React from "react";
import { HomeScreen } from "@src/presentation/screens/Home/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@constants/Colors";

export default function HomeRoute() {
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <StatusBar style="light" backgroundColor="blue" />
      </SafeAreaView>
      <HomeScreen />
    </>
  );
}
