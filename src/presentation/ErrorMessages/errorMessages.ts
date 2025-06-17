type FormData = {
  user: string;
  password: string;
  email: string;
};

export const errorMessages: Record<keyof FormData, string> = {
  user: "Usuario incorrecto.",
  password: "Contraseña incorrecta.",
  email: "Correo electrónico incorrecto.",
};
