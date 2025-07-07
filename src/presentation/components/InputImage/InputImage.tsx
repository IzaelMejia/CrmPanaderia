import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { globalStyles } from "@globals/global-styles";
import { ImagePlus, Images } from "lucide-react-native";
import { Colors } from "@constants/Colors";
import { Image } from "expo-image";

export const InputImage = () => {
  const [image, setImage] = useState<any>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity style={styles.contentInput} onPress={pickImage}>
      {image === null || image?.length === 0 ? (
        <View style={styles.contentImg}>
          <ImagePlus width={50} height={50} color={Colors.primary} />
        </View>
      ) : (
        <Image
          cachePolicy={"memory-disk"}
          source={image?.uri}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    width: 100,
    position: "relative",
    height: 100,
    borderRadius: 100,
  },
  txtAddImg: {
    fontSize: 14,
    color: Colors.gray_1,
  },
  contentImg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    backgroundColor: Colors.green_2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    objectFit: "contain",
  },
});
