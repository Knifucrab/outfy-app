// DraggableNode.js
import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const DraggableNode = ({ node, handleDragEnd }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: node.pos_x, y: node.pos_y });

  const start = useSharedValue({ x: node.pos_x, y: node.pos_y });

  //useEffect to change the value of start if node.pos_x or node.pos_y change his value
  useEffect(() => {
    start.value = { x: node.pos_x, y: node.pos_y };
  }, [node.pos_x, node.pos_y]); // Dependency on node position

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      const newPosition = {
        id: node.id,
        pos_x: offset.value.x,
        pos_y: offset.value.y,
      };
      runOnJS(handleDragEnd)(newPosition);
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
        { scale: withSpring(isPressed.value ? 1.04 : 1) },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.ball,
          animatedStyles,
          { backgroundColor: colors.onBackground },
        ]}
      >
        <Text style={{ color: colors.background, fontSize: 25 }}>
          {node.title}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  ball: {
    width: 150,
    height: 80,
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default DraggableNode;
