import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";
interface ModalAddProps {
  open: boolean;
}

export const ModalAdd: FC<ModalAddProps> = ({ open }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={[globalStyles.opacityScreen, styles.centerContent]}>
        <View style={styles.contentData}>
          <Text className="text-3xl text-primary font-bold text-center">
            Agregar Producto
          </Text>

          <View className="mt-7">
            <View
              style={[
                styles.contentInput,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <TextInput
                style={[
                  globalStyles.inputText,
                  false
                    ? globalStyles.inputTextActive
                    : globalStyles.inputTextInactive,
                ]}
              />

              <Text
                style={[
                  globalStyles.txtInput,
                  false ? globalStyles.txtActive : globalStyles.txtInactive,
                ]}
              >
                Nombre
              </Text>
            </View>

          
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentData: {
    maxWidth: 400,
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  contentInput: {
    width: "100%",
    position: "relative",
    maxHeight: 46,
  },
});
