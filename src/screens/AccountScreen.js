import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {useTheme, Text, Button} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";

const AccountScreen = () => {
  const [loading, setLoading] = useState(null);
  const {colors} = useTheme(); // Get the colors from the theme
  const navigation = useNavigation(); // To navigate to the mainFlow
  const {logout} = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigation.navigate("LoginFlow");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <ScreenLayout>
      <Text variant="displaySmall" style={{color: colors.text}}>
        Manage your account
      </Text>
      <Button mode="contained" onPress={handleLogout} loading={loading}>
        Log out
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

export default AccountScreen;
