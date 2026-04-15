import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
    </Stack>
  );
};

export default RootLayout;
