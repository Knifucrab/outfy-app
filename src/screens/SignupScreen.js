import React from "react";
import {View, StyleSheet} from "react-native";
import {useTheme, Text, Button} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useNavigation} from "@react-navigation/native";

const SignupScreen = () => {
  const {colors} = useTheme(); // Get the colors from the theme
  const navigation = useNavigation(); // To navigate to the mainFlow

  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{color: colors.text}}>
        Signup
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate("MainFlow")}>
        Go to main flow
      </Button>
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

export default SignupScreen;
