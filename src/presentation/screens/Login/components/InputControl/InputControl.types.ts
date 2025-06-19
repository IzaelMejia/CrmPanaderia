import { LoginFieldName } from "../../Login.types";

export type InputControlProps = {
  name: LoginFieldName;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules: any;
  control: any;
  error: any;
  isActive: boolean;
   setActiveInput: (v: LoginFieldName | null) => void;
  clearErrors: (name?: LoginFieldName) => void;
};
