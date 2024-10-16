import { useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme, Text } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";

export default function ImagePickerInput() {
  const [image, setImage] = useState(null); // Correct useState syntax
  const { colors } = useTheme(); // Get the colors from the theme

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: colors.primary,
            backgroundColor: colors.primaryContainer,
          },
        ]}
        onPress={pickImage}
      >
        <Entypo name="images" size={80} color={colors.onPrimaryContainer} />
        <Text
          style={{
            color: colors.onPrimaryContainer,
            textAlign: "center",
            marginTop: 15,
          }}
        >
          Select an image from your gallery or take a photo.
        </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderStyle: "dashed",
    borderRadius: 6,
  },
  image: {
    width: 200,
    height: 200,
  },

  tinyLogo: {
    width: 150,
    height: 150,
  },
});
