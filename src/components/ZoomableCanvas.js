// ZoomableCanvas.js
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const ZoomableCanvas = ({ children, scale, translateX, translateY }) => {
  // Create pinch gesture
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    scale.value = event.scale; // update the scale
  });

  // Create pan gesture
  const panGesture = Gesture.Pan().onUpdate((event) => {
    translateX.value = event.translationX; // update the horizontal translation
    translateY.value = event.translationY; // update the vertical translation
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withTiming(scale.value) },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[styles.canvas, animatedStyle]}>
          <GestureDetector gesture={panGesture}>
            <Animated.View>{children}</Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});

export default ZoomableCanvas;
