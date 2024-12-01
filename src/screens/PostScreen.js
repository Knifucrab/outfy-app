import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Image, FlatList, ScrollView} from "react-native";
import {
  Text,
  IconButton,
  useTheme,
  Avatar,
  Badge,
  Icon,
} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";
import PostIconButtons from "../components/PostIconButtons";
import ModifyPostContext from "../context/ModifyPostContext";

const PostScreen = () => {
  const {colors} = useTheme();
  const route = useRoute();
  const {post, user} = route.params;

  const {fetchUserData} = useContext(ModifyPostContext);
  const [commentsWithUserData, setCommentsWithUserData] = useState([]);

  useEffect(() => {
    const fetchCommentsUserData = async () => {
      const commentsWithUserData = await Promise.all(
        post.comments.map(async (comment) => {
          const userData = await fetchUserData(comment.userId);
          return {...comment, userData};
        })
      );
      setCommentsWithUserData(commentsWithUserData);
    };

    fetchCommentsUserData();
  }, [post.comments, fetchUserData]);
  // console.log(user);

  // console.log(post);
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
    >
      <View style={styles.userTitleContainer}>
        <Avatar.Image
          size={45}
          source={{
            uri: user.profilePicture,
          }}
          style={{marginRight: 10}}
        />
        <Text
          variant="bodyLarge"
          style={[styles.usernameTitle, {color: colors.text}]}
        >
          {user.username}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: post.imageUrl}} style={styles.image} />
        <IconButton
          icon="tshirt-crew"
          iconColor={colors.primary}
          mode="contained-tonal"
          size={20}
          // onPress={() => console.log("Pressed")}
          style={styles.icon}
        />
        <Badge
          style={[
            styles.badge,
            {
              color: colors.onPrimaryContainer,
              backgroundColor: colors.primaryContainer,
            },
          ]}
          size={18}
        >
          {post.clothes.length}
        </Badge>
      </View>
      <View style={{margin: 10}}>
        <PostIconButtons
          post={post}
          userId={user._id}
          comments={commentsWithUserData}
        />
        <Text variant="titleMedium" style={{color: colors.text}}>
          {post.title}
        </Text>
        <Text style={{color: colors.text}}>{post.description}</Text>

        {/* <CommentsList comments={commentsWithUserData} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 450,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.561)",
  },
  userTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginBottom: 5,
  },
  icon: {
    position: "absolute",
    left: 275,
    bottom: 0,
  },
  badge: {
    position: "absolute",
    left: 300,
    bottom: 30,
  },
});

export default PostScreen;
