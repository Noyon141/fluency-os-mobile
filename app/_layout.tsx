import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/global.css";

import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </>
  );
}
