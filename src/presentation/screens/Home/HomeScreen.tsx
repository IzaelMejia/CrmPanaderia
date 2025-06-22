import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@constants/Colors";
import { Menu, Minus, Plus } from "lucide-react-native";
import { InputSearch } from "@src/presentation/components/InputSearch/InputSearch";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import TouchDrawer from "@src/presentation/components/TouchDrawer/TouchDrawer";

export const HomeScreen = () => {
  const { logged, permission, user } = useAppSelector((state) => state.auth);
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  // console.log("logged", logged);
  // console.log("permission", permission);
  // console.log("user", user);

  const handleSubmit = (text: string) => {
    console.log("🔍 Buscar:", text);
  };

  return (
    <View className="flex-1 flex flex-row" style={styles.container}>
      <View style={styles.containerLeft} className=" p-4">
        <View className="d-flex flex-row items-center gap-5">
          <TouchDrawer />
          <InputSearch
            value={query} // texto controlado
            onChangeText={setQuery}
            onSubmit={handleSubmit}
            placeholder="Buscar productos..."
            autoFocus
          />
        </View>
      </View>
      <View style={styles.containerRigth}>
        <View className="border-b-hairline border-b-gray-500">
          <Text className="text-lg font-medium">Detalles de la Orden</Text>
        </View>
        <Text className="mt-3">
          Total productos <Text className="color-gray_1">(4 piezas)</Text>
        </Text>
        <View className="d-flex flex-col justify-between flex-1 mt-4">
          <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
            <View className="p-2 border-gray_1 border-hairline rounded-lg">
              <View className="d-flex flex-row items-center ">
                <View
                  className="h-16 bg-slate-900 rounded-md "
                  style={{ width: "24%" }}
                ></View>
                <View className="pl-1 gap-2" style={{ width: "76%" }}>
                  <Text className="text-base">Concha</Text>
                  <View className="d-flex flex-row justify-between ">
                    <View className=" w-full d-flex flex-row justify-between items-center">
                      <Text className="text-sm text-black_1 font-bold">
                        $14.00
                      </Text>
                      <Text className="color-rojo text-base font-bold">
                        $14.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mt-6 d-flex flex-row justify-between items-center">
                <TouchableOpacity
                  className=" h-7 items-center justify-center bg-neutral-300 rounded-md"
                  style={{ width: 50 }}
                >
                  <Text className="font-semibold">-10</Text>
                </TouchableOpacity>
                <View className="d-flex flex-row gap-4 items-center justify-center">
                  <TouchableOpacity
                    className="rounded-full  bg-neutral-300 items-center justify-center"
                    style={styles.touchableIncrement}
                  >
                    <Minus size={14} />
                  </TouchableOpacity>
                  <Text className="font-semibold text-base">20</Text>
                  <TouchableOpacity
                    className="rounded-full  bg-primary items-center justify-center"
                    style={styles.touchableIncrement}
                  >
                    <Plus size={14} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className=" h-7 items-center justify-center bg-primary rounded-md"
                  style={{ width: 50 }}
                >
                  <Text className="text-white font-semibold">+10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View className="w-full ">
            <Text className="text-base font-bold">Resumen del pedido</Text>
            <View className="h-12 w-full bg-neutral-300 rounded-md items-center d-flex flex-row justify-between px-3 mt-2">
              <Text className="text-black_1 text-base font-medium">Total:</Text>
              <Text className="text-rojo font-extrabold text-base">$28.00</Text>
            </View>

            <TouchableOpacity className="bg-primary h-11 items-center justify-center mt-6 rounded-md">
              <Text className="text-base font-semibold color-white ">
                Finalizar orden
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    flex: 1,
  },
  containerLeft: {
    width: "75%",
  },
  containerRigth: {
    width: "25%",
    height: "100%",
    backgroundColor: Colors.backgroundWhite,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  touchableIncrement: {
    width: 26,
    height: 26,
  },
});
