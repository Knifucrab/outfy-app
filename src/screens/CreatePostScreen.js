import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text, TextInput } from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import { useDispatch } from "react-redux";
import ImagePickerInput from "../components/ImagePickerInput";
import Spacer from "../components/ui/Spacer";

const CreatePostScreen = ({ navigation }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  // const handleUpdatePosition = (newPosition) => {
  //   dispatch({ type: "UPDATE_NODE_POSITION", payload: newPosition });
  // };

  return (
    <ScreenLayout>
      <Text
        variant="headlineMedium"
        style={[styles.formTitle, { color: colors.text }]}
      >
        {" "}
        Create new post
      </Text>
      <View style={styles.formContainer}>
        <Text
          variant="titleMedium"
          style={[styles.formSubtitle, { color: colors.text }]}
        >
          Add photo of your outfit
        </Text>
        <ImagePickerInput />
        {/* <Text
          variant="titleMedium"
          style={[styles.formSubtitle, { color: colors.text }]}
        >
          Title
        </Text> */}
        <Spacer />
        <TextInput
          label="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
          mode="outlined"
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  formTitle: { fontWeight: "bold" },
  formSubtitle: {
    paddingBottom: 10,
    paddingTop: 18,
  },
});

export default CreatePostScreen;
