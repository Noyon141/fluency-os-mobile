import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/global.css";
import { authClient } from "@/lib/auth-client";

import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import ToastManager from "toastify-react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();

  const router = useRouter();
  const segments = useSegments();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // 1. Do absolutely nothing if Better Auth is still checking
    if (isPending) return;

    // 2. Determine where the user is currently trying to go
    const inRootGroup = segments[0] === "(root)";

    // 3. Execute the strict routing logic
    if (session && !inRootGroup) {
      // User is authenticated but stuck outside the main app -> force them in
      router.replace("/(root)/(tabs)/home");
    } else if (!session && inRootGroup) {
      // User is NOT authenticated but trying to access the app -> kick them to onboarding
      router.replace("/(auth)/onboarding");
    }
    SplashScreen.hideAsync();
  }, [session, isPending, segments]);

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
        <PortalHost />
        <ToastManager />
      </ThemeProvider>
    </>
  );
}
