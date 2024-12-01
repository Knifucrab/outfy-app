import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import {Button, Card, useTheme} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {format} from "date-fns";
import UserProfileInformation from "../components/userProfileInformation";
import ProfileCard from "../components/ProfileCard";
import CreatePostContext from "../context/CreatePostContext";
import UserProfilePosts from "../components/UserProfilePosts";

const AccountScreen = () => {
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation(); // To navigate to the mainFlow
  const {logout} = useAuth();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.user.posts); // Access posts from Redux store
  const {fetchMyPosts, loadingPostContext, setPostCreated, postCreated} =
    useContext(CreatePostContext); // Use context to access fetchMyPosts
  const {colors} = useTheme();

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

  //useEffect to fetch the user posts.
  useEffect(() => {
    fetchMyPosts();
    setPostCreated(false);
  }, [postCreated]);

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
        birthDate={user.birthDate}
        email={user.email}
        formattedBirthDate={formattedBirthDate}
      />
      {loadingPostContext ? (
        <ActivityIndicator animating={true} color={colors} />
      ) : (
        posts && <UserProfilePosts posts={posts} />
      )}
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
