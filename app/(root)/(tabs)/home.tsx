import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const HomeTab = () => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const onSubmit = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          Toast.success("Signed out successfully!");
          router.push("/sign-in");
        },
        onError: () => {
          setLoading(false);
          Toast.error("Failed to sign out.");
        },
        onRequest: () => {
          setLoading(true);
        },
      },
    });
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center p-5">
      <Text>Home</Text>
      <Button
        onPress={onSubmit}
        disabled={loading}
        className="w-full mt-5 rounded-full"
        variant={"destructive"}
      >
        <Text>Sign out</Text>
      </Button>
    </SafeAreaView>
  );
};

export default HomeTab;
