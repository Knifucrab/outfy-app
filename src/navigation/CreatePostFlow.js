import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/native";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator();

const CreatePostFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CreatePostFlow;
