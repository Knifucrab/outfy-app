import {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigationState} from "@react-navigation/native";
import AccountScreen from "../screens/AccountScreen";
import PostScreen from "../screens/PostScreen";
import {useTheme} from "react-native-paper";
import CommentsScreen from "../screens/CommentsScreen";

const Stack = createNativeStackNavigator();

const AccountFlow = () => {
  const {colors} = useTheme(); // Get the colors from the theme

  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          title: "Post",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
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

export default AccountFlow;
