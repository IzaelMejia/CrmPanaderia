import { AuthRepository } from "@/src/domain/repository/auth.repository";
import { MockAuthRepository } from "@/src/infrastructure/mock/mock-auth.repository";

export class LoginUseCase {
     constructor(private authRepo: AuthRepository = new MockAuthRepository()) {}
  
    execute(email: string, pass: string) {
      return this.authRepo.login(email, pass);
    }
  }