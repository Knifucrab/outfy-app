import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const LoginFlowNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginFlowNavigator;
