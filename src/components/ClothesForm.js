import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Spacer from "./ui/Spacer";

const ClothesForm = ({ onClothesSelect, clothes, hideModal }) => {
  const { colors } = useTheme(); // Get the colors from the theme

  const [cloth, setCloth] = useState({
    category: "",
    name: "",
    brand: "",
  });

  const handleSubmit = () => {
    if (cloth.category === "" || cloth.name === "" || cloth.brand === "") {
      alert("Fill all inputs in form");
      return;
    }

    onClothesSelect([...clothes, cloth]);
    hideModal();
  };

  return (
    <View>
      <Text variant="titleMedium" style={{ color: colors.text }}>
        Select a Category:
      </Text>
      <Picker
        selectedValue={cloth.category}
        onValueChange={(itemValue) =>
          setCloth({ ...cloth, category: itemValue })
        }
        style={[styles.picker, { color: colors.text }]}
        dropdownIconColor={colors.primary}
      >
        <Picker.Item
          label="Select"
          value=""
          style={{
            color: colors.text,
            backgroundColor: colors.background,
          }}
        />
        <Picker.Item
          label="T-Shirt"
          value="T-Shirt"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Jean"
          value="Jean"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Skirt"
          value="Skirt"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Pants"
          value="Pants"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Glasses"
          value="Glasses"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Bag"
          value="Bag"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Cap"
          value="Cap"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Hoodie"
          value="Hoodie"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
        <Picker.Item
          label="Necklace"
          value="Necklace"
          style={{ color: colors.text, backgroundColor: colors.background }}
        />
      </Picker>
      <Spacer />
      <Text variant="titleMedium" style={{ color: colors.text }}>
        How is called
      </Text>
      <TextInput
        textColor={colors.text}
        placeholder="Ex: Dragon T-shirt, Y2K Jean..."
        value={cloth.name}
        onChangeText={(name) => setCloth({ ...cloth, name: name })}
        mode="outlined"
      />
      <Spacer />
      <Text variant="titleMedium" style={{ color: colors.text }}>
        Brand
      </Text>
      <TextInput
        textColor={colors.text}
        placeholder="Ex: Zara, Gap..."
        value={cloth.brand}
        onChangeText={(brand) => setCloth({ ...cloth, brand: brand })}
        mode="outlined"
      />
      <Spacer />
      <Button mode="outlined" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "100%",
  },
});

export default ClothesForm;
