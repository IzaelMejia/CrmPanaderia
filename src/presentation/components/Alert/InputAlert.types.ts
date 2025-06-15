import { ReactNode } from "react";

type AlertVariant = "error" | "warning";

export interface AlertProps {
  children: ReactNode; // contenido de tu mensaje
  variant?: AlertVariant; // tipo de alerta (colores, icono)
}
