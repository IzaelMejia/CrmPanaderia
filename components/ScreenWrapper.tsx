import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@constants/Colors";

type ScreenWrapperProps = {
  children: ReactNode;
};

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
}) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }} edges={["top"]}>
    <StatusBar style="light" backgroundColor="blue" />
    {children}
  </SafeAreaView>
);
