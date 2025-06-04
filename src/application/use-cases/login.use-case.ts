import { AuthRepository } from "@/src/domain/repository/auth.repository";

export class LoginUseCase {
    constructor(private authRepo: AuthRepository) {}
  
    execute(email: string, pass: string) {
      return this.authRepo.login(email, pass);
    }
  }