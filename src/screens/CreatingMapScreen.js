// CreatingMapScreen.js
import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import DraggableNode from "../components/DraggableNode";
import { useNavigation } from "@react-navigation/native";
import { updateNodePosition } from "../store/mindmapReducer"; // Adjust path as necessary

const CreatingMapScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.mindmap.nodes); // Get nodes from Redux

  const handleDragEnd = () => {
    console.log("funciono");
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
    <GestureHandlerRootView style={styles.canvas}>
      {nodes ? (
        nodes.map((node) => <DraggableNode key={node.id} node={node} />)
      ) : (
        <Text>No nodes avaible</Text>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});

export default CreatingMapScreen;
