import React, {useState, useContext, useEffect} from "react";
import {View, ScrollView, FlatList, StyleSheet} from "react-native";
import {Text, Avatar, useTheme, TextInput} from "react-native-paper";
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import ModifyPostContext from "../context/ModifyPostContext";

const CommentsScreen = () => {
  const {colors} = useTheme();
  const route = useRoute();
  const {comments: initialComments, post} = route.params;
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const navigation = useNavigation();
  const {commentPost, fetchUserData, fetchPostByID} =
    useContext(ModifyPostContext);

  // this useEffect have the logic to create a valid object with all the comments and his data that the post have.

  const fetchCommentsUserData = async (comments) => {
    const commentsWithUserData = await Promise.all(
      comments.map(async (comment) => {
        const userData = await fetchUserData(comment.userId);
        return {...comment, userData};
      })
    );
    setComments(commentsWithUserData);
  };

  const handleNewComment = async () => {
    const updatedComments = await commentPost(post._id, newComment);
    if (updatedComments) {
      fetchCommentsUserData(updatedComments);
    }
  };

  // useFocusEffect to fetch the user posts every time the screen comes into focus.
  useFocusEffect(
    React.useCallback(() => {
      const fetchLatestComments = async () => {
        const response = await fetchPostByID(post._id);
        fetchCommentsUserData(response.comments);
      };
      fetchLatestComments();

      // Hide the tab bar when the screen is focused
      navigation.getParent()?.setOptions({tabBarStyle: {display: "none"}});

      // Show the tab bar when the screen is unfocused
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: colors.surface,
          },
        });
    }, [post._id, navigation])
  );

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <View style={{flex: 9}}>
        <FlatList
          style={{backgroundColor: colors.background}}
          data={comments}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Avatar.Image
                size={40}
                source={{
                  uri: item.userData.profilePicture,
                }}
                style={{marginRight: 10}}
              />
              <View>
                <Text variant="bodyMedium" style={{color: colors.text}}>
                  {item.userData.username}
                </Text>
                <Text variant="bodySmall" style={{color: colors.text}}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{flex: 1}}>
        <TextInput
          label="Comment"
          value={newComment}
          onChangeText={(newComment) => setNewComment(newComment)}
          style={{height: 65}}
          textColor={colors.text}
          right={
            <TextInput.Icon
              icon="message"
              forceTextInputFocus={false}
              onPress={handleNewComment}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 15,
  },
});

export default CommentsScreen;
