import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Card, useTheme} from "react-native-paper";

const UserProfilePosts = ({posts}) => {
  const {colors} = useTheme();

  if (!posts || !posts.data) {
    return null; // Return null if posts or posts.data is not defined
  }

  return (
    <>
      <Text variant="headlineSmall" style={{color: colors.text}}>
        My Outfits
      </Text>
      <View style={styles.postsContainer}>
        {posts.data.map((post) => {
          return (
            <Card style={{width: 100, marginBottom: 10}}>
              <Card.Cover source={{uri: post.imageUrl}} />
            </Card>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
});

export default UserProfilePosts;
