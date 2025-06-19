export interface LoginFormData {
  user: string;
  password: string;
  email: string;
}
export type LoginFieldName = keyof LoginFormData;