import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, IconButton, MD3Colors } from "react-native-paper";

const ModifyNodeBar = ({ handleAddNode }) => {
  const { colors } = useTheme(); // Get the colors from the theme

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <IconButton
        icon="text"
        iconColor={colors.onPrimaryContainer}
        size={28}
        onPress={() => console.log("Pressed")}
      />
      <IconButton
        icon="plus"
        iconColor={colors.onPrimaryContainer}
        size={28}
        onPress={() =>
          handleAddNode({ id: 4, title: "", pos_x: 50, pos_y: 50 })
        }
      />

      <IconButton
        icon="image"
        iconColor={colors.onPrimaryContainer}
        size={28}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    borderRadius: 30,
    bottom: 20, // Distance from the bottom of the screen
    right: 30,
    left: 30,
    justifyContent: "center", // Centers the buttons horizontally
  },
});

export default ModifyNodeBar;
