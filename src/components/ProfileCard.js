import React from "react";
import {Card, Text, Avatar, useTheme} from "react-native-paper";
import DividerWithSpacer from "./ui/DividerWithSpacer";

const ProfileCard = ({
  profilePicture,
  email,
  fullName,
  posts,
  likes,
  comments,
}) => {
  const {colors} = useTheme();

  return (
    <Card
      mode="elevated"
      style={{backgroundColor: colors.primaryContainer}}
      contentStyle={{
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card.Content style={{justifyContent: "center", alignItems: "center"}}>
        <Avatar.Image
          size={120}
          source={{
            uri: profilePicture,
          }}
        />
        <Text
          variant="titleLarge"
          style={{
            fontWeight: "bold",
            marginTop: 8,
            color: colors.onPrimaryContainer,
          }}
        >
          {fullName}
        </Text>
        <Text variant="labelMedium" style={{color: colors.onPrimaryContainer}}>
          {email}
        </Text>
      </Card.Content>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={{fontWeight: "bold", color: colors.onPrimaryContainer}}
        >
          {posts}
        </Text>
        <Text variant="titleSmall" style={{color: colors.onPrimaryContainer}}>
          Posts
        </Text>
        <DividerWithSpacer />
        <Text
          variant="titleMedium"
          style={{fontWeight: "bold", color: colors.onPrimaryContainer}}
        >
          {likes}
        </Text>
        <Text variant="titleSmall" style={{color: colors.onPrimaryContainer}}>
          Likes
        </Text>
        <DividerWithSpacer />
        <Text
          variant="titleMedium"
          style={{fontWeight: "bold", color: colors.onPrimaryContainer}}
        >
          {comments}
        </Text>
        <Text variant="titleSmall" style={{color: colors.onPrimaryContainer}}>
          Comments
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
