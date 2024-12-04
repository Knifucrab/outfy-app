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
  const {post: initialPost, user} = route.params; // rename post to initialPost to avoid problems on the name of the state post
  const {fetchUserData, likePost, unlikePost} = useContext(ModifyPostContext); // functions to modify the post that are inside the context.
  const [post, setPost] = useState(initialPost); // this is the post that will have the data of the post and if we update this will rerender the postScreen with the new post data.
  const [commentsWithUserData, setCommentsWithUserData] = useState([]);
  const [showClothes, setShowClothes] = useState(false);

  // this useEffect have the logic to create a valid object with all the comments and his data that the post have.
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

  const handleLikePost = async () => {
    const updatedPost = await likePost(post._id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };

  const handleUnlikePost = async () => {
    const updatedPost = await unlikePost(post._id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };

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
        {showClothes
          ? post.clothes.map((cloth, index) => (
              <View
                key={index}
                style={[
                  styles.point,
                  {
                    left: cloth.x,
                    top: cloth.y,
                    backgroundColor: colors.tertiaryContainer,
                  },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{color: colors.onTertiaryContainer, fontSize: 10}}
                >
                  {cloth.brand}
                </Text>
              </View>
            ))
          : null}
        <IconButton
          icon="tshirt-crew"
          iconColor={colors.primary}
          mode="contained-tonal"
          size={20}
          onPress={() => setShowClothes(!showClothes)}
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
          {post.clothes ? post.clothes.length : null}
        </Badge>
      </View>
      <View style={{margin: 10}}>
        <PostIconButtons
          post={post}
          userId={user._id}
          comments={commentsWithUserData}
          onLike={handleLikePost}
          onUnlike={handleUnlikePost}
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
  point: {
    position: "absolute",
    width: 70,
    height: 20,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostScreen;
