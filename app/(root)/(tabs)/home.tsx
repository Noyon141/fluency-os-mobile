import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeTab = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const testAxiosCall = async () => {
    try {
      console.log("🚀 Testing Axios call to /api/user-profile...");

      const response = await apiClient.get("/api/user-profile");

      console.log("✅ Axios Test Success! Data:", response.data);
    } catch (error: any) {
      console.log("❌ Axios Test Failed!");
      if (error.response) {
        // The request was made and the server responded with a status code outside 2xx
        console.log("Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Network/Setup Error:", error.message);
      }
    }
  };

  if (isPending) return <Text>Loading...</Text>;

  return (
    <SafeAreaView>
      <Text>{session?.user.name}</Text>
      <Button onPress={testAxiosCall}>
        <Text>Test Axios Connection</Text>
      </Button>
    </SafeAreaView>
  );
};

export default HomeTab;
