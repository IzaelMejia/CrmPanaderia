import { User } from "../entities/user.entity";

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  // restoreSession(): Promise<User | null>;
}
