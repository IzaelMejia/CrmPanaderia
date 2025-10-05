import { Rol } from "@src/domain/entities/rol.entity";

export interface UserLoggedDTO {
  iD_Usuario: number;
  nombre: string;
  email: string;
  rol: Rol;
}
