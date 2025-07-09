import {
  findNodeHandle,
  FlatList,
  InteractionManager,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Feather } from "lucide-react-native";
import { globalStyles } from "@globals/global-styles";
import { Colors } from "@constants/Colors";
import { TypeBread } from "@src/domain/entities/types-bread.entity";

interface InputSelectorProps {
  label: string;
  placeholder?: string;
  options: TypeBread[];
  valueId?: number | undefined ;
}

export const InputSelector: FC<InputSelectorProps> = ({
  label,
  placeholder = "Ejemplo",
  options,
  valueId
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(false);
  const containerRef = useRef<View | null>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleOpen = () => {
    InteractionManager.runAfterInteractions(() => {
      containerRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        setPosition({ x: pageX, y: pageY, width, height });
        setModalVisible(true);
        setActiveInput(true);
      });
    });
  };

  useEffect(() => {
    if (modalVisible) {
      setActiveInput(true);
    }else{
      setActiveInput(false);
    }
  }, [modalVisible]);

  return (
    <View ref={containerRef} className="relative">
      <Text
        style={[
          globalStyles.txtInput,
          (valueId || activeInput) ? globalStyles.txtActive : globalStyles.txtInactive,
        ]}
      >
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleOpen}
        style={[
          globalStyles.inputText,
          (valueId || activeInput)
            ? globalStyles.inputTextActive
            : globalStyles.inputTextInactive,
        ]}
        className="relative"
      >
        {valueId ? (
          <Text style={[styles.txtData, styles.txtReference]}>
            {options.find(opt => opt.id === valueId)?.name ?? placeholder}
          </Text>
        ) : (
          <Text style={[styles.txtData, styles.txtPlaceHolcer]}>
            {placeholder}
          </Text>
        )}
        <View className="absolute right-2 top-3">
          {!modalVisible ? (
            <ChevronDown width={24} height={23} color={Colors.gray_1} />
          ) : (
            <ChevronUp width={24} height={23} color={Colors.gray_1} />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1 }}>
            <View
              style={[
                styles.dropdown,
                {
                  top: position.y + position.height,
                  left: position.x,
                  width: position.width,
                },
              ]}
            >
              <FlatList
                data={options}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => {
                        //   onValueChange(item.value);
                        //   setModalVisible(false);
                      }}
                    >
                      <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              ></FlatList>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
  },
  txtData: {
    fontSize: 14,
  },
  txtReference: {
    color: Colors.black_2,
  },
  txtPlaceHolcer: {
    color: Colors.gray_1,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // sombra Android
    elevation: 5,
    zIndex: 3,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
