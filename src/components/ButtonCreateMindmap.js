import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const ButtonCreateMindmap = ({ textLine1, iconName, onPress, iconSize }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  return (
    <>
      <Button
        mode="contained"
        contentStyle={styles.buttonContent}
        onPress={onPress}
        icon={() => {
          return (
            <Icon
              name={iconName}
              size={iconSize}
              color={colors.primaryContainer}
            />
          );
        }}
        style={{
          margin: 10,
          height: 100,
          width: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          variant="labelLarge"
          style={[styles.buttonText, { color: colors.primaryContainer }]}
        >
          {textLine1}
        </Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    paddingTop: 10, // Adjust space between the icon and the text
    // Consider increasing size or making it responsive
    textAlign: "center", // Center the text
  },
});

export default ButtonCreateMindmap;
