import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "@/src/infrastructure/store/hooks/reduxActions";

export const HomeScreen = () => {
  const { logged, permission , user } = useAppSelector((state) =>  state.auth);
  console.log("logged", logged);
  console.log("permission", permission);
  console.log("user", user);
  
  return (
    <View className="bg-slate-700 flex-1">
      <Text className="text-white">Hola estas en el Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
