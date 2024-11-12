import React, {useContext, useState} from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {
  useTheme,
  Text,
  Button,
  IconButton,
  Chip,
  Icon,
  TextInput,
} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import ImagePickerInput from "../components/ImagePickerInput";
import Spacer from "../components/ui/Spacer";
import {uploadImage} from "../api/uploadImage";
import CreatePostContext from "../context/CreatePostContext";

const CreatePostScreen = ({navigation}) => {
  const {colors} = useTheme(); // Get the colors from the theme
  const {
    title,
    setTitle,
    description,
    setDescription,
    clothes,
    image,
    setImage,
    createPost,
    loadingPostContext,
  } = useContext(CreatePostContext); // Use context to access state
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const handleSubmit = async () => {
    setDisabledSubmit(true);
    if (!title || !description || !image) {
      setDisabledSubmit(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(image);

      // show error if fails
      if (!imageUrl) {
        console.error("Image upload failed");
        return;
      }

      await createPost(title, description, clothes, imageUrl);
    } catch (error) {
      console.error("Submit failed: ", error);
    } finally {
      setDisabledSubmit(false);
    }
  };

  return (
    <ScreenLayout>
      {/* Title */}
      <Text variant="titleLarge" style={{color: colors.text, marginBottom: 15}}>
        Create new post
      </Text>
      {/* Form */}
      {image ? null : (
        <Text
          variant="titleMedium"
          style={[styles.formSubtitle, {color: colors.text, marginBottom: 15}]}
        >
          Add photo of your outfit
        </Text>
      )}
      <ImagePickerInput
        image={image}
        onImageSelect={setImage}
        clothes={clothes}
      />
      {image != null ? (
        <View>
          <Text
            variant="titleSmall"
            style={[styles.formSubtitle, {color: colors.text}]}
          >
            Clothes (optional)
          </Text>
          <View style={{flexDirection: "row"}}>
            <IconButton
              id="addClothesButton"
              icon="plus-box"
              iconColor={colors.primary}
              size={20}
              onPress={() => navigation.navigate("TagClothesScreen")}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={true}
              data={clothes}
              keyExtractor={(item, index) =>
                `${item.brand}-${item.category}-${index}`
              }
              renderItem={({item}) => (
                <Chip
                  style={{
                    backgroundColor: colors.secondaryContainer,
                    marginRight: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={() => (
                    <Icon
                      source="information"
                      color={colors.onSecondaryContainer}
                      size={20}
                    />
                  )}
                >
                  <Text style={{color: colors.onSecondaryContainer}}>
                    {item.name}
                  </Text>
                </Chip>
              )}
            />
          </View>
        </View>
      ) : null}
      <Spacer />
      <TextInput
        textColor={colors.text}
        label="Title"
        value={title}
        onChangeText={(title) => setTitle(title)}
        mode="outlined"
        placeholder="Brasil beach party 2024"
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
        placeholder="I went to Brasil beach with my friends yesterday!"
      />
      <Spacer />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{marginTop: 10}}
        loading={loadingPostContext}
        disabled={disabledSubmit}
      >
        Submit
      </Button>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  formSubtitle: {
    marginTop: 20,
  },
});

export default CreatePostScreen;
