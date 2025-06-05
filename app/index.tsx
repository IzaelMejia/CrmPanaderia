// import { Redirect } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/infrastructure/store/store";
import { createContext } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "@/src/infrastructure/store/hooks/reduxActions";
export default function Start() {
    // const AuthContext = createContext({});

  const { logged } = useAppSelector((state) => state.auth);
  console.log("logged", logged);
  return (
    <View>
      <Text>Hola</Text>
    </View>
    
  );
  // <Redirect href="/login" />;
}
