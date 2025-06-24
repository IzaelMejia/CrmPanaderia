import React, { FC, useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface SkeletonPlaceholderProps {
  style?: StyleProp<ViewStyle>;
}

export const SkeletonPlaceholder: FC<SkeletonPlaceholderProps> = (props) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.skeleton, props.style, { opacity }]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
  },
});

