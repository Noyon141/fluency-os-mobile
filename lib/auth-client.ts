import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// 1. Determine the Base URL dynamically
const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL!)
    return `${process.env.EXPO_PUBLIC_API_URL!}`;
  // Fallback for local dev
  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  return "http://192.168.0.195:3000";
};

const baseUrl = getBaseUrl();

console.log("Auth Client Base URL:", baseUrl);

export const authClient = createAuthClient({
  baseURL: baseUrl,

  fetchOptions: {
    onError: async (ctx) => {
      if (ctx.response.status === 401) {
        // Handle global logout triggers here
        console.log("Unauthorized - Token likely expired");
      }
    },
  },
  plugins: [
    expoClient({
      scheme: "fluencyosmobile",
      storagePrefix: "fluencyosmobile",
      storage: SecureStore,
    }),
  ],
});

// Helper to save token manually if needed (BetterAuth handles cookies mostly,
// but for mobile we often prefer Bearer tokens. We will configure this later
// if cookie-based auth proves unstable on your device).
