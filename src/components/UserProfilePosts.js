import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Card, useTheme, IconButton, Badge} from "react-native-paper";

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
            <Card style={{width: 170, marginBottom: 10}} key={post._id}>
              <View style={{position: "relative"}}>
                <Card.Cover
                  source={{uri: post.imageUrl}}
                  style={styles.image}
                />

                <IconButton
                  icon="tshirt-crew"
                  iconColor={colors.primary}
                  mode="contained-tonal"
                  size={15}
                  onPress={() => console.log("Pressed")}
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
                  size={16}
                >
                  {post.clothes.length}
                </Badge>
              </View>
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
  icon: {
    position: "absolute",
    left: 130,
    bottom: 0,
  },
  badge: {
    position: "absolute",
    left: 150,
    bottom: 27,
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default UserProfilePosts;
