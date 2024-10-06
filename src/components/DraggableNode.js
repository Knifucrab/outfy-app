// DraggableNode.js
import React, { useEffect, useState } from "react";
import { useTheme, PaperProvider } from "react-native-paper";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import NodeMenu from "./NodeMenu";

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

  // Menu logic
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const openMenu = (event) => {
    setAnchor({ x: offset.value.x, y: offset.value.y });
    setMenuVisible(true);
  };
  const closeMenu = () => setMenuVisible(false);

  return (
    <PaperProvider>
      <NodeMenu visible={menuVisible} closeMenu={closeMenu} anchor={anchor} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.ball,
            animatedStyles,
            { backgroundColor: colors.onBackground },
          ]}
          onTouchEnd={openMenu}
        >
          <Text style={{ color: colors.background, fontSize: 25 }}>
            {node.title}
          </Text>
          <Text style={{ color: colors.background, fontSize: 15 }}>
            {node.id}
          </Text>
        </Animated.View>
      </GestureDetector>

      {/* Menu */}
    </PaperProvider>
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
