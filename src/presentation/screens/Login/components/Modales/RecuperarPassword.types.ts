export type RecuperarPasswordProps = {
  visible: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  isActive: boolean;
  setActiveInput: (v: string | null) => void;
};
