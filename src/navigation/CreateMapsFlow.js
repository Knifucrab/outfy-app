import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/native";
import CreateMapsScreen from "../screens/CreateMapsScreen";
import CreatingMapScreen from "../screens/CreatingMapScreen";

const Stack = createNativeStackNavigator();

const CreateMapsFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateMapsScreen"
        component={CreateMapsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatingMapScreen"
        component={CreatingMapScreen}
        options={{
          headerShown: true, // Shows a back button
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateMapsFlow;
