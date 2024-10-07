// DraggableNode.js
import React, { useEffect, useState, useRef } from "react";
import { useTheme, PaperProvider } from "react-native-paper";
import { Text, StyleSheet, findNodeHandle, UIManager } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import NodeMenu from "./NodeMenu";

const DraggableNode = ({
  node,
  handleDragEnd,
  isMenuOpen,
  onNodePress,
  scale,
  translateX,
  translateY,
}) => {
  const { colors } = useTheme(); // Get the colors from the theme
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: node.pos_x, y: node.pos_y });
  const start = useSharedValue({ x: node.pos_x, y: node.pos_y });

  const nodeRef = useRef(null); // Reference to the node's view

  // Anchor state to track menu position
  const [anchorPosition, setAnchorPosition] = useState({
    x: node.pos_x,
    y: node.pos_y,
  });
  // Update the anchor position using measure
  const updateAnchorPosition = () => {
    const nodeHandle = findNodeHandle(nodeRef.current);
    if (nodeHandle) {
      UIManager.measure(nodeHandle, (x, y, width, height, pageX, pageY) => {
        // Adjust anchor position based on canvas transformations
        const adjustedX = (pageX - translateX) / scale;
        const adjustedY = (pageY - translateY) / scale;
        setAnchorPosition({ x: adjustedX, y: adjustedY });
      });
    }
  };

  // Use useEffect to trigger updateAnchorPosition when node moves
  useEffect(() => {
    updateAnchorPosition();
  }, [offset.value.x, offset.value.y, scale, translateX, translateY]);

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
      runOnJS(updateAnchorPosition)();
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

  // Update anchorPosition when node's coordinates change
  useEffect(() => {
    if (offset.value.x !== 0 || offset.value.y !== 0) {
      setAnchorPosition({ x: offset.value.x, y: offset.value.y });
    }
  }, [offset.value.x, offset.value.y]);

  // Only pass valid coordinates to NodeMenu
  const validAnchor = anchorPosition.x !== 0 || anchorPosition.y !== 0;

  useEffect(() => {
    if (node.id === 3) {
      console.log(`Posicion del nodo segun redux: `, node.pos_x, node.pos_y);

      console.log(`Posicion segun component: `, offset.value.x, offset.value.y);
    }
  }, [anchorPosition]);

  return (
    <PaperProvider>
      {validAnchor && (
        <NodeMenu
          visible={isMenuOpen}
          closeMenu={() => onNodePress(null)}
          anchor={anchorPosition}
          node={node}
        />
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.ball,
            animatedStyles,
            { backgroundColor: colors.onBackground },
          ]}
          onTouchEnd={() => {
            onNodePress(node.id);
          }}
        >
          <Text style={{ color: colors.background, fontSize: 25 }}>
            {node.title}
          </Text>
          <Text style={{ color: colors.background, fontSize: 15 }}>
            {node.id}
          </Text>
        </Animated.View>
      </GestureDetector>
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
