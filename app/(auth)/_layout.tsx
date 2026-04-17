import { authClient } from "@/lib/auth-client";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const session = authClient.useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
};

export default AuthLayout;
