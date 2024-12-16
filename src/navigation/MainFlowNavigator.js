import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CreatePostFlow from "../navigation/CreatePostFlow";
import HomeFlow from "./HomeFlow";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AccountFlow from "./AccountFlow";

const Tab = createBottomTabNavigator();

const MainFlowNavigator = ({customTheme}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return route.name === "HomeFlow" ? (
            <Entypo
              name="home"
              size={25}
              color={
                focused ? customTheme.colors.primary : customTheme.colors.text
              }
            />
          ) : route.name === "CreatePostFlow" ? (
            <FontAwesome6
              name="add"
              size={25}
              color={
                focused ? customTheme.colors.primary : customTheme.colors.text
              }
            />
          ) : (
            <MaterialCommunityIcons
              name="account"
              size={25}
              color={
                focused ? customTheme.colors.primary : customTheme.colors.text
              }
            />
          );
        },
        tabBarActiveTintColor: customTheme.colors.primary, // Label color when active
        tabBarInactiveTintColor: customTheme.colors.text, // Label color when inactive
        tabBarStyle: {
          backgroundColor: customTheme.colors.surface,
        },
      })}
    >
      <Tab.Screen
        name="HomeFlow"
        component={HomeFlow}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="AccountFlow"
        component={AccountFlow}
        options={{
          tabBarLabel: "Account",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="CreatePostFlow"
        component={CreatePostFlow}
        options={{
          tabBarLabel: "Create post",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainFlowNavigator;
