import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import ButtonCreateMindmap from "../components/ButtonCreateMindmap";

const CreateMapsScreen = () => {
  const { colors } = useTheme(); // Get the colors from the theme

  const consoleTest = () => {
    return console.log("test");
  };
  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{ color: colors.text }}>
        Create your map
      </Text>
      <DividerWithSpacer />

      <View style={styles.buttonContainer}>
        <ButtonCreateMindmap
          textLine1="Create mindmap"
          iconName="vector-square-plus"
          iconSize={60}
          onPress={consoleTest}
        />
        <ButtonCreateMindmap
          textLine1="Select template"
          iconName="file-tree"
          iconSize={60}
          onPress={consoleTest}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});

export default CreateMapsScreen;
