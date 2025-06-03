import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export const unstable_settings = {
  initialRouteName: "login",
};

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: "red",
          drawerHideStatusBarOnOpen: true,
        }}
      >
        <Drawer.Screen
          name="login"
          options={{
            drawerLabel: "Iniciar Sesión",
            title: "Inicar",
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="(app)/index"
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer> */}
    </GestureHandlerRootView>
  );
}
