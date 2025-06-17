export type InputControlProps = {
  name: "user" | "password" | "email";
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules: any;
  control: any;
  error: any;
  isActive: boolean;
  setActiveInput: (v: string | null) => void;
  clearErrors: (name?: "user" | "password" | "email") => void;
};
