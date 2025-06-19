import { LoginFieldName } from "../screens/Login/Login.types";


export const errorMessages: Record<LoginFieldName, string> = {
  user: "Usuario incorrecto.",
  password: "Contraseña incorrecta.",
  email: "Correo electrónico incorrecto.",
};
