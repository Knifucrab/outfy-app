import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const DraggableNode = () => {
  // Shared values to keep track of the node’s position
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesture handler to track the drag gesture
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      // Optional: Add spring animation to give it a bounce effect on release
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    },
  });

  // Apply animated styles based on the current position
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.node, animatedStyle]} />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const CreatingMapScreen = () => {
  const { colors } = useTheme(); // Get the colors from the theme
  return (
    <View style={styles.canvas}>
      {/* Multiple draggable nodes can be placed here */}
      <DraggableNode />
      <DraggableNode />
      <DraggableNode />
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light background for the canvas
  },
  node: {
    width: 100,
    height: 100,
    backgroundColor: "#4CAF50",
    borderRadius: 50, // Making the node circular
    position: "absolute",
  },
});

export default CreatingMapScreen;
