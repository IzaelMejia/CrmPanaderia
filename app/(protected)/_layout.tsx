import React, { createContext } from "react";
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

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: "red",
          drawerHideStatusBarOnOpen: true,
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Inicar",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
