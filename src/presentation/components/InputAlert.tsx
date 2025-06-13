import React, { ReactNode } from "react";
import { View, Text } from "react-native";
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
  const baseClasses = "p-4 mb-4 flex-row items-start rounded-sm";

  const variantClasses = {
    error: "bg-red-100   border-red-500",
    warning: "bg-yellow-100 border-yellow-500",
  }[variant];

  return (
    <View className={`${baseClasses} ${variantClasses}`}>
      <View className="mr-3">{icons[variant]}</View>
      <View className="flex-1">
        <Text className="text-base text-rojoAlerte font-medium">
          {children}
        </Text>
      </View>
    </View>
  );
};
