import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Icon, useTheme, Button} from "react-native-paper";
import DividerWithSpacer from "./ui/DividerWithSpacer";

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
};

const UserProfileInformation = ({birthDate, formattedBirthDate, email}) => {
  const {colors} = useTheme();
  const age = calculateAge(birthDate);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text variant="headlineSmall" style={{color: colors.text}}>
          Basic information
        </Text>
        <Button>Edit</Button>
      </View>
      <View>
        <View style={styles.userInfoContainer}>
          <View style={{padding: 15, paddingBottom: 8, paddingLeft: 5}}>
            <Icon source="calendar" color={colors.primary} size={30} />
          </View>
          <Text
            variant="titleMedium"
            style={{marginBottom: 0, color: colors.text}}
          >
            {age} years
          </Text>
        </View>
      </View>
      <DividerWithSpacer />
      <View>
        <View style={styles.userInfoContainer}>
          <View style={{padding: 15, paddingBottom: 8, paddingLeft: 5}}>
            <Icon source="cake" color={colors.primary} size={30} />
          </View>
          <Text
            variant="titleMedium"
            style={{marginBottom: 0, color: colors.text}}
          >
            {formattedBirthDate}
          </Text>
        </View>
      </View>
      <DividerWithSpacer />
      <View>
        <View style={styles.userInfoContainer}>
          <View style={{padding: 15, paddingBottom: 8, paddingLeft: 5}}>
            <Icon source="email" color={colors.primary} size={30} />
          </View>
          <Text
            variant="titleMedium"
            style={{marginBottom: 0, color: colors.text}}
          >
            {email}
          </Text>
        </View>
      </View>
      <DividerWithSpacer />
    </>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default UserProfileInformation;
