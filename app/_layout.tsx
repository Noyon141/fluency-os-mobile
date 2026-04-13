import "@/global.css";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";

import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <ThemeProvider value={NAV_THEME[NAV_THEME ? "dark" : "light"]}>
        <Stack />
        <PortalHost />
      </ThemeProvider>
    </>
  );
}
