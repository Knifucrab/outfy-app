import React from "react";
import {View, ScrollView, FlatList, StyleSheet} from "react-native";
import {Text, Avatar, useTheme} from "react-native-paper";
import {useRoute} from "@react-navigation/native";

const CommentsScreen = () => {
  const {colors} = useTheme();
  const route = useRoute();
  const {comments} = route.params;

  return (
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
