import { authClient } from "@/lib/auth-client";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const session = authClient.useSession();

  if (session.data) {
    return <Redirect href="/(root)/(tabs)/home" />;
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="onboarding" />
      </Stack>
    );
  }
};

export default AuthLayout;
