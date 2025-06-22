import { Colors } from "@constants/Colors";
import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CircleAlert, TriangleAlert } from "lucide-react-native";

type AlertVariant = "error" | "warning";

interface AlertProps {
  children: ReactNode; // contenido de tu mensaje
  variant?: AlertVariant; // tipo de alerta (colores, icono)
}

const icons = {
  error: <CircleAlert size={20} color="#B91C1C" />,
  warning: <TriangleAlert size={20} color="#92400E" />,
};
export const InputAlert: React.FC<AlertProps> = ({
  variant = "error",
  children,
}) => {
  // clases por variante
  const baseClasses = "border-l-4 p-4 mb-4 flex-row items-start";
  const variantClasses = {
    error: "bg-red-100   border-red-500",
    warning: "bg-yellow-100 border-yellow-500",
  }[variant];
  const titleColor = {
    error: "text-red-800",
    warning: "text-yellow-800",
  }[variant];

  return (
    <View className={`${baseClasses} ${variantClasses}`}>
      <View className="mr-3">
        {icons[variant]}
      </View>
      <View className="flex-1">
        <Text className={`font-medium mb-1 ${titleColor}`}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Text>
        <Text className="text-base text-gray-700">
          {children}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    height: 48,
    width: "100%",
    backgroundColor: Colors.rojo_1,
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  img: {
    width: 22,
    height: 22,
    objectFit: "contain",
  },
  textAlert: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
});
