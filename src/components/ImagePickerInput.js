import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useTheme, Text, IconButton} from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";

export default function ImagePickerInput({image, onImageSelect, clothes}) {
  const {colors} = useTheme(); // Get the colors from the theme

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelect(result);
    }
  };

  return (
    <View style={[styles.container]}>
      {image === null ? (
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
      ) : (
        <View>
          <TouchableWithoutFeedback>
            <Image source={{uri: image.assets[0].uri}} style={styles.image} />
          </TouchableWithoutFeedback>
          {clothes.map((cloth, index) => (
            <View
              key={index}
              style={[
                styles.point,
                {
                  left: cloth.x,
                  top: cloth.y,
                  backgroundColor: colors.tertiaryContainer,
                },
              ]}
            >
              <Text
                variant="bodySmall"
                style={{color: colors.onTertiaryContainer, fontSize: 10}}
              >
                {cloth.brand}
              </Text>
            </View>
          ))}
          <IconButton
            containerColor={colors.onPrimary}
            icon="pencil"
            iconColor={colors.primary}
            size={20}
            onPress={pickImage}
            style={{
              position: "absolute",
              bottom: 1,
              left: 200,
            }}
          />
        </View>
      )}
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
    width: 250,
    height: 450,
  },
  point: {
    position: "absolute",
    width: 70,
    height: 20,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
});
