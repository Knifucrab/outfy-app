import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreatePostFlow from "./src/navigation/CreatePostFlow";
import ChatScreen from "./src/screens/ChatScreen";

const materialTheme = require("./material-theme.json");
const { schemes } = materialTheme;

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme(); //ask to the system if user prefers light or dark

  //Define the light and dark themes based on my file material-theme.json
  const lightScheme = schemes.light;
  const darkScheme = schemes.dark;

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: lightScheme.primary,
      background: lightScheme.background,
      surface: lightScheme.surface,
      accent: lightScheme.secondary,
      text: lightScheme.onSurface,
      error: lightScheme.error,
      // Additional properties
      surfaceTint: lightScheme.surfaceTint,
      onPrimary: lightScheme.onPrimary,
      primaryContainer: lightScheme.primaryContainer,
      onPrimaryContainer: lightScheme.onPrimaryContainer,
      onSecondary: lightScheme.onSecondary,
      secondaryContainer: lightScheme.secondaryContainer,
      onSecondaryContainer: lightScheme.onSecondaryContainer,
      onTertiary: lightScheme.onTertiary,
      tertiaryContainer: lightScheme.tertiaryContainer,
      onTertiaryContainer: lightScheme.onTertiaryContainer,
      onError: lightScheme.onError,
      errorContainer: lightScheme.errorContainer,
      onErrorContainer: lightScheme.onErrorContainer,
      onBackground: lightScheme.onBackground,
      surfaceVariant: lightScheme.surfaceVariant,
      onSurfaceVariant: lightScheme.onSurfaceVariant,
      outline: lightScheme.outline,
      outlineVariant: lightScheme.outlineVariant,
      shadow: lightScheme.shadow,
      scrim: lightScheme.scrim,
      inverseSurface: lightScheme.inverseSurface,
      inverseOnSurface: lightScheme.inverseOnSurface,
      inversePrimary: lightScheme.inversePrimary,
      // Fixed variants
      primaryFixed: lightScheme.primaryFixed,
      onPrimaryFixed: lightScheme.onPrimaryFixed,
      primaryFixedDim: lightScheme.primaryFixedDim,
      onPrimaryFixedVariant: lightScheme.onPrimaryFixedVariant,
      secondaryFixed: lightScheme.secondaryFixed,
      onSecondaryFixed: lightScheme.onSecondaryFixed,
      secondaryFixedDim: lightScheme.secondaryFixedDim,
      onSecondaryFixedVariant: lightScheme.onSecondaryFixedVariant,
      tertiaryFixed: lightScheme.tertiaryFixed,
      onTertiaryFixed: lightScheme.onTertiaryFixed,
      tertiaryFixedDim: lightScheme.tertiaryFixedDim,
      onTertiaryFixedVariant: lightScheme.onTertiaryFixedVariant,
      // Surface containers
      surfaceDim: lightScheme.surfaceDim,
      surfaceBright: lightScheme.surfaceBright,
      surfaceContainerLowest: lightScheme.surfaceContainerLowest,
      surfaceContainerLow: lightScheme.surfaceContainerLow,
      surfaceContainer: lightScheme.surfaceContainer,
      surfaceContainerHigh: lightScheme.surfaceContainerHigh,
      surfaceContainerHighest: lightScheme.surfaceContainerHighest,
    },
  };

  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: darkScheme.primary,
      background: darkScheme.background,
      surface: darkScheme.surface,
      accent: darkScheme.secondary,
      text: darkScheme.onSurface,
      error: darkScheme.error,
      // Additional properties
      surfaceTint: darkScheme.surfaceTint,
      onPrimary: darkScheme.onPrimary,
      primaryContainer: darkScheme.primaryContainer,
      onPrimaryContainer: darkScheme.onPrimaryContainer,
      onSecondary: darkScheme.onSecondary,
      secondaryContainer: darkScheme.secondaryContainer,
      onSecondaryContainer: darkScheme.onSecondaryContainer,
      onTertiary: darkScheme.onTertiary,
      tertiaryContainer: darkScheme.tertiaryContainer,
      onTertiaryContainer: darkScheme.onTertiaryContainer,
      onError: darkScheme.onError,
      errorContainer: darkScheme.errorContainer,
      onErrorContainer: darkScheme.onErrorContainer,
      onBackground: darkScheme.onBackground,
      surfaceVariant: darkScheme.surfaceVariant,
      onSurfaceVariant: darkScheme.onSurfaceVariant,
      outline: darkScheme.outline,
      outlineVariant: darkScheme.outlineVariant,
      shadow: darkScheme.shadow,
      scrim: darkScheme.scrim,
      inverseSurface: darkScheme.inverseSurface,
      inverseOnSurface: darkScheme.inverseOnSurface,
      inversePrimary: darkScheme.inversePrimary,
      // Fixed variants
      primaryFixed: darkScheme.primaryFixed,
      onPrimaryFixed: darkScheme.onPrimaryFixed,
      primaryFixedDim: darkScheme.primaryFixedDim,
      onPrimaryFixedVariant: darkScheme.onPrimaryFixedVariant,
      secondaryFixed: darkScheme.secondaryFixed,
      onSecondaryFixed: darkScheme.onSecondaryFixed,
      secondaryFixedDim: darkScheme.secondaryFixedDim,
      onSecondaryFixedVariant: darkScheme.onSecondaryFixedVariant,
      tertiaryFixed: darkScheme.tertiaryFixed,
      onTertiaryFixed: darkScheme.onTertiaryFixed,
      tertiaryFixedDim: darkScheme.tertiaryFixedDim,
      onTertiaryFixedVariant: darkScheme.onTertiaryFixedVariant,
      // Surface containers
      surfaceDim: darkScheme.surfaceDim,
      surfaceBright: darkScheme.surfaceBright,
      surfaceContainerLowest: darkScheme.surfaceContainerLowest,
      surfaceContainerLow: darkScheme.surfaceContainerLow,
      surfaceContainer: darkScheme.surfaceContainer,
      surfaceContainerHigh: darkScheme.surfaceContainerHigh,
      surfaceContainerHighest: darkScheme.surfaceContainerHighest,
    },
  };

  console.log(colorScheme);
  const customTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider theme={customTheme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                  return route.name === "HomeScreen" ? (
                    <Entypo
                      name="home"
                      size={25}
                      color={
                        focused
                          ? customTheme.colors.primary
                          : customTheme.colors.text
                      }
                    />
                  ) : route.name === "CreatePostFlow" ? (
                    <FontAwesome6
                      name="add"
                      size={25}
                      color={
                        focused
                          ? customTheme.colors.primary
                          : customTheme.colors.text
                      }
                    />
                  ) : route.name === "ChatScreen" ? (
                    <Entypo
                      name="chat"
                      size={25}
                      color={
                        focused
                          ? customTheme.colors.primary
                          : customTheme.colors.text
                      }
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="account"
                      size={25}
                      color={
                        focused
                          ? customTheme.colors.primary
                          : customTheme.colors.text
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
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
