import { User } from "@src/domain/entities/user.entity";
import { AuthRepository } from "@src/domain/repository/auth.repository";
import { ApiClient, apiClient } from "./api-client";
import axios from "axios";
import { UserLoggedDTO } from "@src/application/dtos/user/UserLoggedDto";
import { UserLoginDto } from "@src/application/dtos/user/UserLoginDto";


const apiUrl = process.env.EXPO_PUBLIC_HOST;
const localApiClient = new ApiClient(apiUrl || "http://localhost:5097");

export class AuthApiRepository implements AuthRepository {
  // Metodo que indica: Cuando se resuelva la Promise recibe un tipo User
  async login(email: string, password: string): Promise<User> {
    try {
      // La respuesta de post debe recibir lo de LoginResponse
      const profile = await localApiClient.post<UserLoggedDTO>("/api/Auth/login", {
        email,
        password,
      });
      console.log("profile", profile);
      
      // para cuando usemos el token en el futuro
      // const profile = await apiClient.get<ProfileResponse>("/auth/profile", {
      //   Authorization: `Bearer ${login.access_token}`,
      // });
      
      return {
        ID_Usuario: profile.iD_Usuario,
        Nombre: profile.nombre,
        Email: profile.email,
        Rol: {
          iD_Rol: profile.rol.iD_Rol,
          nombre: profile.rol.nombre,
        },
      };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Credenciales incorrectas"
        : "Error de autenticación";
      throw new Error(message);
    }
  }
}
