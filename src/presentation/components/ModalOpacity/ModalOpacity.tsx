import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { FC, ReactNode } from "react";
import { globalStyles } from "@globals/global-styles";

interface ModalOpacityProps {
  open: boolean;
  close: () => void;
  children: ReactNode;
}

const ModalOpacity: FC<ModalOpacityProps> = ({ open, close, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={close}
      supportedOrientations={["landscape-left", "landscape-right"]}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={[globalStyles.opacityScreen, styles.centerContent]}>
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalOpacity;

const styles = StyleSheet.create({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
