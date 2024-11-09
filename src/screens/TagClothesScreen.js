import React, {useState, useContext} from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {useTheme, Text, TextInput, Button} from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import Spacer from "../components/ui/Spacer";
import CreatePostContext from "../context/CreatePostContext";

const TagClothesScreen = () => {
  const {colors} = useTheme(); // Get the colors from the theme
  const navigation = useNavigation();
  const route = useRoute();
  const {clothes, setClothes, image} = useContext(CreatePostContext);

  const [point, setPoint] = useState(null); // state for save the x and y
  const [cloth, setCloth] = useState({
    // state for save the input values.
    name: "",
    brand: "",
  });

  const handleImagePress = (event) => {
    //when the user press the anywhere in the image lets save the x and y of that location.
    const {nativeEvent} = event;
    const {locationX, locationY} = nativeEvent;
    setPoint({x: locationX, y: locationY});
  };

  const handleSubmit = () => {
    // onSubmit button verify inputs and point needed
    if (cloth.name === "" || cloth.brand === "" || !point) {
      alert("Fill all inputs in form and select a point on the image");
      return;
    }

    const newCloth = {...cloth, x: point.x, y: point.y}; // if user filled everything lets save in the CreatePostScreen clothes state the value of cloth (title and label) and the x and y
    setClothes([...clothes, newCloth]);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: colors.background},
      ]}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleImagePress}>
          <Image source={{uri: image.assets[0].uri}} style={styles.image} />
        </TouchableWithoutFeedback>
        <Text variant="titleSmall" style={{color: colors.text}}>
          Tap photo to tag cloth
        </Text>
      </View>
      {point && (
        <View
          style={[
            styles.point,
            {
              left: point.x + 70,
              top: point.y - 10,
              backgroundColor: colors.primary,
            },
          ]}
        />
      )}
      <Spacer />
      <Text variant="titleMedium" style={{color: colors.text}}>
        Name
      </Text>
      <TextInput
        textColor={colors.text}
        placeholder="Ex: Dragon T-shirt, Y2K Jean..."
        value={cloth.name}
        onChangeText={(name) => setCloth({...cloth, name: name})}
        mode="outlined"
      />
      <Spacer />
      <Text variant="titleMedium" style={{color: colors.text}}>
        Brand
      </Text>
      <TextInput
        textColor={colors.text}
        placeholder="Ex: Zara, Gap..."
        value={cloth.brand}
        onChangeText={(brand) => setCloth({...cloth, brand: brand})}
        mode="outlined"
      />
      <Spacer />
      <Button mode="outlined" onPress={handleSubmit}>
        Apply
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 450,
  },
  point: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
});

export default TagClothesScreen;
