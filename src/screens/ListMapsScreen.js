import React from "react";
import { StyleSheet } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";

const ListMapsScreen = () => {
  return (
    <ScreenLayout>
      <Text>ListMapsScreen</Text>
      <Searchbar
      placeholder="Search here your mindmaps"
      onChang
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({});

export default ListMapsScreen;
