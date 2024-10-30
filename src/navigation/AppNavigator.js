import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginFlowNavigator from "./LoginFlowNavigator";
import MainFlowNavigator from "./MainFlowNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = ({customTheme}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginFlow" component={LoginFlowNavigator} />
        <Stack.Screen name="MainFlow">
          {() => <MainFlowNavigator customTheme={customTheme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
