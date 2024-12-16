import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {useTheme} from "react-native-paper";
import CommentsScreen from "../screens/CommentsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeFlow = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Comments",
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

export default HomeFlow;
