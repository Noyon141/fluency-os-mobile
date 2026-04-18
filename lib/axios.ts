import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL! as string,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(
      "fluencyosmobile_session_token",
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Failed to retrieve token from SecureStore❌", error);
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
