import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  useTheme,
  Text,
  TextInput,
  IconButton,
  Portal,
  Modal,
  Button,
  Dialog,
} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import { useDispatch } from "react-redux";
import ImagePickerInput from "../components/ImagePickerInput";
import Spacer from "../components/ui/Spacer";
import ClothesForm from "../components/ClothesForm";

const CreatePostScreen = ({ navigation }) => {
  const { colors } = useTheme(); // Get the colors from the theme
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clothes, setClothes] = useState([]);
  const [image, setImage] = useState(null);

  // Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: colors.background, padding: 20 };

  //Dialog submit
  const [visibleDialog, setVisibleDialog] = useState(false);
  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const handleSubmit = () => {
    if (!title || !description || !image) {
      showDialog();
      return;
    }

    // dispatch({
    //   type: "CREATE_POST",
    //   payload: { title, description, image, clothes },
    // });

    // Optionally, reset form fields after submission
    setTitle("");
    setDescription("");
    setImage(null);
  };

  console.log(clothes);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text
            variant="titleLarge"
            style={{ color: colors.text, marginBottom: 15 }}
          >
            ¿What are you wearing?
          </Text>
          <ClothesForm
            onClothesSelect={setClothes}
            clothes={clothes}
            hideModal={hideModal}
          />
        </Modal>
      </Portal>
      <ScreenLayout>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Title */}
          <Text
            variant="headlineMedium"
            style={[styles.formTitle, { color: colors.text }]}
          >
            {" "}
            Create new post
          </Text>
          {/* Form */}

          <Text
            variant="titleMedium"
            style={[styles.formSubtitle, { color: colors.text }]}
          >
            Add photo of your outfit
          </Text>
          <ImagePickerInput image={image} onImageSelect={setImage} />
          {image != null ? (
            <View>
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
            </View>
          ) : null}

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
          <Spacer />
          <View>
            <Button mode="outlined" onPress={handleSubmit}>
              Submit
            </Button>
            <Portal>
              <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                <Dialog.Title>Fill all the inputs</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">This is simple dialog</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </ScrollView>
      </ScreenLayout>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
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
