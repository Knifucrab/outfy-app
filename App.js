import React, {useState, useEffect} from "react";
import * as Font from "expo-font";
import {Provider as PaperProvider, MD3LightTheme} from "react-native-paper";
import {Provider as ReduxProvider} from "react-redux";
import {useColorScheme, View, ActivityIndicator} from "react-native";
import store from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import {AuthProvider} from "./src/context/AuthContext";
import {CreatePostProvider} from "./src/context/CreatePostContext";
const materialTheme = require("./material-theme.json");
const {schemes} = materialTheme;

const loadFonts = () => {
  return Font.loadAsync({
    "Sora-Thin": require("./assets/fonts/static/Sora-Thin.ttf"),
    "Sora-ExtraLight": require("./assets/fonts/static/Sora-ExtraLight.ttf"),
    "Sora-Light": require("./assets/fonts/static/Sora-Light.ttf"),
    "Sora-Regular": require("./assets/fonts/static/Sora-Regular.ttf"),
    "Sora-Medium": require("./assets/fonts/static/Sora-Medium.ttf"),
    "Sora-SemiBold": require("./assets/fonts/static/Sora-SemiBold.ttf"),
    "Sora-Bold": require("./assets/fonts/static/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("./assets/fonts/static/Sora-ExtraBold.ttf"),
  });
};

const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      fontFamily: "Sora-Regular",
      fontWeight: "400",
      letterSpacing: 0,
    },
    displayLarge: {
      fontFamily: "Sora-Bold",
      fontSize: 57,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 64,
    },
    displayMedium: {
      fontFamily: "Sora-Bold",
      fontSize: 45,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 52,
    },
    displaySmall: {
      fontFamily: "Sora-Bold",
      fontSize: 36,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
    headlineLarge: {
      fontFamily: "Sora-Bold",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
    headlineMedium: {
      fontFamily: "Sora-SemiBold",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineSmall: {
      fontFamily: "Sora-SemiBold",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    titleLarge: {
      fontFamily: "Sora-SemiBold",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    titleMedium: {
      fontFamily: "Sora-Medium",
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleSmall: {
      fontFamily: "Sora-Medium",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    labelLarge: {
      fontFamily: "Sora-Medium",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    labelMedium: {
      fontFamily: "Sora-Medium",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelSmall: {
      fontFamily: "Sora-Medium",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    bodyLarge: {
      fontFamily: "Sora-Regular",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: "Sora-Regular",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: "Sora-Regular",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
  },
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const colorScheme = useColorScheme();

  const lightTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: schemes.light.primary,
      background: schemes.light.background,
      surface: schemes.light.surface,
      accent: schemes.light.secondary,
      text: schemes.light.onSurface,
      error: schemes.light.error,
      surfaceTint: schemes.light.surfaceTint,
      onPrimary: schemes.light.onPrimary,
      primaryContainer: schemes.light.primaryContainer,
      onPrimaryContainer: schemes.light.onPrimaryContainer,
      onSecondary: schemes.light.onSecondary,
      secondaryContainer: schemes.light.secondaryContainer,
      onSecondaryContainer: schemes.light.onSecondaryContainer,
      onTertiary: schemes.light.onTertiary,
      tertiaryContainer: schemes.light.tertiaryContainer,
      onTertiaryContainer: schemes.light.onTertiaryContainer,
      onError: schemes.light.onError,
      errorContainer: schemes.light.errorContainer,
      onErrorContainer: schemes.light.errorContainer,
      onBackground: schemes.light.onBackground,
      surfaceVariant: schemes.light.surfaceVariant,
      onSurfaceVariant: schemes.light.onSurfaceVariant,
      outline: schemes.light.outline,
      outlineVariant: schemes.light.outlineVariant,
      shadow: schemes.light.shadow,
      scrim: schemes.light.scrim,
      inverseSurface: schemes.light.inverseSurface,
      inverseOnSurface: schemes.light.inverseOnSurface,
      inversePrimary: schemes.light.inversePrimary,
      primaryFixed: schemes.light.primaryFixed,
      onPrimaryFixed: schemes.light.onPrimaryFixed,
      primaryFixedDim: schemes.light.primaryFixedDim,
      onPrimaryFixedVariant: schemes.light.onPrimaryFixedVariant,
      secondaryFixed: schemes.light.secondaryFixed,
      onSecondaryFixed: schemes.light.onSecondaryFixed,
      secondaryFixedDim: schemes.light.secondaryFixedDim,
      onSecondaryFixedVariant: schemes.light.onSecondaryFixedVariant,
      tertiaryFixed: schemes.light.tertiaryFixed,
      onTertiaryFixed: schemes.light.onTertiaryFixed,
      tertiaryFixedDim: schemes.light.tertiaryFixedDim,
      onTertiaryFixedVariant: schemes.light.onTertiaryFixedVariant,
      surfaceDim: schemes.light.surfaceDim,
      surfaceBright: schemes.light.surfaceBright,
      surfaceContainerLowest: schemes.light.surfaceContainerLowest,
      surfaceContainerLow: schemes.light.surfaceContainerLow,
      surfaceContainer: schemes.light.surfaceContainer,
      surfaceContainerHigh: schemes.light.surfaceContainerHigh,
      surfaceContainerHighest: schemes.light.surfaceContainerHighest,
    },
  };

  const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: schemes.dark.primary,
      background: schemes.dark.background,
      surface: schemes.dark.surface,
      accent: schemes.dark.secondary,
      text: schemes.dark.onSurface,
      error: schemes.dark.error,
      surfaceTint: schemes.dark.surfaceTint,
      onPrimary: schemes.dark.onPrimary,
      primaryContainer: schemes.dark.primaryContainer,
      onPrimaryContainer: schemes.dark.onPrimaryContainer,
      onSecondary: schemes.dark.onSecondary,
      secondaryContainer: schemes.dark.secondaryContainer,
      onSecondaryContainer: schemes.dark.onSecondaryContainer,
      onTertiary: schemes.dark.onTertiary,
      tertiaryContainer: schemes.dark.tertiaryContainer,
      onTertiaryContainer: schemes.dark.onTertiaryContainer,
      onError: schemes.dark.onError,
      errorContainer: schemes.dark.errorContainer,
      onErrorContainer: schemes.dark.errorContainer,
      onBackground: schemes.dark.onBackground,
      surfaceVariant: schemes.dark.surfaceVariant,
      onSurfaceVariant: schemes.dark.onSurfaceVariant,
      outline: schemes.dark.outline,
      outlineVariant: schemes.dark.outlineVariant,
      shadow: schemes.dark.shadow,
      scrim: schemes.dark.scrim,
      inverseSurface: schemes.dark.inverseSurface,
      inverseOnSurface: schemes.dark.inverseOnSurface,
      inversePrimary: schemes.dark.inversePrimary,
      primaryFixed: schemes.dark.primaryFixed,
      onPrimaryFixed: schemes.dark.onPrimaryFixed,
      primaryFixedDim: schemes.dark.primaryFixedDim,
      onPrimaryFixedVariant: schemes.dark.onPrimaryFixedVariant,
      secondaryFixed: schemes.dark.secondaryFixed,
      onSecondaryFixed: schemes.dark.onSecondaryFixed,
      secondaryFixedDim: schemes.dark.secondaryFixedDim,
      onSecondaryFixedVariant: schemes.dark.onSecondaryFixedVariant,
      tertiaryFixed: schemes.dark.tertiaryFixed,
      onTertiaryFixed: schemes.dark.onTertiaryFixed,
      tertiaryFixedDim: schemes.dark.tertiaryFixedDim,
      onTertiaryFixedVariant: schemes.dark.onTertiaryFixedVariant,
      surfaceDim: schemes.dark.surfaceDim,
      surfaceBright: schemes.dark.surfaceBright,
      surfaceContainerLowest: schemes.dark.surfaceContainerLowest,
      surfaceContainerLow: schemes.dark.surfaceContainerLow,
      surfaceContainer: schemes.dark.surfaceContainer,
      surfaceContainerHigh: schemes.dark.surfaceContainerHigh,
      surfaceContainerHighest: schemes.dark.surfaceContainerHighest,
    },
  };

  const customTheme = colorScheme === "dark" ? darkTheme : darkTheme;

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: customTheme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={customTheme.colors.primary} />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <CreatePostProvider>
          <PaperProvider theme={customTheme}>
            <AppNavigator customTheme={customTheme} />
          </PaperProvider>
        </CreatePostProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
