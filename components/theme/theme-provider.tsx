import { NAV_THEME } from "@/lib/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ThemeProvider as NavigationThemeProvider,
  Theme,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isReady, setIsReady] = React.useState(false);

  // 1. Load saved theme on startup
  React.useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("user-theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          setColorScheme(savedTheme);
        } else {
          // Default to system if nothing is saved
          setColorScheme("system");
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  // 2. Prevent flash of wrong theme by waiting until we load storage
  if (!isReady) {
    return null;
  }

  // 3. Sync NativeWind theme with React Navigation
  // react-native-reusables usually provides a NAV_THEME object
  const navigationTheme: Theme = {
    dark: colorScheme === "dark",
    colors: NAV_THEME[colorScheme === "dark" ? "dark" : "light"]
      .colors as unknown as Theme["colors"],
    fonts: NAV_THEME[colorScheme === "dark" ? "dark" : "light"]
      .fonts as unknown as Theme["fonts"],
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      {children}
    </NavigationThemeProvider>
  );
}

// Helper hook to toggle theme easily
export function useThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = async () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newTheme);
    await AsyncStorage.setItem("user-theme", newTheme);
  };

  return { isDark: colorScheme === "dark", toggleTheme, setColorScheme };
}
