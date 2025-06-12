import { Redirect } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/infrastructure/store/store";
import { createContext, useEffect } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "@/src/infrastructure/store/hooks/reduxActions";
import { useRouter } from "expo-router";

export default function Index() {
  // const logged = useAppSelector((state) => state.auth.logged);
  // console.log("logged", logged);
  const logged = false;

  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
