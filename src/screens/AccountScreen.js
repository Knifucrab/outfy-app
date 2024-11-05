import React, {useState} from "react";
import {View, StyleSheet, Image} from "react-native";
import {useTheme, Text, Button, Avatar, Card, Icon} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {format} from "date-fns";
import UserProfileInformation from "../components/userProfileInformation";
import ProfileCard from "../components/ProfileCard";

const AccountScreen = () => {
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation(); // To navigate to the mainFlow
  const {logout} = useAuth();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigation.navigate("LoginFlow");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const formattedBirthDate = format(new Date(user.birthDate), "MMMM d, yyyy");

  return (
    <ScreenLayout>
      <ProfileCard
        profilePicture={user.profilePicture}
        email={user.email}
        fullName="Mauro Bringas"
        posts="10"
        likes="150"
        comments="30"
      />
      <UserProfileInformation
        username={user.username}
        email="maurosbringas@gmail.com"
        formattedBirthDate={formattedBirthDate}
      />
      <Button
        mode="contained"
        onPress={handleLogout}
        loading={loading}
        style={{marginTop: 50}}
      >
        Log out
      </Button>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
