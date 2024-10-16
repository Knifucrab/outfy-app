import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useTheme,
  Text,
  TextInput,
  IconButton,
  Portal,
  Modal,
  PaperProvider,
} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import { useDispatch } from "react-redux";
import ImagePickerInput from "../components/ImagePickerInput";
import Spacer from "../components/ui/Spacer";

const CreatePostScreen = ({ navigation }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: colors.background, padding: 20 };
  // const handleUpdatePosition = (newPosition) => {
  //   dispatch({ type: "UPDATE_NODE_POSITION", payload: newPosition });
  // };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={{ color: colors.text }}>
            Example Modal. Click outside this area to dismiss.
          </Text>
        </Modal>
      </Portal>
      <ScreenLayout>
        {/* Title */}
        <Text
          variant="headlineMedium"
          style={[styles.formTitle, { color: colors.text }]}
        >
          {" "}
          Create new post
        </Text>
        {/* Form */}
        <View style={styles.formContainer}>
          <Text
            variant="titleMedium"
            style={[styles.formSubtitle, { color: colors.text }]}
          >
            Add photo of your outfit
          </Text>
          <ImagePickerInput />
          <Text
            variant="titleSmall"
            style={[styles.formSubtitle, { color: colors.text }]}
          >
            Clothes (optional)
          </Text>
          <IconButton
            icon="plus-box"
            iconColor={colors.primary}
            size={20}
            onPress={showModal}
          />
          <Spacer />
          <TextInput
            textColor={colors.text}
            label="Title"
            value={title}
            onChangeText={(title) => setTitle(title)}
            mode="outlined"
          />
          <Spacer />
          <TextInput
            numberOfLines={3}
            multiline={true}
            textColor={colors.text}
            label="Description"
            value={description}
            onChangeText={(description) => setDescription(description)}
            mode="outlined"
          />
        </View>
      </ScreenLayout>
    </>
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
