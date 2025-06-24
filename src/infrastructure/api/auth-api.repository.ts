import { User } from "@src/domain/entities/user.entity";
import { AuthRepository } from "@src/domain/repository/auth.repository";
import { apiClient } from "./api-client";
import axios from "axios";

interface LoginResponse {
  access_token: string;
}

interface ProfileResponse {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: string;
  avatar: string;
}

export class AuthApiRepository implements AuthRepository {
  // Metodo que indica: Cuando se resuelva la Promise recive un tipo User
  async login(email: string, password: string): Promise<User> {
    try {
      // La respuesta de post debe recibir lo de LoginResponse
      const login = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const profile = await apiClient.get<ProfileResponse>("/auth/profile", {
        Authorization: `Bearer ${login.access_token}`,
      });
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        username: profile.email.split("@")[0],
        roleId: 0,
        roleName: profile.role,
        token: login.access_token,
      };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Credenciales incorrectas"
        : "Error de autenticación";
      throw new Error(message);
    }
  }
}
