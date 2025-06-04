// import { Redirect } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/presentation/store/store";
import { createContext } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "@/src/presentation/store/hooks/reduxActions";
export default function Start() {
  
  return (
      <View style={{backgroundColor: "red", flex: 1}}>
        <Text>Hola</Text>
      </View>
  );
  // <Redirect href="/login" />;
}
