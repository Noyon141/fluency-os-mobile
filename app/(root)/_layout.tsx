import { authClient } from "@/lib/auth-client";
import { Redirect, Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  const session = authClient.useSession();

  if (!session.data) {
    return <Redirect href="/(auth)/sign-up" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
    </Stack>
  );
};

export default RootLayout;
