import React, { createContext } from "react";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Croissant, House, LogOut, NotepadText } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useAppDispatch,
  useAppSelector,
} from "@src/infrastructure/store/hooks/reduxActions";
import { onLogout } from "@src/infrastructure/store/auth/authSlice";
import { Colors } from "@constants/Colors";
import { useRouter } from "expo-router";

// const { user } = useAppSelector((state) => state.auth);

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(onLogout());
    router.navigate("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => <LogOut color={color} size={size} />}
        onPress={() => handleLogout()}
        style={[styles.logout, { marginBottom: insets.bottom + 4 }]}
        labelStyle={styles.logoutLabel}
      />
    </View>
  );
}

export default function _layout() {
  const { user } = useAppSelector((state) => state.auth);
  console.log("user", user);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: Colors.primary,
          drawerHideStatusBarOnOpen: true,
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Inicar",
            drawerIcon: ({ size, color }) => (
              <House color={color} size={size} />
            ),
          }}
        />

        <Drawer.Protected guard={user?.Rol.iD_Rol === 1}>
          <Drawer.Screen
            name="productos"
            options={{
              drawerLabel: "Productos",
              title: "Productos",
              drawerIcon: ({ size, color }) => (
                <Croissant color={color} size={size} />
              ),
            }}
          />
        </Drawer.Protected>
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  logout: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
  logoutLabel: { color: Colors.gray_1 },
});
