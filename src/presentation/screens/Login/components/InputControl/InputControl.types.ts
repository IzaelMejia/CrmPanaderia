export type InputControlProps = {
  name: "user" | "password";
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules: any;
  control: any;
  error: any;
  isActive: boolean;
  setActiveInput: (v: string | null) => void;
  clearErrors: (name?: "user" | "password") => void;
};
