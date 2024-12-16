import React, {useEffect, useState, useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Icon, Text, useTheme, IconButton} from "react-native-paper";
import ModifyPostContext from "../context/ModifyPostContext";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";

const PostIconButtons = ({post, userId, comments, onLike, onUnlike}) => {
  const {colors} = useTheme();
  const route = useRoute();
  const [heartIcon, setHeartIcon] = useState("heart-outline");

  const navigation = useNavigation();

  useEffect(() => {
    if (post.likes.includes(userId)) {
      setHeartIcon("heart");
    } else {
      setHeartIcon("heart-outline");
    }
  }, [post.likes, userId]);

  return (
    <View style={styles.iconsContainer}>
      <View
        style={{flexDirection: "row", alignItems: "center", marginRight: 15}}
      >
        {heartIcon === "heart" ? (
          <IconButton
            icon="heart"
            iconColor={colors.primary}
            size={30}
            onPress={onUnlike}
            style={{margin: 0}}
          />
        ) : (
          <IconButton
            icon="heart-outline"
            iconColor={colors.primary}
            size={30}
            onPress={onLike}
            style={{margin: 0}}
          />
        )}

        <Text variant="titleMedium" style={{color: colors.text, marginLeft: 5}}>
          {post.likes ? post.likes.length : null}
        </Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <IconButton
          icon="chat-outline"
          iconColor={colors.primary}
          size={30}
          style={{margin: 0}}
          onPress={() =>
            navigation.navigate(
              "CommentsScreen",

              {comments, post}
            )
          }
        />
        <Text variant="titleMedium" style={{color: colors.text, marginLeft: 5}}>
          {post.comments ? post.comments.length : null}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostIconButtons;
