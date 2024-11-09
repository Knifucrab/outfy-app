import {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigationState} from "@react-navigation/native";
import CreatePostScreen from "../screens/CreatePostScreen";
import TagClothesScreen from "../screens/TagClothesScreen";
import {useTheme} from "react-native-paper";

const Stack = createNativeStackNavigator();

const CreatePostFlow = () => {
  const {colors} = useTheme(); // Get the colors from the theme

  return (
    <Stack.Navigator initialRouteName="CreatePostScreen">
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TagClothesScreen"
        component={TagClothesScreen}
        options={{
          title: "Tag Clothes",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CreatePostFlow;
