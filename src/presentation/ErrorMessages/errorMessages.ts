type FormData = {
  user: string;
  password: string;
};

export const errorMessages: Record<keyof FormData, string> = {
  user: "Usuario incorrecto.",
  password: "Contraseña incorrecta.",
};
