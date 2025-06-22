import { TextInput, TextStyle, ViewStyle } from "react-native";

export interface InputSearchProps {
  value?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSubmit?: (text: string) => void;
  autoFocus?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  ref?: React.Ref<TextInput>;
}