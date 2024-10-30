import React from "react";
import {View, StyleSheet} from "react-native";
import {useTheme, Text, Button} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useNavigation} from "@react-navigation/native";

const LoginScreen = () => {
  const {colors} = useTheme(); // Get the colors from the theme
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{color: colors.text}}>
        LogIn
      </Text>
      <DividerWithSpacer />
      <Button mode="contained" onPress={() => navigation.navigate("MainFlow")}>
        Move to MainFlow
      </Button>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default LoginScreen;
