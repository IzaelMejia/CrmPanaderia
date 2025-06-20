import { AuthRepository } from "@/src/domain/repository/auth.repository";
import { AuthApiRepository } from "@/src/infrastructure/api/auth-api.repository";
import { MockAuthRepository } from "@/src/infrastructure/mock/mock-auth.repository";

export class LoginUseCase {
    //  constructor(private authRepo: AuthRepository = new MockAuthRepository()) {} //datos de ejemplo
     constructor(private authRepo: AuthRepository = new AuthApiRepository()) {}

  
    execute(email: string, pass: string) {
      return this.authRepo.login(email, pass);
    }
  }