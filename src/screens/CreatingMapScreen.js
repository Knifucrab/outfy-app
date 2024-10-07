// CreatingMapScreen.js
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import DraggableNode from "../components/DraggableNode";
import { useNavigation } from "@react-navigation/native";
import { addNode, updateNodePosition } from "../store/mindmapReducer"; // Adjust path as necessary
import ModifyNodeBar from "../components/ModifyNodeBar";
import ZoomableCanvas from "../components/ZoomableCanvas";
import { useSharedValue } from "react-native-reanimated";

const CreatingMapScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.mindmap.nodes); // Get nodes from Redux

  // references to the scale and translation values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleDragEnd = (newPosition) => {
    dispatch(updateNodePosition(newPosition));
  };

  const handleAddNode = (node) => {
    dispatch(addNode(node));
  };

  const [openMenuNodeId, setOpenMenuNodeId] = useState(null);

  const handleNodePress = (nodeId) => {
    setOpenMenuNodeId(openMenuNodeId === nodeId ? null : nodeId); // Close if same node is clicked
  };

  useEffect(() => {
    // Hide the tab bar when this screen is focused
    const parentNavigator = navigation.getParent();
    parentNavigator?.setOptions({ tabBarStyle: { display: "none" } });

    // Show the tab bar when leaving this screen (blur event)
    const unsubscribeBlur = navigation.addListener("blur", () => {
      parentNavigator?.setOptions({ tabBarStyle: { display: "flex" } });
    });

    // Reset the tab bar style when this screen gains focus again
    const unsubscribeFocus = navigation.addListener("focus", () => {
      parentNavigator?.setOptions({ tabBarStyle: { display: "none" } });
    });

    // Cleanup: Reset the tabBarStyle when leaving the screen or focusing other screens
    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
      // Ensure the tab bar style is reset to its default when this screen is left
      parentNavigator?.setOptions({
        tabBarStyle: {
          display: "flex",
          backgroundColor: colors.surface,
        },
      });
    };
  }, [navigation]);

  return (
    <ZoomableCanvas
      scale={scale}
      translateX={translateX}
      translateY={translateY}
    >
      {nodes.map((node) => (
        <DraggableNode
          key={node.id}
          node={node}
          handleDragEnd={handleDragEnd}
          isMenuOpen={openMenuNodeId === node.id}
          onNodePress={handleNodePress}
          scale={scale.value} // Pass scale to DraggableNode
          translateX={translateX.value} // Pass translateX to DraggableNode
          translateY={translateY.value} // Pass translateY to DraggableNode
        />
      ))}
      <ModifyNodeBar handleAddNode={handleAddNode} />
    </ZoomableCanvas>
  );
};

const styles = StyleSheet.create({});

export default CreatingMapScreen;
