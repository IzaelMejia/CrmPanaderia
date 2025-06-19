import { AuthRepository } from "@/src/domain/repository/auth.repository";
import { User } from "@/src/domain/entities/user.entity";
import { Permission } from "@/src/domain/entities/permission.entity";

const mockPermissions: Permission[] = [
  {
    IdModulo: 1,
    Nombre: "Dashboard",
    NombreMostrar: "Dashboard",
    CanCreate: true,
    CanRead: true,
    CanUpdate: true,
    CanDelete: true,
    CanActivateInactivate: false,
    OrdenModulo: 1,
  },
];

const mockUser: User & { PermisosPerfil: Permission[] } = {
  id: 1,
  name: "Mock User",
  email: "mock@example.com",
  username: "mockuser",
  roleId: 1,
  roleName: "Administrator",
  token: "mock-token",
  PermisosPerfil: mockPermissions,
};

export class MockAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("mockUser", mockUser);
        resolve({ ...mockUser, email });
        
      }, 500);
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  }

}