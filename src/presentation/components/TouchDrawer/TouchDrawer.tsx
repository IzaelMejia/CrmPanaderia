import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { Menu } from "lucide-react-native";
import { Colors } from "@constants/Colors";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export const TouchDrawer = memo(() => {
  const navigation = useNavigation();

  const openDrawer = (_e?: GestureResponderEvent) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity
      onPress={openDrawer}
      className="w-auto h-auto items-center justify-center"
    >
      <Menu size={42} color={Colors.primary} />
    </TouchableOpacity>
  );
});

export default TouchDrawer;

