import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, ScrollView} from "react-native";
import {useTheme} from "react-native-paper";

const ScreenLayout = ({children}) => {
  const {colors} = useTheme(); // Get the colors from the theme
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
});

export default ScreenLayout;
