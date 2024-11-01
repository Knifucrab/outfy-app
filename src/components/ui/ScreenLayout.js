import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const ScreenLayout = ({ children }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default ScreenLayout;
