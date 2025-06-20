import { LoginFieldName } from "../screens/Login/Login.types";

export const errorMessages: Record<
  LoginFieldName,
  Record<string, string>      // 2-nivel: campo → tipo de error → mensaje
> = {
  user: {
    required : "El usuario es obligatorio.",
    manual   : "Usuario o contraseña incorrectos.",
  },
  password: {
    required  : "La contraseña es obligatoria.",
    maxLength : "Máximo 8 caracteres.",
    manual    : "Usuario o contraseña incorrectos.",
  },
  email: {
    required : "El correo es obligatorio.",
    pattern  : "Introduce un correo válido.",
  },
};