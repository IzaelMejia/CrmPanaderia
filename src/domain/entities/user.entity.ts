import { Rol } from "./rol.entity";

export interface User {
  ID_Usuario: number;
  Nombre: string;
  Email: string;
  Password?: string;
  ID_Rol?: number;
  roleName?: string;
  Token?: string;
  Activo?: boolean;
  Rol: Rol;
}
