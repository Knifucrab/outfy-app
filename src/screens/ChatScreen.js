import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";

const ChatScreen = () => {
  const { colors } = useTheme(); // Get the colors from the theme
  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{ color: colors.text }}>
        Chats
      </Text>
      <DividerWithSpacer />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ChatScreen;
