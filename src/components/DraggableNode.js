// DraggableNode.js
import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const DraggableNode = ({ node }) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const testToConsole = () => {
    console.log("funcionooo");
  };

  const start = useSharedValue({ x: node.pos_x, y: node.pos_y });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      console.log("Gesture Begin");
      isPressed.value = true;
    })
    .onUpdate((e) => {
      console.log("Gesture Update", offset.value.x, offset.value.y);
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      console.log("Gesture End");
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      const newPosition = {
        id: node.id,
        pos_x: offset.value.x,
        pos_y: offset.value.y,
      };
      runOnJS(testToConsole)();
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  // Animated Style
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]}>
        <Text>{node.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});

export default DraggableNode;
