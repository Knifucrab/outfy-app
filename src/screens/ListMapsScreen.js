import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Searchbar, useTheme } from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";

const ListMapsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { colors } = useTheme(); // Get the colors from the theme
  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{ color: colors.text }}>
        ListMapsScreen
      </Text>

      <DividerWithSpacer />
      <Searchbar
        placeholder="Search here your mindmaps"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({});

export default ListMapsScreen;
