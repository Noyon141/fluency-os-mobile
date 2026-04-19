import { getCookie } from "@better-auth/expo/client";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL!,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    // The expo client stores all its cookies as a stringified JSON under this key
    const cookieJSON = await SecureStore.getItemAsync("fluencyosmobile_cookie");
    if (cookieJSON) {
      // getCookie converts the JSON object into a standard "Cookie: key=value;" HTTP header string
      const formattedCookies = getCookie(cookieJSON);
      config.headers.Cookie = formattedCookies;
    }
  } catch (error) {
    console.log("Failed to retrieve cookie from SecureStore ❌", error);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or invalid. Force logout sequence.");
      // You would trigger a Zustand state update here to kick the user to the login screen
    }
    return Promise.reject(error);
  },
);
