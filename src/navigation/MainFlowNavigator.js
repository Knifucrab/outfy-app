import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import CreatePostFlow from "../navigation/CreatePostFlow";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const MainFlowNavigator = ({customTheme}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return route.name === "HomeScreen" ? (
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
          ) : route.name === "ChatScreen" ? (
            <Entypo
              name="chat"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chats",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
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
