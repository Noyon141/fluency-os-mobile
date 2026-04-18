import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "expo-router";
import { useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

export function SignUpForm() {
  const passwordInputRef = useRef<TextInput>(null);

  const router = useRouter();

  //STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  async function onSubmit() {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
          Toast.info("Signing up...");
        },
        onSuccess: async () => {
          Toast.success("Signed up successfully!");
          setLoading(false);
        },

        onError: (error) => {
          console.log("Error signing up:❌", error);
          Toast.error("Failed to sign up. Please check your credentials.");
          setLoading(false);
        },
      },
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 w-full"
    >
      <SafeAreaView className="gap-4 w-full flex-1">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-3xl sm:text-left font-bold tracking-wider">
              FluencyOS
            </CardTitle>

            <CardDescription className="text-center sm:text-left">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  autoComplete="name"
                  autoCapitalize="words"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onChangeText={setName}
                />
              </View>
              <View className="gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  onSubmitEditing={onEmailSubmitEditing}
                  returnKeyType="next"
                  submitBehavior="submit"
                  onChangeText={setEmail}
                />
              </View>
              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                </View>
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  placeholder="••••••••"
                  returnKeyType="send"
                  onSubmitEditing={onSubmit}
                  onChangeText={setPassword}
                />
              </View>
              <Button className="w-full" onPress={onSubmit}>
                <Text>Continue</Text>
              </Button>
            </View>
            <Text className="text-center text-sm">
              Already have an account?{" "}
              <Pressable
                onPress={() => {
                  router.push("/(auth)/sign-in");
                }}
              >
                <Text className="text-sm underline underline-offset-4">
                  Sign in
                </Text>
              </Pressable>
            </Text>
            {/* <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections /> */}
          </CardContent>
        </Card>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
